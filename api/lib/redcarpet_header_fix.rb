require "i18n"

module RedcarpetHeaderFix
  def header(text, level)
		re = /<("[^"]*"|'[^']*'|[^'">])*>/

    "<h#{level} id='#{I18n.transliterate(text.gsub(re, "")).downcase.parameterize}'>#{text}</h1>"
  end
end

require 'middleman-core/renderers/redcarpet'
Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, RedcarpetHeaderFix

