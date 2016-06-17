
$(document).ready(function(){

	'use strict';

  	// console.log('ready');

  	var utilSetup = function(){

  		var $dateInput = $('input#cdDate');

  			$dateInput.datepicker();


  		var $goCountdown = $('button#goCountdown');

  			$goCountdown.on('click', countdownSetup.bind( $goCountdown ) );


  	}

  	var stringToDate = function( dateString ){

  		var utcStr = Date.parse( dateString );

  		var changeDate = new Date ( utcStr )

  		return changeDate;

  	}

  	var countdownSetup = function ( $button ){

		var sessionDate = sessionStorage['date'];

		var changeDate = '';

		var title = '';

		if ( ! sessionDate ) {

			var changeDate = new Date('October 8 2016');
				changeDate.setUTCHours(20);

			var title = 'Best Day';

		}

		if ( $button ){

			console.log('hey');

			event.stopPropagation();

			changeDate = stringToDate( $( 'input#cdDate' ).val() );

			var title = $('input#cdTitle').val();

		}

		var dateUTCstr = changeDate.toUTCString();

		var headerEl = $('h2#header');

		headerEl.html( title + ' ' + 'Count Down' );

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

	utilSetup();

	countdownSetup();

	updateCountdown();
});