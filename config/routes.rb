# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"

  get "*path", to: "home#index", via: :all

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index create]
    end
  end
end
