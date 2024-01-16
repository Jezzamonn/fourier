---
languageName: "Slovenčina"
title: "Interkatívny úvod do Fourierovej transformácie"
description: "Fourierova transofrmácia je náradie používané vo veľa rôznych odvetviach. Tu máme vysvetlené, čo Furierova transformácia robí a niekoľko rôznych spôsobov ako nám môže byť užitočná."
translatorMarkdown: "Preložil: [Jakub Mintal](https://github.com/Straaths)"
outFileName: "sk.html"
---

Fourierova transformácia je náradie používané vo veľa rôznych odvetviach. Tu máme vysvetlené, čo Furierova transformácia robí a niekoľko rôznych spôsobov ako nám môže byť užitočná. A ako pomocou nej môžete urobiť pekné veci, ako napríklad táto:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Vysvetlím, ako táto animácia funguje, a popri tom vysvetlím Fourierovu transformáciu!

Na konci by ste mali mať dobrý obraz o tom
- čo robí Fourierova transformácia
- niektoré praktické použitie Fourierovej transformácie
- niektoré zbytočné, ale zaujímavé použitia Fourierovej transformácie

Matematiku a rovnice z toho zatiaľ vynecháme. Je za tým veľa zaujímavej matematiky ale je lepšie najskôr začať s tým, čo to v skutočnosti robí, a prečo by ste to chceli použiť. Ak sa chcete dozvedieť viac o tom "ako", nižšie nájdete niekoľko ďalších návrhov na čítanie!

## Tak čo to vlastne je?

Zjednodušene povedané, Fourierova transformácia je spôsob rozdelenia čohokoľvek na niekoľko sínusových vĺn. Ako obvykle, meno pochádza od človeka, ktorý kedysi dávno žil a nazýval sa Fourier.

Začnime s niekoľkými jednoduchými príkladmi a postupne budeme pokračovať našou cestou ďalej. Najskôr sa pozrieme na vlny - vzory, ktoré sa s tokom času opakujú.

Tu je príklad takej vlny:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Tento zvlnený vzor sa dá rozdeliť na sínusové vlny. To znamená, že keď zložíme dve sínusové vlny, dostaneme pôvodný zvlnený vzor.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Fourierova transformácia je spôsob, ako zobrať túto kombinovanú vlnu a dostať z nej späť všetky pôvodné sínusové vlny. V tomto príklade to takmer môžete urobiť vo svojej hlave, len pri pohľade na pôvodnú vlnu.

Prečo? Ukázalo sa, že veľa vecí v skutočnom svete interaguje na základe týchto sínusových vĺn. Väčšinou ich nazývame frekvenciami vlny.

Najzreteľnejším príkladom je zvuk - keď počujeme zvuk, nepočujeme tú krivoľakú čiaru, ale počújeme rôzne frekvencie sínusových vĺn, ktoré spolu tvoria zvuk.

<button id="together-button" class="button">Zahraj celú vlnu</button>

<button id="split-button-1" class="button">Zahraj vysokú frekvenciu</button>

<button id="split-button-2" class="button">Zahraj nízku frekvenciu</button>

To, že ich dokážeme rozdeliť na počítači, nám môže pomôcť pochopiť, čo človek skutočne počuje. Dokážeme pochopiť, aký vysoký alebo nízky je zvuk, alebo zistiť, o akú notu ide.

Tento proces môžeme použiť aj na vlnách, ktoré nevyzerajú, akoby boli vytvorené zo sínusových vĺn.

Pozrime sa na toto. Hovorí sa tomu štvorcová vlna.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Možno to tak nevyzerá, ale aj tá sa dá rozdeliť na sínusové vlny.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Tentokrát ich technicky potrebujeme nekonečné množstvo, aby sme ju mohli dokonale reprezentovať. Keď pridávame čoraz viac sínusových vĺn, obrazec sa dostáva bližšie a bližšie k štvorcovej vlne, s ktorou sme začali.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Zahraj vlnu</button>

