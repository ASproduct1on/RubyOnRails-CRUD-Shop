class FallbackController < ActionController::Base
  skip_before_action :verify_authenticity_token
  
  def index
    render file: Rails.public_path.join('index.html')
  end
end