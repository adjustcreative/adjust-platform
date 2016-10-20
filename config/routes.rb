Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "homepages#home"

  # dynamic pages
  resources :pages, except: [:show]

  # loop through all pages and generate a route for them..
  Page.all.each do |p|
    # show page
    get '/' << p.slug, to: 'pages#show', defaults: {id:p.id}
    # edit page
    get '/' << p.slug << '/edit', to: 'pages#edit', defaults: {id:p.id}
  end


  # api
  namespace :api do
    resources :pages, only: [:update, :create]

    #media
    namespace :media do
      resources :images, only: [:delete, :show, :create]
    end
  end

end
