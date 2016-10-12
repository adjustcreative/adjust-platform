Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#index"


  # dynamic pages
  resources :pages, except: [:show]

  Page.all.each do |p|
    # show page
    get '/' << p.slug, to: 'pages#show', defaults: {id:p.id}
    # edit page
    get '/' << p.slug << '/edit', to: 'pages#edit', defaults: {id:p.id}
  end

end
