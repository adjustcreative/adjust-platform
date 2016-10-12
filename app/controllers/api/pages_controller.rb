
class Api::PagesController < Api::ApiController

  
  def update 

    # binding.pry
    
    @page = Page.find( params[:id] )

    @page.title = params[:title]
    @page.subtitle = params[:subtitle]
    @page.body = params[:body]

    # binding.pry

    if @page.save
      render json: "SUCCESS: Page Updated."
      # binding.pry
      
    else
      render json: "ERROR: Page not updated."
    end
  end

  def delete
  end


end
