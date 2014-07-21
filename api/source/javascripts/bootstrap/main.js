$(document).ready(function() {
  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});

  jQuery('#accordion .panel-heading').on('click', function () {   
	jQuery('#accordion *').removeClass('active');
	$(this).addClass('active');
  });
});



