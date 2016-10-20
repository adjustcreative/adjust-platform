class FixTypoInArticlesFeaturedImage < ActiveRecord::Migration[5.0]
  def change
    rename_column :articles, :featured_imag, :featured_image
  end
end
