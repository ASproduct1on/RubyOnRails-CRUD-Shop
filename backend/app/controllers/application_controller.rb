class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user!, unless: -> { devise_controller? || skip_authentication? }

  private

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
    rescue JWT::ExpiredSignature
      render json: { error: 'Token has expired' }, status: :unauthorized
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render_unauthorized
    end
  end

  def current_user
    @current_user
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def skip_authentication?
    controller_name == 'items' && ['index', 'show'].include?(action_name)
  end

  def devise_controller?
    is_a?(DeviseController) || 
    self.class.name.include?('Auth::Sessions') || 
    self.class.name.include?('Auth::Registrations')
  end
end