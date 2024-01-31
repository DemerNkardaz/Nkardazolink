$(document).ready(function () {

    $.ajax({
        url: 'repository-info.json',
        dataType: 'json',
        success: function (data) {
            var sizeInMB = Math.round(data.size / 1024);
            var sizeFinal;
            var sizeType;

            if (sizeInMB >= 1024) {
                sizeFinal = (sizeInMB / 1024).toFixed(2);
                sizeType = '&ensp;<span data-key="GB">ГБ</span>';
            } else {
                sizeFinal = sizeInMB;
                sizeType = '&ensp;<span data-key="MB">МБ</span>';
            }
            var createdAt = formatDate(new Date(data.created_at));
            var updatedAt = formatDate(new Date(data.updated_at));


            $('#repoSizeValue').html(sizeFinal + sizeType);
            $('#repoCreatedAt').html(createdAt);
            $('#repoUpdatedAt').html(updatedAt);
        },
        error: function () {
            console.error('Error loading repository info.');
        }
    });


    function formatDate(date) {
        var now = new Date();
        var diff = now - date;
        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 30);
        var years = Math.floor(months / 12);

        var daysAgo = days % 30;  // Остаток дней
        var monthsAgo = months % 12;  // Остаток месяцев
        var yearsAgo = years;  // Количество лет

        if (yearsAgo > 0) {
            return formatYearsAgo(yearsAgo);
        } else if (monthsAgo > 0) {
            return formatMonthsAgo(monthsAgo);
        } else if (daysAgo > 0) {
            return formatDaysAgo(daysAgo);
        } else if (hours > 0) {
            return formatHoursAgo(hours);
        } else if (minutes > 0) {
            return formatMinutesAgo(minutes);
        } else if (seconds > 0) {
            return formatSecondsAgo(seconds);
        } else {
            return '&ensp;<span data-key="just-now">только что</span>';
        }
    }

    function formatYearsAgo(years) {
        if (years === 1 || (years % 10 === 1 && years !== 11)) {
            return years + '&ensp;<span data-key="year-ago">год назад</span>';
        } else if ((years >= 2 && years <= 4) || (years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20))) {
            return years + '&ensp;<span data-key="years-ago">года назад</span>';
        } else {
            return years + '&ensp;<span data-key="years-ago-2">лет назад</span>';
        }
    }

    function formatMonthsAgo(months) {
        if (months === 1 || (months % 10 === 1 && months !== 11)) {
            return months + '&ensp;<span data-key="month-ago">месяц назад</span>';
        } else if ((months >= 2 && months <= 4) || (months % 10 >= 2 && months % 10 <= 4 && (months < 10 || months > 20))) {
            return months + '&ensp;<span data-key="months-ago">месяца назад</span>';
        } else {
            return months + '&ensp;<span data-key="months-ago-2">месяцев назад</span>';
        }
    }

    function formatDaysAgo(days) {
        if (days === 1 || (days % 10 === 1 && days !== 11)) {
            return days + '&ensp;<span data-key="day-ago">день назад</span>';
        } else if ((days >= 2 && days <= 4) || (days % 10 >= 2 && days % 10 <= 4 && (days < 10 || days > 20))) {
            return days + '&ensp;<span data-key="days-ago">дня назад</span>';
        } else {
            return days + '&ensp;<span data-key="days-ago-2">дней назад</span>';
        }
    }

    function formatHoursAgo(hours) {
        if (hours === 1 || hours === 21) {
            return hours + '&ensp;<span data-key="hour-ago">час назад</span>';
        } else if ((hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)) {
            return hours + '&ensp;<span data-key="hours-ago">часа назад</span>';
        } else {
            return hours + '&ensp;<span data-key="hours-ago-2">часов назад</span>';
        }
    }

    function formatMinutesAgo(minutes) {
        if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
            return minutes + '&ensp;<span data-key="minute-ago">минуту назад</span>';
        } else if ((minutes >= 2 && minutes <= 4) || (minutes >= 22 && minutes <= 24) ||
            (minutes >= 32 && minutes <= 34) || (minutes >= 42 && minutes <= 44) || (minutes >= 52 && minutes <= 54)) {
            return minutes + '&ensp;<span data-key="minutes-ago">минуты назад</span>';
        } else {
            return minutes + '&ensp;<span data-key="minutes-ago-2">минут назад</span>';
        }
    }

    function formatSecondsAgo(seconds) {
        if (seconds === 1 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
            return seconds + '&ensp;<span data-key="second-ago">секунду назад</span>';
        } else if ((seconds >= 2 && seconds <= 4) || (seconds >= 22 && seconds <= 24) ||
            (seconds >= 32 && seconds <= 34) || (seconds >= 42 && seconds <= 44) || (seconds >= 52 && seconds <= 54)) {
            return seconds + '&ensp;<span data-key="seconds-ago">секунды назад</span>';
        } else {
            return seconds + '&ensp;<span data-key="seconds-ago-2">секунд назад</span>';
        }
    }

})