module Api
  module V1
    class ProfileController < ApplicationController
      before_action :authenticate_user!

      # GET /api/v1/profile
      def show
        render json: {
          id: current_user.id,
          email: current_user.email,
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          role: current_user.role,
          created_at: current_user.created_at
        }
      end

      # PATCH /api/v1/profile
      def update
        if current_user.update(profile_params)
          render json: {
            message: 'Profile updated successfully',
            user: {
              id: current_user.id,
              email: current_user.email,
              first_name: current_user.first_name,
              last_name: current_user.last_name,
              role: current_user.role
            }
          }
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def profile_params
       
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
      end

      def authenticate_user!
         token = cookies.signed[:jwt] || request.headers['Authorization']&.split(' ')&.last
        return render_unauthorized unless token

        begin
          payload = JWT.decode(
            token,
            Rails.application.credentials.devise_jwt_secret_key,
            true,
            { algorithm: 'HS256' }
          ).first

          if JwtDenylist.exists?(jti: payload['jti'])
            return render_unauthorized
          end

          @current_user = User.find(payload['sub'])
        rescue JWT::ExpiredSignature, JWT::DecodeError, ActiveRecord::RecordNotFound
          render_unauthorized
        end
      end

      def render_unauthorized
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
end