*Posuňte vyžší posúvník pre zmenu počtu sínusových vĺn.*

Všimnete si, že v skutočnosti prvých pár sínusových vĺn robí najväčší rozdiel. S posúvníkom v polovici máme všeobecný tvar vlny, aj keď trochu pokrivený. Tie najmenšie potrebujeme len na to, aby sa zakrivenie vyrovnalo.

Keď budete počúvať vlnu, budete počuť zvuk klesajúci, pretože odstraňujeme vyššie frekvencie.

Tento proces funguje tak isto, pri každej opakujúcej sa krivke. Vyskúšajte si to!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Tu kreslite!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Zahraj vlnu</button>

*Pohybom posuvníka uvidíte, ako pribúdajú ďalšie sínusové vlny, takže sa bude viac a viac podobať na vašu kresbu.*

Znovu, vlna vyzerá, okrem mierneho pokrivenia, veľmi podobne už len s polovicou sinusových vĺn.

V sutočnosti môžeme použiť fakt, že vlna je veľmi podobná, ako našu výhodu. Použitím Fourierovej transformácie, môžeme získať dôležité časti zvuku, uložiť len tie a nakoniec skončíme s niečím, čo je dosť blízko pôvodnému zvuku.

Normálne na počítači ukladáme vlnu ako sériu hodnôt.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Namiesto toho ju však môžeme reprezentovať, ako skupinu sínusových vĺn. Potom môžeme vykonať kompresiu zvuku ignorovaním vyžších frekvencií. Náš konečný výsledok nebude rovnaký ale pre človeka bude znieť dosť podobne.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

To je v podstate to, čo robia MP3ky, s výnimkou toho, že sú múdrejšie vo výberaní toho, ktoré frekvencie uchovávajú a ktoré vyhodia.

Takže v tomto prípade môžeme použiť Fourierove transformácie na pochopenie základných vlastností vlny a potom ich môžeme použiť na užitočný proces, akým je kompresia.

Dobre, pozrime sa bližšie na Fourierovú transformáciu. Táto nasledujúca časť nielenže vyzerá zaujímavo, ale tiež vám dáva trochu lepšie pochopenie toho, čo robí Fourierova transformácia. Ale hlavne vyzerá zaujímavo.

## Epicykly

Na začiatku sme povedali, že rozdeľuje veci na sínusové vlny. Ide o to, že sínusové vlny, ktoré vytvára, nie sú iba bežné sínusové vlny, ale sú 3D. Môžete ich nazvať „komplexnými sínusoidami“. Alebo jednoducho „špirály“.

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Ak sa pozrieme z boku, vyzerajú ako sínusové vlny. Spredu však vyzerajú ako kruhy.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Zatiaľ všetko, čo sme robili, vyžadovalo len normálne sínusové vlny 2D. Keď robíme Fourierovu transformáciu na 2D vlnách, komplexné časti sa vynulujú, takže nakoniec skončíme so sínusovými vlnami.

Ale môžeme použiť 3D sínusové vlny, aby vytvoriť niečo zábavne vyzerajúce, takéto:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Čo sa tu deje?

No, kresbu môžeme považovať za 3D tvar kvôli spôsobu, akým sa vytvára v čase. Ak si viete predstaviť, že ruka bola nakreslená osobou, tri súradnice predstavujú polohu, kde sa v tomto okamihu nachádzala špička ceruzky. Súradnice x a y nám hovoria o polohe v priestore a tretia súradnica je čas v danom okamihu.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Teraz, keď máme trojrozmerný vzor, nemôžeme na jeho reprezentáciu použiť normálne sínusové vlny 2D. Bez ohľadu na to, koľko 2D sínusových vĺn pridáme, nikdy nebudeme mať niečo 3D. Potrebujeme teda niečo iné.

Môžeme použiť predchádzajúce 3D špirálové sínusové vlny. Ak zložíme veľa z nich, môžeme získať niečo, čo vyzerá ako náš trojrozmerný vzor.

