Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "homepages#home"

 #  # dynamic static pages
 # get '*template_path' => 'pages#show'

 #  # dynamic articles
 #  resources :articles, except: [:show]

 #  # loop through all pages and generate a route for them..
 #  Article.all.each do |p|
 #    # show article
 #    get '/articles/' << p.slug, to: 'articles#show', defaults: {id:p.id}
 #    # edit article
 #    get '/articles/' << p.slug << '/edit', to: 'articles#edit', defaults: {id:p.id}
 #  end


 #  # api
 #  namespace :api do
 #    resources :articles, only: [:update, :create]

 #    #media
 #    namespace :media do
 #      resources :images, only: [:delete, :show, :create]
 #    end
 #  end

end
