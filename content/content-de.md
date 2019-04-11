Fourier Transformationen sind ein Werkzeug die für eine menge verschiedener anwendunge genutzt werden können. dies ist eine Erklärung was eine Fouriertransformation macht und einige andere Arten wie sie nützlich sein kann. Und wie man so schöne Dinge machen kann wie diese:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Ich werde erklären, wie die Animation funktioniert und dabei die Fourier Transformation erklären!
Am Ende sollten Sie eine Idee davon bekommen haben
- Was eine Fourier Transformation macht
- einige praktische Anwendunge der Fourier Transformation
- einige sinnlose aber coole anwendungen der Fourier Transformation

Wir werden Mathematik und Gleichungen zunächst aussen vor lassen. Es ist eine Menge interessanter Mathematik dahinter, aber es ist besser damit anzufangen was es tatsächlich tut und wofür Sie es als erstes nutzen würden. Wenn Sie mehr darüber wissen wollen, weiter unten können Sie mehr lesen.

## Also Was ist diese Sache?

Einfach gesagt is die Fourier Transformation ein Verfahren etwas in eine Menge von Sinus-Wellen zu zerlegen. Wie gewohnt stammt der Name von einer Person, die vor langer Zeit gelebt hat und sich Fourier nannte.

Lassen Sie uns mit einigen einfachen Bespielen beginnen und uns den Weg nach oben arbeiten. Als erstes schauen wir uns Wellen an - Muster die sich mit der Zeit widerholen.

Hier ist ein Wellen-Beispiel:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Dieses Wellenmuster kann in Sinus-Wellen zerlegt werden. Also wenn wir zwei Sinuswellen aufaddieren bekommen wir die Original-Welle zurück.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Die Fourier-Transformation ist für uns ein Weg die kombinierte Welle zu nehmen und jede einzelne Well zurück zu erhalten. In diesem Beispiel kann man es fast im Kopf machen, einfach wenn man die originale Welle betrachtet.

Warum? Es stellt sich heraus, dass eine Menge Dinge der realen Welt ebenfalls auf Sinus-Wellen basieren. Üblicherweise nennen wir Sie die Frequenzen der Wellen.

Das offensichtlichste Beispiel ist Klang - wenn wir einen Klang hören, hören wir nicht die verschnörkelte Linie, aber wir hören die verschiedenen Frequenzen der Sinus-Welle, die den Klang ausmacht.

<button id="together-button" class="button">Zeige ganze Welle</button>

<button id="split-button-1" class="button">Zeuge hohe Frequenzen</button>

<button id="split-button-2" class="button">Zeige tiefe Frequenzen</button>

Wenn wir in der Lage sind sie auf einem Computer zu zerlegen, dann vermittelt uns das ein Verständnis davon was die Person aktuell hört. Wir verstehen wie hoch oder tief der Klang ist, oder können die Note herausfinden.

Wir können diesen Prozess auch auf Wellen anwenden, die nicht aus Sinus-Wellen zusammen gesetzt sind.

Schauen Sie sich diese Welle an. Sie wird Rechteck-Welle genennt.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Es sieht vielleicht nicht so aus, aber sie kann auch in Sinus-Wellen zerlegt werden.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Diesmal brauchen wir eine Menge davon - technisch gesehen eine unendliche Menge um sie perfekt zu repräsentieren. Je mehr wir aufaddieren um so mehr nähern wir uns der Rechteck-Welle an, mit der wir gestartet sind.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Zeige Welle</button>

*Verschieben Sie den Regler oberhalb um die Anzahl der Sinus-Wellen zu verändern.*

Offensichtich werden Sie bemerkt haben, dass die ersten Sinuswellen die sind, die den größten Unterschied ausmachen. Mit dem Schieberegler auf halbem Weg haben wir die allgemeine Form der Welle, aber es ist noch verwackelt. Wir brauchen auch noch den Rest der kleinen Wellen um das Verwackeln auszuglätten.

Wenn Sie sich die Welle anhören, hören Sie, dass der Klang dunkler wird, da wir die höheren Frequenzen wegnehmen.

Dieser Prozess arbeitet genauso bei anderen sich wiederholenden Linien. Propieren Sie es aus, versuchen Sie selbst zu zeichnen!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Zeichne hier</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Zeige Welle</button>

*Bewegen Sie den Regler um zu sehen, wie sich mit dem Hinzufügen von immer mehr Wellen wir näher und näher an die Zeichnung kommen.*

Nochmal, trotz der Verwaschenheit, die Welle schaut schon ziemlich ähnlich aus mit der Hälfte der Sinus-Wellen.

Tatsächlich können wir die Tatsache, dass die Welle schon ziemlich ähnlich ist zu unserem Vorteil nutzen. Mit der Benutzung der Fourier-Transformation erhalten wir die wichtigen Anteile des Klangs und speichern nur diese schon dicht am Originalklang.

