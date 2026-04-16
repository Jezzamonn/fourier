---
languageName: "Ukrainian"
title: "Інтерактивний вступ до перетворень Фур’є"
description: "Перетворення Фур’є — це інструмент, який використовується в багатьох різних сферах. Це пояснення того, що робить перетворення Фур’є, а також деякі способи, як воно може бути корисним."
translatorMarkdown: "Переклад українською – [Єгор Коротенко](https://korotenky.com/)"
outFileName: "ua.html"
---

Перетворення Фур'є — це інструмент, який використовується в багатьох різних
сферах. Ця стаття є поясненням того, що робить перетворення Фур'є, та деяких способів
його корисного застосування. А також того, як з його допомогою можна створювати
гарні речі, як-от цю:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Я збираюся пояснити, як працює ця анімація, і попутно розповісти про перетворення Фур'є!

Наприкінці ви матимете хороше уявлення про:
- Те, що робить перетворення Фур'є
- Деякі практичні застосування перетворень Фур'є
- Деякі безглузді, але круті застосування перетворень Фур'є

Наразі ми залишимо математику та рівняння осторонь. За цим стоїть багато
цікавої математики, але краще спочатку почати з того, що воно насправді робить
і навіщо його використовувати. Якщо ви хочете дізнатися більше про те, як саме
це працює, нижче наведено список рекомендованої літератури!

## То що ж це таке?

Простіше кажучи, перетворення Фур'є — це спосіб розкласти щось на набір
синусоїд. Як зазвичай, назва походить від імені людини, яка жила давно, на
прізвище Фур'є.

Почнемо з кількох простих прикладів і поступово перейдемо до складніших. Спершу
ми розглянемо хвилі — закономірності, що повторюються з часом.

Ось приклад хвилі:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>


Цей хвилястий візерунок можна розкласти на синусоїдальні хвилі. Тобто, коли ми
додаємо ці дві синусоїдальні хвилі, ми знову отримуємо вихідну хвилю.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>


Перетворення Фур'є — це спосіб, що дозволяє нам узяти комбіновану хвилю і знову
отримати кожну з синусоїдальних хвиль. У цьому прикладі ви можете зробити це
майже в умі, просто поглянувши на початкову хвилю.

Навіщо? Виявляється, чимало речей у реальному світі взаємодіють на основі цих синусоїдальних хвиль. Ми зазвичай називаємо їх частотами хвилі.

Найбільш очевидним прикладом є звук — коли ми чуємо звук, ми не чуємо цю
хвилясту лінію, а чуємо різні частоти синусоїдальних хвиль, що утворюють цей
звук.

<button id="together-button" class="button">Відтворити повну хвилю</button>

<button id="split-button-1" class="button">Відтворити високу частоту</button>


<button id="split-button-2" class="button">Відтворити низьку частоту</button>

Можливість розділити їх на комп'ютері може дати нам розуміння того, що
насправді чує людина. Ми можемо зрозуміти, наскільки високим чи низьким є звук,
або визначити, яка це нота.

Ми також можемо застосовувати цей процес до хвиль, які не виглядають так, ніби
вони складаються з синусоїдальних хвиль.

Давайте поглянемо на цей приклад. Він називається прямокутним сигналом.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>


Це не так легко помітити, але його також можна розкласти на синусоїди.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>


Цього разу нам потрібно їх багато — технічно, нескінченна кількість, щоб
ідеально її представити. У міру того як ми додаємо все більше і більше
синусоїд, патерн стає все ближчим і ближчим до прямокутної хвилі, з якої ми
починали.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Відтворити хвилю</button>

*Перетягніть повзунок угорі, щоб поекспериментувати з кількістю синусоїд.*

Візуально ви помітите, що насправді саме перші кілька синусоїд вносять
найбільшу різницю. Коли повзунок знаходиться на середині, ми маємо загальну
форму хвилі, але вона вся хвиляста. Нам просто потрібна решта малих хвиль, щоб
згладити цю хвилястість.

Коли ви послухаєте хвилю, ви почуєте, як звук стає нижчим, оскільки ми видаляємо вищі частоти.

Цей процес працює так само для будь-якої лінії, що повторюється. Cпробуйте намалювати власну!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Малюйте тут!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Відтворити хвилю</button>


*Переміщуйте повзунок, щоб побачити, як у міру додавання більшої кількості
синусоїд результат стає все ближчим і ближчим до вашого малюнка*

Знову ж таки, окрім додаткової хвилястості, хвиля виглядає досить схожою лише з
половиною синусоїд.

Ми, на справді, можемо використати той факт, що хвиля є досить схожою, собі на
користь. За допомогою перетворення Фур’є ми можемо виділити важливі частини
звуку та зберегти лише їх, щоб отримати результат, досить близький до
оригінального звуку.

Зазвичай на комп’ютері ми зберігаємо хвилю як послідовність точок.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>


