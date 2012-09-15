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

		// Get random names from settings list
		var bRand = getRandomName(s.boys, s.bInd);
			gRand = getRandomName(s.girls, s.gInd);

		// Update HTML
		var suggestions = $('#suggestions'),
			bHTML = suggestions.find('.boys-name span'),
			gHTML = suggestions.find('.girls-name span');

		bHTML.fadeOut(250, function(){
			bHTML.html(s.boys[bRand]).fadeIn();
		});
		gHTML.fadeOut(250, function(){
			gHTML.html(s.girls[gRand]).fadeIn();
		});

		s.bInd = bRand;
		s.gInd = gRand;
	}

	function getRandomName(nameArray, currentInd) {
		var s = settings,
			rnd = Math.floor((Math.random()*nameArray.length-1)+1);

		if (rnd !== currentInd) {
			return rnd;
		}
		else {
			return getRandomName(nameArray, currentInd);
		}

	}

	return {
		init: init
	}

})();

$(document).ready(function () {
	RN.init();
});
