import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import axios from 'axios';

const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);
const fsExists = util.promisify(fs.exists);
const fsMkdir = util.promisify(fs.mkdir);

class StorageCache {
    cacheDir: string;

    constructor() {
        this.cacheDir = path.join(__dirname, 'cache');
    }

    async get(url: string): Promise<string> {
        const fPath = this.urlToPath(url);
        const exists = await fsExists(fPath);
        if (exists) {
            console.log(`cache: HIT: ${url}`);
            return await fsReadFile(fPath, 'utf8');
        }
        console.log(`cache: MISS: ${url}`);
        return null;
    }

    async set(url: string, data: string) {
        console.log(`cache: SAVE: ${url}`);
        const fPath = this.urlToPath(url);
        await fsMkdir(this.cacheDir, {recursive: true});
        await fsWriteFile(fPath, data);
    }

    urlToPath(url) {
        const filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        return path.join(this.cacheDir, filename);
    }
}

const CACHE = new StorageCache();

const fetch = async (url: string): Promise<string> => {
    let result = await CACHE.get(url);
    if (result) {
        return result;
    }
    const resp = await axios.get<string>(url);
    const data = resp.data;
    await CACHE.set(url, data);
    return data;
};

export { fetch };
