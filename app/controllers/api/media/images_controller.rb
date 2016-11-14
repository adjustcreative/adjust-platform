
class Api::Media::ImagesController < Api::ApiController
  require 'base64'

  def create
    # puts "add image"
    # image blob
    data = params[:image]
    # filename
    data_parts = data.match(/\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m) || []
    extension = MIME::Types[data_parts[1]].first.preferred_extension
    filename = SecureRandom.uuid() << ".#{extension}"
    # blob to file conversion
    data_index = data.index('base64') + 7
    filedata = data.slice(data_index, data.length)
    decoded_image = Base64.decode64(filedata)

    # connect to s3
    s3 = Aws::S3::Resource.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_KEY'],
      secret_access_key: ENV['AWS_SECRET']
    )
    # bucket name
    bucket_name = ENV['AWS_BUCKET']
    # s3 bucket name
    bucket = s3.bucket( bucket_name )
    # the response with a public read true
    response = s3.bucket( bucket_name ).object( filename ).put(body:decoded_image, acl: 'public-read')
    # the public url of the object.
    url = s3.bucket( bucket_name ).object( filename ).public_url

    # respond with the image location on s3.
    render json: url
  end


  def show
  end

  
  def update 

  end



  def delete
  end


end
