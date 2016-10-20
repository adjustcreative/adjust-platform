
class Api::ArticlesController < Api::ApiController

  
  def create
    @article = Article.new
    @article.title = params[:title]
    @article.subtitle = params[:subtitle]
    @article.body = params[:body]

    @article.slug = params[:title].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

    if @article.save
      flash[:notice] = "Page has been saved."
      # reload the routes..
      Rails.application.reload_routes!
      # redirect back to list..
      redirect_to "/" << @article.slug << "/edit"
    else
      flash[:error] = "Problem saving page."
      render :new
    end
  end


  
  def update 
    @article = Article.find( params[:id] )
    
    @article.title = params[:title]
    @article.subtitle = params[:subtitle]
    @article.featured_image = params[:featured_image]
    @article.color1 = params[:color1]
    @article.color2 = params[:color2]

    @article.body = params[:body]
    if @article.save
      render json: "SUCCESS: Page Updated."  
    else
      render json: "ERROR: Page not updated."
    end
  end

  def delete
  end


end
