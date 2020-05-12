Fourier dönüşümleri birçok farklı şeyin yapılmasında kullanılabilecek bir araçtır. Bu sayfa Fourier dönüşümlerinin işleyişini açıklamakta ve yararlı olabilecek bazı kullanım yollarını göstermektedir. Bir de bu dönüşümlerle bunun gibi eğlenceli şeyleri nasıl yapacağınızı gösterir:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Fourier dönüşümlerinin işleyişini anlatırken bu animasyonu da açıklayacağım!

Okumayı bitirdiğinizde:
- Fourier dönüşümünün ne yaptığı
- Fourier dönüşümlerinin bazı pratik kullanımları
- Ve bazı amaçsız ama şık kullanımları hakkında epeyce fikir edinmiş olacaksınız.

Matematik ve denklemleri şimdilik bu işin dışında tutacağız. Fourier dönüşümlerinin arkasında bir sürü ilginç matematiksel işlem var ama onun aslında ne yaptığı ve onu neden kullanmak isteyeceğinizle başlamayı yeğlerim. Konu hakkında daha detaylı bilgiye ulaşmak isterseniz, bazı ileri okuma önerilerini aşağıda bulabilirsiniz!

## Evet, şimdi bu nedir?

Fourier dönüşümü basitçe, bir şeyi sinüs dalgaları halinde ayırmanın bir yoludur. İsmi, genelde olduğu gibi, uzun zaman önce yaşamış olan Fourier adında birinden gelir.

Hadi birkaç basit örnekle başlayarak ilerleyelim. Öncelikle zaman içinde tekrarlayan modeller olan dalgalara bakacağız.

İşte bir dalga örneği:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Buradaki dalga modeli sinüs dalgalarına ayrılabilir. Bu iki sinüs dalgasını bir araya getirirsek başlangıçtaki dalgayı tekrar elde ederiz.

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Fourier dönüşümü birleşik dalga elde etmenin ve her bir sinüs dalgasını yeniden ortaya çıkarmanın bir yoludur. Bu örnekte, yalnızca başlangıçtaki dalgaya bakarak bunu neredeyse zihinden de yapabilirsiniz.

Neden? Öyle görünüyor ki gerçek dünyadaki birçok şey bu sinüs dalgaları aracılığıyla etkileşim halinde. Biz onlara genelde dalga frekansları diyoruz.

Bunun en belirgin örneği sestir. Bir ses duyduğumuzda, onu dalgalı bir hat şeklinde değil sesi meydana getiren sinüs dalgalarının farklı frekansları şeklinde duyarız.

<button id="together-button" class="button">Tam Dalga Oynat</button>

<button id="split-button-1" class="button">Yüksek Frekansta Oynat</button>

<button id="split-button-2" class="button">Düşük Frekansta Oynat</button>

Dalgaları bilgisayarda ayırabiliyor olmak bize insanların aslında ne duyduğuna dair bir fikir verir. Sesin ne kadar yüksek veya kısık olduğunu anlayabilir veya hangi nota olduğunu tahmin edebiliriz.

Bu işlemi sinüs dalgalarından oluşuyormuş gibi görünmeyen dalgalar üzerinde de yapabiliriz.

Hadi şuna bir göz atalım. Buna kare dalga denir.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Öyle gibi görünmese de sinüs dalgalarına ayrılabilir.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Bu kez çok sayıda sinüs dalgasına ihtiyacımız var. Teknik olarak, kare dalgayı tam anlamıyla karşılayabilmesi için sonsuz sayıda lazım. Daha çok sinüs dalgası ekledikçe model de gitgide başlangıçtaki kare dalgaya yaklaşacaktır.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Dalga Oynat</button>

*Kaç sinüs dalgası olduğunu görmek için üstteki düğmeyi çubuğun üzerinde kaydırın.*

