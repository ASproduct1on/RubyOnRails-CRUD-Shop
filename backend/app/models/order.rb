class Order < ApplicationRecord
  belongs_to :user
  has_many :order_descriptions, dependent: :destroy
  has_many :items, through: :order_descriptions

  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }


  accepts_nested_attributes_for :order_descriptions
end
