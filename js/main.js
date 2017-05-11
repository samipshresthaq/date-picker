;
(function(){
	'use strict';

	var options1 = {
		multipleDate : false,
        preDates: ['2017-03-01','2017-03-30','2017-03-14'],//yyyy-mm-dd
        showCurrentDateButton: true,
        activation: 'alwaysOn',
        singleCalendarMode: false,
        showCurrentDate: true,
        
        callback: function(date, activedates){
            console.log(date);
                        console.log(activedates);

        },
        setWeekHoliday: true,
        holiday: 'saturday',
        disableClickToggle: true,
        customStartViewMonth: 4,
        customStartViewYear: 2017
        
        
        //animation: 'flipInY',
	}
    var options2 = {
		multipleDate : false,
		minDate: '2017-3-18', // yyyy-mm-dd
		maxDate: '2017-5-20', // yyyy-mm-dd
//		animation: 'flipInY',
        activation: 'onClick',
//		format: 'D MMMM, YYYY'	
        showCurrentDateButton: false,
        singleCalendarMode: false,
        disableClickEvent : false,
//        disableClickToggle: true

//        format: 'D MMMM, YYYY'	
	}

	$('#input-date').datePicky(options2);
	$('.div-date').datePicky(options1);
})();
