تبدیل فوریه ابزاری است که کاربرد های گوناگونی دارد. این توضیحی است از 
 اینکه تبدیل فوریه چه کاری انجام می دهد، و کجا می تواند مفید واقع شود و چگونه می توانید با آن چیزهای زیبایی بسازید، مانند این:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

من قصد دارم نحوه عملکرد انیمیشن را توضیح دهم و در طول مسیر تبدیل فوریه را شرح دهم!

در پایان باید ایده خوبی در مورد آن داشته باشید
- تبدیل فوریه چه کاری انجام می دهد
- برخی از کاربردهای عملی تبدیل فوریه
- برخی استفاده های بیهوده اما جالب از تبدیل فوریه

فعلاً ریاضیات و معادلات را کنار می گذاریم. یکسری ریاضیات جالب پشت آن نهفته است، اما بهتر است با آنچه که در واقع انجام می دهد و چرا می خواهید از آن استفاده کنید، شروع کنید. اگر می‌خواهید در مورد این روش بیشتر بدانید، پیشنهادات بیشتری برای خواندن در زیر وجود دارد!

## خب حالا تبدیل فوریه چیه؟

به زبان ساده، تبدیل فوریه راهی برای تقسیم چیزی به دسته ای از امواج سینوسی است. طبق معمول، این نام از شخصی می آید که مدت ها پیش زندگی می کرد به نام فوریه.

بیایید با چند مثال ساده شروع کنیم و راه خود را ادامه دهیم. ابتدا به امواج نگاه می کنیم - الگوهایی که در طول زمان تکرار می شوند.

در اینجا یک مثال از موج آوردیم:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

این الگوی موج دار در اینجا می تواند به امواج سینوسی تقسیم شود. یعنی وقتی دو موج سینوسی را جمع می کنیم به موج اولیه برمی گردیم.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

تبدیل فوریه راهی است که ما می‌توانیم موج ترکیبی را بگیریم و هر یک از امواج سینوسی را دوباره خارج کنیم. در این مثال، فقط با نگاه کردن به موج اصلی، تقریباً می توانید این کار را در ذهن خود انجام دهید.

چرا؟ معلوم می شود که بسیاری از چیزها در دنیای واقعی بر اساس این امواج سینوسی تعامل دارند. ما معمولا آنها را فرکانس های موج می نامیم.

بارزترین مثال صدا است – وقتی صدایی به گوشمان می رسد، ما نه آن خط خمیده را، بلکه فرکانس های مختلف امواج سینوسی را می شنویم که صدا را می سازند.

<button id="together-button" class="button">پخش صدای موج</button>

<button id="split-button-1" class="button">پخش صدا با فرکانس بالا</button>

<button id="split-button-2" class="button">پخش صدا با فرکانس پایین</button>

توانایی تقسیم آنها در رایانه می تواند درک درستی از آنچه که شخص واقعاً می شنود به ما بدهد. ما می توانیم بفهمیم یک صدا چقدر بالا یا پایین است، یا بفهمیم که چه نتی است.

ما همچنین می‌توانیم از این فرآیند برای امواجی استفاده کنیم که به نظر نمی‌رسند از امواج سینوسی ساخته شده‌اند.

بیایید نگاهی به این یکی بیندازیم. به آن موج مربعی می گویند.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

شاید شبیه موج سینوسی نباشد، اما می تواند به امواج سینوسی تقسیم شود.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

ما این بار به تعداد زیادی از آنها نیاز داریم - از نظر فنی تعداد نامحدودی برای نشان دادن کامل آن. هر چه بیشتر و بیشتر امواج سینوسی را جمع می کنیم، الگو به موج مربعی که با آن شروع کردیم نزدیک و نزدیکتر می شود.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">پخش صدای موج</button>

*برای تغییر تعداد موج سینوسی، اسلایدر را جابجا کنید.*

از نظر بصری، متوجه خواهید شد که در واقع چند موج سینوسی اول، آنهایی هستند که بیشترین تفاوت را ایجاد می کنند. با جابجایی اسلایدر در اواسط، شکل کلی موج بدست می آید، اما هنوز مربعی نیست. در اینجا ما فقط به بقیه کوچیک ها نیاز داریم تا چروک ها صاف شوند.

وقتی به صدای موج گوش می‌دهید، می‌شنوید که صدا کمتر می‌شود، زیرا فرکانس‌های بالاتر را حذف می‌کنیم.

