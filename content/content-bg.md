---
languageName: "Български"
title: "Интерактивно Въведение в Преобразованията на Фурие"
description: "Преобразованията на Фурие са инструмент, използван в много различни неща. Това е обяснение за какво прави преобразованието на Фурие и няколко начина, по които е полезно."
translatorMarkdown: "Преведено от Борислав Дочев"
outFileName: "bg.html"
---

Преобразованията на Фурие са инструмент, използван в много различни неща. Това е обяснение за какво прави преобразованието на Фурие и няколко начина, по които е полезно. И за как можеш да правиш красиви неща с него като например това:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Ще обясня как работи анимацията, а по пътя и преобразованията на Фурие!

До края ще имаш добра представа за:
- Какво прави преобразованието на Фурие
- Няколко практични приложения на преобразованията на Фурие
- Няколко безсмислени, но готини приложения на преобразованията на Фурие

Засега ще оставим уравненията и математиката извън обяснението. Има купчина интересна математика зад него, но е по-добре да започнем с какво е и какво наистина прави, и защо ще желаеш да го използваш на първо място. Има няколко предложения за допълнително четене, ако желаеш да разбереш повече относно как работи!

## Какво е това нещо?

Казано просто, преобразованието на Фурие е начин да разбиеш нещо на много синусови вълни. Както винаги, името идва от човек, живял преди много години, на име Фурие.

Нека започнем с няколко прости примера и постепенно ще надградим. Първо ще разгледаме вълните - модели, които се повтарят с времето. 

Ето примерна вълна:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Този вълнообразен модел може да бъде разделен на синусоиди. Това означава, че когато съберем двете синусови вълни, ще получим оригиналната вълна. 

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Преобразованието на Фурие е начин за нас да вземем комбинирана вълна и да си върнем обратно съставляващите я синусови вълни. В този пример почти можеш да го направиш наум, само като гледаш оригиналната вълна.  

Защо? Оказва се, че много неща в истинския живот си взаимодействат на база тези синусови вълни. Обикновено ги наричаме честотите на вълната. 

Най-очевидния пример е звукът – когато чуем звук, ние не чуваме драскулчестата вълна, а чуваме различните честоти на синусите, които изграждат звука. 

<button id="together-button" class="button">Пусни Целия Звук</button>

<button id="split-button-1" class="button">Пусни Висока Честота</button>

<button id="split-button-2" class="button">Пусни Ниска Честота</button>

Възможността да можеш да ги разделяш на компютър може да ни даде представа за какво всъщност чува човек. Можем да разберем колко висок или нисък даден звук е или да разберем коя нота е.

Можем да извършим този процес и на вълни, които не изглеждат като да са направени от синусоиди. 

Разгледай тази. Нарича се квадратна вълна.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Може да не изглежда като да е възможно, но и тя може да бъде разделена на синусови вълни.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Този път ни трябват много от тях - технически безкраен брой, за да я представим перфектно. С добавянето на повече и повече синусови вълни, моделът изглежда все по-близък до квадратната вълна с която започнахме.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Пусни Вълна</button>

*Плъзни слайдерът отгоре, за да си поиграеш с колко синусови вълни има.*

Визуално ще забележиш, че всъщност само първите няколко синусови вълни са тези, които правят най-голямата разлика. Дори със слайдера наполовина, имаме общата форма на вълната, но е леко раздвижена. Просто ни трябват и останалите от малките вълни, за да я изгладим. 

Когато слушаш вълната, ще чуеш как звукът се снижава, защото премахваме по-високите честоти.

Този процес работи за всяка повтаряща се вълна. Давай, нарисувай своя!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Рисувай тук!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Пусни Вълна</button>

*Мести слайдера, за да видиш как с добавянето на повече синусоиди, толкова повече се приближава до оригиналната ти рисунка*

Отново, освен допълнителната раздвиженост, вълната изглежда доста сходно само с половината синусови вълни.

Всъщност можем да използваме факта, че вълната е доста сходна за наша ползва. Когато използваме преобразованието на Фурие, можем да извадим важните части на даден звук и само тях да запазим. Така ще получим нещо, което е доста сходно на оригиналния звук.

Обикновено на компютър пазим вълните като последователност от точки.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Вместо това, можем да я запазим като купчина синусови вълни. След това компресираме звука, като игнорираме по-малките честоти. Крайният резултат няма да бъде същия, но ще звучи доста сходно на човек.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

По същество MP3-те правят това, само че те са по-хитри относно кои честоти запазват и кои премахват.

В този случай използваме преобразования на Фурие, за да добием представа за основните характеристики на дадена вълна и после можем да правим неща като компресия.

