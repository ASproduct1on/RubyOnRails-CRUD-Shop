module Authorizable
  extend ActiveSupport::Concern

  def require_admin!
    unless current_user&.admin?
      render json: {
        error: 'Access denied. Admin privileges required.'
      }, status: :forbidden
    end
  end

  def require_owner_or_admin!(resource_user_id)
    unless current_user&.id == resource_user_id || current_user&.admin?
      render json: {
        error: 'Access denied. You can only access your own resources.'
      }, status: :forbidden
    end
  end
end