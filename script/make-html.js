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

const oldPageDatas = [
    { // English
        languageName: 'English',
        markdownFileName: 'content.md',
        title: 'An Interactive Introduction to Fourier Transforms',
        description: 'Fourier transforms are a tool used in a whole bunch of different things. This is a explanation of what a Fourier transform does, and some different ways it can be useful.',
        outFileName: 'index.html',
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
    { // Chinese (traditional)
        languageName: '繁體中文',
        markdownFileName: 'content-zh-TW.md',
        title: '互動式傅立葉轉換介紹',
        description: '傅立葉轉換是用於許多不同事物中的工具。這裡以不同的方式介紹了傅立葉轉換能做些什麼事情。',
        outFileName: '/zh-tw.html',
        url: '/zh-tw.html',
        translatorMarkdown: '由[馬培鈞](https://etc.csu.edu.tw)翻譯',
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
    { // Slovak
        languageName: 'Slovenčina',
        markdownFileName: 'content-sk.md',
        title: 'Interkatívny úvod do Fourierovej transformácie',
        description: 'Fourierova transofrmácia je náradie používané vo veľa rôznych odvetviach. Tu máme vysvetlené, čo Furierova transformácia robí a niekoľko rôznych spôsobov ako nám môže byť užitočná.',
        outFileName: 'sk.html',
        url: '/sk.html',
        translatorMarkdown: 'Preložil: [Jakub Mintal](https://github.com/Straaths)',
    },
    {
        languageName: 'עברית',
        markdownFileName: 'content-he.md',
        title: 'מבוא אינטראקטיבי להתמרות פורייה',
        author: "ג'ז סוונסון",
        description: 'התמרות פורייה הן כלי שניתן להשתמש בו בתחומים רבים. כאן יינתן הסבר על מה שהתמרת פורייה עושה, ועל דרכים שונות שאפשר להשתמש בה. כמו על איך מכינים דברים יפים בעזרתה, כמו למשל הדבר הזה.',
        outFileName: 'he.html',
        url: '/he.html',
        textDirection: 'dir=rtl'
    },
    { // Persian
        languageName: 'فارسی',
        markdownFileName: 'content-fa.md',
        title: 'مقدمه ای تعاملی بر تبدیل فوریه',
        description: 'تبدیل فوریه ابزاری است که کاربرد های گوناگونی دارد. این  مقاله توضیحی است از اینکه تبدیل فوریه چه کاری انجام می دهد، و کجا می تواند مفید واقع شود و چگونه می توانید با آن چیزهای زیبایی بسازید.',
        outFileName: 'fa.html',
        url: '/fa.html',
        translatorMarkdown: 'ترجمه شده توسط [حسین نودهی](https://www.nothehi.ir)',
        textDirection: 'dir=rtl'
    },
    { // Azerbaijani
        languageName: 'Azərbaycanca',
        markdownFileName: 'content-az.md',
        title: 'Furye transformasiyalarına interaktiv giriş',
        description: 'Furye transformasiyaları müxtəlif işlərin hazırlanmasında istifadə edilə bilən bir vasitədir. Bu səhifədə Furye transformasiyasının necə işlədiyini izah edilir və bəzi faydalı istifadə nümunələri göstərilir.',
        outFileName: 'az.html',
        url: '/az.html',
        translatorMarkdown: 'Tərcümə edən: [Abbas Məcidov](https://github.com/absmj)',
    },
    { // Russian
        languageName: 'Русский',
        markdownFileName: 'content-ru.md',
        title: 'Интерактивное введение в преобразования Фурье',
        description: 'Преобразования Фурье - инструмент, который используется в самых разных сферах. Здесь приведено объяснение того, что делает преобразование Фурье, и чем оно может быть полезно.',
        outFileName: 'ru.html',
        url: '/ru.html',
        translatorMarkdown: 'Перевод: Дмитрий Берестовой ([GitHub](https://github.com/ye11owmonster))',
    },
    { // Debug
        markdownFileName: 'debug.md',
        title: 'debug debug debug',
        description: 'debugbugbugbugbugbugbugbug',
        outFileName: 'debug.html',
        url: '/debug.html',
    }
].map(d => Object.assign({}, defaultPageData, d));

const contentDir = 'content/'

const markdownConverter = new showdown.Converter();
const template = fs.readFileSync('template.html').toString();

export function exportAllLanguages({outputDir}) {
    // Read the metadata from all the markdown files.
    const pageDatas = oldPageDatas;
    // Set the 'markdown' property for all the old page data.
    for (const pageData of pageDatas) {
        const markdownPath = path.join(contentDir, pageData.markdownFileName);
        const markdown = fs.readFileSync(markdownPath, 'utf-8');
        pageData.markdown = markdown;
    }

    // // Read all the markdown files starting with "content" and ending with ".md".
    // const markdownFiles = fs.readdirSync(contentDir)
    //     .filter(f => f.startsWith('content') && f.endsWith('.md'));
    // for (const file of markdownFiles) {
    //     const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

    //     // Read the metadata from the top of the file.
    //     const frontMatterParsed = fm(content);
    //     const pageData = Object.assign(
    //         {},
    //         frontMatterParsed.attributes,
    //         {markdown: frontMatterParsed.body});
    //     pageDatas.push(pageData);
    // }

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
    languages.sort((a, b) => a.name > b.name);
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
