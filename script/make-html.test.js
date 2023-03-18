import { exportAllLanguages } from './make-html.js';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import chai, { expect } from 'chai';
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());

async function tmpDir() {
    return await fs.mkdtemp(path.join(os.tmpdir(), 'make-html-'));
}

// Just test everything!
describe('exportAllLanguages', () => {

    const expectedFiles = [
        "de.html",
        "debug.html",
        "es.html",
        "fa.html",
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
    ];

    it('has the correct output files', async () => {
        const dir = await tmpDir();

        exportAllLanguages({outputDir: dir});
        const files = await fs.readdir(dir);
        files.sort();

        expect(files).to.deep.equal(expectedFiles);
    });

    // Generate tests for each file.
    for (const file of expectedFiles) {
        it(`has the correct contents for ${file}`, async () => {
            const dir = await tmpDir();
            exportAllLanguages({outputDir: dir});

            // Compare file with snapshot.
            const filePath = path.join(dir, file);
            const contents = await fs.readFile(filePath, 'utf-8');
            expect(contents).toMatchSnapshot(file);
        });
    }
});