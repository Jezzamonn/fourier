import showdown from 'showdown';
import fm from 'front-matter';
import mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const defaultPageData = {
    author: 'Jez Swanson',
    url: '',
    translatorMarkdown: '',
    textDirection: '',
};

const contentDir = 'content/'

const markdownConverter = new showdown.Converter();
const template = fs.readFileSync('template.html').toString();

export function exportAllLanguages({outputDir}) {
    // Read the metadata from all the markdown files.
    const pageDatas = [];
    // Filter out the README file. All the rest are contents of the page for different languages and such.
    const markdownFiles = fs.readdirSync(contentDir)
        .filter(f => !f.startsWith('README'));
    for (const file of markdownFiles) {
        const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

        // Read the metadata from the top of the file.
        const frontMatterParsed = fm(content);
        // Skip if the attributes are empty.
        if (Object.keys(frontMatterParsed.attributes).length === 0) {
            continue;
        }

        const pageData = Object.assign(
            {},
            defaultPageData,
            frontMatterParsed.attributes,
            {markdown: frontMatterParsed.body, markdownFileName: file}
        );
        pageDatas.push(pageData);
    }

    const languages = [];
    for (const pageData of pageDatas) {
        if (!pageData.hasOwnProperty('languageName')) {
            continue;
        }
        languages.push({
            name: pageData.languageName,
            url: `/fourier${pageData.url}`,
        });
    }
    languages.sort((a, b) => a.name.localeCompare(b.name));
    // And then put English at the front.
    const english = languages.splice(languages.findIndex(l => l.name == "English"), 1)[0];
    languages.unshift(english);

    for (const pageData of pageDatas) {
        console.log(`Processing ${pageData.markdownFileName}`);

        const html = createHtml(pageData, languages);

        // We might have a string or an array of strings. Convert it so we always have an array
        let outFileNames = pageData.outFileName;
        if (!(outFileNames instanceof Array)) {
            // Wrap in Array
            outFileNames = [outFileNames];
        }
        // Output to build directory.
        for (const outFileName of outFileNames) {
            console.log(`Writing to ${outFileName}`)
            const outFilePath = path.join(outputDir, outFileName);
            fs.writeFileSync(outFilePath, html)
        }
    }
}

function createHtml(pageData, languages) {
    // Read in content
    const markdown = pageData.markdown;

    // Convert to html
    const htmlContent = markdownConverter.makeHtml(markdown);
    const translator = markdownConverter.makeHtml(pageData.translatorMarkdown);

    // Fill into template
    const view = Object.assign({}, pageData);
    view.content = htmlContent;
    view.translator = translator;
    view.languages = languages;

    const html = mustache.render(template, view);
    return html;
}

function isMain() {
    return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isMain()) {
    exportAllLanguages({outputDir: 'build/'});
}
