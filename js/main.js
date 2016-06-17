
$(document).ready(function(){

	'use strict';

  	// console.log('ready');

  	var countdownSetup = function (){

		var sessionDate = sessionStorage['date'];

		if ( sessionDate ){ 

			var dateObj = sessionDate;

		}

		else {

			var weddingDate = new Date('October 8 2016');
				weddingDate.setUTCHours(20);

			var dateUTCstr = weddingDate.toGMTString();

		}

		var title = 'Best Day';

		var headerEl = $('h2#header');

		headerEl.html( title + ' ' + headerEl.html() );

		sessionStorage.setItem( 'countdownDate', dateUTCstr );

  	}

	var countdown = function (){

		var countdownDate = new Date ( Date.parse ( sessionStorage.countdownDate ) )

		var date = new Date();

		var countdownObj = {
			'Months': { 'value': countdownDate.getMonth() - date.getMonth(),
						'totalCount': 12
					},
			'Days': { 'value': countdownDate.getDate() - date.getDate(),
						'totalCount': 31
					},
			'Hours': { 'value': countdownDate.getHours() - date.getHours(),
						'totalCount': 24
					},
			'Minutes': { 'value': countdownDate.getMinutes() - date.getMinutes(),
						'totalCount': 60
					},
			'Seconds': { 'value': countdownDate.getSeconds() - date.getSeconds(),
						'totalCount': 60
					},

		}

		if ( date.getMonth() === ( 5 || 8 ) ){

			countdownObj[ 'Days' ].totalCount = 30;
		}

		for ( var key in countdownObj ) { 

			var value = countdownObj[key].value; 

			if ( value < 0 ){ 

				countdownObj[prevkey].value = countdownObj[prevkey].value-1; 

				countdownObj[key].value = countdownObj[key].totalCount + countdownObj[key].value;

			} 

			var prevkey = key;
		}

		return countdownObj;
		
	};

	var updateCountdown = function (){

		var currentCount = countdown();

		var countdownText = '<h5 class="countdown"> <span class="countdown">' + 
							currentCount.Months.value + '</span> Months <span class="countdown">' +
							currentCount.Days.value + '</span> Days <span class="countdown">' +
							currentCount.Hours.value + '</span> Hours <span class="countdown">' + 
							currentCount.Minutes.value + '</span> Minutes <span class="countdown">' + 
							currentCount.Seconds.value + '</span> Seconds </h5>';

		$('div#countdown').html(countdownText);

		timeToUpdateCountdown();

	};

	var timeoutID;

	function timeToUpdateCountdown() {

	  timeoutID = window.setTimeout( updateCountdown , 500 );
	}

	countdownSetup();

	updateCountdown();
});