
class PagesController < ApplicationController

  def show
    @path = params[:template_path]
    render file: File.join(Rails.root, 'app/views/pages', @path)
  end

end