این فرآیند برای هر خط تکراری مانند آن کار می کند. دست به کار شوید، سعی کنید خودتان یک موج بکشید!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">اینجا بکشید!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">پخش صدای موج</button>

*اسلایدر را حرکت دهید تا ببینید که چگونه با اضافه کردن امواج سینوسی بیشتر، به طراحی شما نزدیک و نزدیکتر می شود.*

باز هم، جدای از پیچ و تاب اضافی، موج فقط با نیمی از امواج سینوسی بسیار شبیه به نظر می رسد.

ما در واقع می توانیم از این واقعیت که موج بسیار شبیه به مزیت ما است استفاده کنیم. با استفاده از تبدیل فوریه، می‌توانیم بخش‌های مهم یک صدا را دریافت کنیم و فقط آن‌ها را ذخیره کنیم تا در نهایت چیزی نزدیک به صدای اصلی باشد.

به طور معمول در یک کامپیوتر ما یک موج را به عنوان یک سری نقاط ذخیره می کنیم.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

کاری که می‌توانیم انجام دهیم این است که آن را به صورت دسته‌ای از امواج سینوسی نشان دهیم. سپس می توانیم صدا را با نادیده گرفتن فرکانس های کوچکتر فشرده کنیم. نتیجه نهایی ما یکسان نخواهد بود، اما بسیار شبیه خواهد بود.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

این در اصل کاری است که MP3 ها انجام می دهند، با این تفاوت که آنها در مورد اینکه کدام فرکانس ها را نگه می دارند و کدام فرکانس ها را دور می اندازند هوشمندتر هستند.

بنابراین در این مورد، می‌توانیم از تبدیل فوریه برای درک ویژگی‌های اساسی یک موج استفاده کنیم، و سپس می‌توانیم آن را برای مواردی مانند فشرده‌سازی استفاده کنیم.

خوب، حالا بیایید بیشتر به تبدیل فوریه بپردازیم. این قسمت بعدی جالب به نظر می رسد، اما همچنین درک بیشتری از آنچه تبدیل فوریه انجام می دهد به شما می دهد. 

## Epicycles

در ابتدا، گفتم که همه چیز را به امواج سینوسی تقسیم می کند. مسئله این است که امواج سینوسی که ایجاد می کند فقط امواج سینوسی معمولی نیستند، بلکه سه بعدی هستند. می توانید آنها را "سینوسوئیدهای پیچیده" بنامید. یا فقط "مارپیچ".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

اگر از پهلو نگاهی بیندازیم، شبیه امواج سینوسی هستند. اما از جلو، اینها شبیه دایره هستند.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

تا کنون هر کاری که انجام داده ایم فقط به امواج سینوسی دو بعدی معمولی نیاز داشته است. وقتی تبدیل فوریه را روی امواج دوبعدی انجام می‌دهیم، قسمت‌های پیچیده خنثی می‌شوند، بنابراین فقط به امواج سینوسی می‌رسیم.

اما می‌توانیم از امواج سینوسی سه‌بعدی استفاده کنیم تا چیزی سرگرم‌کننده مانند این بسازیم:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

چخبره اینجا؟

خب، ما می‌توانیم نقاشی را به‌عنوان یک شکل سه‌بعدی در نظر بگیریم، زیرا در زمان حرکت می‌کند. اگر تصور کنید که دستی توسط شخصی کشیده می شود، سه بعد نشان می دهد که نوک مداد او در آن لحظه کجاست. بعد x و y موقعیت را به ما می گوید و سپس بعد زمان، زمان در آن لحظه است.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

اکنون که یک الگوی سه بعدی داریم، نمی توانیم از امواج سینوسی دو بعدی معمولی برای نمایش آن استفاده کنیم. مهم نیست که چقدر از امواج سینوسی دوبعدی را جمع کنیم، هرگز چیزی سه بعدی نخواهیم داشت. پس ما به چیز دیگری نیاز داریم.

چیزی که ما می توانیم استفاده کنیم امواج سینوسی مارپیچ سه بعدی از قبل است. اگر تعداد زیادی از آن ها را جمع کنیم، می توانیم چیزی شبیه الگوی سه بعدی ما بدست آوریم.

به یاد داشته باشید، وقتی از جلو به آنها نگاه می کنیم، این امواج مانند دایره به نظر می رسند. نام الگوی دایره ای که به دور دایره ای دیگر حرکت می کند epicycles است.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*از اسلایدر بالا برای کنترل تعداد دایره ها استفاده کنید.*

