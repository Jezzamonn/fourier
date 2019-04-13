Die Fouriertransformation ist ein Werkzeug, das für eine Vielzahl verschiedener Anwendungen genutzt werden kann. Diese Seite ist eine Einführung in die Funktionsweise und Anwendung der Fouriertransformation. Sie zeigt außerdem, wie man damit schöne Dinge machen kann, wie zum Beispiel das hier:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Ich werde erklären, wie die Animation funktioniert und dabei die Fouriertransformation erläutern!

Am Ende solltest du ein gutes Verständnis davon haben,
- was eine Fouriertransformation macht
- wie einige praktische Anwendungen der Fouriertransformation aussehen
- wie sinnlose, aber coole Anwendungen der Fouriertransformation aussehen.

Wir werden die Mathematik und Gleichungen zunächst außen vor lassen. Es steckt eine Menge interessanter Mathematik dahinter, aber es ist besser als erstes damit anzufangen zu erklären was sie eigentlich tut und warum du sie nutzen willst. Wenn du mehr über das Wie wissen möchtest, gibt es unten weitere Literaturempfehlungen.

## Also was ist dieses Ding?

Einfach gesagt ist die Fouriertransformation ein Verfahren etwas in eine Menge von Sinuswellen zu zerlegen. Wie gewöhnlich stammt der Name von einer Person, die vor langer Zeit gelebt hat und sich Fourier nannte.

Lasst uns mit einigen einfachen Bespielen beginnen und uns weiter nach oben arbeiten. Als erstes schauen wir uns Wellen an - Muster, die sich mit der Zeit widerholen.

Hier ist eine Beispielwelle:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Dieses Wellenmuster kann in Sinuswellen zerlegt werden. Wenn wir die zwei Sinuswellen addieren, bekommen wir die Originalwelle zurück.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Die Fouriertransformation ist für uns eine Möglichkeit die kombinierte Welle zu nehmen und jede einzelne darin enthaltene Sinuswelle zurück zu erhalten. In diesem Beispiel kann man es fast im Kopf machen, indem man die originale Welle betrachtet.

Warum? Es stellt sich heraus, dass eine große Zahl von Dingen in der echten Welt basierend auf Sinuswellen interagieren. Üblicherweise nennen wir sie die Frequenzen der Wellen.

Das offensichtlichste Beispiel ist Klang - wenn wir einen Klang hören, hören wir nicht die verschnörkelte Linie, aber die verschiedenen Frequenzen der Sinuswelle, die den Klang ausmacht.

<button id="together-button" class="button">Spiele die ganze Welle</button>

<button id="split-button-1" class="button">Spiele hohe Frequenzen</button>

<button id="split-button-2" class="button">Spiele tiefe Frequenzen</button>

Weil wir die Frequenzen auf einem Computer zerlegen können, gibt uns das eine Erklärung dafür, was eine Person wirklich hört. Wir verstehen, wie hoch oder tief der Klang ist oder die Note herausfinden.

Wir können diesen Prozess auch auf Wellen anwenden, die nicht so aussehen, als würden sie aus Sinuswellen bestehen.

Schauen wir uns dieses Ding an. Es wird Rechtecksignal genannt.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Es sieht vielleicht nicht so aus, aber es kann auch in Sinuswellen zerlegt werden.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Diesmal brauchen wir sehr viele davon - genau genommen eine unendliche Menge um es perfekt darzustellen. Je mehr wir addieren, umso mehr nähern wir uns dem Rechtecksignal an, mit dem wir gestartet sind.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Spiele Welle</button>

*Ziehe den Schieberegler oben, um die Anzahl der Sinuswellen zu verändern.*

Visuell wirst du bemerken, dass die ersten paar Sinuswellen den größten Einfluß haben. Mit dem Schieberegler in der Mitte haben wir den prinzipiellen Verlauf der Welle, aber er ist sehr wackelig. Wir brauchen noch den Rest der kleinen Wellen, um das Verwackeln auszuglätten.

Wenn du dir die Welle anhörst, wird der Klang tiefer werden, weil wir die höheren Frequenzen entfernen.

