
class PagesController < ApplicationController


  def index
    @pages = Page.all
  end

  def show
    @page = Page.find( params[:id] )
  end
  


  def new
    @page = Page.new
  end
  
  
  def create
    @page = Page.new( pages_params )
    if @page.save
      flash[:notice] = "Page has been saved."
      # reload the routes..
      Rails.application.reload_routes!
      # redirect back to list..
      redirect_to edit_page_path @page
    else
      flash[:error] = "Problem saving page."
      render :new
    end
  end



  def edit
    @page = Page.find( params[:id] )
  end
  
  def update 
    if @page.save
      flash[:notice] = "Page has been updated."
      redirect_to page_path @page
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
