class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.string :title, null: false
      t.string :slug, null: false, unique: true
      t.string :subtitle
      t.text :description
      t.text :body
      t.integer :author_id
      t.integer :parent_id
      t.timestamps
    end
  end
end
