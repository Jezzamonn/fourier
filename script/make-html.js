const showdown = require('showdown');
const mustache = require('mustache');
const fs = require('fs');

const pageData = [
    { // English
        languageName: 'English',
        markdownFileName: 'content.md',
        title: 'An Interactive Introduction to Fourier Transforms',
        description: 'Fourier transforms are a tool used in a whole bunch of different things. This is a explanation of what a Fourier transform does, and some different ways it can useful.',
        outFileName: 'index.html',
        url: '',
        translatorMarkdown: '',
    },
    { // Spanish
        languageName: 'Español',
        markdownFileName: 'content-es.md',
        title: 'Una introducción interactiva a las transformadas de Fourier',
        description: 'Las transformadas de Fourier son una herramienta utilizada en un montón de cosas diferentes. Esta es una explicación de lo que hace una transformada de Fourier, algunas formas diferentes en que puede ser útil y cómo puedes hacer cosas bonitas con ella, como esta cosa:',
        outFileName: 'es.html',
        url: '/es.html',
        translatorMarkdown: 'Traducido por [Juan Carlos Ponce Campuzano](https://www.jcponce.com)',
    },
    { // German
        languageName: 'Deutsch',
        markdownFileName: 'content-de.md',
        title: 'Eine interaktive Einführung in die Fouriertransformation',
        description: 'Die Fouriertransformation ist ein Werkzeug, das für eine Vielzahl verschiedener Anwendungen genutzt werden kann. Diese Seite ist eine Einführung in die Funktionsweise und Anwendung der Fouriertransformation.',
        outFileName: 'de.html',
        url: '/de.html',
        translatorMarkdown: 'Übersetzt von Joni Rousu und [Frank H. Dürkopf](http://duerkopf.de)',
    },
	{ // Brazilian Portuguese
        languageName: 'Português',
        markdownFileName: 'content-pt-BR.md',
        title: 'Uma introdução interativa às transformadas de Fourier',
        description: 'Transformadas de Fourier são ferramentas utilizadas em vários contextos. Essa é uma explicação do que uma transformada de Fourier faz, e algumas maneiras diferentes que elas podem ser úteis.',
        outFileName: ['pt-br.html', 'pt_br.html'], // Backwards compatibility with any old links
        url: '/pt-br.html',
        translatorMarkdown: 'Traduzido por [Jean Oliveira Rodrigues de Araujo](https://twitter.com/_jaraujo_)',
    },
	{ // Chinese (simplified)
        languageName: '简体中文',
        markdownFileName: 'content-zh-CN.md',
        title: '傅里叶变换交互式入门',
        description: '傅里叶变换是一种在各个领域都经常使用的数学工具。这个网站将为你介绍傅里叶变换能干什么，为什么傅里叶变换非常有用，以及你如何利用傅里叶变换干漂亮的事。',
        outFileName: 'zh-cn.html',
        url: '/zh-cn.html',
        translatorMarkdown: '由[杜尚明](https://github.com/virtualwiz)翻译',
    },
	{ // Polish
        languageName: 'Polski',
        markdownFileName: 'content-pl.md',
        title: 'Interaktywny wstęp do transformaty Fouriera',
        description: 'Transformata Fouriera jest narzędziem, które znajduje zastosowanie w wielu rzeczach. Znajdziesz tu wyjaśnienie, co robi transformata Fouriera i kiedy bywa użyteczna. Dowiesz się też, jak za jej pomocą możesz tworzyć ciekawe i piękne rzeczy.',
        outFileName: 'pl.html',
        url: '/pl.html',
        translatorMarkdown: 'Przekład: [Jakub Górczyński](https://github.com/leavethevault)',
    },
	{ // Turkish
        languageName: 'Türkçe',
        markdownFileName: 'content-tr.md',
        title: 'Fourier Dönüşümlerine İnteraktif bir Giriş',
        description: 'Fourier dönüşümleri birçok farklı şeyin yapılmasında kullanılabilecek bir araçtır. Bu sayfa Fourier dönüşümlerinin işleyişini açıklamakta ve yararlı olabilecek bazı kullanım yollarını göstermektedir.',
        outFileName: 'tr.html',
        url: '/tr.html',
        translatorMarkdown: 'Çeviren: Harun Hindioğlu',
    },
	{ // Korean
        languageName: '한국어',
        markdownFileName: 'content-ko.md',
        title: '푸리에 변환을 반응형으로 소개합니다',
        description: '푸리에 변환은 여러 분야에 적재적소로 사용할 수 있는 도구입니다. 이 글에서는 푸리에 변환이 무엇이고, 어떻게 활용할 수 있는지 설명합니다.',
        outFileName: 'ko.html',
        url: '/ko.html',
        translatorMarkdown: '잇창명 번역, [RanolP](https://ranolp.github.io/) 검수',
    },
	{ // Italian
        languageName: 'Italiano',
        markdownFileName: 'content-it.md',
        title: `Un'interazione introduttiva alle trasformate di Fourier`,
        description: 'Le trasformate di Fourier sono uno strumento usato in molti campi diversi. Questa è una spiegazione su cosa fa una trasformata di Fourier e di alcuni modi in cui può essere utile.',
        outFileName: 'it.html',
        url: '/it.html',
        translatorMarkdown: 'Tradotto da Riccardo Buah',
    },
	{ // French
        languageName: 'Français',
        markdownFileName: 'content-fr.md',
        title: 'Une introduction interactive aux transformations de Fourier',
        description: 'Les transformations de Fourier sont un outil utilisé dans un tas de choses différentes. Ceci est une explication de ce que fait une transformation de Fourier, et des différentes manières dont elle peut être utile.',
        outFileName: 'fr.html',
        url: '/fr.html',
        translatorMarkdown: 'Traduit par [Florian Richoux](http://www.richoux.fr)',
    },
    { // Debug
        markdownFileName: 'debug.md',
        title: 'debug debug debug',
        description: 'debugbugbugbugbugbugbugbug',
        outFileName: 'debug.html',
        url: '/debug.html',
        translatorMarkdown: '',
    },
]

const contentDir = 'content/'
const buildDir = 'build/';

const markdownConverter = new showdown.Converter();

const template = fs.readFileSync('template.html').toString();

const languages = [];
for (const pageDatum of pageData) {
    if (!pageDatum.hasOwnProperty('languageName')) {
        continue;
    }
    languages.push({
        name: pageDatum.languageName,
        url: `/fourier${pageDatum.url}`,
    });
}
languages.sort((a, b) => a.name > b.name);
// And then put English at the front.
const english = languages.splice(languages.findIndex(l => l.name == "English"), 1)[0];
languages.unshift(english);

for (const pageDatum of pageData) {
    console.log(`Processing ${pageDatum.markdownFileName}`)
    // Read in content
    const markdown = fs.readFileSync(contentDir + pageDatum.markdownFileName).toString();

    // Convert to html
    const htmlContent = markdownConverter.makeHtml(markdown);
    const translator = markdownConverter.makeHtml(pageDatum.translatorMarkdown);

    // Fill into template
    const view = Object.assign({}, pageDatum);
    view.content = htmlContent;
    view.translator = translator;
    view.languages = languages;

    const html = mustache.render(template, view)
    // We might have a string or an array of strings. Convert it so we always have an array
    let outFileNames = pageDatum.outFileName;
    if (!(outFileNames instanceof Array)) {
        // Wrap in Array
        outFileNames = [outFileNames];
    }
    // Output to build directory.
    for (const outFileName of outFileNames) {
        console.log(`Writing to ${outFileName}`)
        fs.writeFileSync(buildDir + outFileName, html)
    }
}
