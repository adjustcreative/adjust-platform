source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'

gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
# gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem "responders" # needed for rails 5 respond_to
gem 'medium-editor-rails'
gem 'rangy-rails'
gem 'react-rails', '~> 1.6.0'
gem 'font-awesome-rails'
gem "autoprefixer-rails"
gem 'recaptcha', require: 'recaptcha/rails'
gem 'haml-rails'
gem 'time_difference'
gem 'simple_form'
gem 'kaminari'
gem 'gibbon'

gem "aws-sdk"

gem 'carrierwave'
gem 'carrierwave-base64'
# gem 'gmaps4rails'
# gem 'rename'


group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'annotate'
  # gem 'quiet_assets'
  gem 'rails-audit'
  gem 'pry'
end


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri

  gem 'sqlite3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]


group :production do
  gem 'pg'


end

ruby "2.3.1"
