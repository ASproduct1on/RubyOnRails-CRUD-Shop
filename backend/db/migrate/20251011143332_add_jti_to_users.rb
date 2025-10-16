class AddJtiToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :jti, :string
    
    
    reversible do |dir|
      dir.up do
        User.reset_column_information # обновляем схему модели
        User.find_each do |user|
          user.update_column(:jti, SecureRandom.uuid)
        end
      end
    end
    change_column_null :users, :jti, false
    add_index :users, :jti, unique: true
  end
end