Pamätajte, že tieto vlny vyzerajú ako kruhy, keď sa na ne pozeráme spredu. Názov vzoru kruhu, ktorý sa pohybuje okolo iného kruhu, je epicyklus.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Pomocou posúvníka vyššie môžete ovládať počet kruhov.*

Rovnako ako predtým, dosiahli sme celkom dobrú aproximáciu nášho modelu len s niekoľkými kruhmi. Pretože sa jedná o pomerne jednoduchý tvar, všetky posledné urobia hrany len o niečo ostrejšie.

To všetko sa vzťahuje na akýkoľvek náčrtok, naozaj! Teraz máte šancu sa s tým pohrať.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Nakreslite tu!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Krok späť</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Pomocou posúvníka určte, koľko kruhov sa použije na kreslenie*

Znova ste mohli vidieť, že väčšinu tvarov dokážeme pomerne dobre napodobniť pomocou malého počtu kruhov, namiesto uloženia súradníc všetkých bodov.

Môžeme to použiť pre skutočné dáta? No, mohli by sme! V skutočnosti, tu máme ďalší dátový formát s názvom SVG, ktorý pravdepodobne vykonáva dobrú prácu pre typy tvarov, ktoré máme tendenciu vytvárať. Takže v tejto chvíli je to naozaj len pre tvorenie skvelých gifov.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Existuje však aj iný typ vizuálnych údajov, ktoré využívajú Fourierovu transformáciu.

## JPEGs

Vedeli ste, že Fourierove transformácie sa dajú použiť aj na obrázky? V skutočnosti ich používame stále, pretože takto fungujú súbory JPEG! Na obrázky aplikujeme rovnaké princípy - niečo rozdelíme do zväzku sínusových vĺn a potom ukladáme iba tie dôležité.

Teraz, keď sa zaoberáme obrázkami, potrebujeme iný typ sínusovej vlny. Potrebujeme niečo, čo bez ohľadu na to, aký obrázok máme, môžeme pridať, aby sme sa dostali späť k nášmu pôvodnému obrázku.

Aby sme to mohli urobiť, každá z našich sínusových vĺn bude tiež obrázkom. Namiesto vlny, ktorá je čiarou, máme teraz obrázky s čiernymi a bielymi sekciami. Na vyjadrenie veľkosti vlny, bude mať každý obrázok viac alebo menej kontrastu.

Môžeme ich tiež použiť na reprezentáciu farieb rovnakým spôsobom. Ale začnime s čiernobielym obrázkom. Na zobrazenie bezfarebných obrázkov potrebujeme niekoľko obrázkov horizontálnych vĺn,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

spolu s niekoľko obrázkami zvislých vĺn.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Samotné iba vodorovné a zvislé obrázky nestačia na to, aby sme ich zložením dostali obrázky, ktoré chceme získať. Potrebujeme tiež nejaké ďalšie, ktoré získame vynásobením týchto dvoch jednotiek.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Tu sú všetky obrázky, ktoré potrebujeme, pre získanie akéhokoľvek obrázka 8x8.

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

Ak vezmeme tieto obrázky, upravíme ich kontrast na správne hodnoty a potom ich zložíme, môžeme vytvoriť akýkoľvek obrázok.

Začnime týmto písmenom „A“. Je dosť malé, ale musí byť malé, inak skončíme s príliš mnohými dodatkovými obrázkami.

<img src="img/a.png" class="sketch sketch-letter">

Keď pridávame čoraz viac z týchto obrázkov, približujeme sa do niečoho, čo sa stáva viac a viac podobné originálnemu obrázku. Myslím si, že sami uvidíte postup, pretože už s niekoľkými z nich dostaneme dobrú aproximáciu.

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

Pre skutočné obrázky JPEG treba už len niekoľko ďalších detailov.

Obrázok sa rozdelí na kúsky 8x8 a každý kúsok sa rozdelí osobitne. Na určenie toho, ako svetlý alebo tmavý je každý pixel, použijeme množinu frekvencií a potom ďalšie dve množiny pre definovanie farieb, jednu pre červeno-zelenú a druhú pre modro-žltú. Počet frekvencií, ktoré používame pre každý kúsok, určuje kvalitu JPEG.

