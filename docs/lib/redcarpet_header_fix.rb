module RedcarpetHeaderFix
  def header(text, level, id)
    clean_id = id.gsub(/[\.]/, '-').gsub(/[^a-zA-Z0-9\-_]/, '')

	/{#(.*)}/.match text do |m|
	  text.gsub! m[0], ''
	  clean_id = m[1]
	end

    "<h#{level} id='#{clean_id}'>#{text}</h1>"
  end

  def self.included base
	base.class_eval do
	  def link(link, title, content)
		middleman_app.relative_link_to(content, link)
	  end
	end
  end
end

require 'middleman-core/renderers/redcarpet'
Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, RedcarpetHeaderFix
