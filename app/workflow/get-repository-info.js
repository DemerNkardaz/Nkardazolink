const axios = require('axios');
const fs = require('fs');

const repository = process.env.GITHUB_REPOSITORY;
const apiUrl = `https://api.github.com/repos/${repository}`;

async function getRepositoryInfo() {
  try {
    const repoResponse = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'GitHub Actions'
      }
    });

    const commitsUrl = `${apiUrl}/commits`;
    const commitsResponse = await axios.get(commitsUrl, {
      headers: {
        'User-Agent': 'GitHub Actions'
      }
    });

    const latestCommitDate = commitsResponse.data[0].commit.author.date;

    const info = {
      size: repoResponse.data.size,
      created_at: repoResponse.data.created_at,
      updated_at: latestCommitDate
    };
    fs.writeFileSync('app/data/repository/repository-info.json', JSON.stringify(info, null, 2));
    console.log('Repository info:', info);
        

    //markupRepositoryInfo(info);
  } catch (error) {
    console.error('Error getting repository info:', error.message);
    process.exit(1);
  }
}

function markupRepositoryInfo(info) {
  let repoStatus = [];

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
      return '&ensp;<span data-key="just_now" data-key-source="misc">только что</span>';
    }
  }
  function formatYearsAgo(years) {
    if (years === 1 || (years % 10 === 1 && years !== 11)) {
      return years + `&ensp;<span data-key="year_ago" data-key-source="misc"></span>`;
    } else if ((years >= 2 && years <= 4) || (years % 10 >= 2 && years % 10 <= 4 && (years < 10 || years > 20))) {
      return years + `&ensp;<span data-key="years_ago" data-key-source="misc"></span>`;
    } else {
      return years + `&ensp;<span data-key="years_ago_2" data-key-source="misc"></span>`;
    }
  }
  function formatMonthsAgo(months) {
    if (months === 1 || (months % 10 === 1 && months !== 11)) {
      return months + `&ensp;<span data-key="month_ago"></span>`;
    } else if ((months >= 2 && months <= 4) || (months % 10 >= 2 && months % 10 <= 4 && (months < 10 || months > 20))) {
      return months + `&ensp;<span data-key="months_ago" data-key-source="misc"></span>`;
    } else {
      return months + `&ensp;<span data-key="months_ago_2" data-key-source="misc"></span>`;
    }
  }
  function formatDaysAgo(days) {
    if (days === 1 || (days % 10 === 1 && days !== 11)) {
      return days + `&ensp;<span data-key="day_ago" data-key-source="misc"></span>`;
    } else if ((days >= 2 && days <= 4) || (days % 10 >= 2 && days % 10 <= 4 && (days < 10 || days > 20))) {
      return days + `&ensp;<span data-key="days_ago" data-key-source="misc">$</span>`;
    } else {
      return days + `&ensp;<span data-key="days_ago_2" data-key-source="misc"></span>`;
    }
  }
  function formatHoursAgo(hours) {
    if (hours === 1 || hours === 21) {
      return hours + `&ensp;<span data-key="hour_ago" data-key-source="misc"></span>`;
    } else if ((hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)) {
      return hours + `&ensp;<span data-key="hours_ago" data-key-source="misc"></span>`;
    } else {
      return hours + `&ensp;<span data-key="hours_ago_2" data-key-source="misc"></span>`;
    }
  }

  function formatMinutesAgo(minutes) {
    if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
      return minutes + `&ensp;<span data-key="minute_ago" data-key-source="misc"></span>`;
    } else if ((minutes >= 2 && minutes <= 4) || (minutes >= 22 && minutes <= 24) ||
      (minutes >= 32 && minutes <= 34) || (minutes >= 42 && minutes <= 44) || (minutes >= 52 && minutes <= 54)) {
      return minutes + `&ensp;<span data-key="minutes_ago" data-key-source="misc"></span>`;
    } else {
      return minutes + `&ensp;<span data-key="minutes_ago_2" data-key-source="misc"></span>`;
    }
  }
  function formatSecondsAgo(seconds) {
    if (seconds === 1 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
      return seconds + `&ensp;<span data-key="second_ago" data-key-source="misc"></span>`;
    } else if ((seconds >= 2 && seconds <= 4) || (seconds >= 22 && seconds <= 24) ||
      (seconds >= 32 && seconds <= 34) || (seconds >= 42 && seconds <= 44) || (seconds >= 52 && seconds <= 54)) {
      return seconds + `&ensp;<span data-key="seconds_ago" data-key-source="misc"></span>`;
    } else {
      return seconds + `&ensp;<span data-key="seconds_ago_2" data-key-source="misc"></span>`;
    }
  }


    let sizeInMB = Math.round(info.size / 1024);
    let sizeFinal, sizeType;
    if (sizeInMB >= 1024) {
        sizeFinal = (sizeInMB / 1024).toFixed(2);
        sizeType = '<span data-key="GB" data-key-source="misc">ГБ</span>';
    } else {
        sizeFinal = sizeInMB;
        sizeType = '<span data-key="MB" data-key-source="misc">МБ</span>';
    }
    let repoSize = `<span>${sizeFinal}&ensp;${sizeType}</span>`;
    repoStatus.push(repoSize);

    let createdAt = `<span>${formatDate(new Date(info.created_at))}</span>`;
    repoStatus.push(createdAt);

    let updatedAt = `<span>${formatDate(new Date(info.updated_at))}</span>`;
    repoStatus.push(updatedAt);

    const filePath = 'app/data/repository/status.js';
    const repoStatusString = `let repoStatus = ${JSON.stringify(repoStatus)}; export default repoStatus;`;
    fs.writeFileSync(filePath, repoStatusString);

    console.log('Markup repository info saved to status.js:', repoStatus);
}

getRepositoryInfo();
