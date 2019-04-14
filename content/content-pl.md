Transformata Fouriera jest narzędziem, które znajduje zastosowanie w wielu rzeczach. Znajdziesz tu wyjaśnienie, co robi transformata Fouriera i kiedy bywa użyteczna. Dowiesz się też, jak za jej pomocą możesz tworzyć ciekawe i piękne rzeczy, np. tą wizualizację:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Zamierzam wytłumaczyć, jak działa ta animacja i o co chodzi w transformacie Fouriera!

Po przeczytaniu tego interaktywnego artykułu powinieneś/powinnaś mieć dobre rozeznanie w temacie. Poznasz następujące zagadnienia: 
- co robi transformata Fouriera
- kilka praktycznych zastosowań transformaty Fouriera
- kilka bezcelowych, ale fajnych zastosowań transformaty Fouriera

Na razie nie będę zagłębiać się w równania i matematyczne szczegóły, które skrywa w sobie transformata Fouriera. Na dobry początek warto zacząć od tego, co to narzędzie faktycznie robi i dlaczego ktoś chciałby go użyć. Jeśli chcesz poznać matematyczne oblicze transformaty Fouriera, poniżej znajdziesz linki do interesujących Cię artykułów.

## Co to właściwie jest?

Mówiąc krótko, transformata Fouriera jest metodą rozbijania czegoś (np. sygnału dźwiękowego) na kilka sinusoid. Jak zwykle nazwa pochodzi od gościa, który żył dawno temu i nazywał się Fourier. 

Zacznijmy od prostego przykładu. Na pierwszy rzut oka weźmy fale - wzory i schematy powtarzające się w czasie.

Poniżej przykładowa fala:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Ten falisty wykres może być rozbity na zwykłe sinusoidy. To oznacza, że po zsumowaniu tych dwóch sinusoid otrzymamy oryginalną, wyjściową falę.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Transformata Fouriera jest sposobem na rozbicie złożonej fali na regularne sinusoidy składające się na ten wykres. W tym przykładzie można przeanalizować i rozbić sygnał w głowie, po prostu patrząc na falę. 

Ale po co? Okazuje się, że wiele rzeczy wokół nas oddziałuje na siebie w oparciu o te niewinnie wyglądające sinusoidy, a ściślej mówiąc - w oparciu o częstotliwości tych fal.

Najbardziej oczywistym przykładem jest dźwięk. Gdy go słyszymy, ucho nie odbiera pojedynczej, pokręconej linii, ale różne częstotliwości sinusoid, które tworzą słyszany dźwięk.

<button id="together-button" class="button">Odtwórz właściwą falę</button>

<button id="split-button-1" class="button">Odtwórz wysoką częstotliwość</button>

<button id="split-button-2" class="button">Odtwórz niską częstotliwość</button>

Dzięki temu, że można taką analizę przeprowadzić na komputerze, jesteśmy w stanie określić, co faktycznie słyszymy, jak niski lub jak wysoki jest dźwięk albo wskazać, jaka to nuta.

Transformata Fouriera działa również w przypadku fal, które nie wyglądają jak złożenie sinusoid. 

Rzućmy okiem na przykład poniżej. Jest to tzw. fala kwadratowa.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Być może nie wydaje się to wykonalne, ale ta fala też może być rozdzielona na sinusoidy.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Tym razem potrzebujemy ich znacznie więcej. Praktycznie rzecz biorąc - nieskończonej ilości pośrednich sinusoid, aby jak najdokładniej przedstawić wyjściową falę. W miarę dodawania kolejnych fal otrzymywany wzór coraz bardziej przypomina kwadratową falę, od której rozpoczął się proces.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Odtwórz falę</button>

*Przemieszczaj suwak powyżej, aby zobaczyć, ile sinusoid tworzy złożoną falę*

