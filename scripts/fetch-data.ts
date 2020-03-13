import { getReadme } from './github';
import { parseReadme, saveAwesomeList } from './parse-awesome';

const ROOT_AWESOME_URL = 'https://github.com/sindresorhus/awesome';

const main = async () => {
    console.log('start script');
    const rootReadme = await getReadme(ROOT_AWESOME_URL);
    const awesomeRepos = parseReadme(rootReadme);
    await saveAwesomeList(rootReadme, awesomeRepos);

    for (let repo of awesomeRepos) {
        const readme = await getReadme(repo);
        const targetRepos = parseReadme(readme);
        await saveAwesomeList(repo, targetRepos);
    }
}

main();
