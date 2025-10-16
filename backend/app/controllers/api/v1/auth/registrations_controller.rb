module Api
  module V1
    module Auth
      class RegistrationsController < Devise::RegistrationsController
        include RackSessionsFix

        respond_to :json       

        private

        def respond_with(resource, _opts = {})
          if resource.persisted?
            resource.update(jti: SecureRandom.uuid)
    
          token = JWT.encode(
            { sub: resource.id, jti: resource.jti, exp: 30.minutes.from_now.to_i },
            Rails.application.credentials.devise_jwt_secret_key,
            'HS256'
          )
          
          cookies.signed[:jwt] = {
            value: token,
            httponly: true,
            secure: Rails.env.production?,
            same_site: :lax,
            expires: 30.minutes.from_now
          }
          
          response.headers['Authorization'] = "Bearer #{token}"

            render json: {
              message: 'Signed up successfully',
              user: {
                id: resource.id,
                email: resource.email,
                first_name: resource.first_name,
                last_name: resource.last_name,
                role: resource.role  # Always be "user"
              }
            }, status: :created
          else
            render json: {
              message: 'User could not be created',
              errors: resource.errors.full_messages
            }, status: :unprocessable_entity
          end
        end

        def sign_up_params
          params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
        end
      end
    end
  end
end