Furye transformasiyaları müxtəlif işlərin hazırlanmasında istifadə edilə bilən bir vasitədir. Bu səhifədə Furye transformasiyasının necə işlədiyini izah edilir və bəzi faydalı istifadə nümunələri göstərilir:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Furye transformasiyalarının bu animasiya üzərindən izah edəcəyəm!

Məqalənin sonunda:
- Furye transformasiyalarının əməliyyatları
- Furye transformasiyalarının bəzi praktiki istifadəsi
- Və furye transformasiyalarından bəzi "faydasız", lakin incə istifadə haqqında kifayət qədər məlumat əldə edəcəksiniz.

Hələki, riyaziyyat və tənlikləri "ixtisar edəcəyik". Furye transformasiyalarının özəyində çoxlu maraqlı riyazi əməliyyatlar var, amma mən onun əslində nə etdiyini və onu niyə istifadə etmək lazımdır konteksindən başlamaq istərdim. Mövzu haqqında daha çox öyrənmək istəyirsinizsə, aşağıda bəzi əlavə oxu təklifləri tapa bilərsiniz!

## Furye transformasiyası nədir?

Furye transformasiyası - modelin sinus dalğalarına ayrılması üsuludur. Bu üsulun adı, onun banisi olan fransız riyaziyyatçı və fizik Jozef Furye götürülüb.

Gəlin, əvvəlcə bir neçə sadə misaldan başlayaraq. İlk olaraq periodik təkrarlanan nümunələr olan dalğalara baxacağıq.

Məsələn:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Buradakı dalğa nümunəsi sinus dalğalarına bölünə bilər. Bu iki sinus dalğasını bir araya gətirsək, orijinal dalğanı yenidən alacağıq.

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Furye transformasiyası - birləşmiş dalğa əldə etmək və hər bir sinus dalğasını təkrar istehsal etmək üsuludur. Bu misalda siz bunu yalnız ilkin dalğaya baxaraq, demək olar ki, zehni olaraq edə bilərsiniz.

Necə? Belə görünür, real dünyada bir çox "məfhum" sinus dalğaları ilə qarşılıqlı təsirdədir. Biz onları adətən dalğa tezlikləri adlandıracağıq.

Bunun ən bariz nümunəsi səsdir. Səsi eşitdiyimiz zaman onu dalğalı xətt kimi deyil, səsi təşkil edən sinus dalğalarının müxtəlif tezlikləri kimi eşidirik.

<button id="together-button" class="button">Tam dalğanı eşit</button>

<button id="split-button-1" class="button">Yüksək tezliyi eşit</button>

<button id="split-button-2" class="button">Aşağı tezliyi eşir</button>

Bu dalğaları kompüter vasitəsilə ayırdığımız zaman, insanların əslində nə eşitdiyi barədə fikir formalaşır. Səsin nə qədər yüksək və ya sakit olduğunu deyə bilirik və ya onun hansı not olduğunu təxmin edə bilirik.

Bunu sinus dalğalarından ibarət görünməyən dalğalarda da edə bilərik.

Gəlin indi görünməyən dalğalara nəzər salaq. Buna kvadrat dalğa deyilir.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Görünməsə də, sinus dalğalarına bölünə bilər.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Bu dəfə çoxlu sinus dalğalarına ehtiyacımız var. Texniki olaraq, kvadrat dalğanı tam yerləşdirmək üçün onlardan sonsuz sayda tələb olunur. Daha çox sinus dalğaları əlavə etdikcə, model tədricən orijinal kvadrat dalğaya yaxınlaşacaq.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Dalğanı eşidin</button>

*Nə qədər sinus dalğasının olduğunu görmək üçün yuxarıdakı düyməni çubuğun üzərinə sürüşdürün.*

Burada, ən böyük fərqi yaradan ilk bir neçə sinus dalğasının olduğunu görəcəksiniz. Düyməni ortada gətirdikdə dalğanın forması üzə çıxır, lakin o, hələ də kələ-kötürdür. İndi şəffaflığı hamarlamaq üçün digər kiçik dalğalara ehtiyac var.

Dalğaya qulaq asdığınız zaman səsin getdikcə kiçikləşdiyini eşidirsiniz, çünki biz nisbətən yüksək tezlikləri ixtisar edirik.