Нека задълбаем повече в преобразованието на Фурие. Следващата част ще изглежда готино, но също ще ти помогне да разбереш какво прави преобразованието. Но предимно изглежда готино.

## Епицикли

В началото казах, че разделя неща на синусови вълни. Работата е там, че синусовите вълни, които създава не са обикновени синусови вълни, а 3Д. Можеш да ги наречеш "комплексни синусодии". Или просто "спирали".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Ако ги погледнем от тази страна, приличат на синусови вълни. А отпред като кръгове.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Досега всичко, което правихме изискваше само обикновените 2Д синусови вълни. Когато правим преобразование на Фурие на 2Д вълни, комплексните части се анулират, така че да ни останат синусовите вълни.

Но можем да използваме 3Д синусовите вълни, за да направим нещо забавно, което изглежда така:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Какво се случва тук?

Еми, можем да си мислим за тази рисунка като 3Д фигура поради начинa по който се движи във времето. Ако си представиш ръката като да бъде рисувана от човек, трите измерения представлявят къде е върхът на молива в даден момент. Х и Y измеренията ни казват позицията и времевото измерение е времето в този момент.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Сега, когато имаме 3Д модел не можем да използваме нормалните 2Д синусови вълни, за да го представим. Колкото и 2Д синусови вълни да събираме, никога няма да стигнем нещо 3Д. Затова ни трябва нещо друго.

Това, което можем да използваме е 3Д спиралата на синусовите вълни от преди. Ако съберем много от тях, можем да получим нещо, което изглежда на нашия 3Д модел.

Спомни си, че тези вълни изглеждат като кръгове, когато ги погледнем от отпред. Този модел на кръг, движещ се около друг кръг, се нарича епицикъл.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Използвай слайдера по-горе, за да контролираш колко кръгове има.*

Както преди, получаваме доста добро приближение на нашия модел само с няколко кръга. Тъй като това е доста проста форма, последните кръгове само правят ръбовете малко по-остри.

Всичко това важи за всяка рисунка. Наистина! Сега е твоят шанс да си поиграеш с това.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Рисувай тук!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Undo</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Използвай слайдера, за да контролираш колко кръгчета са използвани за рисунката ти*

Отново, ще видиш, че повечето фигури можем да ги приближим сравнително точно само с малък брой кръгове, вместо да пазим всички точки.

Можем ли да използваме това за истински данни? Ами, да можем! В действителност имаме друг формат данни, наречен SVG, който вероятно се справя по-добре с видовете рисунки, които обикновено правим. Засега, това е просто начин да правим готини малки gif-чета.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Все пак има и друг вид визуални данни, които използват преобразованието на Фурие.

## JPEGs

Знаеше ли, че преобразованието на Фурие също може да бъде използвано върху изображения? Всъщност, ние го използваме през цялото време, тъй като JPEG изображенията работят така! Прилагаме същите принципи върху снимки - разбиваме нещо на купчина синусови вълни и запазваме само важните.

Сега като работим с изображения, трябва да използваме друг тип синусова вълна. Трябва да имаме нещо, което независимо от каква снимка му дадем, да можем да съберем няколко от тези синусови вълни, за да получим обратно оригиналното изображение.

За да направим това, всяка от синусовите ни вълни също трябва да бъдат изображение. Вместо вълна, която е линия, ще имаме снимки с бели и черни части. Всяко изображение ще има повече или по-малко контраст, за да можем да представим размерът на вълната.

Можем да ги използваме и за да представим цвят по същия начин, но нека започнем с черно-бели снимки. За да представим безцветно изображение, ни трябват няколко изображения на хоризонтални вълни:

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Както и на няколко вертикални вълни.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Самостоятелно само хоризонтални и вертикални изображения не са достатъчно, за да представим видовете снимки, които имаме. Ще ни трябват още няколко, които получаваме при умножение на вертикални и хоризонтални едни с други.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Ето всичките снимки, които ни трябват за 8х8 на снимка.

