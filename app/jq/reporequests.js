window.miniLocale = {
  ru: {
    GB: 'ГБ',
    MB: 'МБ',
    just_now: 'только что',
    year_ago: 'год назад',
    years_ago: 'года назад',
    years_ago_2: 'лет назад',
    month_ago: 'месяц назад',
    months_ago: 'месяца назад',
    months_ago_2: 'месяцев назад',
    day_ago: 'день назад',
    days_ago: 'дня назад',
    days_ago_2: 'дней назад',
    hour_ago:  'час назад',
    hours_ago: 'часа назад',
    hours_ago_2: 'часов назад',
    minute_ago: 'минуту назад',
    minutes_ago: 'минуты назад',
    minutes_ago_2: 'минут назад',
    second_ago: 'секунду назад',
    seconds_ago: 'секунды назад',
    seconds_ago_2: 'секунд назад'
  }
}

window.repositoryInfo = function (type) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '../../repository-info.json',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (type === 'size') {
          let sizeInMB = Math.round(data.size / 1024);
          let sizeFinal, sizeType;
          if (sizeInMB >= 1024) {
            sizeFinal = (sizeInMB / 1024).toFixed(2);
            sizeType = '<span data-key="GB" data-key-source="miniLocale">ГБ</span>';
          } else {
            sizeFinal = sizeInMB;
            sizeType = '<span data-key="MB" data-key-source="miniLocale">МБ</span>';
          }
          let response = `&ensp;<span>${sizeFinal}&ensp;${sizeType}</span>`;
          resolve(response);
        } else if (type === 'createdAt') {
          let createdAt = `<span>${formatDate(new Date(data.created_at))}</span>`;
          resolve(createdAt);
        } else if (type === 'updatedAt') {
          let updatedAt = `<span>${formatDate(new Date(data.updated_at))}</span>`;
          resolve(updatedAt);
        } else {
          reject('Unsupported type');
        }
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

// Используем обещание
repositoryInfo('size').then((response) => {$('body').append(response);});
repositoryInfo('createdAt').then((response) => {$('body').append(response);});
repositoryInfo('updatedAt').then((response) => {$('body').append(response);});



function formatDate(date) {
    let now = new Date();
    let diff = now - date;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);
    let daysAgo = days % 30;
    let monthsAgo = months % 12;
    let yearsAgo = years;
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
        return '&ensp;<span data-key="just_now"data-key-source="miniLocale">только что</span>';
    }
}
function formatYearsAgo(years) {
    if (years === 1 || (years % 10 === 1 && years !== 11)) {
        return years + `&ensp;<span data-key="year_ago" data-key-source="miniLocale">${nkLocale.get('year_ago>miniLocale')}</span>`;
    } else if ((years >= 2 && years <= 4) || (years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20))) {
        return years + `&ensp;<span data-key="years_ago" data-key-source="miniLocale">${nkLocale.get('years_ago>miniLocale')}</span>`;
    } else {
        return years + `&ensp;<span data-key="years_ago_2" data-key-source="miniLocale">${nkLocale.get('years_ago_2>miniLocale')}</span>`;
    }
}
function formatMonthsAgo(months) {
    if (months === 1 || (months % 10 === 1 && months !== 11)) {
        return months + `&ensp;<span data-key="month_ago">${nkLocale.get('month_ago>miniLocale')}</span>`;
    } else if ((months >= 2 && months <= 4) || (months % 10 >= 2 && months % 10 <= 4 && (months < 10 || months > 20))) {
        return months + `&ensp;<span data-key="months_ago" data-key-source="miniLocale">${nkLocale.get('months_ago>miniLocale')}</span>`;
    } else {
        return months + `&ensp;<span data-key="months_ago_2" data-key-source="miniLocale">${nkLocale.get('months_ago_2>miniLocale')}</span>`;
    }
}
function formatDaysAgo(days) {
    if (days === 1 || (days % 10 === 1 && days !== 11)) {
        return days + `&ensp;<span data-key="day_ago" data-key-source="miniLocale">${nkLocale.get('day_ago>miniLocale')}</span>`;
    } else if ((days >= 2 && days <= 4) || (days % 10 >= 2 && days % 10 <= 4 && (days < 10 || days > 20))) {
        return days + `&ensp;<span data-key="days_ago" data-key-source="miniLocale">${nkLocale.get('days_ago>miniLocale')}</span>`;
    } else {
        return days + `&ensp;<span data-key="days_ago_2" data-key-source="miniLocale">${nkLocale.get('days_ago_2>miniLocale')}</span>`;
    }
}
function formatHoursAgo(hours) {
    if (hours === 1 || hours === 21) {
        return hours + `&ensp;<span data-key="hour_ago" data-key-source="miniLocale">${nkLocale.get('hour_ago>miniLocale')}</span>`;
    } else if ((hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)) {
        return hours + `&ensp;<span data-key="hours_ago" data-key-source="miniLocale">${nkLocale.get('hours_ago>miniLocale')}</span>`;
    } else {
        return hours + `&ensp;<span data-key="hours_ago_2" data-key-source="miniLocale">${nkLocale.get('hours_ago_2>miniLocale')}</span>`;
    }
}
function formatMinutesAgo(minutes) {
    if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
        return minutes + `&ensp;<span data-key="minute_ago" data-key-source="miniLocale">${nkLocale.get('minute_ago>miniLocale')}</span>`;
    } else if ((minutes >= 2 && minutes <= 4) || (minutes >= 22 && minutes <= 24) ||
        (minutes >= 32 && minutes <= 34) || (minutes >= 42 && minutes <= 44) || (minutes >= 52 && minutes <= 54)) {
        return minutes + `&ensp;<span data-key="minutes_ago" data-key-source="miniLocale">${nkLocale.get('minutes_ago>miniLocale')}</span>`;
    } else {
        return minutes + `&ensp;<span data-key="minutes_ago_2" data-key-source="miniLocale">${nkLocale.get('minutes_ago_2>miniLocale')}</span>`;
    }
}
function formatSecondsAgo(seconds) {
    if (seconds === 1 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
        return seconds + `&ensp;<span data-key="second_ago" data-key-source="miniLocale">${nkLocale.get('second_ago>miniLocale')}</span>`;
    } else if ((seconds >= 2 && seconds <= 4) || (seconds >= 22 && seconds <= 24) ||
        (seconds >= 32 && seconds <= 34) || (seconds >= 42 && seconds <= 44) || (seconds >= 52 && seconds <= 54)) {
        return seconds + `&ensp;<span data-key="seconds_ago" data-key-source="miniLocale">${nkLocale.get('seconds_ago>miniLocale')}</span>`;
    } else {
        return seconds + `&ensp;<span data-key="seconds_ago_2" data-key-source="miniLocale">${nkLocale.get('seconds_ago_2>miniLocale')}</span>`;
    }
}