Hər bir periodik ardıcıllıqla bu baş verir. Gəlin indi şəkil çəkməyə çalışaq!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Buraya çəkin!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Dalğanı eşidin</button>

*Sinus dalğaları əlavə olunduqca təsvirin sizə necə yaxınlaşdığını görmək üçün düyməni hərəkət etdirin.*

Əlavə şəffaflıq istisna olmaqla, sinus dalğalarının yalnız yarısı istifadə edildikdə belə, dalğalar hələ də bir-birinə olduqca bənzəyir.

Əslində, dalğanın bu oxşarlığından öz xeyrimizə istifadə edə bilərik. Furye transformasiyasındən istifadə edərək, biz səsin vacib hissələrini götürə və onlardan orijinal səsə olduqca yaxın bir model əldə edə bilərik.

Kompüterlərdə dalğalar adətən nöqtələr massivi kimi saxlanılır.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Bunun əvəzinə biz onları bir dəstə sinus dalğası ilə təmsil edə bilərik. Daha sonra, kiçik tezliklərə məhəl qoymadan səsi sıxışdıra bilərik. Nəticə eyni olmayacaq, səs lakin orijinala olduqca yaxın səslənəcək. 

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

MP3-lərin əslində etdiyi elə budur. Sadəcə olaraq, onlar hansı tezlikləri saxlamaq və hansını ixtisar etmək barədə daha "ağıllıdırlar".

Xülasə olaraq, bu halda, dalğanın əsas xüsusiyyətləri haqqında fikir əldə etmək üçün Furye transformasiyalarında istifadə edə bilərik, beləliklə də, məlumatların sıxılması kimi əməliyyatlar edərkən əldə etdiyimiz verilənlərdən istifadə edə bilərik.

İndi isə gəlin, Furye transformasiyasını bir az daha dərindən araşdıraq. Növbəti bölmə Furye transformasiya funksiyası haqqında daha çox məlumatı özündə ehtiva edir.

## Xarici dairələr

Məqalənin əvvəlində dediyim kimi, bu transformasiya sinus dalğalarına ayrılmaq üçün istifadə olunur. Məsələ burasındadır ki, Furye transformasiyasının yaratdığı sinus dalğaları normal sinus dalğaları deyil, 3-ölçülüdür. Onları "mürəkkəb sinusoidlər" adlandırmaq olar. Və ya sadəcə "spirallar"...

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Yan tərəfdən baxdıqda onlar sinus dalğalarına, yuxarıdan baxdıqda isə, dairələrə bənzəyir.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

İndiyə qədər etdiyimiz hər bir əməliyyat üçün normal 2D sinus dalğalarına ehtiyacımız var idi. 2D dalğaları üzərində Furye transformasiyası etdikdə, nəticədən kompleks hissələr ixtisar edilir, buna görə də sinus dalğaları alırıq.

Ancaq 3D sinus dalğalarından bu kimi görünən əyləncəli bir şey etmək üçün istifadə edə bilərik:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Burada nə baş verir?

Bəli, zamanla keçdiyi yola görə rəsmin 3D forması olduğunu düşünə bilərik. Təsəvvür edin ki, bir əl çəkirsiniz; Qələminizin ucu olduğu yerdə hər üç ölçü mövcud olacaq. X və Y koordinatları bizə mövqe verir, zaman müstəvisi isə cari vaxtdır.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Biz 3D modeli, 2D sinus dalğalarından istifadə edərək vizuallaşdıra bilmərik. Nə qədər 2D sinus dalğaları əlavə etsək də, heç vaxt 3D forması əldə etməyəcəyik. Yəni bizə əlavə bir "vasitə" lazımdır.

İstifadə edə biləcəyimiz yuxarıda qeyd etdiyimiz 3D spiral sinus dalğalarıdır. Onlardan çoxlu sayda əlavə etdikdə, 3D modelimizə bənzəyən bir şey əldə edə bilərik.

Unutmayın ki, bu dalğalar yuxarıdan baxanda dairələrə bənzəyir. Bir dairə ətrafında hərəkət edən digər bir dairəyə xarici dairə deyilir.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Qutudakı dairələrin sayını təyin etmək üçün yuxarıdakı düymədən istifadə edin.*