Toto je skutočný obrázok JPEG, priblížený, aby sme mohli vidieť podrobnosti. Keď sa hráme s úrovňou kvality, môžeme vidieť, ako tento proces prebieha.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Zhrnutie

Zhrňme teda:

- Fourierova transformácia je proces, ktorý nám niečo vezme a rozdelí to na svoje frekvencie.
- Frekvencie nám hovoria o niektorých základných vlastnostiach údajov, ktoré máme.
- Dokáže komprimovať údaje iba ukladaním dôležitých frekvencií.
- A tiež ju môžeme použiť na vytváranie zaujímavo vyzerajúcich animácií s niekoľkými kruhmi.

A to je len vrchol ľadovca. Fourierova transformácia je mimoriadne silný nástroj, pretože rozdelenie vecí na frekvencie je také zásadné. Používa sa v mnohých oblastiach vrátane návrhu integrovaných obvodov, pre signály mobilných telefónov, zobrazovanie magnetickou rezonanciou (MRI) a aj v kvantovej fyzike!

## Otázky pre zvedavých

Preskočil som tu väčšinu matematických vecí, ale ak vás zaujímajú základné princípy fungovania, tu sú niektoré otázky, ktoré môžete použiť na usmernenie svojho bádania:

- Ako matematicky reprezentuovať Fourierovu transformáciu?
- Aký je rozdiel medzi nepretržitou Fourierovou transformáciou a diskrétnou Fourierovou transformáciou?
- Ako vypočítate Fourierovu transformáciu?
- Ako urobiť Fourierovu transformáciu celej piesne? (Skôr než iba jednej noty.)

## Ďaľšie "čítanie"

Ak sa chcete dozvedieť viac, tu si môžete pozrieť niektoré naozaj dobré zdroje:

[Interaktívny sprievodca po Fourierovej transformácii](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Skvelý článok, ktorý sa viac venuje matematike toho, čo sa deje.

[Ale čo je Fourierova transformácia? Vizuálny úvod.](https://www.youtube.com/watch?v=spUNpyF58BY)
Skvelé YouTube video od 3Blue1Brown, ktoré tiež vysvetľuje matematiku Fourierových transformácií z audio perspektívy.

[Príbeh matematiky a umenia: Vytvorenie vizualizácie harmonických kruhov Fourierovej série](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Ďalší článok, ktorý vysvetľuje, ako môžete pomocou epicyklov nakresliť cestu, je vysvetlený z pohľadu lineárnej algebry.

[Fourierova transformácia (Wikipedia EN)](https://en.wikipedia.org/wiki/Fourier_transform) A samozrejme, článok Wikipedia je tiež celkom dobrý.

[Fourierova transformácia (Wikipedia SK)](https://sk.wikipedia.org/wiki/Fourierova_transform%C3%A1cia)
Po Slovensky už nie tak dobrý.

## Autor

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Som Jez! Na plný úväzok pracujem vo [vyhľadávacej spoločnosti](https://www.google.com/) v oblasti Bay Area a vo svojom voľnom čase rád robím hry a interaktívne veci, ako je táto!

Táto webová stránka je open-source, zdrojový kód si môžete pozrieť na [GitHub](https://github.com/Jezzamonn/fourier)! Ak máte akúkoľvek spätnú väzbu alebo sa chcete niečo opýtať, neváhajte a pošlite mi e-mail na adresu <span id="email-text">fourier [at] jezzamon [dot] com</span>, alebo vystrelte tweeta na [Twitter](https://twitter.com/jezzamonn).

Ak chcete vidieť viac mojej práce, pozrite sa na moju [domovskú stránku](/) a ak chcete vidieť, čo budem robiť ďalej, môžete sledovať môj účet na Twitter, [@jezzamonn](https://twitter.com/jezzamonn)!
