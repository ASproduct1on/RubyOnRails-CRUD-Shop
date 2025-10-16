class CreateOrderDescriptions < ActiveRecord::Migration[8.0]
  def change
    create_table :order_descriptions do |t|
      t.references :order, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.integer :quantity, null: false, default: 1
      t.decimal :unit_price, precision: 10, scale: 2, null: false  

      t.timestamps
    end
  end
end
