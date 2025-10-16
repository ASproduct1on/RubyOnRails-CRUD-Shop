puts "🧹 Cleaning database..."
OrderDescription.destroy_all
Order.destroy_all
Item.destroy_all
User.destroy_all

puts "👤 Creating users..."

admin = User.create!(
  email: 'admin@shop.com',
  password: 'admin123',
  password_confirmation: 'admin123',
  first_name: 'Admin',
  last_name: 'User',
  role: 'admin'
)
puts "✅ Admin created: #{admin.email}"

user = User.create!(
  email: 'user@shop.com',
  password: 'user123',
  password_confirmation: 'user123',
  first_name: 'John',
  last_name: 'Doe',
  role: 'user'
)
puts "✅ User created: #{user.email}"

puts "\n📦 Creating items..."

items = [
  { name: 'iPhone 17 Pro', description: 'Latest iPhone model with A17 chip', price: 999.99, image_url: 'https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/81/8128285/iPhone_17_Pro_Cosmic_Orange_PDP_Image_Position_1__pl-PL.jpg?w=400'},
  { name: 'MacBook Pro M3', description: '14-inch laptop with M3 chip', price: 1999.99, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { name: 'AirPods Pro', description: 'Wireless earbuds with noise cancellation', price: 249.99, image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400' },
  { name: 'Xiaomi 17 PRO', description: 'rofl', price: 1000, image_url: 'https://e-katalog.pl/jpg/2969968.jpg?w=400' },
  { name: 'iPhone 17 Pro', description: 'Latest iPhone model with A17 chip', price: 999.99, image_url: 'https://prod-api.mediaexpert.pl/api/images/gallery/thumbnails/images/81/8128285/iPhone_17_Pro_Cosmic_Orange_PDP_Image_Position_1__pl-PL.jpg?w=400'},
  { name: 'MacBook Pro M3', description: '14-inch laptop with M3 chip', price: 1999.99, image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { name: 'AirPods Pro', description: 'Wireless earbuds with noise cancellation', price: 249.99, image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400' },
  { name: 'Xiaomi 17 PRO', description: 'rofl', price: 1000, image_url: 'https://e-katalog.pl/jpg/2969968.jpg?w=400' },
]

items.each do |item_data|
  item = Item.create!(item_data)
  puts "✅ Item created: #{item.name} - $#{item.price}"
end

puts "\n🎉 Seeds completed!"
puts "📊 Total items: #{Item.count}"
puts "👥 Total users: #{User.count}"