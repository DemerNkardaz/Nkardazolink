window.miniLocale = {
  ru: {
    GB: 'ГБ', MB: 'МБ',
    just_now: 'только что', year_ago: 'год назад', years_ago: 'года назад', years_ago_2: 'лет назад', month_ago: 'месяц назад', months_ago: 'месяца назад',
    months_ago_2: 'месяцев назад', day_ago: 'день назад', days_ago: 'дня назад', days_ago_2: 'дней назад', hour_ago: 'час назад', hours_ago: 'часа назад',
    hours_ago_2: 'часов назад', minute_ago: 'минуту назад', minutes_ago: 'минуты назад', minutes_ago_2: 'минут назад', second_ago: 'секунду назад',
    seconds_ago: 'секунды назад', seconds_ago_2: 'секунд назад'
  },
  en: {
    GB: 'GB', MB: 'MB',
    just_now: 'just now', year_ago: 'year ago', years_ago: 'years ago', years_ago_2: 'years ago', month_ago: 'month ago', months_ago: 'months ago',
    months_ago_2: 'months ago', day_ago: 'day ago', days_ago: 'days ago', days_ago_2: 'days ago', hour_ago: 'hour ago', hours_ago: 'hours ago',
    hours_ago_2: 'hours ago', minute_ago: 'minute ago', minutes_ago: 'minutes ago', minutes_ago_2: 'minutes ago', second_ago: 'second ago',
    seconds_ago: 'seconds ago', seconds_ago_2: 'seconds ago'
  },
  ja: {
    GB: 'GB', MB: 'MB',
    just_now: 'たった今', year_ago: '去年', years_ago: '年前', years_ago_2: '年前', month_ago: '前月', months_ago: 'ヶ月前',
    months_ago_2: 'ヶ月前', day_ago: '日前', days_ago: '日前', days_ago_2: '日前', hour_ago: '時間前', hours_ago: '時間前',
    hours_ago_2: '時間前', minute_ago: '分前', minutes_ago: '分前', minutes_ago_2: '分前', second_ago: '秒前', seconds_ago: '秒前',
    seconds_ago_2: '秒前'
  },
  zh: {
    GB: 'GB', MB: 'MB',
    just_now: '刚刚', year_ago: '年前', years_ago: '年前', years_ago_2: '年前', month_ago: '月前', months_ago: '个月前',
    months_ago_2: '个月前', day_ago: '天前', days_ago: '天前', days_ago_2: '天前', hour_ago: '小时前', hours_ago: '小时前',
    hours_ago_2: '小时前', minute_ago: '分钟前', minutes_ago: '分钟前', minutes_ago_2: '分钟前', second_ago: '秒前',
    seconds_ago: '秒前', seconds_ago_2: '秒前'
  },
  ko: {
    GB: 'GB', MB: 'MB',
    just_now: '방금', year_ago: '년 전', years_ago: '년 전', years_ago_2: '년 전', month_ago: '달 전', months_ago: '달 전',
    months_ago_2: '달 전', day_ago: '일 전', days_ago: '일 전', days_ago_2: '일 전', hour_ago: '시간 전', hours_ago: '시간 전',
    hours_ago_2: '시간 전', minute_ago: '분 전', minutes_ago: '분 전', minutes_ago_2: '분 전', second_ago: '초 전',
    seconds_ago: '초 전', seconds_ago_2: '초 전'
  },
  vi: {
    GB: 'GB', MB: 'MB',
    just_now: 'vừa rồi', year_ago: 'năm trước', years_ago: 'năm trước', years_ago_2: 'năm trước', month_ago: 'tháng trước',
    months_ago: 'tháng trước', months_ago_2: 'tháng trước', day_ago: 'ngày trước', days_ago: 'ngày trước', days_ago_2: 'ngày trước',
    hour_ago: 'giờ trước', hours_ago: 'giờ trước', hours_ago_2: 'giờ trước', minute_ago: 'phút trước', minutes_ago: 'phút trước',
    minutes_ago_2: 'phút trước', second_ago: 'giây trước', seconds_ago: 'giây trước', seconds_ago_2: 'giây trước'
  },
  ro: {
    GB: 'GB', MB: 'MB',
    just_now: 'chiar acum', year_ago: 'an în urmă', years_ago: 'ani în urmă', years_ago_2: 'ani în urmă', month_ago: 'lună în urmă',
    months_ago: 'luni în urmă', months_ago_2: 'luni în urmă', day_ago: 'zi în urmă', days_ago: 'zile în urmă', days_ago_2: 'zile în urmă',
    hour_ago: 'oră în urmă', hours_ago: 'ore în urmă', hours_ago_2: 'ore în urmă', minute_ago: 'minut în urmă', minutes_ago: 'minute în urmă',
    minutes_ago_2: 'minute în urmă', second_ago: 'secundă în urmă', seconds_ago: 'secunde în urmă', seconds_ago_2: 'secunde în urmă'
  },
  mo: {
    GB: 'GB', MB: 'MB',
    just_now: 'токмол вапте', year_ago: 'ан дея вазут', years_ago: 'ани дея вазути', years_ago_2: 'ани дея вазути', month_ago: 'лунэ дея вазутэ',
    months_ago: 'лунь дея вазутэ', months_ago_2: 'лунь дея вазутэ', day_ago: 'зи дея вазутэ', days_ago: 'зиле дея вазутэ', days_ago_2: 'зиле дея вазутэ',
    hour_ago: 'орэ дея вазутэ', hours_ago: 'ориле дея вазутэ', hours_ago_2: 'ориле дея вазутэ', minute_ago: 'минут дея вазутэ',
    minutes_ago: 'минутеле дея вазутэ', minutes_ago_2: 'минутеле дея вазутэ', second_ago: 'секунде дея вазутэ', seconds_ago: 'секунделе дея вазутэ',
    seconds_ago_2: 'секунделе дея вазутэ'
  }
}

window.repoStatus = [];
window.repositoryInfo = function (type) {
  $.ajax({
    url: '../../repository-info.json',
    dataType: 'json',
    success: function (data) {

      let sizeInMB = Math.round(data.size / 1024);
      let sizeFinal, sizeType;
      if (sizeInMB >= 1024) {
        sizeFinal = (sizeInMB / 1024).toFixed(2);
        sizeType = '<span data-key="GB" data-key-source="miniLocale">ГБ</span>';
      } else {
        sizeFinal = sizeInMB;
        sizeType = '<span data-key="MB" data-key-source="miniLocale">МБ</span>';
      }
      let repoSize = `<span>${sizeFinal}&ensp;${sizeType}</span>`;
      repoStatus.push(repoSize);

      let createdAt = `<span>${formatDate(new Date(data.created_at))}</span>`;
      repoStatus.push(createdAt);

      let updatedAt = `<span>${formatDate(new Date(data.updated_at))}</span>`;
      repoStatus.push(updatedAt);

    }
  });
}
repositoryInfo();

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