Gerçekten de belirgin ölçüde en büyük farkı yaratanların ilk birkaç sinüs dalgası olduğunu göreceksiniz. Düğmeyi ortaya getirdiğinizde, dalganın şekli genel hatlarıyla ortaya çıkar ama pürüzlüdür. Artık pürüzleri düzleştirmek için tek ihtiyacımız olan diğer küçük dalgalar.

Dalgayı dinlediğinizde, sesin giderek azaldığını duyarsınız çünkü daha yüksek frekansları siliyoruz.

Bu işlem, tekrarlayan her dizide bu şekilde gerçekleşir. Hadi siz de kendinizinkini çizmeyi deneyin!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Buraya çizin!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Dalga Oynat</button>

*Sinüs dalgaları eklendikçe çizimin sizinkine nasıl yaklaştığını görmek için düğmeyi hareket ettirin.*

Fazladan pürüzün haricinde, sinüs dalgalarının yalnızca yarısı kullanıldığında bile dalga yine oldukça benzer bir hale gelir.

Aslında dalganın bu benzerliğini lehimize kullanabiliriz. Fourier dönüşümünü kullanarak sesin önemli kısımlarını alabilir ve onlardan orijinal sese oldukça yakın bir şey elde edebiliriz.

Bilgisayarlarda dalgalar normalde nokta dizileri halinde saklanır.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Bunun yerine, onları bir grup sinüs dalgasıyla gösterebiliriz. Ardından daha küçük frekansları yok sayarak sesi sıkıştırabiliriz. Sonuç aynı olmaz ama kulağa, orijinaline oldukça yakın gelecektir.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

MP3'lerin yaptığı da aslında budur. Yalnızca, onlar hangi frekansların korunup hangilerinin atılacağı konusunda daha akıllıdırlar.

Özetle bu durumda Fourier dönüşümlerini bir dalganın temel özellikleri hakkında fikir sahibi olmak için kullanabilir, böylece edindiğimiz fikirden, veri sıkıştırma gibi şeyler yaparken yararlanabiliriz.

Evet, şimdi Fourier dönüşümünün biraz daha derinine inelim. Sıradaki bölüm, Fourier dönüşümünün işleviyle ilgili daha fazla fikir verecektir.

## Dış Çemberler

Yazının başında bu dönüşümün, sinüs dalgalarına ayırmada kullanıldığını söyledim. Olay şu ki Fourier dönüşümüyle ortaya çıkan sinüs dalgaları normal sinüs dalgaları değil, 3B'dir. Onlara "karmaşık sinüsoidler" denilebilir. Ya da yalnızca "spiraller"...

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Yandan bakınca sinüs dalgaları gibi görünürler. Ama üstten bakınca, çember gibidirler.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Şimdiye kadar yaptığımız her şey için normal 2B sinüs dalgalarına ihtiyaç duyduk. 2B dalgalar üzerinde Fourier dönüşümü yaptığımızda karmaşık kısımlar nötrlenir, böylece sinüs dalgaları elde ederiz.

Ama 3B sinüs dalgalarını şunun gibi gözüken eğlenceli bir şeyler yapmak için kullanabiliriz:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Burada neler oluyor?

Evet, zamanla izlediği yol dolayısıyla çizimi 3B şekle sahip olarak düşünebiliriz. Bir el çizdiğinizi hayal edin; kaleminizin ucunun olduğu noktada üç boyut da mevcut olacaktır. X ve Y düzlemleri bize konumu verir, zaman düzlemi de o andaki zamandır.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Bu şekildeki bir 3B modeli 2B sinüs dalgaları kullanarak gösteremeyiz. Ne kadar 2B sinüs dalgası eklersek ekleyelim, asla 3B bir şekil elde edemeyiz. Öyleyse başka bir şeye ihtiyacımız var.

Kullanabileceğimiz şey yukarıda bahsettiğimiz 3B spiral sinüs dalgaları. Onlardan çok sayıda eklediğimizde, 3B modelimize benzeyen bir şey elde edebiliriz.

