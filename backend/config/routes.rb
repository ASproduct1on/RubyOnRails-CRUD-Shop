Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
       devise_for :users,
                 path: 'auth',
                 path_names: {
                   sign_in: 'login',
                   sign_out: 'logout',
                   registration: 'signup'
                 },
                controllers: {
                  sessions: 'api/v1/auth/sessions',  
                  registrations: 'api/v1/auth/registrations'
                }


      # Items routes
      resources :items, only: [:index, :show, :create, :update, :destroy]

      # Orders routes
      resources :orders, only: [:index, :show, :create]

      # Profile routes
      resource :profile, only: [:show, :update], controller: 'profile'

      # Admin routes
      namespace :admin do
        resources :users, only: [:index, :show, :update, :destroy]
      end
    end
  end

  get '*path', to: 'fallback#index', constraints: ->(req) do

    !req.xhr? && 
    req.format.html? && 
    !req.path.start_with?('/api', '/rails')

    end
  
  root 'fallback#index'
end
