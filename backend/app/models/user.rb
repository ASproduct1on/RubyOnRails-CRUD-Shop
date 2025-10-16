class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :email, presence: true, uniqueness: true
  validates :role, inclusion: { in: %w[user admin] }

  def admin?
    role == 'admin'
  end

  def user?
    role == 'user'
  end

  has_many :orders, dependent: :destroy

  after_initialize :set_defaults

  private

  def set_defaults

    if new_record?
      self.role ||= 'user'
      self.jti ||= SecureRandom.uuid
    end
  end
end