مانند قبل، فقط با چند دایره تقریب بسیار خوبی از الگوی خود به دست می آوریم. از آنجایی که این یک شکل نسبتاً ساده است، آخرین کاری که انجام می دهد این است که لبه ها را کمی تیزتر کند.

همه اینها برای هر نقاشی صدق می کند، واقعا! اکنون این شانس شماست که با آن بازی کنید.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">بکشید!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">برگشت</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*از اسلایدر برای کنترل تعداد دایره هایی که برای طراحی شما استفاده می شود استفاده کنید*

باز هم، خواهید دید برای اکثر اشکال، ما می توانیم آنها را به خوبی با تعداد کمی دایره تقریب بزنیم، به جای اینکه همه نقاط را ذخیره کنیم.

آیا می توانیم از این برای داده های واقعی استفاده کنیم؟ خوب، می توانیم! در واقع ما فرمت داده دیگری به نام SVG داریم که احتمالاً برای انواع اشکالی که ما تمایل به ایجاد آن داریم کار بهتری انجام می دهد. بنابراین در حال حاضر، این واقعاً فقط برای ساختن گیف های کوچک جالب است.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

با این حال، نوع دیگری از داده های بصری وجود دارد که از تبدیل فوریه استفاده می کند.

## JPEGs

آیا می دانید تبدیل فوریه را می توان روی تصاویر نیز استفاده کرد؟ در واقع ما همیشه از آن استفاده می کنیم، زیرا JPEG ها اینگونه کار می کنند! ما اصول مشابهی را برای تصاویر به کار می بریم - چیزی را به دسته ای از امواج سینوسی تقسیم می کنیم و سپس تنها موارد مهم را ذخیره می کنیم.

اکنون که ما با تصاویر سروکار داریم، به نوع دیگری از موج سینوسی نیاز داریم. ما باید چیزی داشته باشیم، مهم نیست چه تصویری در اختیار داریم، ما می توانیم دسته ای از این امواج سینوسی را جمع کنیم تا به تصویر اصلی خود برسیم.

برای انجام این کار، هر یک از امواج سینوسی ما نیز به جای موجی که یک خط است، تصویر خواهد بود، اکنون تصاویری با بخش های سیاه و سفید داریم. برای نشان دادن اندازه یک موج، هر تصویر کنتراست کم و بیش خواهد داشت.

ما همچنین می‌توانیم از اینها برای نمایش رنگ به همان شیوه استفاده کنیم، اما فعلاً با تصاویر سیاه و سفید شروع می‌کنیم. برای نمایش تصاویر بی رنگ، به تعدادی تصویر موج افقی نیاز داریم،

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

همراه با چند تصویر موج عمودی.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

به خودی خود، فقط تصاویر افقی و عمودی برای نشان دادن انواع تصاویری که دریافت می کنیم کافی نیست. ما همچنین به تعدادی تصویر اضافی نیاز داریم که با ضرب این دو به دست می آورید.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

برای یک تصویر 8x8، در اینجا تمام تصاویری که نیاز داریم وجود دارد.

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

اگر تصاویر را بگیریم، کنتراست آنها را به مقدار مناسب تنظیم کنیم و سپس آنها را با هم جمع کنیم، می توانیم هر تصویری را ایجاد کنیم.

بیایید با حرف "A" شروع کنیم. خیلی کوچک است، اما باید کوچک باشد، در غیر این صورت با تعداد زیادی تصاویر دیگر مواجه خواهیم شد.

<img src="img/a.png" class="sketch sketch-letter">

هرچه بیشتر و بیشتر از این تصاویر اضافه می کنیم، به چیزی می رسیم که به تصویر واقعی نزدیک و نزدیک تر می شود. اما من فکر می‌کنم الگو را در اینجا خواهید دید، زیرا ما فقط با تعداد کمی از آنها یک تقریب معقول به دست می‌آوریم.

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

برای تصاویر JPEG واقعی فقط چند جزئیات اضافی وجود دارد.

تصویر به تکه‌های ۸×۸ تقسیم می‌شود و هر تکه جداگانه تقسیم می‌شود. ما از مجموعه ای از فرکانس ها برای تعیین روشن یا تیره بودن هر پیکسل استفاده می کنیم و سپس از دو مجموعه دیگر برای رنگ، یکی برای قرمز-سبز و دیگری برای آبی-زرد استفاده می کنیم. تعداد فرکانس هایی که برای هر قطعه استفاده می کنیم، کیفیت JPEG را تعیین می کند.

