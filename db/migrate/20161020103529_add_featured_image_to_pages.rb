class AddFeaturedImageToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :featured_image, :string
  end
end