<div class="img-component-container">
    <img src="img/components-0-0.png" class="img-component">
    <img src="img/components-0-1.png" class="img-component">
    <img src="img/components-0-2.png" class="img-component">
    <img src="img/components-0-3.png" class="img-component">
    <img src="img/components-0-4.png" class="img-component">
    <img src="img/components-0-5.png" class="img-component">
    <img src="img/components-0-6.png" class="img-component">
    <img src="img/components-0-7.png" class="img-component">
    <img src="img/components-1-0.png" class="img-component">
    <img src="img/components-1-1.png" class="img-component">
    <img src="img/components-1-2.png" class="img-component">
    <img src="img/components-1-3.png" class="img-component">
    <img src="img/components-1-4.png" class="img-component">
    <img src="img/components-1-5.png" class="img-component">
    <img src="img/components-1-6.png" class="img-component">
    <img src="img/components-1-7.png" class="img-component">
    <img src="img/components-2-0.png" class="img-component">
    <img src="img/components-2-1.png" class="img-component">
    <img src="img/components-2-2.png" class="img-component">
    <img src="img/components-2-3.png" class="img-component">
    <img src="img/components-2-4.png" class="img-component">
    <img src="img/components-2-5.png" class="img-component">
    <img src="img/components-2-6.png" class="img-component">
    <img src="img/components-2-7.png" class="img-component">
    <img src="img/components-3-0.png" class="img-component">
    <img src="img/components-3-1.png" class="img-component">
    <img src="img/components-3-2.png" class="img-component">
    <img src="img/components-3-3.png" class="img-component">
    <img src="img/components-3-4.png" class="img-component">
    <img src="img/components-3-5.png" class="img-component">
    <img src="img/components-3-6.png" class="img-component">
    <img src="img/components-3-7.png" class="img-component">
    <img src="img/components-4-0.png" class="img-component">
    <img src="img/components-4-1.png" class="img-component">
    <img src="img/components-4-2.png" class="img-component">
    <img src="img/components-4-3.png" class="img-component">
    <img src="img/components-4-4.png" class="img-component">
    <img src="img/components-4-5.png" class="img-component">
    <img src="img/components-4-6.png" class="img-component">
    <img src="img/components-4-7.png" class="img-component">
    <img src="img/components-5-0.png" class="img-component">
    <img src="img/components-5-1.png" class="img-component">
    <img src="img/components-5-2.png" class="img-component">
    <img src="img/components-5-3.png" class="img-component">
    <img src="img/components-5-4.png" class="img-component">
    <img src="img/components-5-5.png" class="img-component">
    <img src="img/components-5-6.png" class="img-component">
    <img src="img/components-5-7.png" class="img-component">
    <img src="img/components-6-0.png" class="img-component">
    <img src="img/components-6-1.png" class="img-component">
    <img src="img/components-6-2.png" class="img-component">
    <img src="img/components-6-3.png" class="img-component">
    <img src="img/components-6-4.png" class="img-component">
    <img src="img/components-6-5.png" class="img-component">
    <img src="img/components-6-6.png" class="img-component">
    <img src="img/components-6-7.png" class="img-component">
    <img src="img/components-7-0.png" class="img-component">
    <img src="img/components-7-1.png" class="img-component">
    <img src="img/components-7-2.png" class="img-component">
    <img src="img/components-7-3.png" class="img-component">
    <img src="img/components-7-4.png" class="img-component">
    <img src="img/components-7-5.png" class="img-component">
    <img src="img/components-7-6.png" class="img-component">
    <img src="img/components-7-7.png" class="img-component">
</div>

Ако вземем тези снимки и им настроим контраста правилно, а след това ги съберем, можем да пресъздадем всяка снимка.

Нека започнем с тази буква 'A'. Доста е малка, но ни трябва да е малка, защото иначе ще имаме твърде много други снимки.

<img src="img/a.png" class="sketch sketch-letter">

Като прибавяме още и още от тези снмки, получаваме нещо, което става все по-близко до истинската снимка. Но може би виждаш модела, че имаме допустимо приближение само с няколко от тях.

