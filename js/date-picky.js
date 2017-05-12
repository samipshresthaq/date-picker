/**
 * date-picky
 * @author Samip Shrestha <javasamip@gmail.com>
 * To support the developer please include this comment section
 */
;
(function ($) {
    'use strict';
    /**
     * [datePick is main function]
     * @param  {[object]} options [options send by user]
     * @return {[DOM element]}         [returns datePicker]
     */
    $.fn.datePicky = function (options) {
        let _this = this,
            defaultOption = {
                multipleDate: true,
                format: 'YYYY-MM-DD',
                animation: '', //headingBackground: '#797979',
//                bodyBackground: '#fff',
                showCurrentDate: true,
                activation: 'alwaysOn',
                singleCalendarMode: false,
                disableClickToggle: false,
                showCurrentDateButton: true,
                disableClickEvent: false,
                setWeekHoliday: false,
                holiday: 'sunday'
            },
            allOptions = Object.assign({},defaultOption, options),
            newDate = new Date(),
            currentYear = newDate.getFullYear(),
            currentMonth = newDate.getMonth(),
            activeDates = [],
            currentDate = newDate.getDate(), // Days name label in order
            daysLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Month name labels in order
            monthsLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], // Min Month name labels in order
            monthsLabelsMin = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            // Set the custom datepicker Year visible to user 
            if(options.defaultViewYear){
                currentYear = options.defaultViewYear;
            }    
        
            // Set the custom datepicker Month visible to user 
            if(options.defaultViewMonth){
                currentMonth = options.defaultViewMonth - 1;
            }
            /**
             * [daysInMonth calculates total days in a month]
             * @param  {[int]} month [month value]
             * @param  {[int]} year  [year valur]
             * @return {[int]}       [returns total days]
             */
            var daysInMonth = function (month, year) {
                return new Date(year, month, 0).getDate();
            },
            AppendDate = {
                /**
                 * [setTable sets table to be appended]
                 * @param {[DOM element]} $datePicker [datepicker element]
                 * @param {[DOM element]} _this       [calling element]
                 * @param {[object]} options     [all options]
                 */
                setTable: function ($datePicker, _this, options) {
                    var $table = $("<table/>", {
                            class: "datePicker-calendar"
                        }),
                        $tableOverlay = $("<div/>", {
                            class: "table-overlay"
                        });
                    $datePicker = AppendDate.setHeading($datePicker, _this, options);
                    $datePicker.append($table);
                    if (options.disableClickEvent) {
                        $table.append($tableOverlay);
                    }
                    $table = AppendDate.setDays($table, options.setWeekHoliday, options.holiday);
                    $table = AppendDate.setDates($table, _this, options);
                    if (!options.singleCalendarMode) {
                        if (options.showCurrentDateButton) {
                            $datePicker = AppendDate.setFooter($datePicker, _this, options);
                        }
                    }
                    return $datePicker;
                },
                /**
                 * [formatDate appends 0 in single integer number]
                 * @param  {[string]} data [integer value to be checked]
                 * @return {[string]}      [returns value with 0 prepended to single integers]
                 */
                formatDate: function (data) {
                    if (data >= 1 && data <= 9) {
                        data = '0' + data;
                    }
                    return (data);
                },
                formattedDate: function (x, y, z, estring) {
                    return (x + estring + y + estring + z);
                },
                /**
                 * [getDateFormat description]
                 * @param  {[DOM element]} that    [clicked date element]
                 * @param  {[object]} options [all options]
                 * @return {[string]}         [date in format]
                 */
                getDateFormat: function (dateToConvert, dateFormat) {
                    var finalFormat, fullDate = dateToConvert.split('-');
                    if (dateFormat === 'DD/MM/YYYY') {
                        finalFormat = AppendDate.formattedDate(fullDate[2], fullDate[1], fullDate[0], '/');
                    } else if (dateFormat === 'MM/DD/YYYY') {
                        finalFormat = AppendDate.formattedDate(fullDate[1], fullDate[2], fullDate[0], '/');
                    } else if (dateFormat === 'DD-MM-YYYY') {
                        finalFormat = AppendDate.formattedDate(fullDate[2], fullDate[1], fullDate[0], '-');
                    } else if (dateFormat === 'MM-DD-YYYY') {
                        finalFormat = AppendDate.formattedDate(fullDate[1], fullDate[2], fullDate[0], '-');
                    } else if (dateFormat === 'YYYY-MM-DD') {
                        finalFormat = AppendDate.formattedDate(fullDate[0], fullDate[1], fullDate[2], '-');
                    } else if (dateFormat === 'D MMM, YYYY') {
                        finalFormat = fullDate[2] + ' ' + monthsLabelsMin[parseInt(fullDate[1]) - 1] + ', ' + fullDate[0];
                    } else if (dateFormat === 'D MMMM, YYYY') {
                        finalFormat = fullDate[2] + ' ' + monthsLabels[parseInt(fullDate[1]) - 1] + ', ' + fullDate[0];
                    } else {
                        jQuery.error('The defined date format is not supported ' + dateFormat + ' .');
                    }
                    return finalFormat;
                },
                /**
                 * [setHeading sets month and year heading of date picker]
                 * @param {[DOM element]} $datePicker [datepicker element]
                 * @param {[DOM elemnt]} _this       [calling element]
                 * @param {[object]} options     [all options setting]
                 */
                setHeading: function ($datePicker, _this, options) {
                    var $headingWrapper = $("<div/>", {
                            class: "calendar-heading"
                        }),
                        $monthDiv = $("<div/>", {
                            class: "month-title"
                        }),
                        $nextDiv = $("<div/>", {
                            class: "next",
                            title: "Next Month"
                        }),
                        $prevDiv = $("<div/>", {
                            class: "prev",
                            title: "Previous Month"
                        });
                    $monthDiv.text(monthsLabels[currentMonth] + ' ' + currentYear);
                    // Setting Next and Prev buttons
                    if (!options.singleCalendarMode) {
                        $headingWrapper.append($prevDiv);
                        $headingWrapper.append($monthDiv);
                        $headingWrapper.append($nextDiv);
                        $monthDiv.css({
                            width: "calc(100% - 40px)",
                            float: "left"
                        });
                    } else {
                        $headingWrapper.append($monthDiv);
                    }
                    //            $headingWrapper.css({
                    //                background: options.headingBackground
                    //            })
                    $nextDiv.click(function (e) {
                        $datePicker.empty();
                        if (currentMonth >= 11) {
                            currentMonth = 0;
                            currentYear += 1;
                        } else {
                            currentMonth += 1;
                        }
                        $datePicker = AppendDate.setTable($datePicker, _this, options);
                    });
                    $prevDiv.click(function () {
                        $datePicker.empty();
                        if (currentMonth <= 0) {
                            currentMonth = 11;
                            currentYear -= 1;
                        } else {
                            currentMonth -= 1;
                        }
                        $datePicker = AppendDate.setTable($datePicker, _this, options);
                    });
                    return ($datePicker.append($headingWrapper));
                },
                /**
                 * [setFooter sets go to current date footer part]
                 * @param {[DOM element]} $datePicker [datepicker element]
                 * @param {[DOM elemnt]} _this       [calling element]
                 * @param {[object]} options     [all options setting]
                 * @return {[element]}         [element with go to current date button]
                 */
                setFooter: function ($datePicker, _this, options) {
                    var $footerWrapper = $("<div/>", {
                        class: "footer-wrapper"
                    });
                    $footerWrapper.text("Go to current date");
                    $footerWrapper.on('click', function () {
                        $datePicker.empty();
                        currentYear = newDate.getFullYear();
                        currentMonth = newDate.getMonth();
                        currentDate = newDate.getDate();
                        $datePicker = AppendDate.setTable($datePicker, _this, options);
                    });
                    return ($datePicker.append($footerWrapper));
                },
                /**
                 * [setValue returns value to calling element]
                 * @param {[DOM element]} _this   [calling element]
                 * @param {[DOM element]} that    [clicked date element]
                 * @param {[object]} options [all options]
                 */
                setValue: function (_this, that, options) {
                    var dateInFormat;
                    //Update active dates array
                    AppendDate.updateActiveDates(that, options);
                    //Set date in input if multipledate format is enabled
                    if (options.multipleDate) {
                        for (var i = 0; i < activeDates.length; i++) {
                            dateInFormat = AppendDate.getDateFormat(activeDates[i], options.format);
                            if (i == 0) {
                                $(_this).val(dateInFormat);
                            } else {
                                $(_this).val($(_this).val() + ', ' + dateInFormat);
                            }
                        }
                    } else { // Set a single value in input field
                        $(_this).val(AppendDate.getDateFormat(activeDates[0], options.format));
                        if( options.activation != 'alwaysOn')
                            {DatePicker.removeDatePicker(_this);}
                    }
                    // Callback funtion call if it is set
                    if (options.callback) {
                        //                    if ($(that).hasClass('active')) {
                        options.callback.call(this, $(that).attr('date-value'),activeDates);
                        //                    }
                        if (!options.disableClickToggle) {
                            $(that).toggleClass('active');
                        }
                    } else { // Else just toggle the date
                        if (!options.disableClickToggle) {
                            $(that).toggleClass('active');
                        }
                    }
                },
                /**
                 * [checkForMinDate checks for minimum date limit]
                 * @param  {[DOM element]} $element      [date element]
                 * @param  {[int]} year          [year]
                 * @param  {[int]} month         [month]
                 * @param  {[int]} date          [date]
                 * @param  {[array]} fullStartDate [full start date in array]
                 * @return {[DOM element]}               [element with object class]
                 */
                checkForMinDate: function ($element, year, month, date, fullStartDate) {
                    if (year < fullStartDate[0]) {
                        $element.addClass('disabled');
                    } else if (year == fullStartDate[0]) {
                        if (month < fullStartDate[1]) {
                            $element.addClass('disabled');
                        } else if (month == fullStartDate[1]) {
                            if (date < fullStartDate[2]) {
                                $element.addClass('disabled');
                            }
                        }
                    }
                    return ($element);
                },
                /**
                 * [checkForMaxDate checks for maximum date limit]
                 * @param  {[DOM element]} $element    [date element]
                 * @param  {[int]} year        [year]
                 * @param  {[int]} month       [month]
                 * @param  {[int]} date        [date]
                 * @param  {[array]} fullEndDate [full end date in array]]
                 * @return {[DOM element]}             [element with object class]
                 */
                checkForMaxDate: function ($element, year, month, date, fullEndDate) {
                    if (year > fullEndDate[0]) {
                        $element.addClass('disabled');
                    } else if (year == fullEndDate[0]) {
                        if (month > fullEndDate[1]) {
                            $element.addClass('disabled');
                        } else if (month == fullEndDate[1]) {
                            if (date > fullEndDate[2]) {
                                $element.addClass('disabled');
                            }
                        }
                    }
                    return ($element);
                },
                /**
                 * [checkForMaxDate checks for pre dates provided]
                 * @param  {[DOM element]} $element    [date element]
                 * @param  {[int]} year        [year]
                 * @param  {[int]} month       [month]
                 * @param  {[int]} date        [date]
                 * @param  {[array]} activeDatesArray [actuve dates in array]
                 * @param  {[boolean]} clickable [pre dates clickable option]
                 * @return {[DOM element]}             [element with object class]
                 */
                checkForActiveDates: function ($element, year, month, date, activeDatesArray) {
                    for (var i = 0; i < activeDatesArray.length; i++) {
                        if (activeDatesArray[i][0] == year) {
                            if (activeDatesArray[i][1] == month) {
                                if (activeDatesArray[i][2] == date) {
                                    //                                if (!clickable) {
                                    //                                    $element.addClass('disabled');
                                    //                                }
                                    $element.addClass('active');
                                }
                            }
                        }
                    }
                    return ($element);
                },
                /**
                 * [updateActiveDates updates active dates array]
                 * @param  {[that]} year        [clicked DOM element]
                 * @param {[object]} options [all options available]
                 */
                updateActiveDates: function (that, options) {
                    //                debugger;
                    var clickedDate = $(that).attr('date-value'),
                        dateIndex = $.inArray(clickedDate, activeDates);
                    //Update value only when the click toggle is enabled and is multiple date or either when activation mode is always on
                    if ((!options.disableClickToggle && options.multipleDate) || (!options.disableClickToggle && options.activation == 'alwaysOn')) {
                        if (dateIndex > -1 && $(that).hasClass("active")) {
                            activeDates.splice(dateIndex, 1);
                        } else {
                            activeDates.push(clickedDate);
                        }
                    } else {
                        activeDates[0] = clickedDate;
                    }
                },
                /**
                 * [setDates sets dates in datePicker]
                 * @param {[DOM elmemt]} $table  [table in which dates are to be set]
                 * @param {[DOM element]} _this   [calling elemnt]
                 * @param {[object]} options [all options available]
                 */
                setDates: function ($table, _this, options) {
                    var fullStartDate, fullEndDate, activeDatesArray = [];
                    if (options.minDate) {
                        fullStartDate = options.minDate.split('-');
                    };
                    if (options.maxDate) {
                        fullEndDate = options.maxDate.split('-');
                    };
                    //Active Dates Array Setup
                    if (activeDates) {
                        for (i = 0; i < activeDates.length; i++) {
                            activeDatesArray[i] = activeDates[i].split('-');
                        }
                    }
                    for (var i = 1; i <= (daysInMonth(currentMonth + 1, currentYear)); i) {
                        var $tr = $("<tr/>", {
                                class: "row-" + i,
                            }),
                            firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                        for (var j = 1; j <= 7; j++, i++) {
                            var $td = $("<td/>", {
                                class: 'curr-month-date'
                            });
                            //Adding previous month dates for blank days of month
                            if (i == 1) { //Prev Month Dates
                                var previousMonthTotalDate = daysInMonth(currentMonth, currentYear),
                                    prevMonth = currentMonth,
                                    prevYear = currentYear;
                                if (currentMonth <= 0) {
                                    prevMonth = 12, prevYear = currentYear - 1;
                                }
                                for (var k = firstDayOfMonth - 1; k >= 0; k--) {
                                    var $prevMonthDate = $("<td/>", {
                                        class: 'prev-month-date'
                                    });

                                    // Hide Previous month Date for single calendar modde
                                    if (options.singleCalendarMode) {
                                        $prevMonthDate.addClass('hidden');
                                    }
                                    // For Start Date
                                    if (options.minDate) {
                                        $prevMonthDate = AppendDate.checkForMinDate($prevMonthDate, prevYear, prevMonth, (parseInt(previousMonthTotalDate) - k), fullStartDate);
                                    }
                                    // For End date
                                    if (options.maxDate) {
                                        $prevMonthDate = AppendDate.checkForMaxDate($prevMonthDate, prevYear, prevMonth, (parseInt(previousMonthTotalDate) - k), fullEndDate);
                                    }
                                    //Check for active dates
                                    $prevMonthDate = AppendDate.checkForActiveDates($prevMonthDate, prevYear, prevMonth, (parseInt(previousMonthTotalDate) - k), activeDatesArray);

                                    $prevMonthDate.attr('date-value', (prevYear + '-' + AppendDate.formatDate(prevMonth) + '-' + AppendDate.formatDate(parseInt(previousMonthTotalDate) - k)));
                                    $prevMonthDate.text(previousMonthTotalDate - k);
                                    $tr.append($prevMonthDate);
                                    j++;
                                    $prevMonthDate.on('click', function (e) {
                                        if (!$(e.target).hasClass('disabled')) {
                                            AppendDate.setValue(_this, this, options);
                                        }
                                    });
                                };
                            } else if (i > daysInMonth(currentMonth + 1, currentYear)) { //Next Month Dates
                                var count = 1,
                                    nextMonth = currentMonth + 2,
                                    nextYear = currentYear;
                                if (currentMonth >= 11) {
                                    nextMonth = 1, nextYear = currentYear + 1;
                                }
                                for (var k = $tr.children().length; k < 7; k++, count++) {
                                    var $nextMonthDate = $("<td/>", {
                                        class: 'next-month-date'
                                    });
                                    // Hide Next month Date for single calendar modde
                                    if (options.singleCalendarMode) {
                                        $nextMonthDate.addClass('hidden');
                                    }
                                    // For Start Date
                                    if (options.minDate) {
                                        $nextMonthDate = AppendDate.checkForMinDate($nextMonthDate, nextYear, nextMonth, count, fullStartDate);
                                    }
                                    // For End date
                                    if (options.maxDate) {
                                        $nextMonthDate = AppendDate.checkForMaxDate($nextMonthDate, nextYear, nextMonth, count, fullEndDate);
                                    }

                                    //Check for active dates
                                    $nextMonthDate = AppendDate.checkForActiveDates($nextMonthDate, nextYear, nextMonth, count, activeDatesArray);

                                    $nextMonthDate.attr('date-value', (nextYear + '-' + AppendDate.formatDate(nextMonth) + '-' + AppendDate.formatDate(count)));
                                    $nextMonthDate.text(count);
                                    $tr.append($nextMonthDate);
                                    j++;
                                    $nextMonthDate.on('click', function (e) {
                                        if (!$(e.target).hasClass('disabled')) {
                                            AppendDate.setValue(_this, this, options);
                                        }
                                    });
                                };
                                break;
                            }
                            //Adding blank dates for blank days of month ends
                            //Adding Current Month Dates
                            // Today class for today date
                            if (options.showCurrentDate) {
                                if (i == currentDate) {
                                    var dateCheck = new Date();
                                    if (currentMonth == dateCheck.getMonth() && currentYear == dateCheck.getFullYear()) $td.addClass('today');
                                }
                            }
                            // Red class for sunday
                            if (options.setWeekHoliday){
                                if (j == 7 && options.holiday.toLowerCase() == "saturday") {
                                    $td.addClass('red');
                                } else if (j == 1 && options.holiday.toLowerCase() == "sunday") {
                                    $td.addClass('red');
                                }
                            }
                            // For Start Date
                            if (options.minDate) {
                                $td = AppendDate.checkForMinDate($td, currentYear, (parseInt(currentMonth) + 1), i, fullStartDate);
                            }
                            // For End date
                            if (options.maxDate) {
                                $td = AppendDate.checkForMaxDate($td, currentYear, (parseInt(currentMonth) + 1), i, fullEndDate);
                            }
                            //Check for active dates
                            $td = AppendDate.checkForActiveDates($td, currentYear, (parseInt(currentMonth) + 1), i, activeDatesArray);
                            $td.attr('date-value', currentYear + '-' + AppendDate.formatDate(parseInt(currentMonth) + 1) + '-' + AppendDate.formatDate(i));
                            $td.text(i);
                            $td.click(function (e) {
                                if (!$(e.target).hasClass('disabled')) {
                                    AppendDate.setValue(_this, this, options);
                                }
                            });
                            $tr.append($td);
                            // Adding Current Month Dates Ends
                        }
                        $table.append($tr);
                    };
                    return ($table);
                },
                /**
                 * [setDays sets day in datePicker]
                 * @param {[DOM element]} $table [table in which day is to be set]
                 */
                setDays: function ($table, setWeekHoliday, holiday) {
                    var $tr = $("<tr/>", {
                        class: "col",
                    });
                    for (var i = 0; i < daysLabels.length; i++) {
                        var $th = $("<th/>");
                        $th.text(daysLabels[i]);
                        $tr.append($th);
                    };
                    if (setWeekHoliday && (holiday.toLowerCase() == "saturday")) {
                        $tr.children().last().addClass('red');
                    } else if (setWeekHoliday && (holiday.toLowerCase() == "sunday")) {
                        $tr.children().first().addClass('red');
                    }
                    $table.append($tr);
                    return ($table);
                }
            }
        var DatePicker = {
            /**
             * [setDatePicker sets datepicker layout to be appended]
             * @param {[DOM element]} _this   [calling element]
             * @param {[object]} options [alloptions]
             */
            setDatePicker: function (_this, options) {
                var $datePicker = $("<div/>", {
                    class: "datePicker"
                });
                $datePicker = AppendDate.setTable($datePicker, _this, options);
                $datePicker.addClass('animated ' + options.animation);
//                if (options.activation == 'onClick') {
//                    $datePicker.css({
//                        background: options.bodyBackground
//                    });
//                }
                $datePicker.insertAfter($(_this));
                if (options.activation == "onClick") {
                    $(_this).parent().css({
                        position: 'relative'
                    });
                    $datePicker.css({
                        position: 'absolute',
                        marginTop: '5px',
                        top: ' 100%',
                        zIndex: 4
                    });
                }
                $datePicker.animate({
                    opacity: 1
                }, 300);
            },
            /**
             * [removeDatePicker removes datepicker]
             * @param  {[DOM element]} _this [calling element]
             */
            removeDatePicker: function (_this) {
                $(_this).next('.datePicker').animate({
                    opacity: 0
                }, 150, function () {
                    $(_this).next('.datePicker').remove();
                });
            }
        }
        
        /** Calling Datepicker from here **/
        
        //Push pre dates in activeDates array
        if (allOptions.preDates) {
            activeDates = allOptions.preDates;
        }
        //Check for date picker activation type
        if (allOptions.activation == 'alwaysOn') {
            if ($(_this).next('.datePicker').length <= 0) {
                DatePicker.setDatePicker(_this, allOptions);
            }
        } else {
            $(_this).focus(function () {
                if ($(_this).next('.datePicker').length <= 0) {
                    DatePicker.setDatePicker(_this, allOptions);
                }
            });
            //Remove Datepicker if user clicks out of scope
            $(document).click(function (e) {
                var container = $(".datePicker");
                if (!$(_this).is(e.target) && !container.is(e.target) // if the target of the click isn't the container...
                    &&
                    container.find('.' + e.target.classList[0]).length == 0 && $(container).has(e.target).length == 0) // ... nor a descendant of the container
                {
                    DatePicker.removeDatePicker(_this);
                }
            });
        }
    }
}(jQuery));