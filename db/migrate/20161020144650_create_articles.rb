class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|

      t.string :slug, null: false, unique: true
      t.string :title, null: false
      t.string :subtitle

      t.text :description
      t.text :body

      t.string :featured_imag
      t.string :color1
      t.string :color2

      t.integer :author_id
      t.integer :parent_id
      t.timestamps

    end
  end
end
