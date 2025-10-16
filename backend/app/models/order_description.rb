class OrderDescription < ApplicationRecord
  belongs_to :order
  belongs_to :item

  validates :quantity, presence: true, numericality: { greater_than: 0 }

  before_validation :set_unit_price, on: :create
  after_save :update_order_total

  private

  def set_unit_price
    self.unit_price ||= item.price if item
  end

  def update_order_total
    total = order.order_descriptions.sum('unit_price * quantity')
    order.update!(amount: total)
  end
end
