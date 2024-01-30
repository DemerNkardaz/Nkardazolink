$(document).ready(function () {
    var repoSize = 'https://img.shields.io/github/repo-size/demernkardaz/Nkardazolink?callback=?';
    var repoCreated = 'https://badges.pufler.dev/created/DemerNkardaz/Nkardazolink?callback=?';
    var repoUpdated = 'https://badges.pufler.dev/updated/DemerNkardaz/Nkardazolink';

    fetch(repoSize)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const repoSizeElement = xmlDoc.querySelector('title');
            const repoSizeText = repoSizeElement.textContent.trim().split(': ')[1];
            $('#repoSize').append('<span>' + repoSizeText + '</span>');
        })
        .catch(error => {
            console.error('Error fetching repository size:', error);
        });
    fetch(repoCreated)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const repoSizeElement = xmlDoc.querySelector('title');
            const repoSizeText = repoSizeElement.textContent.trim().split(': ')[1];
            const [number, unit] = repoSizeText.split(' ');
            let timeText;
            switch (unit) {
                case 'days ago':
                    timeText = 'дней назад';
                    break;
                case 'months ago':
                    timeText = 'месяцев назад';
                    break;
                case 'years ago':
                    timeText = 'лет назад';
                    break;
                default:
                    timeText = unit;
            }
            $('#repoCreated').append('<span>' + number + '</span><span data-key="' + unit + '">' + timeText + '</span>');
        })
        .catch(error => {
            console.error('Error fetching created date:', error);
        });
    fetch(repoUpdated)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const repoSizeElement = xmlDoc.querySelector('title');
            const repoSizeText = repoSizeElement.textContent.trim().split(': ')[1];
            const [number, unit] = repoSizeText.split(' ');
            let timeText;
            switch (unit) {
                case 'days ago':
                    timeText = 'дней назад';
                    break;
                case 'months ago':
                    timeText = 'месяцев назад';
                    break;
                case 'years ago':
                    timeText = 'лет назад';
                    break;
                default:
                    timeText = unit;
            }
            $('#repoCreated').append('<span>' + number + '</span><span data-key="' + unit + '">' + timeText + '</span>');
        })
        .catch(error => {
            console.error('Error fetching updated date:', error);
        })

});