<div class="hidden-preload">
    <img src="img/img-buildup-0-0.png">
    <img src="img/img-buildup-0-1.png">
    <img src="img/img-buildup-0-2.png">
    <img src="img/img-buildup-0-3.png">
    <img src="img/img-buildup-0-4.png">
    <img src="img/img-buildup-0-5.png">
    <img src="img/img-buildup-0-6.png">
    <img src="img/img-buildup-0-7.png">
    <img src="img/img-buildup-1-0.png">
    <img src="img/img-buildup-1-1.png">
    <img src="img/img-buildup-1-2.png">
    <img src="img/img-buildup-1-3.png">
    <img src="img/img-buildup-1-4.png">
    <img src="img/img-buildup-1-5.png">
    <img src="img/img-buildup-1-6.png">
    <img src="img/img-buildup-1-7.png">
    <img src="img/img-buildup-2-0.png">
    <img src="img/img-buildup-2-1.png">
    <img src="img/img-buildup-2-2.png">
    <img src="img/img-buildup-2-3.png">
    <img src="img/img-buildup-2-4.png">
    <img src="img/img-buildup-2-5.png">
    <img src="img/img-buildup-2-6.png">
    <img src="img/img-buildup-2-7.png">
    <img src="img/img-buildup-3-0.png">
    <img src="img/img-buildup-3-1.png">
    <img src="img/img-buildup-3-2.png">
    <img src="img/img-buildup-3-3.png">
    <img src="img/img-buildup-3-4.png">
    <img src="img/img-buildup-3-5.png">
    <img src="img/img-buildup-3-6.png">
    <img src="img/img-buildup-3-7.png">
    <img src="img/img-buildup-4-0.png">
    <img src="img/img-buildup-4-1.png">
    <img src="img/img-buildup-4-2.png">
    <img src="img/img-buildup-4-3.png">
    <img src="img/img-buildup-4-4.png">
    <img src="img/img-buildup-4-5.png">
    <img src="img/img-buildup-4-6.png">
    <img src="img/img-buildup-4-7.png">
    <img src="img/img-buildup-5-0.png">
    <img src="img/img-buildup-5-1.png">
    <img src="img/img-buildup-5-2.png">
    <img src="img/img-buildup-5-3.png">
    <img src="img/img-buildup-5-4.png">
    <img src="img/img-buildup-5-5.png">
    <img src="img/img-buildup-5-6.png">
    <img src="img/img-buildup-5-7.png">
    <img src="img/img-buildup-6-0.png">
    <img src="img/img-buildup-6-1.png">
    <img src="img/img-buildup-6-2.png">
    <img src="img/img-buildup-6-3.png">
    <img src="img/img-buildup-6-4.png">
    <img src="img/img-buildup-6-5.png">
    <img src="img/img-buildup-6-6.png">
    <img src="img/img-buildup-6-7.png">
    <img src="img/img-buildup-7-0.png">
    <img src="img/img-buildup-7-1.png">
    <img src="img/img-buildup-7-2.png">
    <img src="img/img-buildup-7-3.png">
    <img src="img/img-buildup-7-4.png">
    <img src="img/img-buildup-7-5.png">
    <img src="img/img-buildup-7-6.png">
    <img src="img/img-buildup-7-7.png">
</div>
<div id="letter-buildup" class="multi-container">
<img id="letter-buildup-letter" src="img/img-buildup-0-0.png" class="sketch sketch-letter">
<div id="letter-buildup-components" class="img-component-container">
    <img src="img/img-components-0-0.png" class="img-component">
    <img src="img/img-components-0-1.png" class="img-component">
    <img src="img/img-components-0-2.png" class="img-component">
    <img src="img/img-components-0-3.png" class="img-component">
    <img src="img/img-components-0-4.png" class="img-component">
    <img src="img/img-components-0-5.png" class="img-component">
    <img src="img/img-components-0-6.png" class="img-component">
    <img src="img/img-components-0-7.png" class="img-component">
    <img src="img/img-components-1-0.png" class="img-component">
    <img src="img/img-components-1-1.png" class="img-component">
    <img src="img/img-components-1-2.png" class="img-component">
    <img src="img/img-components-1-3.png" class="img-component">
    <img src="img/img-components-1-4.png" class="img-component">
    <img src="img/img-components-1-5.png" class="img-component">
    <img src="img/img-components-1-6.png" class="img-component">
    <img src="img/img-components-1-7.png" class="img-component">
    <img src="img/img-components-2-0.png" class="img-component">
    <img src="img/img-components-2-1.png" class="img-component">
    <img src="img/img-components-2-2.png" class="img-component">
    <img src="img/img-components-2-3.png" class="img-component">
    <img src="img/img-components-2-4.png" class="img-component">
    <img src="img/img-components-2-5.png" class="img-component">
    <img src="img/img-components-2-6.png" class="img-component">
    <img src="img/img-components-2-7.png" class="img-component">
    <img src="img/img-components-3-0.png" class="img-component">
    <img src="img/img-components-3-1.png" class="img-component">
    <img src="img/img-components-3-2.png" class="img-component">
    <img src="img/img-components-3-3.png" class="img-component">
    <img src="img/img-components-3-4.png" class="img-component">
    <img src="img/img-components-3-5.png" class="img-component">
    <img src="img/img-components-3-6.png" class="img-component">
    <img src="img/img-components-3-7.png" class="img-component">
    <img src="img/img-components-4-0.png" class="img-component">
    <img src="img/img-components-4-1.png" class="img-component">
    <img src="img/img-components-4-2.png" class="img-component">
    <img src="img/img-components-4-3.png" class="img-component">
    <img src="img/img-components-4-4.png" class="img-component">
    <img src="img/img-components-4-5.png" class="img-component">
    <img src="img/img-components-4-6.png" class="img-component">
    <img src="img/img-components-4-7.png" class="img-component">
    <img src="img/img-components-5-0.png" class="img-component">
    <img src="img/img-components-5-1.png" class="img-component">
    <img src="img/img-components-5-2.png" class="img-component">
    <img src="img/img-components-5-3.png" class="img-component">
    <img src="img/img-components-5-4.png" class="img-component">
    <img src="img/img-components-5-5.png" class="img-component">
    <img src="img/img-components-5-6.png" class="img-component">
    <img src="img/img-components-5-7.png" class="img-component">
    <img src="img/img-components-6-0.png" class="img-component">
    <img src="img/img-components-6-1.png" class="img-component">
    <img src="img/img-components-6-2.png" class="img-component">
    <img src="img/img-components-6-3.png" class="img-component">
    <img src="img/img-components-6-4.png" class="img-component">
    <img src="img/img-components-6-5.png" class="img-component">
    <img src="img/img-components-6-6.png" class="img-component">
    <img src="img/img-components-6-7.png" class="img-component">
    <img src="img/img-components-7-0.png" class="img-component">
    <img src="img/img-components-7-1.png" class="img-component">
    <img src="img/img-components-7-2.png" class="img-component">
    <img src="img/img-components-7-3.png" class="img-component">
    <img src="img/img-components-7-4.png" class="img-component">
    <img src="img/img-components-7-5.png" class="img-component">
    <img src="img/img-components-7-6.png" class="img-component">
    <img src="img/img-components-7-7.png" class="img-component">
