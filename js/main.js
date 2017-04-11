;
(function(){
	'use strict';

	var options1 = {
		multipleDate : true,
        showCurrentDateButton: false,
        preDates: ['2017-3-1','2017-3-15','2017-3-14'],//yyyy-mm-dd
        preDatesClickable: true,
        showCurrentDateButton: true,
        activation: 'alwaysOn',
        singleCalendarMode: true,
        showCurrentDate: true,
        callback: function(date){
            console.log(date);
        },
        format: 'DD/MM/YYYY',	
        setWeekHoliday: false,
        holiday: 'saturday',
        preDatesOnlyClickable: false
        
		//minDate: '1/3/2017', // dd/mm/yyyy
        //maxDate: '3/3/2017',
        //animation: 'flipInY',
	}
    var options2 = {
		multipleDate : true,
		minDate: '1/3/2017', // dd/mm/yyyy
		maxDate: '14/3/2017',
//		animation: 'flipInY',
        activation: 'onClick',
//		format: 'D MMMM, YYYY'	
        showCurrentDateButton: false,
        singleCalendarMode: false,
        disableClickEvent : false,
        format: 'D MMMM, YYYY'	
	}

	$('.date').datePicky(options1);
	$('#date1').datePicky(options2);
})();