Gdy się przyjrzysz, zauważysz, że właściwie tylko kilka pierwszych sinusoid ma największy wpływ na układ fali. Gdy suwak znajduje się w połowie zakresu, fala jest już mniej więcej ukształtowana, ale na jej powierzchni widnieją "wężyki". Fale znajdujące się w drugiej połowie zakresu suwaka są potrzebne, aby spłaszczyć "wężyki" i uzyskać gładką linię.

Gdy posłuchasz fali, usłyszysz, że dźwięk się obniża, bo pozbyliśmy się wyższych częstotliwości.

Ten proces zadziała dla każdej powtarzającej się linii. Daj się ponieść - narysuj swoją własną!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Draw here!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Odtwórz falę</button>

*Przemieszczaj suwak aby zobaczyć, że w miarę dodawania kolejnych fal wykres coraz bardziej przypomina twój rysunek*

I znów - poza dodatkowymi "wężykami", fala jest dość podobna jedynie w oparciu o połowę sinusoid.

Możemy skorzystać z faktu wspomnianego powyżej. Dzięki transformacie Fouriera jesteśmy w stanie "wyciągnąć" interesujące nas fragmenty sygnału dźwiękowego i otrzymać ścieżkę, która różni się w niewielkim stopniu od oryginału. 

Zazwyczaj fala przechowywana jest na komputerze w formie zbioru punktów. 

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Zamiast tego można przedstawić falę jako grupę sinusoid, a następnie skompresować dźwięk poprzez eliminację niższych częstotliwości. Końcowy wynik nie będzie identyczny, ale różnicę ciężko będzie wysłyszeć. 

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

W zasadzie jest to sposób, w jaki działa format MP3, z tą różnicą, że tam eliminacja częstotliwości przebiega trochę bardziej inteligentnie.

W tym przypadku można było wykorzystać transformatę Fouriera do zrozumienia falowej natury dźwięku i metody jego kompresji.

Ok, teraz pora zagłębić się bardziej w transformatę Fouriera. Kolejna część wygląda naprawdę super, ale też pozwala lepiej zrozumieć, co ten proces robi. W dużej mierze po prostu wygląda super.

## Epicykle

Na początku powiedziałem, że transformata rozbija różne rzeczy na sinusoidy. Rzecz w tym, że fale powstałe w tym procesie nie są zwykłymi sinusoidami. Są trójwymiarowe (3D). Możesz określić je jako "złożone sinusoidy" lub po prostu "spirale". 

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Gdy patrzymy na spiralę z boku, wygląda jak zwykła sinusoida. Patrząc od frontu - porusza się po okręgu.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Do tej pory wszystko, o czym do tej pory mówiliśmy wymagało sinusoid 2D (dwuwymiarowych). Gdy przeprowadzamy transformatę Fouriera na falach 2D, nie mamy do czynienia ze złożonymi fragmentami i otrzymujemy jedynie sinusoidy.

Możemy jednak użyć sinusoid 3D, aby otrzymać coś, co wygląda całkiem zabawnie. Na przykład to:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Co tu się właściwie dzieje?

Cóż, możemy myśleć o tym rysunku jak o trójwymiarowym kształcie ze względu na sposób, w jaki się porusza w miarę upływu czasu. Gdy wyobrazisz sobie dłoń rysowaną przez kogoś, trzy wymiary określają pozycję czubka ołówka w danym momencie. Osie x i y wyznaczają pozycję, natomiast oś z - czas.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Ponieważ teraz mamy do czynienia z trójwymiarowym wzorem, nie możemy użyć dwuwymiarowych sinusoid, aby go przeprowadzić analizę. Nieważne jak dużo fal 2D zostanie dodanych - wynik nigdy nie będzie przypominać czegoś trójwymiarowego. Potrzeba innego rozwiązania.

Możemy posłużyć się spiralami przedstawionymi przed chwilą. Jeśli dodamy ich wystarczająco dużo, możemy otrzymać coś całkiem podobnego do wyjściowego wzoru 3D.

