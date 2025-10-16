class Api::V1::ItemsController < ApplicationController

  before_action :require_admin!, only: [:create, :update, :destroy]
  before_action :set_item, only: [:show, :update, :destroy]

	# GET /api/v1/items
	def index
		items = Item.all

		# Поиск по имени (опционально)
		if params[:search].present?
			items = items.where('name ILIKE ?', "%#{params[:search]}%")
		end
		
		render json: items.map { |item|
			{
				id: item.id,
				name: item.name,
				description: item.description,
				price: item.price.to_f,
				image_url: item.image_url
			}
		}
	end

	# GET /api/v1/items/:id
	def show
		render json: item_json(@item)
	end

	# POST /api/v1/items
	def create
		item = Item.new(item_params)

		if item.save
			render json: { message: 'Item created', item: item_json(item) }, status: :created
		else
			render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
		end
	end

	# PATCH /api/v1/items/:id
	def update
		if @item.update(item_params)
			render json: { message: 'Item updated', item: item_json(@item) }
		else
			render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
		end
	end

	# DELETE /api/v1/items/:id
	def destroy
		@item.destroy
		render json: { message: 'Item deleted' }
	end

	private

	def set_item
		@item = Item.find(params[:id])
	end

	def item_params
		params.require(:item).permit(:name, :description, :price, :image_url)
	end

	def item_json(item)
		{
			id: item.id,
			name: item.name,
			description: item.description,
			price: item.price.to_f,
			image_url: item.image_url,
			created_at: item.created_at
		}
	end

	def require_admin!
		unless current_user&.admin?
			render json: { error: 'Admin privileges required' }, status: :forbidden
		end
	end
end
