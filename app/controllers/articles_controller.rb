
class ArticlesController < ApplicationController


  def index
    @articles = Article.all
  end

  def show
    @article = Article.find( params[:id] )
  end
  

  def new
    @article = Article.new
  end
  
  
  def create
    @article = Article.new( pages_params )
    if @article.save
      flash[:notice] = "Article has been saved."
      # reload the routes..
      Rails.application.reload_routes!
      # redirect back to list..
      redirect_to edit_page_path @article
    else
      flash[:error] = "Problem saving page."
      render :new
    end
  end


  def edit
    @article = Article.find( params[:id] )
  end

  
  def update 
    if @article.save
      flash[:notice] = "Article has been updated."
      redirect_to page_path @article
    else
      flash[:error] = "Problem updating page."
      render :new
    end
  end

  

  private

    def pages_params
      params.require(:page).permit(
        :title,
        :slug,
        :subtitle,
        :description,
        :body,
        :parent_id
      )
    end

end
