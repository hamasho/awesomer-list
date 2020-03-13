import * as path from 'path';

const ROOT_AWESOME_URL = 'https://raw.githubusercontent.com/sindresorhus/awesome/master/readme.md';
const CACHE_DIR = path.join(__dirname, 'cache');

const getReadmeUrl = async (gitRepoUrl) => {
    const repo = 'some/thing';
    return `https://raw.githubusercontent.com/${repo}/master/readme.md`;
};

const fetchUrls = async (url) => {
    return 'url';
};

const fetchAwesomeUrls = async (url) => {
    return ['test'];
};

const main = async () => {
    const rootReadmeUrl = await getReadmeUrl(ROOT_AWESOME_URL);
    const awesomeURLs = await fetchAwesomeUrls(rootReadmeUrl);
    for (let url of awesomeURLs) {
        console.log(url);
    }

}

main();