Unutmayın, bu dalgalara üstten baktığımızda çember gibi görünürler. Bir çemberin etrafında hareket eden diğer çembere dış çember denir.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Kutucukta bulunan çember sayısını belirlemek için üstteki düğmeyi kullanın.*

Öncekinde olduğu gibi yalnızca birkaç çemberle modelimize epey yakın bir sonuç elde ederiz. Çünkü bu oldukça basit bir şekil ve son çembelerin tek yaptıkları sınırları birazcık daha keskinleştirmek.

Bütün bunlar her çizime uygulanabilir, gerçekten! Şimdi onu test etme sırası sizde.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Buraya çizin!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Geri al</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Çizimde kullanılacak çember sayısını belirlemek için düğmeyi hareket ettirin.*

Birçok şekil için bütün noktaları saklamak yerine yalnızca az sayıda çemberle gayet güzel bir çizim yakınlığının elde edilebildiğini kez daha görüyorsunuz.

Bunu gerçek veri için de kullanabilir miyiz? Şey... Evet! Aslında, oluşturmaya çalıştığımız şekiller gibi işlerde muhtemelen daha iyi sonuçlar verecek olan SVG (Vektör İmaj Formatı) adında bir başka veri formatı daha var. Yani, bu şimdilik sadece küçük güzel gifler yapmaya yarar.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Ancak Fourier dönüşümlerini kullanan bir başka görsel veri çeşidi daha var.

## JPEG

Fourier dönüşümlerinin görseller üzerine de uygulanabileceğini biliyor muydunuz? Aslında onu sürekli kullanıyoruz çünkü JPEG'ler onunla çalışır! Aynı ilkeleri görsellere uyguluyarak onları sinüs dalgası gruplarına ayırıyor ve sadece önemli olanları saklıyoruz.

Şimdi görsellerle çalıştığımıza göre bize farklı bir sinüs dalgası türü lazım. Öyle bir şeye ihtiyacımız var ki elimizde nasıl bir görsel olursa olsun, bir grup sinüs dalgasını bir araya getirerek  başlangıçtaki görsele dönebilelim.

Bunu yapabilmek için her bir sinüs dalgası da görsel olmalı. Çizgi şeklindeki dalga yerine, elimizde artık siyah ve beyaz bölgeleri olan görseller var. Her görseldeki daha fazla veya az kontrast bir dalganın boyutunu temsil eder.

Aynı şekilde bunu renkleri temsil etmekte de kullanabiliriz ama şimdilik siyah-beyaz görsellerle başlayalım. Renksiz görseller için bize birkaç yatay dalga görseli lazım.

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Ve birkaç tane de dikey dalga görseli.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Yatay ve dikey görseller bizimki gibi görsel türlerini kendi başlarına temsil etmekte yetersiz kalırlar. Bu yüzden hem yatay hem dikey görsellerin sayılarını birlikte katlayarak fazladan dalgalar oluşturmak gerekir.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

İşte 8x8'lik bir görsel için gereken bütün görseller.

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

Bu görselleri alıp kontrastlarını boyutlarına göre ayarladıktan sonra bir araya getirirsek her görseli oluşturabiliriz.

Hadi bu "A" harfiyle başlayalım. Oldukça küçük ama bize de küçük lazım yoksa çok sayıda başka görsel elde ederiz.

<img src="img/a.png" class="sketch sketch-letter">

Bu görsellerden daha çok ekledikçe, gerçek görsele gitgide daha yaklaşan bir sonuç elde edeceğiz. Ama sadece birkaç tane eklediğimiz halde, aslına yakınlık makul ölçüde sağlandığı için herhalde buradaki modeli anlamışsınızdır.

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

Mevcut JPEG görsellerin fazladan birkaç detayı daha var.