Dieser Prozess funktioniert genauso mit jedem sich wiederholenden Verlauf. Probiere es aus, versuche deinen eigenen Verlauf zu zeichnen!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Zeichne hier!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Spiele Welle</button>

*Bewege den Schieberegler, um zu sehen, wie sich mit dem Hinzufügen von immer mehr Wellen wir näher und näher an deine Zeichnung kommen.*

Nochmal, abgesehen von der Wackeligkeit, sieht die Welle schon mit der Hälfte der Sinuswellen sehr ähnlich aus.

Tatsächlich können wir es zu unserem Vorteil nutzen, dass die Welle sehr ähnlich aussieht. Mit der Anwendung der Fouriertransformation erhalten wir die wichtigen Anteile des Klangs und speichern nur diese, um etwas zu erhalten, was dicht am Originalklang ist.

Normalerweise speichert ein Computer eine Welle als Reihe von Abtastungen.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Stattdessen können wir sie auch als Sinuswellen darstellen. Dann komprimieren wir den Klang und ignorieren die kleineren Frequenzen. Das Endresultat ist zwar nicht dasselbe, aber es klingt für eine Person sehr ähnlich.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

Das ist im Wesentlichen das, was MP3s machen, außer, dass sie besser entscheiden können welche Frequenzen genutzt und welche verworfen werden.

In diesem Fall können wir die Fouriertransformation benutzen, um die fundamentalen Eigenschaften einer Welle zu verstehen und sie dann für beispielsweise Kompression zu nutzen.

Ok, steigen wir tiefer in die Fouriertransformation ein. Der nächste Abschnitt schaut cool aus, gibt dir aber auch ein bisschen mehr Verständnis darüber, was die Fouriertransformation macht. Aber hauptsächlich sieht es cool aus.

## Epizyklen

Zu Beginn sagte ich, die Fouriertransformation spaltet Dinge in Sinuswellen auf. Es ist aber tatsächlich so, dass die Wellen, die erzeugt werden, keine normalen Sinuswellen sind, sondern sie in 3D sind. Man könnte sie "komplexer Sinus" nennen. Oder einfach "Spirale".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Wenn wir sie uns von der Seite ansehen, dann schauen sie aus wie Sinuswellen. Von vorn wie Kreise.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Was wir bisher gemacht haben, erforderte nur reguläre 2D Sinuswellen. Wenn wir eine Fouriertransformation auf 2D Wellen anwenden, dann kürzen sich die komplexen Anteile heraus, sodass wir nur Sinuswellen erhalten.

Aber wir können die 3D Sinuswellen für etwas lusitges, wie dies hier verwenden:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Was passiert hier?

Wir können uns die Zeichnung als 3D Form vorstellen, weil sie sich mit der Zeit bewegt. Wenn du dir vorstellst, dass die Hand von einer Person gezeichnet wird, stellen die drei Dimensionen die Position der Stiftspitze im zeitlichen Moment dar. Die X- und Y-Dimension geben die Position an, die zeitliche Dimension bestimmt die Zeit in diesem Moment.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Jetzt, da wir ein 3D Muster haben, können wir nicht die regulären 2D Sinuswellen benutzen, um es darzustellen. Egal wie viele der 2D Sinuswellen wir addieren, kommen wir nie auf etwas in 3D. Also brauchen wir etwas anderes.

Was wir benutzen können, sind die 3D Spiral-Sinuswellen von eben. Wenn wir davon sehr viele addieren, dann erhalten wir etwas, was aussieht wie unser 3D Muster.

Merke, diese Wellen sehen von vorn wie Kreise aus. Das Muster eines Kreises, welcher sich um einen anderen Kreis bewegt nennt man Epizyklus.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Benutze den SChieberegler, um die Anzahl der Kreise einzustellen.*

Wie zuvor erhalten wir eine gute Annährerung an unser Muster mit nur ein paar Kreisen. Weil dies ein sehr simples Muster ist, werden von den letzten Wellen nur die Ecken etwas geschärft.

