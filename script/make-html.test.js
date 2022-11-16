import { exportAllLanguages } from './make-html';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import * as matchers from 'jest-extended';
expect.extend(matchers);

async function tmpDir() {
    return await fs.mkdtemp(path.join(os.tmpdir(), 'make-html-'));
}

// Just test everything!
describe('exportAllLanguages', () => {

    it('has the correct output files', async () => {
        const dir = await tmpDir();

        exportAllLanguages({outputDir: dir});
        const files = await fs.readdir(dir);
        files.sort();
        // Lazy :)
        expect(files).toMatchInlineSnapshot(`
[
  "de.html",
  "debug.html",
  "es.html",
  "fr.html",
  "he.html",
  "index.html",
  "it.html",
  "ko.html",
  "pl.html",
  "pt-br.html",
  "pt_br.html",
  "sk.html",
  "tr.html",
  "zh-cn.html",
  "zh-tw.html",
]
`);
    });

    it('outputs the correct HTML for each language', async () => {
        const dir = await tmpDir();
        exportAllLanguages({outputDir: dir});

        // Compare each file with a snapshot
        const files = await fs.readdir(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const html = await fs.readFile(filePath, 'utf-8');
            expect(html).toMatchSnapshot(file);
        }
    });
});