JPEG'de görsel 8x8'lik parçalara ayrılır ve her parça kendi içinde sinüs dalgalarına ayrılır. Her pikselin ne ölçüde açık veya koyu renkte olduğunu belirlemek için bir frekans grubu kullanırız. Ardından, biri kırmızı-yeşil, diğeri mavi-sarı renkler için iki grup daha kullanırız. Her bir parça için kullandığımız frekans sayısı JPEG'in kalitesini belirler.

İşte detayları görebilmemiz için büyütülmüş gerçek bir JPEG görsel. Kalite düzeyiyle oynadığımızda bu sürecin işleyişini görebiliriz.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Sonuç

Öyleyse özetleyelim:

- Fourier dönüşümleri, bir şeyleri alıp frekanslarına ayırmamızı sağlayan şeylerdir.
- Bu frekanslar elimizdeki verinin bazı temel özellikleri hakkında fikir verir
- Böylece, sadece önemli frekansları saklayarak veri sıkıştırabiliriz.
- Ayrıca bir grup çemberle, onları başarılı animasyonlar yapmada da kullanabiliriz.

Buradakiler sadece yüzeysel birkaç uygulama. Fourier dönüşümü son derece güçlü bir araçtır çünkü frekanslara ayırmak işin özüne inmektir. Devre tasarımı, cep telefonu sinyalleri, manyetik rezonans görüntüleme (MRI) ve kuantum fiziği dahil birçok alanda kullanılırlar!

## Merak edenler için sorular

Burada işin matematik kısmının çoğunu atladım ama fourier dönüşümlerinin temelinde yatan çalışma ilkelerini merak ediyorsanız, işte araştırmanıza rehber olabilecek birkaç soru:

- Bir Fourier dönüşümünü matematiksel olarak nasıl gösterirsiniz?
- Sürekli zamanlı bir Fourier dönüşümü ile kesik zamanlı bir Fourier dönüşümü arasındaki fark nedir?
- Bir Fourier dönüşümünün sayısal hesabı nasıl yapılır?
- Bütün bir şarkının Fourier dönüşümü nasıl yapılır? (Tek bir nota yerine.)

## İleri 'okuma'

Daha fazlasını öğrenmek için bakabileceğiniz gerçek anlamda iyi bazı kaynaklar:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Olan biteni daha ziyade matematiksel açıdan irdeleyen mükemmel bir makale.

[But what is the Fourier Transform? A visual introduction](https://www.youtube.com/watch?v=spUNpyF58BY)
Fourier dönüşümlerinin matematiğinin ses perspektifinden de açıklandığı, 3Blue1Brown tarafından yayınlanan mükemmel bir Youtube videosu.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Şekil çizmek için dış çemberleri nasıl kullanabileceğinizi anlatan bir başka makale, konuyu lineer cebir üzerinden ele alıyor.

[Fourier dönüşümü (Vikipedi)](https://en.wikipedia.org/wiki/Fourier_transform)
Ve tabi ki Vikipedi makalesi de oldukça iyi.

## Yazar

Ben Jez! Bay bölgesinde bir araştırma şirketinde tam-zamanlı çalışıyorum ve boş vakitlerimi oyun üreterek ve bunun gibi interaktif kodlar yazarak geçirmeyi seviyorum!

Bu web sayfası açık kaynak kodlu bir sayfa, kodlarına [GitHub](https://github.com/Jezzamonn/fourier)'dan göz atabilirsiniz! Herhangi bir öneriniz veya sormak istediğiniz bir soru varsa bana [Twitter](https://twitter.com/jezzamonn) üzerinden tweet atmaktan çekinmeyin.

Diğer işlerimi de görmek istiyorsanız, [anasayfamı](https://github.com/Jezzamonn/fourier/blob/master) ziyaret edin! Sıradaki işimi merak ediyorsanız Twitter hesabımı takip edebilirsiniz [@jezzamonn](https://twitter.com/jezzamonn)!