Pamiętaj, że spirale przypominają okręgi, gdy patrzy się na nie od frontu. Wzór okręgu poruszającego się wokół innego okręgu nosi nazwę epicyklu.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Użyj suwaka powyżej, aby zmienić ilość okręgów*

Tak jak poprzednio, otrzymujemy całkiem niezłe przybliżenie naszego wzoru jedynie przy użyciu kilku okręgów. Ponieważ jest to dość prosty kształt, kolejne okręgi delikatnie wyostrzają krawędzie.

Wszystko to można wykorzystać w jakimkolwiek rysunku. Naprawdę! Teraz masz okazję, żeby się tym pobawić.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Draw here!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Undo</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Użyj suwaka, aby zmieniać ilość okręgów użytych do twojego rysunku*

Po raz kolejny możesz zobaczyć, że dla większości kształtów można je całkiem przyzwoicie przybliżyć za pomocą niewielkiej ilości okręgów, bez potrzeby przechowywania wszystkich punktów.

Czy można użyć tego procesu dla prawdziwych danych? W sumie... można! W praktyce mamy do dyspozycji inny format, który z pewnością sprawdzi się lepiej w przypadku kształtów, które tworzymy - SVG. Na tą chwilę więc przyda się to jedynie do tworzenia fajnych GIFów.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Istnieje jednak jeszcze jeden rodzaj wizualnych danych, który korzysta z transformaty Fouriera.

## JPEG

Czy wiedziałeś/aś, że transformata Fouriera może być wykorzystana w obrazkach? Powiem więcej - dzieje się to za każdym razem, gdy korzystasz z formatu JPEG, ponieważ to na transformacie opiera się zasada jego działania. W przypadku plików graficznych proces wygląda tak samo - rozbijamy jakiś obiekt na kilka sinusoid i przechowujemy jedynie te najbardziej istotne.

Tym razem mamy do czynienia z obrazkiem, zatem potrzebujemy innego rodzaju fali. Niezależnie od tego, jaki to będzie obraz, potrzebujemy takiego obiektu, który po dodaniu kilku fal pozwoli powrócić do oryginalnego obrazu.

Żeby to zrobić, każda z sinusoid także będzie obrazem. W tym przypadku fali nie będzie reprezentować linia, ale obrazki z białymi i czarnymi fragmentami. Aby przedstawić rozmiar fali, każdy obrazek będzie miał większy lub mniejszy kontrast.

Można skorzystać z tej samej metody do tworzenia koloru, ale póki co skupimy się na czarno-białych obrazach. Jeśli chcemy przedstawić bezbarwne obrazy, potrzebujemy zarówno obrazy fal poziomych...

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

... jak i fal pionowych.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Same obrazki fal nie wystarczą do wizualizacji obrazów, które chcemy otrzymać. Potrzeba dodatkowych obrazków, otrzymanych w wyniku "przemnożenia" przez siebie poziomego i pionowego obrazka.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Poniżej lista obrazków, które potrzebujemy do obrazu o wymiarach 8x8.

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

Gdy weźmiemy te obrazki, skalibrujemy kontrast i nałożymy na siebie, możemy stworzyć każdy obraz.

Zacznijmy od litery 'A'. Jest dość mała, jednak jest to konieczne. Inaczej w trakcie procesu moglibyśmy otrzymać inne, zbędne obrazy.

<img src="img/a.png" class="sketch sketch-letter">

W miarę dodawania i nakładania na siebie obrazków, otrzymywany rezultat coraz bardziej przypomina faktyczny, wyjściowy obraz. Myślę, że jesteś w stanie zauważyć schemat, ponieważ dostajemy rozsądne przybliżenie przy użyciu zaledwie kilku obrazków.

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

W przypadku prawdziwych JPEGów istnieje kilka drobnych, wartych uwagi szczegółów. 