Əvvəlki kimi bir neçə dairə ilə modelimizə olduqca yaxın bir nəticə əldə edirik. Çünki bu, olduqca sadə formadır. Hər bir sonuncu dairə haşiyələri azca kəskinləşdirir.

Bütün bunlar hər hansı bir rəsmə tətbiq edilə bilər. İndi onu sınamaq növbəsi sizdədir!

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Buraya çizin!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Geri al</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Rəsmdə istifadə ediləcək dairələrin sayını təyin etmək üçün yuxarıdakı düyməni hərəkət etdirin.*

Bir daha görəcəksiniz ki, bir çox formalar üçün bütün nöqtələri gizlətmək əvəzinə, yalnız az sayda dairə ilə çox gözəl rəsm yaxınlığına nail olmaq olar.

Bunu real (və ya mövcud) verilənlər üçün də istifadə edə bilərikmi? Yaxşı səslənir... Bəli! Əslində, SVG (Vector Image Format) adlı başqa bir verilən formatı mövcuddur, və yəqin ki, yaratmağa çalışdığımız formalar kimi bu verilən forması ilə yaxşı uyğunlaşacaq. Amma, biz burada yalnız gözəl kiçik giflər hazırlamaq mümkün olduğunu göstərdik.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Yalnızca Furye çevrilmələrindən istifadə edən başqa bir vizual verilən növü mövcuddur.

## JPEG

Furye çevrilmələrinin şəkillərə də tətbiq oluna biləcəyini bilirdinizmi? Müasir dövrdə Furye transformasiyalarından hər bir insan istifadə edir, çünki JPEG-lər işləmə üsulu Furye transformasiyalarına əsaslanır! Eyni prinsipləri şəkillərə də tətbiq edirik, onları sinus dalğa qruplarına ayırırıq və yalnız vacib olanları saxlayırıq.

Yeganə fərq, vizual təsvir ilə işlədiyimiz üçün bizə fərqli bir sinus dalğası lazım olmasıdır. Bizə elə bir "vasitə" lazımdır ki, əlimizdə hansı görüntü olursa olsun, orijinal görüntüyə qayıtmaq üçün bir dəstə sinus dalğasını bir araya gətirə bilək.

Bunun üçün hər bir sinus dalğası da vizual olmalıdır. Xətt dalğası əvəzinə indi qara və ağ bölgələri olan şəkillərimiz var. Hər bir təsvirdə daha çox və ya daha az kontrast dalğanın ölçüsünü təmsil edir.

Eyni şəkildə, biz onu rəngləri təmsil etmək üçün istifadə edə bilərik, lakin hələki qara və ağ şəkillərlə başlayaq. Rəngsiz şəkillər üçün bizə bəzi üfüqi dalğa təsvirləri lazımdır.

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Və bir neçə şaquli dalğa təsviri.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Üfüqi və şaquli təsvirlər bizim kimi təsvir növlərini tək başına təmsil etməkdə çətinlik çəkir. Buna görə də həm üfüqi, həm də şaquli təsvirlərin ədədlərini bir-birinə vuraraq əlavə dalğalar yaratmaq lazımdır.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

8x8 şəkil üçün lazım olan bütün təsvirlər aşağıdakılardır:

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

Bu təsvirləri götürüb, onların kontrastını ölçülərinə uyğun tənzimləsək və sonra da onları bir yerə yığsaq, istənilən təsviri yarada bilərik.

Gəlin "A" hərfi ilə başlayaq. Bu, olduqca kiçikdir, lakin bizə də elə bu lazımdır, əks halda çoxlu başqa təsvirlər əldə edəcəyik.

<img src="img/a.png" class="sketch sketch-letter">

Bu təsvirləri daha çox əlavə etdikcə real görüntüyə getdikcə yaxınlaşan bir nəticə əldə edəcəyik. Ancaq bunun nümunə olduğunu yəqin etdiyinizi ehtimal edərək və nəticənin maksimum aydın olmasına çalışaraq, biz yalnız bir neçəsini daxil etmişik.

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

Mövcud JPEG təsvirlərdə bir neçə əlavə detal mövcuddur.