Normalerweise speichert ein Computer eine Welle als Punktreihe.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Statt dessen können wir  sie auch als Menge von Sinus-Wellen repräsentieren. Dann komprimieren wir den Sound und ignorieren die kleineren Frequenzen. Das Endresultat ist zwar nicht das gleiche, aber klingt sehr ähnlich für eine Person.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

Das ist im Wesentlichen das was MP3 macht, ausser das sie klüger sind welche Frequenzen sie nutzen und welche verworfen werden.

Also in diesem Fall können wir die Fourier-Transformation benutzen um die fundamentalen Eigenschaften einer Welle zu verstehen und es dann für Kompression nutzen.

Ok, steigen wir tiefer in die Fourier-Transformation ein. Der nächste Abschnitt schaut cool aus, gibt Ihnen aber auch ein bisschen mehr Verständnis darüber was die Fourier-Transformation macht. Aber überwiegend sieht es cool aus.

## Folgezyklen/Epizyklen

Am Anfang sagte ich, dass die Fourier-Transformation Ereignisse in Sinus-Wellen zerlegt. Tatsache ist, dass es die erzeugten Wellen nicht einfache reguläre Sinuswellen sind, sondern 3D. Sie können sie "komplexe Sinoide" nennen. Oder nur "Spiralen".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Wenn wir sie uns von der Seite ansehen, dann schauen sie aus wie Sinuswellen. Von vorn wie Kreise.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Was wir bisher gemacht haben erforderte nur reguläre 2D Sinuswellen. Wenn wir eine Fourier-Transformation auf 2D Wellen anwenden dann kürzt sich der komplexe Teil heraus, so dass wir eine Sinuswelle erhalten.

Aber wir können 3D Sinuswellen für etwas Spass nutzen wie dies:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Was passiert dort?

Wir könne an das Zeichnen einer 3D-Form denken bei der Art, wie es sich mit der Zeit bewegt. 'Wenn Sie sich die Hand vorstellen, wie sie von einer Person beim Zeichnen bewegt wird, werden die drei Dimensioen dadurch repräsentiert, wo die Spitze des Stiftes gerade ist. Die x und y Dimension ergibt die Position und die Zeit-Dimension ist die Zeit zu diesem Augenblick.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Jetzt, wo wir ein 3D Muster haben, können wir nicht die reguläre 2D Sinuswelle benutzen, um sie darzustellen. Gleich wieviele 2D-Wellen wir aufaddieren, wir erhalten niemals was in 3D. Also brauchen wir etwas anderes.

Was wir benutzen können sind die 3d Spiral-Sinuswellen von eben. Wenn wir davon genug aufaddieren dann erhalten wir unser 3D Muster.

Erinnern Sie sich, diese Wellen sehen aus wie Kreise, wenn wir von vorn draufgucken. Der Name für Muster eines Kreises der sich um einen anderen Kreis bewegt, nennt man Epizykel.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Benutzen sie den Regler um die Anzahl der Kreise einzustellen.*

Wie zuvor erhalten wir eine gute Annährerung an unser Muster mit nur ein paar Kreisen. Da es eine ziemlich einfache Form ist, machen Sie die Ecken schärfer um mehr zu sehen.

Das funktioniert bei allen Zeichnungen, wirklich! Jetzt ist Ihre Chance damit herumzuspielen.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Zeichne hier</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Zurücknehmen</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Benutzen sie den Regler um die Anzahl der Kreise einzustellen.*

Wieder sehen Sie, dass für die meisten Formen wir sie mit wenigen Kreisen recht gut  approximieren können, anstatt alle Punkte zu speichern.

Könne wir das für echte Daten auch nutzen? Können wir! In der Realtität haben wir ein anderes Datenformat, das sich SVG nennt, welches vielleicht besser geeignet dazu ist Buchstaben zu erzeugen als wir es könnten. Für den Monent ist es nur dafür da colle Gifs zu machen.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Aber, es gibt noch ein anderen Typ für visuelle Daten, der von der Fourier-Transformation Gebrauch macht.

## JPEGs

Wußten Sie, dass die Fourier-Transformation auch für Bilder bentutzt werden kann. Tatsächlich benutzen wir es dauernd, denn so funktionieren JPEGs. Wir wenden die gleichen Prinzipien auf Bilder an -zerlegen sie in eine Reihe von Sinus-Wellen und speichern dann nur das Wichtigste.

Jetzt, wo wir es mit Bildern zu tun haben, brauchen wir einen anderen Typ von Sinus-Wellen. Wir brauchen etws, was , gleich welches Bild wir haben, aufaddiert das Originalbild zurückliefert.

Um das zu tun muss jede Sinuswelle selbst ein Bild sein. Statt einer Welle, die eine Linie ist, haben wir jetzt Bilder mit schwarzen und weißen Anteilen. Um die Größe der Welle darzustellen haben wir mehr oder weniger Kontrast.

