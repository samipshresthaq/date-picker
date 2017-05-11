# date-picky
date-picky is a date picker with multiple features

#USAGE

	1. Just include date-picker.css, fonts.css, animation.css and date-pick.js to your HTML
	2. Copy fonts folder to your project for custom fonts
	3. Copy images folder to your project
	4. Call datePick with your desired element selector
		eg: $('#yourSelector').datePicky();
	5. And its ready to use

#FEATURES
	
	You can use different features of date picker by sending an object to date picker as argument. eg:
		 var options = {
			multipleDate : true,
			minDate: '2017-03-18',
			maxDate: '2017-05-28',
			format : 'mm-dd-yy',
			animation: 'bounceIn',
            activation: 'alwaysOn',
            singleCalendarMode: true,
            showCurrentDate: false,
            showCurrentDateButton: false,
            preDates: ['2017/3/1','2017/3/15','2017/3/14'],//yyyy-mm-dd
            setWeekHoliday: false,
            holiday: 'saturday',
            disableClickEvent : false,
            disableClickToggle: true,
            callback: function(date){
                console.log(date);
            },
            
			headingBackground: '#223922',//removed
			bodyBackground: '#796423'//removed
		};
        
		$('#yourSelector').datePicky(options);
	
	The different types of feature are:
	
	- _Multiple Date_  
		If set true you can select multiple date from date picker. By default it is enabled. 
            eg. __multipleDate : true__
	
	- _Minimum Date_ 
		If set, the date older than the minimum dates are disabled.
            eg. __minDate: '2017-03-18'__ (Format yyy-mm-dd )
	
	- _Maximum Date_ 
		If set, the date later than the maximum dates are disabled.
            eg. __maxDate: '2017-05-28'__ (Format yyy-mm-dd )
	
	- _Date formats_
		You can display different date formats by passing the format option. 
		The available date formats are:
			1. DD/MM/YYYY (08/12/2014) 
			2. MM/DD/YYYY (08/24/2019) 
			3. DD-MM-YYYY (08-12-2014) 
			4. MM-DD-YYYY (08-24-2019) 
			5. YYYY-MM-DD (2014-12-15)
			6. D MMM, YYYY  (8 Feb, 2016)
			7. D MMMM, YYYY (8 February, 2016)
	
	- _Animation_ 
		There are two animations available for datepicker from animate.css
			1. __bounceIn__
			2. __flipInY__
	
	- _Heading Background color_ (currently removed)
		You can change the heading background color of datepicker by passing the option. 
		  eg. __headingBackground : your color code__
	
	- _Body Background color_ (currently removed)
		You can change the body background color of datepicker by passing the option.
        (removed current) 
		  eg. __bodyBackground : your color code__
        
    - _Activation Option_
        You can set date picker activation mode. Set alwaysOn(default) for always showing datepicker and o
        nClick mode for datepicker activation on click. eg
            1. __activation : alwaysOn__
            2. __activation : onClick__
    
    - _Single Calendar Mode_
        If set to true you can select dates for current month only. If set false you can traverse 
        throught all months. By default it is disabled. 
            eg. __singleCalendarMode : true__
            
    - _Show Current Date_
        You can dhide current date by setting showCurrentDate to false. By default current date is shown.
            eg. __showCurrentDate: false__
    
    - _Go to current date button_
        You can disable "Go to current date" button by providing parameter as. By default its enabled.
            eg. __showCurrentDateButton = false__
    
    - _Pre Dates_
        You can set pre activated dates by sending in preDates options. Pre dates must be sent in array 
        in yyyy-mm-dd format.
            eg. __preDates: ['2017-3-1','2017-3-15','2017-3-14']__
            
    - _Disable all click events_
        If set to true all click events are disabled. By default it is disabled.
            eg. __disableClickEvent : false__
    
    - _Set red color for weekend holiday_
        If set to true weekend day is highlighted red. By default it is disabled.
            eg. __setWeekHoliday: true__
            
    - _Set the weekend holiday_
        By default weekend holiday is sunday. If set to saturday, saturday is highlighted red.
        eg.
            1. __holiday: 'sunday'__
            2. __holiday: 'saturday'__
            
    - _Callback Function_
        Use callback function to trigger function when clicked on any date. Callback function returns two 
        values i.e clicked date and array of active dates.
        Usage example:
            callback: function(date, activedates){
                console.log(date);
                console.log(activedates);
            }
            
    - _Display Month_
        Month to display when datepicker is invoked. Usage example:
            customStartViewMonth: 4
            
    - _Display Year_
        Year to display when datepicker is invoked. Usage example:
            customStartViewYear: 2017
    
#Demo

You can see demo here
[Demo Page] (https://samipshresthaq.github.io/date-picker/)