JPEG təsvir 8x8 hissəyə bölünür və hər bir hissə özü-özlüyündə sinus dalğalarına bölünür. Hər bir pikselin nə qədər açıq və ya qaranlıq olduğunu müəyyən etmək üçün tezlik qrupundan istifadə edirik. Daha sonra daha iki qrupdan istifadə edirik, onlardan biri qırmızı-yaşıl, digəri isə mavi-sarı rənglər üçün təyin edilmişdir. Hər bir hissə üçün istifadə etdiyimiz tezliklərin miqdarı JPEG təsvirin keyfiyyətini müəyyən edir.

Aşağıda təfərrüatları görə bildiyimiz böyüdülmüş əsl JPEG təsvir göstərilib. Keyfiyyət səviyyəsi ilə dəyişdiyimiz zaman bu prosesin necə işlədiyini görə bilərik.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Xülasə

Beləliklə, ümumiləşdirək:

- Furye transformasiyaları bizə hər hansı modeli tezliklərə ayırmağa imkan verən vasitədir.
- Bu tezliklərin verilənləri əsasında modelin bəzi əsas xassələri haqqında fikir yürütmək olur.
- Beləliklə, biz yalnız vacib tezlikləri saxlamaqla məlumatları sıxışdıra bilərik.
- Biz onlardan bir qrup halqa ilə uğurlu animasiyalar etmək üçün də istifadə edə bilərik.

Burada Furyerin transformasiyaların tətbiqinin yalnız bir neçə forması səthi olaraq nümayiş etidirildi. Furye transformasiyaları çox güclü bir vasitədir, çünki tezliklərə bölünmə ilə nüvəyə qədər çatmaq olar. Müasir dövrdə dizayn, mobil telefon siqnalları, maqnit rezonans görüntüləmə (MRT) və kvant fizikası da daxil olmaqla bir çox sahələrdə furye transformasiyalarından istifadə olunur!

## Maraqlananlar üçün suallar

Mən burada riyaziyyatı demək olar ki, ixtisar etdim, lakin Furye transformasiyalarının özəyini formalaşdıran iş prinsipləri ilə maraqlanırsınızsa, tədqiqatınıza rəhbərlik etmək üçün aşağıdakı bir neçə sual üzərindən başlaya bilərsiniz:

- Furye transformasiyası riyazi olaraq necə ifadə edilir?
- Kəsilməz zamanlı Furye transformasiyası ilə diskret zamanlı Furye tranformasiyası arasında nə fərq var?
- Furye transformasiyasını ədədi olaraq necə hesablamaq olar?
- Bütün musiqinin Furye transformasiyasını necə etmək olar? (Tək notun əvəzinə.)

## Əlavə oxu bölməsi

Aşağıda mövzu ilə bağlı daha çox öyrənmək üçün baxılası yaxşı mənbələr mövcuddur:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Nəyin necə baş verdiyini riyazi baxımdan kifayət qədər təkmil araşdıran məqalə.

[But what is the Fourier Transform? A visual introduction](https://www.youtube.com/watch?v=spUNpyF58BY)
3Blue1Brown tərəfindən hazırlanmış Fourier transformasiyalarının riyaziyyatının səs perspektivi üzərindən izah edildiyi  mükəmməl bir Youtube videosu.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Şəkil çəkmək üçün xarici çevrələrdən necə istifadə etmək barədə izah verən məqalə. Mövzu xətti cəbr perpektivi üzərindən aparılır.

[Fourier transform (İngilis dilli Vikipediya)](https://en.wikipedia.org/wiki/Fourier_transform)
Və əlbəttə ki, Vikipediya məqaləsi də yaxşıdır.

## Müəllif

Mən Jez! Bay bölgəsində yerləşən tədqiqat şirkətində tam iş günü işləyirəm və asudə vaxtımı bu kimi oyunlar yaratmaq və interaktiv kod yazmaqla keçirməyi sevirəm!

Bu veb səhifə açıq mənbə səhifəsidir, kodları [GitHub](https://github.com/Jezzamonn/fourier)-da mövcuddur! Hər hansı təklif və ya sualınız varsa, [Twitter] (https://twitter.com/jezzamonn) səhifəsində mənə tvit yazın.

Digər işlərimə baxmaq istəyirsinizsə, [veb-səhifəmə](https://github.com/Jezzamonn/fourier/blob/master) daxil olun! Əgər gələcək işimlə maraqlanırsınızsa, mənim Twitter hesabımı [@jezzamonn](https://twitter.com/jezzamonn) izləyə bilərsiniz!
