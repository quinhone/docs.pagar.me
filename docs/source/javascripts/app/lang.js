/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function (global) {
	var lang = 'shell';
	var scriptBlocks = [];

	var activateLang = function(lang) {
		$.each(scriptBlocks, function(i, scriptBlockObj) {
			if (scriptBlockObj.codeBlocks.length <= 1) {
				return;
			}

			$.each(scriptBlockObj.codeBlocks, function(i, codeBlock) {
				if (!codeBlock.hasClass(lang)) {
					codeBlock.hide();
				} else {
					codeBlock.show();
				}
			});

			$('.code-selector .active').removeClass('active');
			$('.code-selector [data-lang="' + lang + '"]').addClass('active');
		});
	};

	var createBlockLinks = function(langs) {
		var $links = $('<ul></ul>', {
			class: 'code-selector'
		});

		$.each(langs, function(i, lang) {
			var $linkLi = $('<li></li>');
			var $link = $('<a></a>', {
				attr: {
					href: '#' + lang,
					'data-lang': lang
				},
				text: lang
			});

			$linkLi.append($link);
			$links.append($linkLi);
		});

		return $links;
	};

	$(function() {
		var $leadingCodeBlocks = $(':not(pre) + pre');

		$leadingCodeBlocks.each(function() {
			var $current = $(this);
			var $next = $current.next();
			var codeBlocksInGroup = [$current];

			while ($next.length && $next.prop('tagName').toLowerCase() == 'pre') {
				codeBlocksInGroup.push($next);
				$next = $next.next();
			}

			// Add links on top of each group
			if (codeBlocksInGroup.length > 1) {
				var langs = [];

				$.each(codeBlocksInGroup, function(i, $codeBlock) {
					var classes = $codeBlock.attr('class').split(/\s/);

					$.each(classes, function(i, objClass) {
						if (objClass !== 'highlight') {
							langs.push(objClass);
						}
					});
				});

				var $links = createBlockLinks(langs);
				codeBlocksInGroup[0].before($links);
			}

			scriptBlocks.push({
				codeBlocks: codeBlocksInGroup,
			});
		});

		activateLang(lang);

		$('.page-wrapper').on('click', '.code-selector a', function(e) {
			e.preventDefault();
			
			activateLang($(this).data('lang'));
		});
	});
})(window);
