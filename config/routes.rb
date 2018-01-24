Rails.application.routes.draw do
  root to: 'app#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :create, :destroy, :update]
    end
  end
end
