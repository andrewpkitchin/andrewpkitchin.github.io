source "https://rubygems.org"

# Jekyll and its dependencies
gem "jekyll", "~> 4.3.0"

# Theme and plugins
gem "jekyll-theme-minimal"
gem "jekyll-feed"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
gem "bundler", "~> 2.3"