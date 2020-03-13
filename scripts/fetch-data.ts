import * as path from 'path';
import { fetch } from './fetch';

const ROOT_AWESOME_URL = 'https://github.com/sindresorhus/awesome';
const CACHE_DIR = path.join(__dirname, 'cache');

const getReadmeUrl = async (gitRepoUrl) => {
    const repo = gitRepoUrl.replace('https://github.com/', '');
    return `https://raw.githubusercontent.com/${repo}/master/readme.md`;
};

const fetchUrls = async (url) => {
    return await fetch(url);
};

const fetchAwesomeUrls = async (url) => {
    const readme = await fetch(url);
    return [readme];
};

const main = async () => {
    const rootReadmeUrl = await getReadmeUrl(ROOT_AWESOME_URL);
    const awesomeURLs = await fetchAwesomeUrls(rootReadmeUrl);
    for (let url of awesomeURLs) {
        //console.log(url);
    }

}

main();
