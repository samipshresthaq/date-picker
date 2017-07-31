;
(function() {
    'use strict';
    var options1 = {
        multipleDate: true,
        minDate: "2017-06-19",
        preDates: ['2017-06-18', '2017-06-1', '2017-06-19', '2017-06-20'], //yyyy-mm-dd
        //        showPreDates: false,
        showCurrentDateButton: true,
        activation: 'alwaysOn',
        singleCalendarMode: false,
        showCurrentDate: true,
        callback: function(date, activedates) {
            console.log(date);
            console.log(activedates);
        },
        setWeekHoliday: true,
        holiday: 'saturday',
        disableClickToggle: false
            //        , defaultViewMonth: 10
            //        , defaultViewYear: 2016
            //animation: 'flipInY',
    }
    var options2 = {
        multipleDate: false,
        minDate: '2017-3-18', // yyyy-mm-dd
        //maxDate: '2017-5-20', // yyyy-mm-dd
        // animation: 'flipInY',
        activation: 'onClick', // format: 'D MMMM, YYYY'	
        showCurrentDateButton: false,
        singleCalendarMode: false,
        disableClickEvent: false, // disableClickToggle: true
        // format: 'D MMMM, YYYY'	
    }
    $('#input-date').datePicky(options2);
    $('.div-date').datePicky(options1);
})();