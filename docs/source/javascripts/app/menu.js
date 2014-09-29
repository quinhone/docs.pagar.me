(function($) {
	$(document).ready(function() {
		var menu = $('.tocify-wrapper');
		var state = 'static';
		var menuPosition = menu.offset().top;

		$(window).on('scroll', function(e) {
			var scrollTop = $(this).scrollTop();

			if (scrollTop > menuPosition) {
				menu.css({
					position: 'fixed',
					top: 0
				});
			} else {
				menu.css({
					position: 'static'
				});
			}
		});
	});
}(jQuery));
