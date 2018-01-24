Rails.application.routes.draw do
  root to: 'app#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :destroy, :update]
    end
  end
end
