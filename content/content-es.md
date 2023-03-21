---
languageName: Español
title: Una introducción interactiva a las transformadas de Fourier
description: "Las transformadas de Fourier son una herramienta utilizada en un montón de cosas diferentes. Esta es una explicación de lo que hace una transformada de Fourier, algunas formas diferentes en que puede ser útil y cómo puedes hacer cosas bonitas con ella, como esta cosa:"
translatorMarkdown: Traducido por [Juan Carlos Ponce Campuzano](https://www.jcponce.com)
outFileName: es.html
---

Las transformadas de Fourier son herramientas utilizadas en un montón de contextos diferentes. Esta es una explicación de lo que hace una transformada de Fourier, algunas formas diferentes en que puede ser útil y cómo puedes hacer cosas bonitas con ella, como esta cosa:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Voy a explicar cómo funciona esta animación, ¡y en el camino explicaré las transformadas de Fourier!

Al final deberías tener una buena idea sobre
- Lo que hace una transformada de Fourier
- Algunos usos prácticos de las transformadas de Fourier
- Algunos usos sin sentido pero interesantes de las transformadas de Fourier

Vamos a omitir las matemáticas y las ecuaciones fuera de esta explicación por ahora. Hay un montón de matemáticas interesantes detrás de todo esto, pero es mejor comenzar con lo que realmente hace, y por qué quisieras usarlo. Si deseas saber más sobre el cómo, ¡hay más sugerencias de lectura al final!

## Entonces, ¿qué es esta cosa?

En pocas palabras, la transformada de Fourier es una forma de dividir algo en un montón de ondas sinusoidales. Como es usual, el nombre proviene de una persona que vivió hace mucho tiempo llamada Fourier.

Empecemos con algunos ejemplos simples y avancemos hacia otros más complejos. Primero veremos las ondas, patrones que se repiten con el tiempo.

Aquí hay un ejemplo de una onda:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Este patrón ondulado se puede dividir en ondas sinusoidales. Es decir, cuando sumamos las dos ondas sinusoidales, recuperamos la onda original.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

La transformada de Fourier es una forma de tomar la onda combinada y recuperar cada una de las ondas sinusoidales. En este ejemplo, casi puedes hacerlo en tu cabeza, sólo mirando la onda original.

¿Por qué? Resulta que muchas cosas en el mundo real interactúan basadas en estas ondas sinusoidales. Normalmente las llamamos frecuencias de onda.

El ejemplo más obvio es el sonido: cuando escuchamos un sonido, no escuchamos esa línea ondulada, pero sí escuchamos las diferentes frecuencias de las ondas sinusoidales que forman el sonido.

<button id="together-button" class="button">Escuchar Onda Completa</button>

<button id="split-button-1" class="button">Escuchar Alta Frecuencia</button>

<button id="split-button-2" class="button">Escuchar Baja Frecuencia</button>

Al dividirlos en una computadora podemos tener una idea de lo que una persona realmente escucha. Podemos entender qué tan alto o bajo es un sonido, o averiguar qué nota es.

También podemos usar este proceso en ondas que no parecen estar hechas de ondas sinusoidales.

Echemos un vistazo a este objeto. Se llama onda cuadrada.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Puede que no lo parezca, pero también se puede dividir en ondas sinusoidales.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Necesitamos muchos de ellas esta vez, técnicamente una cantidad infinita para representarlos perfectamente. A medida que sumamos más y más ondas sinusoidales, el patrón se acerca cada vez más a la onda cuadrada con la que comenzamos.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Escuchar Onda</button>

*Arrastra el control deslizante de arriba para jugar con la cantidad de ondas sinusoidales que hay.*

Visualmente, notarás que en realidad las primeras ondas sinusoidales son las que hacen la mayor diferencia. Con el deslizador a la mitad, tenemos la forma general de la onda, pero todo es ondulado. Solo necesitamos el resto de los pequeños para que la ondulación se aplane.

Cuando escuchas la onda, escucharás que el sonido disminuye, porque estamos eliminando las frecuencias más altas.

Este proceso funciona así para cualquier línea que se repite. ¡Pruébalo, intenta dibujar el tuyo!

<div class="multi-container">
<div class="sketch" >
        <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
        <p id="wave-draw-instruction" class="instruction wave-instruction">¡Dibuja aquí!</p>
    </div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Escuchar Onda</button>

*Mueve el control deslizante para ver cómo a medida que agregamos ondas sinusoidales, se acerca más y más al dibujo que has hecho.*

Una vez más, aparte de la extravagancia extra, la onda se ve bastante similar con solo la mitad de las ondas sinusoidales.

Podemos usar el hecho de que la onda es bastante similar a nuestra ventaja. Al usar una transformada de Fourier, podemos obtener las partes importantes de un sonido, y solo almacenarlas para terminar con algo que está muy cerca del sonido original.

Normalmente en una computadora almacenamos una onda como una serie de puntos.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Lo que podemos hacer en cambio es representarlo como un grupo de ondas sinusoidales. Luego podemos comprimir el sonido ignorando las frecuencias más pequeñas. Nuestro resultado final no será el mismo, pero suena bastante similar a una persona.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

Esto es esencialmente lo que hacen los MP3, excepto que son más inteligentes con respecto a qué frecuencias mantienen y cuáles desechan.

Entonces, en este caso, podemos usar las transformadas de Fourier para comprender las propiedades fundamentales de una onda, y luego podemos usar eso para cosas como la compresión de archivos.

Ok, ahora vamos a profundizar más en la transformada de Fourier. La siguiente parte tiene un aspecto genial, pero también te dará una mejor idea para comprender lo que hace la transformada de Fourier. Pero sobre todo se ve genial.

## Epiciclos

Ahora, al principio mencioné que la transformada de Fourier divide cosas en ondas sinusoidales. El detalle aquí es que las ondas sinusoidales que crea no son solo ondas sinusoidales regulares, sino que están en 3D. Podrías llamarlos "sinusoides complejos". O simplemente "espirales".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Si echamos un vistazo lateralmente, se ven como ondas sinusoidales. Desde el frente, sin embargo, estos parecen círculos.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Hasta ahora, todo lo que hemos estado haciendo solo ha requerido las ondas sinusoidales regulares en dos dimensiones (2D). Cuando hacemos una transformada de Fourier en ondas 2D, las partes complejas se cancelan, por lo que terminamos con ondas sinusoidales.

Pero podemos usar las ondas sinusoidales en tres dimensiones (3D) para hacer que algo más divertido se vea así:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

¿Qué está pasando aqui?

Bueno, podemos pensar en el dibujo como una forma 3D debido a la forma en que se mueve en el tiempo. Si imaginas la mano que dibuja una persona, las tres dimensiones representan donde está la punta de su lápiz en ese momento. Las dimensiones x e y nos dicen la posición, y luego la dimensión de tiempo es el tiempo en ese momento.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Ahora que tenemos un patrón en 3D, no podemos usar las ondas sinusoidales 2D regulares para representarlo. No importa la cantidad de ondas sinusoidales 2D que sumemos, nunca obtendremos algo en 3D. Así que necesitamos algo más.

Lo que podemos usar es las ondas sinusoidales en espiral 3D de antes. Si sumamos muchos de ellos, podemos obtener algo que se parece a nuestro patrón en 3D.

Recuerda, estas ondas parecen círculos cuando las miramos de frente. El nombre del patrón de un círculo que se mueve alrededor de otro círculo es un epiciclo.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Usa el control deslizante de arriba para controlar cuántos círculos hay.*

Como antes, obtenemos una buena aproximación de nuestro patrón con solo unos pocos círculos. Debido a que esta es una forma bastante simple, todo lo que hacen los últimos es hacer los bordes un poco más detallados.

¡En realidad, todo esto se aplica a cualquier dibujo! Ahora es tu oportunidad de jugar con él.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
        <p id="draw-zone-instruction" class="instruction">¡Dibuja aquí!</p>
        <button id="draw-zone-undo-button" class="button embedded-button">Deshacer</button>
    </div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Utiliza el control deslizante para controlar la cantidad de círculos que se utilizan para tu dibujo.*

Una vez más, verás que para la mayoría de las curvas, podemos aproximarlas bastante bien con solo un pequeño número de círculos, en lugar de guardar todos los puntos.

¿Podemos usar esto para datos reales? ¡Bueno, podríamos! En realidad, tenemos otro formato de datos llamado SVG, que probablemente hace un mejor trabajo para los tipos de formas que tendemos a crear. Así que por el momento, esto es solo para hacer gifs muy interesantes y divertidos.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Sin embargo, hay otro tipo de datos visuales que utiliza transformadas de Fourier.

## JPEGs

¿Sabías que las transformadas de Fourier también se pueden usar en imágenes? De hecho, lo usamos todo el tiempo, porque así es como funcionan los JPEG. Estamos aplicando los mismos principios a las imágenes: dividimos algo en un montón de ondas sinusoidales y luego solo almacenamos las importantes.

Ahora estamos tratando con imágenes, necesitamos un tipo diferente de onda sinusoidal. Necesitamos tener algo que no importa qué imagen tengamos, podemos sumar un montón de estas ondas sinusoidales para volver a nuestra imagen original.

Para hacer eso, cada una de nuestras ondas sinusoidales también serán imágenes. En lugar de una onda que es una línea, ahora tenemos imágenes con secciones en blanco y negro. Para representar el tamaño de una onda, cada imagen tendrá más o menos contraste.

También podemos usarlos para representar el color de la misma manera, pero comencemos con las imágenes en blanco y negro por ahora. Para representar imágenes incoloras, necesitamos algunas imágenes de onda horizontal,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Junto con algunas imágenes de onda vertical.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Por sí mismas, solo las imágenes horizontales y verticales no son suficientes para representar los tipos de imágenes que obtenemos. También necesitamos algunos adicionales que se obtienen al multiplicar los dos juntos.

<div class="multi-container">
    <img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
    <div class="maths">×</div>
   <img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Para una imagen de 8x8, aquí están todas las imágenes que necesitamos.

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

Si tomamos las imágenes, ajustamos su contraste a la cantidad correcta y luego las sumamos para crear cualquier imagen.

Comencemos con esta letra 'A'. Es bastante pequeño, pero necesitamos que sea pequeño, de lo contrario terminaremos con demasiadas otras imágenes.

<img src="img/a.png" class="sketch sketch-letter">

A medida que agregamos más y más de estas imágenes, terminamos con algo que se acerca cada vez más a la imagen real. Pero creo que verás el patrón aquí, ya que obtenemos una aproximación razonable con solo algunos de ellos.

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

Para imágenes JPEG reales hay solo algunos detalles adicionales.

La imagen se divide en partes de 8x8, y cada parte se divide por separado. Utilizamos un conjunto de frecuencias para determinar qué tan claro u oscuro es cada píxel, y luego otros dos conjuntos para el color, uno para rojo-verde y otro para azul-amarillo. La cantidad de frecuencias que usamos para cada fragmento determina la calidad del JPEG.

Aquí hay una imagen JPEG real, ampliada para que podamos ver los detalles. Cuando jugamos con los niveles de calidad podemos ver que este proceso sucede.

<div id="jpeg-example" class="sketch">
 <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Conclusión

Así que vamos a recapitular:

- Las transformadas de Fourier son cosas que nos permiten tomar algo y dividirlo en sus frecuencias.
- Las frecuencias nos informan sobre algunas propiedades fundamentales de los datos que tenemos
- Y puede comprimir datos solo almacenando las frecuencias importantes
- Y también podemos usarlas para crear animaciones con un montón de círculos.

Estas son solo algunas de las aplicaciones. La transformada de Fourier es una herramienta extremadamente poderosa, porque dividir las cosas en frecuencias es fundamental. Se utilizan en muchos campos, incluidos el diseño de circuitos, las señales de los teléfonos móviles, la resonancia magnética (MRI) y la física cuántica.

## Preguntas para los curiosos.

Me salté la mayoría de los conceptos matemáticos, pero si estás interesado en los principios teóricos de cómo funciona, aquí hay algunas preguntas que puedes usar para guiar tu investigación:

- ¿Cómo representas matemáticamente una transformada de Fourier?
- ¿Cuál es la diferencia entre una transformada de Fourier de tiempo continuo y una transformada de Fourier de tiempo discreto?
- ¿Cómo haces computacionalmente una transformada de Fourier?
- ¿Cómo haces una transformada de Fourier de una canción completa? (En lugar de una simple nota.)

## Otras 'lecturas'

Para aprender más, algunos recursos realmente buenos que puedes revisar son:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Un gran artículo que profundiza más en las matemáticas de lo que sucede.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Un gran video de Youtube por 3Blue1Brown, que también explica las matemáticas de las transformadas de Fourier desde una perspectiva de audio.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Otro artículo que explica cómo puedes usar epiciclos para dibujar un camino, explicado desde una perspectiva de álgebra lineal.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
Y, por supuesto, el artículo de Wikipedia también es bastante bueno.

## El autor

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

¡Soy Jez! Trabajo tiempo completo en una [empresa de búsqueda](https://www.google.com/) en el Bay Area, y en mi tiempo libre me gusta hacer juegos y códigos interactivos como este.

¡Esta página web es de código abierto, puedes consultar el código en [GitHub](https://github.com/Jezzamonn/fourier)! Si tienes algún comentario o deseas hacer alguna pregunta, no dudes en enviarme un correo electrónico a <span id="email-text">fourier [at] jezzamon [dot] com</span> o envíame un tweet en [Twitter](https://twitter.com/jezzamonn).

¡Si quieres ver más de mi trabajo, visita mi [homepage](/), y si quieres ver qué hago a continuación, puedes seguir mi cuenta de Twitter, [@jezzamonn](https://twitter.com/jezzamonn)!