</div>
</div>

За истинските JPEG снимки има още няколко детайла.

Снимката се разбива на части 8х8 и всяка от тях се разделя инвидивуално. Използваме множество от честоти, за да определим колко светъл или тъмен всеки пиксел е, а след това още две множества за цвета - един за червено-зелено и друг за синьо-жълто. Броят честоти, които използваме за всяка част, определя качеството на JPEG изображението.

Ето истинско JPEG изобразжение, което е увеличено, за да видим детайлите. Когато си играем с нивата на качество, можем да видим как се случва процесът.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Заключение

Нека преговорим:

- Преобразованията на Фурие са неща, които ни позволяват да вземем нещо и да го разбием на съставляващите го честоти.
- Честотите ни дават информация за основните свойства на нашите данни.
- Можем да компресираме данни, като запазваме само важните честоти.
- И също можем да правим готини анимации с купчина кръгчета.

Това е само повърхността на някои приложения. Преобразованието на Фурие е изключително силен инструмент, защото разделянето на неща на честоти е доста основно. Използва се в много области, включително в дизайн на интегрални схеми, сигнали на мобилини телефони, магнитно-резонанса томография (ЯМР) и квантова физика!

## Въпроси за любопитните

Изпуснах повечето математически неща тук, но ако си заинтересован в принципите и как работи, ето няколко въпроса, които да ти помогнат в проучването:
- Как представяш преобразованието на Фурие математически?
- Каква е разликата между преобразование на Фурие в продължително време и преобразование на Фурие в дискретно време?
- Как изчисляваш преобразованието на Фурие?
- Как извършваш преобразование на Фурие на цяла песен? (Вместо само на една нота.)

## Допълнително 'четене'

Няколко много добри ресурси, които можеш да разгледаш, за да научиш повече са:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Добра статия, която задълбава повече в математиката на какво се случва.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Прекрасно Youtube видео на 3Blue1Brown, което също обяснява математиката на преобразованята на Фурие от аудио перспектива.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Друга статия, която обяснява как можеш да използваш епицикли, за да нарисуваш крива. Разглежда се от перспективата на линейната алгебра.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
Разбира се и Уикипедия статия е доста добра.

## Авторът

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Аз съм Джез! Работя на пълен работен ден в [компания за търсене](https://www.google.com) по крайбрежието на САЩ и в свободното си време обичам да правя игри и интерактивни кодови неща като това!

Тази уеб страница е open-source и можеш да разгледаш кода в [GitHub](https://github.com/Jezzamonn/fourier)! Ако имаш обратна връзка или въпроси, можеш да ми пратиш имейл на <span id="email-text">fourier [at] jezzamon [dot] com</span>, или да ми пратиш tweet на [Twitter](https://twitter.com/jezzamonn).

Ако желаеш да разгледаш още от работата ми, разгледай [заглавната](/) ми страница. Ако искаш да видиш какво ще правя, можеш да последваш Twitter акаунта ми [@jezzamonn](https://twitter.com/jezzamonn)!
