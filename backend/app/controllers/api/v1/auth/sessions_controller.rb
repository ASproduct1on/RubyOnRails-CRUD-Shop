module Api
  module V1
    module Auth
      class SessionsController < ApplicationController
        
        def create
          user = User.find_by(email: params[:user][:email])

          if user&.valid_password?(params[:user][:password])
            user.update(jti: SecureRandom.uuid)
            
            token = JWT.encode(
              { sub: user.id, jti: user.jti, exp: 30.minutes.from_now.to_i },
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
              message: 'Logged in successfully',
              user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
              }
            }, status: :ok
          else
            render json: { error: 'Invalid email or password' }, status: :unauthorized
          end
        end

        def destroy
          cookies.delete(:jwt)
          
          token = request.headers['Authorization']&.split(' ')&.last || cookies.signed[:jwt]
          
          if token
            begin
              payload = JWT.decode(
                token,
                Rails.application.credentials.devise_jwt_secret_key,
                true,
                { algorithm: 'HS256' }
              ).first
              

              JwtDenylist.create!(
                jti: payload['jti'],
                exp: Time.at(payload['exp'])
              )
            rescue JWT::DecodeError
            end
          end
          
          render json: { message: 'Logged out successfully' }, status: :ok
        end
      end
    end
  end
end