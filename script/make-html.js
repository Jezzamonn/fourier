const showdown = require('showdown');
const mustache = require('mustache');
const fs = require('fs');

const pageData = [
    { // English
        markdown: 'content.md',
        title: 'An Interactive Introduction to Fourier Transforms',
        description: 'Fourier transforms are a tool used in a whole bunch of different things. This is a explanation of what a Fourier transform does, and some different ways it can useful. And how you can make pretty things with it, like this thing:',
        filename: 'index.html',
        url: '',
    },
    { // Spanish!??! 😲
        markdown: 'content-es.md',
        title: 'Transformada de Fourier',
        description: 'Las transformadas de Fourier son una herramienta utilizada en un montón de cosas diferentes. Esta es una explicación de lo que hace una transformada de Fourier, algunas formas diferentes en que puede ser útil y cómo puedes hacer cosas bonitas con ella, como esta cosa:',
        filename: 'es.html',
        url: '/es.html',
    },
    { // Debug
        markdown: 'debug.md',
        title: 'debug debug debug',
        description: 'debugbugbugbugbugbugbugbug',
        filename: 'debug.html',
        url: '/debug.html',
    },
]

const markdownControler = new showdown.Converter();

const template = fs.readFileSync('template.html').toString();

for (pageDatum of pageData) {
    console.log(`generating ${pageDatum.filename}`)
    // Read in content
    markdown = fs.readFileSync(pageDatum.markdown).toString();

    // Convert to html
    htmlContent = markdownControler.makeHtml(markdown);

    // Fill into template
    view = Object.assign({}, pageDatum);
    view.content = htmlContent;

    html = mustache.render(template, view)
    // Output to build directory;
    fs.writeFileSync('build/' + pageDatum.filename, html)
}