Wir können das auch nutzen um Farben darzustellen, aber lassen Sie uns zunächst mit Schwar-weiß-Bildern anfangen. Um farblose Bilder darzustellen brauchen wir horizontale Wellen-Bilder.

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Zusammen mit verticalen Wellenbildern.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Alleine horizontalen und vertikalen Bilder sind nicht genug um den Typ des Bildes zu repräsentieren. Wir brauchen noch eins zusätzlich, welches wir durch Multiplikation der beiden erhalten.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Für ein 8x8 Bild sind hier die Bilder die wir benötigen.

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

Wenn wir die Bilder hernehmen, ihren Kontrast justieren und sie aufaddieren können wir jedes Bild erzeugen.

Lassen Sie uns mit dem Buchstaben"A" anfangen. Er ist ziemlich klein, aber es sollte klein sein, da sonst zu vielen anderen Bilder erzeugt werden müssen.

<img src="img/a.png" class="sketch sketch-letter">

Wenn wir mehr und mehr von diesen Bildern aufaddieren, nähern wir uns immer mehr dem aktuellen Bild an. Ich denke Sie erkennen das Muster dahinter, da wir schon eine vernünftige Annäherung mit ein paar von ihnen erhalten.

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

Für echte JPEG Bilder gibt es noch einige extra Details.

Das Bild wurde auf geteilt in 8x8 Blöcke und jeder Block wurde einzeln zerlegt. Wir benutzen einen Set von Frequenzen um zu bestimmen, wie hell oder dunkel jedes Pixel ist und dann zwei weitere für die Farbe, eine für rot-grün, eine für blau-gelb. Die Anzahl der Frequenzen, die wir benutzen, bestimmt die Qualität des JPEG.

Hier ist ein richtes JPEG, zoomen Sie hinein um die Details zu sehen. Wenn wir mit den Qualitäts-Leveln spielen können wir den Prozess erleben.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Zusammenfassung

Lassen Sie uns rekapitulieren:

- Fourier-Transformationen sind Verfahren, die uns Dinge in ihre Frequenzen zerlegen läßt.
- die Frequenzen spiegeln fundamentale Eigenschaften der jeweiligen Daten wider.
- Und man kann Daten komprimieren, in dem man nur die wichtigen Frequenzen speichert.
- und wir können sie dazu nutzen um cool aussehenden Animationen mit einer Reihe von Kreisen zu erzeugen.

Damit haben wir nur an der Oberfläche einiger Anwendungen gekratzt. Fourier-Transformation ist ein extrem mächtiges Werkzeug, da das Zerlegen von Dingen in Frequenzen so fundamental ist. Sie werden in vielen Gebieten genutzt, einschließlich Schaltkreis-Design, Mobil-Telefon-Signale, Magnetische Resonanzverfahren (Imaging - MRI) und Quantenphysik.

## Fragen der Neugierigen

Ich habe hier den meisten mathematischen Kram weggelassen, aber wenn Sie an den zugrunde liegenden Prinzipien, wie es funktioniert, interessiert sind, hier sind ein paar Fragen um Ihre Suche zu unterstützen.:

- Wie werden Fourier-Transformationen mathematisch repräsentiert?
- Was ist der Unterschied zwischen einer kontinuierlichen Zeit-Fourier-Transforamtion und einer diskreten?
- wie setze ich eine Fourier-Transformation am Computer um?
- wie erstelle ich eine Fourier-Transformation für ein ganzes Lied?( statt nur eines einzelnen Tons)

## Lese-Hinweise

Um mehr zu lernen könenn sie einige gute Quellen ausprobieren:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Ein großartiger Artikel, der mehr auf die Mathematik eingeht.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Ein gutes Youtube-Video von 3Blue1Brown, was die Mathematik der Fourier-Transformation aus der Audio-Perspektive behandelt.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Ein weiterer Artikel, der erklärt wie man Epizyklen zum Zeichnen von Wegen/Rändern nutzen kann, erklärt aus der Perspektive der linearen Algebra.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
Und selbstverständlich ist der Wikipedia-Artikel ebenfalls ziemlich gut.

## Der Autor

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Ich bin Jez. In Vollzeit arbeite ich in einer research-company  (Forschungseinrichtung) in der Bay Area und in meiner Freizeit erstelle ich gern Spiele und interaktiven Code wie den hier.

dieseWep-page ist open-source und kann auf [GitHub](https://github.com/Jezzamonn/fourier) eingesehen werden! Wenn Sie irgendwelche Rückfragen oder feedback habenschreiben sie mri eine Email an <span id="email-text"></span> oder senden Sie mir einen Tweetan [Twitter](https://twitter.com/jezzamonn).

Wenn Sie mehr von meiner Arbeit sehen wollnen, beuschen Sie meine home-page [homepage](/), und wenn Sie sehen wollen, was ich als Nächstes machefolgen Sie meinem Twitter-account, [@jezzamonn](https://twitter.com/jezzamonn)!