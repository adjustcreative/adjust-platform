class AddColorFieldsToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :color1, :string
    add_column :pages, :color2, :string
  end
end
