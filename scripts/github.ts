import { fetch } from './fetch';

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

const getReadme = async (repoUrl: string): Promise<string> => {
    const readmeUrl = await getReadmeUrl(repoUrl);
    const readme = await fetch(readmeUrl);
    return readme;
};

export { getReadme };
