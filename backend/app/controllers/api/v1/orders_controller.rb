class Api::V1::OrdersController < ApplicationController

  before_action :authenticate_user!

  # GET /api/v1/orders
  def index
    orders = current_user.orders.order(created_at: :desc)
    
    render json: orders.map { |order|
      {
        id: order.id,
        amount: order.amount.to_f,
        created_at: order.created_at,
        items_count: order.order_descriptions.sum(:quantity)
      }
    }
  end

  # GET /api/v1/orders/:id
  def show
   
    order = current_user.orders.find(params[:id])
    
    render json: {
      id: order.id,
      amount: order.amount.to_f,
      created_at: order.created_at,
      items: order.order_descriptions.includes(:item).map { |od|
        {
          item_id: od.item.id,
          item_name: od.item.name,
          item_price: od.item.price.to_f,
          quantity: od.quantity,
          subtotal: (od.item.price * od.quantity).to_f
        }
      }
    }
  end

  # POST /api/v1/orders
  def create
    order = current_user.orders.build 
    total_amount = 0

    params[:items].each do |item_data|
      item = Item.find(item_data[:item_id])
      quantity = item_data[:quantity].to_i

      order.order_descriptions.build(
        item: item,
        quantity: quantity
      )
      
      total_amount += item.price * quantity
    end
    
    order.amount = total_amount
    
    if order.save
      render json: { 
        message: 'Order created', 
        order_id: order.id,
        amount: order.amount.to_f,
        items_count: order.order_descriptions.count
      }, status: :created
    else
      render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
    end
  end
end