Das funktioniert wirklich bei allen Zeichnungen! Dies ist deine Chance damit herumzuspielen.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Zeichne hier!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Rückgängig</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Benutze den Schieberegler, um die Anzahl der Kreise einzustellen.*

 Du wirst wieder für die meisten Formen erkennen, dass wir sie mit einer kleinen Anzahl von Kreisen sehr gut darstellen können, statt alle Punkte zu speichern.

Können wir das auch für echte Daten benutzen? Ja, könnten wir! In Wirklichkeit haben wir ein Datenformat namens SVG, welches vermutlich eine bessere Arbeit bei Formen und Mustern, die wir erzeugen, leistet. Vorerst ist es nur dazu da, um coole kleine GIFs zu erstellen.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Aber ss gibt noch einen anderen Typ von Bilddateien, welcher die Fouriertransformation verwendet.

## JPEGs

Wußten Sie, dass die Fouriertransformation auch für Bilder bentutzt werden kann. Tatsächlich benutzen wir es dauernd, denn so funktionieren JPEGs. Wir wenden die gleichen Prinzipien auf Bilder an -zerlegen sie in eine Reihe von Sinus-Wellen und speichern dann nur das Wichtigste.

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

- Fouriertransformationen sind Verfahren, die uns Dinge in ihre Frequenzen zerlegen läßt.
- die Frequenzen spiegeln fundamentale Eigenschaften der jeweiligen Daten wider.
- Und man kann Daten komprimieren, in dem man nur die wichtigen Frequenzen speichert.
- und wir können sie dazu nutzen um cool aussehenden Animationen mit einer Reihe von Kreisen zu erzeugen.

Damit haben wir nur an der Oberfläche einiger Anwendungen gekratzt. Fouriertransformation ist ein extrem mächtiges Werkzeug, da das Zerlegen von Dingen in Frequenzen so fundamental ist. Sie werden in vielen Gebieten genutzt, einschließlich Schaltkreis-Design, Mobil-Telefon-Signale, Magnetische Resonanzverfahren (Imaging - MRI) und Quantenphysik.

## Fragen der Neugierigen

Ich habe hier den meisten mathematischen Kram weggelassen, aber wenn Sie an den zugrunde liegenden Prinzipien, wie es funktioniert, interessiert sind, hier sind ein paar Fragen um Ihre Suche zu unterstützen.:

- Wie werden Fouriertransformationen mathematisch repräsentiert?
- Was ist der Unterschied zwischen einer kontinuierlichen Zeit-Fourier-Transforamtion und einer diskreten?
- wie setze ich eine Fouriertransformation am Computer um?
- wie erstelle ich eine Fouriertransformation für ein ganzes Lied?( statt nur eines einzelnen Tons)

## Lese-Hinweise

Um mehr zu lernen könenn sie einige gute Quellen ausprobieren:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Ein großartiger Artikel, der mehr auf die Mathematik eingeht.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Ein gutes Youtube-Video von 3Blue1Brown, was die Mathematik der Fouriertransformation aus der Audio-Perspektive behandelt.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Ein weiterer Artikel, der erklärt wie man Epizyklen zum Zeichnen von Wegen/Rändern nutzen kann, erklärt aus der Perspektive der linearen Algebra.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
Und selbstverständlich ist der Wikipedia-Artikel ebenfalls ziemlich gut.

## Der Autor

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Ich bin Jez. In Vollzeit arbeite ich in einer research-company  (Forschungseinrichtung) in der Bay Area und in meiner Freizeit erstelle ich gern Spiele und interaktiven Code wie den hier.

dieseWep-page ist open-source und kann auf [GitHub](https://github.com/Jezzamonn/fourier) eingesehen werden! Wenn Sie irgendwelche Rückfragen oder feedback habenschreiben sie mri eine Email an <span id="email-text"></span> oder senden Sie mir einen Tweetan [Twitter](https://twitter.com/jezzamonn).

Wenn Sie mehr von meiner Arbeit sehen wollnen, beuschen Sie meine home-page [homepage](/), und wenn Sie sehen wollen, was ich als Nächstes machefolgen Sie meinem Twitter-account, [@jezzamonn](https://twitter.com/jezzamonn)!