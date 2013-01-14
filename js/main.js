var RN = RN || {};

RN = (function () {

	var settings = {
		gInd : 0,
		bInd : 0
	};

	function init(){

		var s = settings;

		// Get data from JSON and add to settings
		$.getJSON('js/names.json', function (data) {

			s.girls = data.girls;
			s.boys = data.boys;

			shuffle(s.girls);
			shuffle(s.boys);

			loadNames();
		});

		$('#more-names').on('click', function (e) {
			e.preventDefault();
			_gaq.push(['_trackPageview', '/more-names']);
			loadNames();
		});

	}

	function loadNames() {
		var s = settings;

		// Update HTML
		var suggestions = $('#suggestions'),
			bHTML = suggestions.find('.boys-name span'),
			gHTML = suggestions.find('.girls-name span');

		bHTML.fadeOut(250, function(){
			bHTML.html(s.boys[s.bInd]).fadeIn();
		});
		gHTML.fadeOut(250, function(){
			gHTML.html(s.girls[s.gInd]).fadeIn();
		});

		s.bInd = s.bInd === s.boys.length-1 ? 0 : s.bInd+1;
		s.gInd = s.gInd === s.girls.length-1 ? 0 : s.gInd+1;
	}

	/**
	 * Shuffles an array in place.
	 */
    function shuffle(array) {
			var len = array.length;
			for ( var i=0; i<len; i++ ) {
				var rand = randomInt(0,len-1);
				var temp = array[i];
				array[i] = array[rand];
				array[rand] = temp;
			}
	}

	/**
	 * Returns a random integer within an arbitrary range.
	 */
	function randomInt(min,max) {
        return Math.floor(Math.random()*(max-min+1))+min;
    }

	return {
		init: init
	};

})();

$(document).ready(function () {
	RN.init();
});
