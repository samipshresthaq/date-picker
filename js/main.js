;
(function(){
	'use strict';

	var options1 = {
		multipleDate : false,
        showCurrentDateButton: false,
        preDates: ['2017-03-01','2017-03-30','2017-03-14'],//yyyy-mm-dd
        showCurrentDateButton: true,
        activation: 'alwaysOn',
        singleCalendarMode: false,
        showCurrentDate: true,
        callback: function(date){
            console.log(date);
        },
//        format: 'DD/MM/YYYY',	
        setWeekHoliday: false,
        holiday: 'saturday',
        disableClickToggle: true
        
		//minDate: '1/3/2017', // dd/mm/yyyy
        //maxDate: '3/3/2017',
        //animation: 'flipInY',
	}
    var options2 = {
		multipleDate : false,
		minDate: '1/3/2017', // dd/mm/yyyy
		maxDate: '14/3/2017',
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
