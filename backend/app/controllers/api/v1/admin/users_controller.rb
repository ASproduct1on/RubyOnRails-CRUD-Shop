class Api::V1::Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin!
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /api/v1/admin/users
  def index
    users = User.all.order(created_at: :desc)
    
    render json: users.map { |user|
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        created_at: user.created_at,
        orders_count: user.orders.count
      }
    }
  end

  # GET /api/v1/admin/users/:id
  def show
    render json: {
      id: @user.id,
      email: @user.email,
      first_name: @user.first_name,
      last_name: @user.last_name,
      role: @user.role,
      created_at: @user.created_at,
      orders_count: @user.orders.count,
      total_spent: @user.orders.sum(:amount).to_f
    }
  end

  # PATCH /api/v1/admin/users/:id
  def update
    if @user.update(user_params)
      render json: {
        message: 'User updated successfully',
        user: {
          id: @user.id,
          email: @user.email,
          first_name: @user.first_name,
          last_name: @user.last_name,
          role: @user.role
        }
      }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/admin/users/:id
  def destroy
    if @user.id == current_user.id
      return render json: { error: 'You cannot delete yourself' }, status: :forbidden
    end

    @user.destroy
    render json: { message: 'User deleted successfully' }
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :role)
  end

  def require_admin!
    unless current_user&.admin?
      render json: { error: 'Admin privileges required' }, status: :forbidden
    end
  end
end