Натомість ми можемо представити його як набір синусоїдальних хвиль. Тоді ми
зможемо стиснути звук, ігноруючи менші частоти. Наш кінцевий результат не буде
таким самим, але для людини він звучатиме досить схоже.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>


Це, по суті, те, що роблять MP3-файли, за винятком того, що вони винахідливіше
вибирають, які частоти залишати, а які відкидати.

Отже, у цьому випадку ми можемо використовувати перетворення Фур'є, щоб
зрозуміти фундаментальні властивості хвилі, а потім ми можемо використовувати
це для таких речей, як стиснення.

Гаразд, тепер давайте детальніше заглибимося в перетворення Фур'є. Ця наступна
частина виглядає круто, а також дає трохи краще розуміння того, що саме робить
перетворення Фур'є. Але здебільшого вона просто класно виглядає.

## Епіцикли

На самому початку я сказав, що воно розкладає все на синусоїди. Річ у тім, що
створювані ним синусоїди — це не просто звичайні синусоїди, вони тривимірні. Ви
могли б назвати їх «комплексними синусоїдами». Або просто «спіралями».

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>


Якщо поглянути збоку, вони виглядають як синусоїди. Однак спереду вони виглядають як кола.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>


Дотепер усе, що ми робили, потребувало лише звичайних двовимірних
синусоїдальних хвиль. Коли ми виконуємо перетворення Фур’є для двовимірних
хвиль, комплексні частини взаємно знищуються, тож у результаті ми отримуємо
лише синусоїдальні хвилі.

Але ми можемо використовувати 3D-синусоїди, щоб створити щось цікаве на вигляд, як-от це:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>


Що тут відбувається?

Що ж, ми можемо розглядати малюнок як тривимірну фігуру завдяки тому, як він
рухається в часі. Якщо ви уявите, як людина малює руку, ці три виміри
представляють положення кінчика її олівця в цей момент. Виміри x та y вказують
на положення, а часовий вимір — це час у цей момент.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>


Тепер, коли ми маємо 3D-патерн, ми не можемо використовувати звичайні
2D-синусоїди для його представлення. Скільки б 2D-синусоїд ми не додавали, ми
ніколи не отримаємо щось тривимірне. Тому нам потрібно щось інше.

Ми можемо використати тривимірні спіральні синусоїдальні хвилі, розглянуті
раніше. Якщо ми додамо велику кількість таких хвиль, ми зможемо отримати щось
схоже на нашу тривимірну структуру.

Пам’ятайте, ці хвилі виглядають як кола, коли ми дивимося на них спереду. Назва
візерунка, утвореного рухом одного кола навколо іншого, — епіцикл.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Використовуйте повзунок угорі, щоб керувати кількістю кіл.*

Як і раніше, ми отримуємо досить хороше наближення нашого візерунка лише за
допомогою кількох кіл. Оскільки це досить проста фігура, останні з них лише
роблять краї трохи чіткішими.

Усе це справді стосується будь-якого малюнка! Тепер у вас є можливість поекспериментувати з цим.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Малюйте тут!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Скасувати</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">



*Використовуйте повзунок, щоб керувати кількістю кіл, що використовуються для вашого малюнка*

Знову ж таки, ви побачите, що для більшості фігур ми можемо досить добре
апроксимувати(наблизити) їх за допомогою лише невеликої кількості кіл, замість того, щоб
зберігати всі точки.

Чи можемо ми використовувати це для реальних даних? Що ж, ми могли б! Насправді
у нас є інший формат даних під назвою SVG, який, мабуть, краще підходить для
тих типів фігур, які ми зазвичай створюємо. Тож наразі це справді лише для
створення крутих маленьких гіфок.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>


Однак існує інший тип візуальних даних, який використовує перетворення Фур’є.

## JPEG-файли

Чи знаєте ви, що перетворення Фур’є також можна використовувати для зображень?
Насправді ми використовуємо це постійно, оскільки саме так працюють JPEG! Ми
застосовуємо ті ж самі принципи до зображень — розкладаємо щось на низку
синусоїд, а потім зберігаємо лише найважливіші.

Тепер, коли ми маємо справу із зображеннями, нам потрібен інший тип синусоїди.
Нам потрібно щось таке, щоб незалежно від того, яке зображення ми маємо, ми
могли б скласти набір цих синусоїд, щоб повернутися до нашого початкового
зображення.

Для цього кожна з наших синусоїдальних хвиль також буде зображенням. Замість
хвилі у вигляді лінії ми тепер маємо зображення з чорними та білими ділянками.
Щоб відобразити амплітуду хвилі, кожне зображення матиме більшу або меншу
контрастність.

Ми також можемо використовувати їх для представлення кольору таким самим чином,
але наразі почнемо з чорно-білих зображень. Щоб представити безколірні
зображення, нам знадобляться певні зображення горизонтальних хвиль,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">


