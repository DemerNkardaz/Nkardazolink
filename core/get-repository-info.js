const axios = require('axios');
const fs = require('fs');

const repository = process.env.GITHUB_REPOSITORY;
const apiUrl = `https://api.github.com/repos/${repository}`;

async function getRepositoryInfo() {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'GitHub Actions'
            }
        });

        const info = {
            size: response.data.size,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at
        };

        fs.writeFileSync('repository-info.json', JSON.stringify(info, null, 2));

        console.log('Repository info saved to repository-info.json:', info);
    } catch (error) {
        console.error('Error getting repository info:', error.message);
        process.exit(1);
    }
}

getRepositoryInfo();
