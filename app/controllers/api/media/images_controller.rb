
class Api::Media::ImagesController < Api::ApiController
  require 'base64'

  def create
    data = params[:image]
    # filename
    data_parts = data.match(/\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m) || []
    extension = MIME::Types[data_parts[1]].first.preferred_extension
    filename = SecureRandom.uuid() << ".#{extension}"

    data_index = data.index('base64') + 7
    filedata = data.slice(data_index, data.length)
    decoded_image = Base64.decode64(filedata)

    # write the file
    file = File.new("public/uploads/#{filename}", "wb")
    file.write(decoded_image)
    
    # return path
    render json: "/uploads/#{filename}"
  end


  def show
  end

  
  def update 

  end



  def delete
  end


end