Разом із деякими зображеннями вертикальних хвиль.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">


Самих лише горизонтальних та вертикальних зображень недостатньо, щоб
представити типи зображень, які ми отримуємо. Нам також потрібні додаткові, які
можна отримати, перемноживши їх між собою.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>


Для зображення розміром 8x8 ось усі потрібні нам зображення.

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


Якщо ми візьмемо ці зображення, налаштуємо їхню контрастність до потрібного
рівня та додамо їх, ми зможемо створити будь-яке зображення.

Почнемо з цієї літери 'А'. Вона досить маленька, але вона має бути маленькою,
інакше ми отримаємо занадто багато інших зображень.

<img src="img/a.png" class="sketch sketch-letter">


У міру того як ми додаємо все більше й більше цих зображень, ми в результаті
отримуємо щось, що стає дедалі ближчим до справжнього зображення. Але, гадаю,
ви помітите тут закономірність, оскільки ми отримуємо прийнятне наближення лише
за допомогою кількох із них.

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


Для справжніх JPEG-зображень є лише кілька додаткових деталей.

Зображення розбивається на блоки 8x8, і кожен блок розділяється окремо. Ми
використовуємо набір частот, щоб визначити, наскільки світлим або темним є
кожен піксель, а потім ще два набори для кольору: один для червоно-зеленого і
ще один для синьо-жовтого. Кількість частот, які ми використовуємо для кожного
блоку, визначає якість JPEG.

Ось справжнє зображення JPEG, збільшене так, щоб ми могли бачити деталі. Коли
ми експериментуємо з рівнями якості, ми можемо побачити, як відбувається цей
процес.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>


## Висновок

Отже, підсумуємо:

- Перетворення Фур'є — це засоби, які дозволяють нам взяти щось і розбити це на частоти.
- Частоти повідомляють нам про деякі фундаментальні властивості наявних у нас даних
- І вони можуть стискати дані, зберігаючи лише важливі частоти
- А також ми можемо використовувати їх для створення крутих анімацій із безліччю кіл

Це лише поверхневий огляд деяких застосувань. Перетворення Фур'є — це
надзвичайно потужний інструмент, оскільки розкладання на частоти є дуже
фундаментальним. Вони використовуються в багатьох галузях, зокрема в
проектуванні схем, сигналах мобільного зв'язку, магнітно-резонансній томографії
(МРТ) та квантовій фізиці!

## Питання для допитливих

Я опустив більшу частину математичних подробиць, але якщо вас цікавлять основні
принципи того, як це працює, ось кілька запитань, якими ви можете керуватися у
своєму дослідженні:

- Як математично представити перетворення Фур'є?
- Яка різниця між неперервним перетворенням Фур'є та дискретним перетворенням Фур'є?
- Як виконати перетворення Фур'є обчислювальними методами?
- Як виконати перетворення Фур'є для цілої пісні? (А не лише для однієї ноти).


## Додаткові матеріали

Щоб дізнатися більше, ви можете ознайомитися з деякими дійсно чудовими
ресурсами:

[Інтерактивний посібник із перетворення
Фур'є](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Чудова стаття, яка детальніше розглядає математику того, що відбувається.

[Але що таке перетворення Фур'є? Візуальний
вступ.](https://www.youtube.com/watch?v=spUNpyF58BY)
Чудове відео на YouTube від 3Blue1Brown, де також пояснюється математика перетворень Фур'є з точки зору аудіо.

[Історія про математику та мистецтво: створення візуалізації гармонійних кіл
ряду
Фур'є](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Ще одна стаття, яка пояснює, як можна використовувати епіцикли для малювання
траєкторії, описана з точки зору лінійної алгебри.

[Перетворення Фур'є (Вікіпедія)](https://en.wikipedia.org/wiki/Fourier_transform)
І, звісно, стаття у Вікіпедії також досить хороша.

## Автор

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Я — Джез! Я працюю на повну ставку в [пошуковій
компанії](https://www.google.com/) у районі Затоки, а у вільний час мені
подобається створювати ігри та інтерактивні програмні штуки, подібні до цієї!

Ця вебсторінка має відкритий вихідний код, ви можете переглянути його на
[GitHub](https://github.com/Jezzamonn/fourier)! Якщо у вас є відгуки або ви
хочете поставити запитання, не соромтеся писати мені на <span
id="email-text">fourier [at] jezzamon [dot] com</span> або напишіть мені в
[Twitter](https://twitter.com/jezzamonn).

Якщо ви хочете побачити більше моїх робіт, завітайте на мою [домашню
сторінку](/), а якщо хочете дізнатися, що я створюватиму далі, ви можете
підписатися на мій Twitter-акаунт, [@jezzamonn](https://twitter.com/jezzamonn)!

## Переклад
Переклад українською мовою – Єгор Коротенко
[korotenky.com](https://korotenky.com/).
