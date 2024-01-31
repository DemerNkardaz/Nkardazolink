const axios = require('axios');
const fs = require('fs');

const repository = process.env.GITHUB_REPOSITORY;
const apiUrl = `https://api.github.com/repos/${repository}`;

async function getRepositoryInfo() {
    try {
        // Получаем информацию о репозитории
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

        // Записываем информацию в файл
        fs.writeFileSync('repository-info.json', JSON.stringify(info, null, 2));

        console.log('Repository info saved to repository-info.json:', info);
    } catch (error) {
        console.error('Error getting repository info:', error.message);
        process.exit(1);
    }
}

getRepositoryInfo();