Wyjściowy obraz o wymiarach 8x8 zostaje rozłożony na fragmenty (siatka 8x8). Każdy fragment osobno również zostaje rozbity. Używamy pewnego zbioru częstotliwości, aby określić, jak ciemny lub jasny jest piksel, a następnie dwóch zbiorów barw - jednego zbioru dla czerwonej i zielonej, a kolejnego zbioru dla niebieskiej i żółtej. Liczba częstotliwości, która zostanie użyta do każdego fragmentu determinuje jakość obrazu.

Poniżej prawdziwy obraz typu JPEG, powiększony, żeby zobaczyć detale. Przewiń stronę w dół, aby zobaczyć przebieg procesu. 

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Wnioski

Podsumowując: 

- Transformata Fouriera służy do rozbijania pewnych interesujących nas obiektów na fale sinusoidalne
- Częstotliwości tych fal określają pewne istotne właściwości danych, które posiadamy, ...
- ... a dzięki rozdzieleniu na poszczególne częstotliwości możemy kompresować dane, przechowując te, które są niezbędne i odrzucając pozostałe
- No i możemy zaciągnąć transformatę do tworzenia animacji za pomocą kilku kółek, które wzbudzą zazdrość u twoich znajomych. Opad szczęki gwarantowany.

Tytuł tego samouczka mówi sam za siebie - jest to jedynie wstęp i wierzchołek góry lodowej. Transformata Fouriera jest niezwykle potężnym narzędziem, którego podstawą działania i fundamentem jest podział na grupę częstotliwości. Można je spotkać w wielu dziedzinach i zagadnieniach. Z transformaty korzysta się chociażby przy projektowaniu obwodów elektrycznych, w telekomunikacji, rezonansie magnetycznym, a nawet w fizyce kwantowej!

## Pytania dla dociekliwych

Pominąłem zdecydowaną większość matematycznych zagadnień, ale jeśli interesują cię podwaliny działania transformaty Fouriera, poniżej znajduje się kilka pytań, o które możesz się oprzeć w trakcie poszukiwania informacji:

- Jak zilustrować matematycznie transformatę Fouriera?
- Na czym polega różnica między transformatą Fouriera o czasie ciągłym, a transformatą o czasie dyskretnym?
- Jak obliczeniowo przeprowadza się transformatę Fouriera?
- Jak przeprowadzić transformatę Fouriera dla całej piosenki (zamiast pojedynczej nuty)?

## Dalsza 'czytanka'

Jeśli chcesz wiedzieć więcej, poniżej umieszczam linki do bardzo dobrych źródeł, które możesz sprawdzić (źródła umieszczone przez autora są w języku angielskim):

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)  
Świetny artykuł zgłębiający matematyczne oblicze transformaty Fouriera.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)  
Bardzo dobry film autorstwa 3Blue1Brown objaśniający matematykę stojącą za tym procesem z perspektywy dźwięku i jego falowej natury.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)  
Kolejny artykuł, który przybliży ci zastosowania epicykli do rysowania ścieżek od tej algebraicznej strony.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)  
Artykuł z Wikipedii również nie ma się czego wstydzić.

## O autorze

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Jestem Jez! Pracuję na pełen etat w [pewnej dużej firmie](https://www.google.com/) w rejonie zatoki San Francisco. W wolnym czasie lubię tworzyć gry i interaktywne, programowalne rzeczy jak animację powyżej.

Ta strona ma otwarte źródło, możesz podejrzeć jej kod na [GitHubie](https://github.com/Jezzamonn/fourier)! Jeśli chcesz podzielić się swoimi wrażeniami lub po prostu zadać pytanie, śmiało napisz do mnie [maila](fourier@jezzamon.com) lub na [Twitterze](https://twitter.com/jezzamonn).

Jeśli chcesz zobaczyć, co jeszcze robię, zajrzyj na moją [stronę główną](/), a jeśli chcesz być na bieżąco - możesz zaobserwować moje konto na Twitterze, [@jezzamonn](https://twitter.com/jezzamonn)!
