
class Api::PagesController < Api::ApiController

  
  def create
    @page = Page.new
    @page.title = params[:title]
    @page.subtitle = params[:subtitle]
    @page.body = params[:body]

    @page.slug = params[:title].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

    if @page.save
      flash[:notice] = "Page has been saved."
      # reload the routes..
      Rails.application.reload_routes!
      # redirect back to list..
      redirect_to "/" << @page.slug << "/edit"
    else
      flash[:error] = "Problem saving page."
      render :new
    end
  end


  
  def update 
    @page = Page.find( params[:id] )
    
    @page.title = params[:title]
    @page.subtitle = params[:subtitle]
    @page.featured_image = params[:featured_image]
    @page.color1 = params[:color1]
    @page.color2 = params[:color2]

    @page.body = params[:body]
    if @page.save
      render json: "SUCCESS: Page Updated."  
    else
      render json: "ERROR: Page not updated."
    end
  end

  def delete
  end


end
