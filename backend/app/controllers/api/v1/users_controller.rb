class Api::V1::UsersController < ApplicationController
	before_action :authenticate_user!
  before_action :authorize_admin!

  def index
    render json: User.all
  end  

  private 

  def authorize_admin!
    render json: { error: 'Forbidden' }, status: :forbidden unless current_user.admin?
  end
end
