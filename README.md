# date-picky
date-picky is a date picker with great graphics

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
			minDate: '8/10/2015',
			maxDate: '8/3/2016',
			format : 'mm-dd-yy',
			animation: 'bounceIn',
			headingBackground: '#223922',//removed
			bodyBackground: '#796423',//removed
            activation: 'always-on',
            singleCalendarMode: true,
            showCurrentDate: false,
            preDates: ['2017/3/1','2017/3/15','2017/3/14'],//yyyy-mm-dd
            preDatesClickable: true
		}
		$('#yourSelector').datePicky(options);
	
	The different types of feature are:
	
	- _Multiple Date_  
		If set to true you can select multiple date from date picker.
	
	- _Minimum Date_ 
		If defined the date older than the minimum dates are disabled.
	
	- _Maximum Date_ 
		If defined the date later than the maximum dates are disabled.
	
	- _Date formats_
		You can get different types of date format by passing the argument format. 
		The different types of available date format are:
			1. DD/MM/YYYY (08/12/2014) 
			2. MM/DD/YYYY (08/24/2019) 
			3. DD-MM-YYYY (08-12-2014) 
			4. MM-DD-YYYY (08-24-2019) 
			5. YYYY-MM-DD (2014-12-15)
			6. D MMM, YYYY  (8 Feb, 2016)
			7. D MMMM, YYYY (8 February, 2016)
	
	- _Animation_ 
		There are two animations available for selection
			1. __bounceIn__
			2. __flipInY__
	
	- _Heading Background color_
		You can change the heading background color of datepicker by passing the option. 
		__headingBackground : your color code__
	
	- _Body Background color_ (currently removed)
		You can change the body background color of datepicker by passing the option.
        (removed current) 
		__bodyBackground : your color code__
        
    - _Activation Option_
        You can set datepicky activation mode. Set always-on for always showing datepicker and onClick mode for datepicker activation on click.
        __activation : alwaysOn__
    
    - _Single Calendar Mode_
        You can set single calendar mode by sending true option. Default is multiple calendar mode.
            1. __singleCalendarMode : true__
            
    - _Show Current Date_
        You can hide current date by setting it to false. By default current date is shown.
            1. __showCurrentDate: false__
    
    - _Pre Dates_
        You can set pre activated dates by sending in the options. Pre dates must be sent in array in yyyy-mm-dd format.
            1. __preDates: ['2017/3/1','2017/3/15','2017/3/14']__
            
    - _Pre Dates Disable_
        You can disable click on pre activated dates by setting it to false. By default its disabled.
            1. __preDatesClickable: true__
    
    - Go to current date button
        You can enable "Go to current date" button by providing parameter as
        __showCurrentDateButton = true__

 setWeekHoliday: false,
                holiday: 'sunday'
#Demo

You can see demo here
[Demo Page] (https://samipshresthaq.github.io/date-picker/)
