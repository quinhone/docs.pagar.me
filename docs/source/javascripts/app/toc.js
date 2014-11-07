(function (global) {

	var closeToc = function() {
		$(".tocify-wrapper").removeClass('open');
		$("#nav-button").removeClass('open');
	};

	var makeToc = function() {
		var $toc = $('<div id="toc"></div>');
		var pathname = window.location.pathname;

		if (pathname.length > 1 && pathname.charAt(pathname.length-1) == '/') {
			pathname = pathname.substr(0, pathname.length-1);
		}

		// $('a[href~="' + pathname.substr(pathname.lastIndexOf('/')+1) + '"]').addClass('active').after($toc);
		$('a[href~="' + pathname + '"]').addClass('active').after($toc);

		global.toc = $toc.tocify({
			selectors: 'h2',
			extendPage: false,
			theme: 'none',
			smoothScroll: false,
			showEffectSpeed: 0,
			hideEffectSpeed: 180,
			ignoreSelector: '.toc-ignore',
			highlightOffset: 60,
			scrollTo: -1,
			scrollHistory: true,
			hashGenerator: function (text, element) {
				return element.prop('id');
			}
		}).data('toc-tocify');

		$("#nav-button").click(function() {
			$(".tocify-wrapper").toggleClass('open');
			$("#nav-button").toggleClass('open');
			return false;
		});

		$(".page-wrapper").click(closeToc);
		$(".tocify-item").click(closeToc);
	};

	// Hack to make already open sections to start opened,
	// instead of displaying an ugly animation
	function animate () {
		setTimeout(function() {
			toc.setOption('showEffectSpeed', 180);
		}, 50);
	}

	$(makeToc);
	$(animate);

})(window);