در اینجا یک تصویر JPEG واقعی است که بزرگنمایی شده است تا بتوانیم جزئیات را ببینیم. وقتی با سطوح کیفی بازی می کنیم، می توانیم شاهد وقوع این روند باشیم.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## نتیجه گیری

پس بیایید خلاصه کنیم:

- تبدیل فوریه به ما این امکان را می دهد یک چیز را به فرکانس هایش تقسیم کنیم.
- فرکانس ها  به ما اطلاعاتی در مورد برخی از ویژگی های اساسی داده هایی که داریم می دهند
- و می تواند داده ها را تنها با ذخیره سازی فرکانس های مهم فشرده کند
- و همچنین می‌توانیم از آن‌ها برای ساختن انیمیشن‌های جذاب با دسته‌ای از دایره‌ها استفاده کنیم

این فقط بخشی از کاربرد های تبدیل فوریه است. تبدیل فوریه ابزار بسیار قدرتمندی است، زیرا تقسیم چیزها به فرکانس ها بسیار اساسی است. آنها در زمینه های زیادی از جمله طراحی مدار، سیگنال های تلفن همراه، تصویربرداری تشدید مغناطیسی (MRI) و فیزیک کوانتومی استفاده می شوند!

## Questions for the curious

من از بسیاری از مطالب ریاضی در اینجا صرف نظر کردم، اما اگر به اصول اساسی نحوه عملکرد آن علاقه مند هستید، در اینجا چند سؤال وجود دارد که می توانید برای هدایت تحقیق خود از آنها استفاده کنید:

- چگونه از نظر ریاضی تبدیل فوریه را نشان می دهید؟
- تفاوت بین تبدیل فوریه زمان پیوسته و تبدیل فوریه زمان گسسته چیست؟
- چگونه از نظر محاسباتی تبدیل فوریه را انجام می دهید؟
- چگونه تبدیل فوریه یک آهنگ کامل را انجام می دهید؟ (به جای فقط یک یادداشت.)

## برای مطالعه بیشتر

برای کسب اطلاعات بیشتر، برخی از منابع واقعا خوب که می توانید بررسی کنید عبارتند از:

[راهنمای تعاملی برای تبدیل فوریه](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
مقاله ای عالی که بیشتر به ریاضیات آنچه اتفاق می افتد می پردازد.

[اما تبدیل فوریه چیست؟ یک معرفی تصویری](https://www.youtube.com/watch?v=spUNpyF58BY)
یک ویدیوی عالی در یوتیوب توسط 3Blue1Brown، که همچنین ریاضیات تبدیل فوریه را از منظر صوتی توضیح می دهد.

[داستان ریاضی و هنر: ایجاد تجسم دایره های هارمونیک سری فوریه](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
مقاله دیگری توضیح می دهد که چگونه می توانید از epicycle ها برای ترسیم یک مسیر استفاده کنید، از دیدگاه جبر خطی توضیح داده شده است.

[تبدیل فوریه (ویکی پدیا)](https://en.wikipedia.org/wiki/Fourier_transform)
و البته، مقاله ویکی پدیا نیز بسیار خوب است.

## نویسنده

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

من جیز هستم! من به صورت تمام وقت در یک [شرکتی که کار جستجو را انجام می دهد](https://www.google.com/) در منطقه خلیج کار می کنم، و در اوقات فراغت دوست دارم بازی ها و چیزهای تعاملی مانند این بسازم!

این صفحه وب منبع باز است، می توانید کد را در [GitHub](https://github.com/Jezzamonn/fourier) بررسی کنید! اگر بازخوردی دارید یا می‌خواهید سؤالی بپرسید، در صورت تمایل به ایمیل fourier@jezzamon.com برای من ایمیل بزنید یا یک توییت در [Twitter](https://twitter.com/jezzamonn) برای من ارسال کنید.

If you want to see more of my work, check out my [homepage](/), and if you want to see what I'm making next, you can follow my Twitter account, [@jezzamonn](https://twitter.com/jezzamonn)!

اگر می‌خواهید کارهای بیشتری از من ببینید، [صفحه اصلی](/) من را بررسی کنید، و اگر می‌خواهید ببینید که در مرحله بعد چه می‌سازم، می‌توانید حساب توییتر من را دنبال کنید، [@jezzamonn](https://twitter.com/jezzamonn)!