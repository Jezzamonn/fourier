Les transformations de Fourier sont un outil utilisé dans un tas de choses différentes. Ceci est une explication de ce que fait une transformation de Fourier, et des différentes manières dont elle peut être utile. Et comment faire de jolies choses avec, comme ceci:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Je vais expliquer le fonctionnement de cette animation, et du même coup expliquer les transformations de Fourier !

À la fin, vous devriez avoir une bonne idée de :

- qu'est-ce qu'une transformation de Fourier,
- quelques utilisations pratiques des transformations de Fourier,
- quelques utilisations inutiles mais cool des transformations de Fourier.

Nous allons laisser les mathématiques et les équations de côté pour le moment. Il y a un tas de calculs intéressants derrière cela, mais il est préférable de commencer par ce qu'une transformation de Fourier fait réellement, et pourquoi vous voudriez l'utiliser. Si vous voulez en savoir plus sur les aspects mathématiques, il y a quelques suggestions de lecture plus bas !

## Alors, c'est quoi la transformation de Fourier ?

En gros, la transformation de Fourier est un moyen de décomposer quelque chose en un groupe d’ondes sinusoïdales. Comme d'habitude, le nom vient d'une personne qui vivait il y a longtemps, appelée Fourier.

Commençons par quelques exemples simples et on montera en puissance par la suite. Tout d'abord, nous allons examiner les ondes - des modèles qui se répètent dans le temps.

Voici un exemple d'onde :

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Ce motif d'onde peut être divisé en ondes sinusoïdales. En d’autres termes, lorsque nous additionnons les deux ondes sinusoïdales, nous récupérons l’onde initiale.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

La transformation de Fourier est un moyen pour nous de trouver chacune des ondes sinusoïdales à partir de l'onde d'origine. Dans cet exemple, vous pouvez presque le faire dans votre tête, simplement en regardant l'onde d'origine.

Pourquoi ? Il s'avère que beaucoup de choses dans le monde réel interagissent en fonction de ces ondes sinusoïdales. Nous les appelons généralement les fréquences de l'onde.

L’exemple le plus évident est le son : lorsque nous entendons un son, nous n’entendons pas cette ligne cabossée, mais nous entendons les différentes fréquences des ondes sinusoïdales qui constituent le son.

<button id="together-button" class="button">Jouer l'onde globale</button>

<button id="split-button-1" class="button">Joue la haute fréquence</button>

<button id="split-button-2" class="button">Joue la basse fréquence</button>

Le fait de pouvoir les séparer sur un ordinateur peut nous permettre de comprendre ce qu'une personne entend réellement. Nous pouvons comprendre à quel point un son est aigu ou grave, ou déterminer de quelle note il s'agit.

Nous pouvons également utiliser ce processus sur des ondes qui ne ressemblent pas à des ondes sinusoïdales.

Jetons un coup d'œil à celle-là. C'est ce qu'on appelle une onde carrée.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

On ne le dirait pas, mais elle peut aussi être divisée en ondes sinusoïdales.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Nous en avons besoin de beaucoup cette fois - techniquement, une infinité pour la représenter parfaitement. Au fur et à mesure que nous additionnons les ondes sinusoïdales, le motif se rapproche de plus en plus de l’onde carrée avec laquelle nous avons commencé.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Jouer l'onde</button>

*Faites glisser le curseur ci-dessus pour jouer avec le nombre d'ondes sinusoïdales.*

Visuellement, vous remarquerez que ce sont les premières ondes sinusoïdales qui font la plus grande différence. Avec le curseur à mi-course, nous avons la forme générale de l'onde, mais elle est toute cabossée. Nous avons juste besoin du reste des plus petites ondes pour l'applatir.

Lorsque vous écoutez l'onde, vous entendez le son devenir grave, car nous supprimons les fréquences les plus hautes.

Ce processus fonctionne comme ça pour n'importe quelle ligne répétée. Essayez, dessinez la vôtre !

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Dessinez ici !</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Jouer l'onde</button>

*Déplacez le curseur pour voir comment, à mesure que nous ajoutons plus d'ondes sinusoïdales, on se rapproche de plus en plus de votre dessin.*

Encore une fois, mis à part pour les petites irrégularités, l'onde semble assez similaire avec seulement la moitié des ondes sinusoïdales.

En fait, nous pouvons utiliser le fait que l'onde soit assez similaire à notre avantage. En utilisant une transformation de Fourier, nous pouvons obtenir les parties importantes d'un son et ne stocker que celles-ci pour retrouver quelque chose d'assez proche du son d'origine.

Normalement sur un ordinateur, nous stockons une onde sous la forme de série de points.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Ce que nous pouvons faire à la place, c’est la représenter par un groupe d’ondes sinusoïdales. Ensuite, nous pouvons compresser le son en ignorant les plus petites fréquences. Le résultat ne sera pas exactement le même, mais personne ne fera vraiment la différence.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

C’est essentiellement ce que fait le MP3, sauf qu’il est plus intelligent sur les fréquences qu’il conserve et sur celles qu’il jette.

Ainsi, nous pouvons utiliser les transformations de Fourier pour comprendre les propriétés fondamentales d’une onde, puis l’utiliser pour des tâches telles que la compression.

Ok, maintenant creusons plus loin le sujet. La partie suivante à l'air cool, mais vous donne également un peu plus de compréhension de ce que fait la transformation de Fourier. Mais surtout, c'est cool.

## Épicycles

Au début, j’ai dit que la transformation de Fourier décomposait quelque chose en ondes sinusoïdales. Le problème, c’est que les ondes sinusoïdales qu’elle crée ne sont pas simplement des ondes sinusoïdales classiques, mais elles sont en 3D. Vous pouvez les appeler "sinusoïdes complexes". Ou simplement "spirales".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Si nous regardons de côté, elles ressemblent à des ondes sinusoïdales. De face, elles ressemblent à des cercles.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Jusqu’à présent, on n’avait besoin que des ondes sinusoïdales 2D classiques. Lorsque nous réalisons une transformation de Fourier sur des ondes 2D, les parties complexes s’annulent, donnant des ondes sinusoïdales.

Mais nous pouvons utiliser les ondes sinusoïdales 3D pour faire quelque chose d'amusant ressemblant à ceci :

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Qu'avons-nous ici ?

En fait, nous pouvons considérer ce dessin comme une forme 3D dessinée dans le temps. Si vous imaginez que la main est dessinée par une personne, les trois dimensions indiquent où se trouve la pointe de son crayon à ce moment-là. Les dimensions x et y nous indiquent la position, puis la dimension temporelle est le moment présent.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Maintenant que nous avons un motif 3D, nous ne pouvons plus utiliser les ondes sinusoïdales 2D classiques pour le représenter. Peu importe le nombre d'ondes sinusoïdales 2D que nous additionnons, nous n'obtiendrons jamais quelque chose en 3D. Nous avons donc besoin de quelque chose d'autre.

Ce que nous pouvons utiliser, ce sont les ondes sinusoïdales 3D, en spirale. Si nous en additionnons beaucoup, nous pouvons obtenir quelque chose qui ressemble à notre motif 3D.

Rappelez-vous que ces ondes ressemblent à des cercles quand on les regarde de face. Le nom du motif d'un cercle se déplaçant autour d'un autre cercle est un épicycle.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Utilisez le curseur ci-dessus pour déterminer le nombre de cercles entrant en jeu.*

Comme auparavant, nous obtenons une assez bonne approximation de notre modèle avec seulement quelques cercles. Comme il s’agit d’une forme assez simple, la dernière chose à faire est de rendre les bords un peu plus nets.

Ce principe s'applique à n'importe quel dessin ! Maintenant, c’est à votre tour de jouer avec.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Dessinez ici !</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Annuler</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Utilisez le curseur pour déterminer le nombre de cercles utilisés pour votre dessin.*

Encore une fois, vous verrez que pour la plupart des formes, nous pouvons les approcher assez bien avec un petit nombre de cercles seulement, au lieu de sauvegarder tous les points.

Peut-on utiliser cela pour de vraies données ? Eh bien, nous pourrions ! En réalité, nous avons un autre format de données appelé SVG, qui fait probablement un meilleur travail pour les types de formes que nous avons tendance à créer. Donc pour le moment, c'est vraiment juste pour faire des petits gifs sympas.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Il existe cependant un autre type de données visuelles qui utilise les transformations de Fourier.

## Le JPEG

Saviez-vous que les transformations de Fourier peuvent également être utilisées sur des images ? En fait, nous l'utilisons tout le temps car c'est ainsi que fonctionnent les JPEG ! Nous appliquons les mêmes principes aux images : décomposer quelque chose en ondes sinusoïdales et ne stocker que les plus importantes.

Maintenant que nous avons affaire à des images, nous avons besoin d’un type différent d’onde sinusoïdale. Nous avons besoin de pouvoir additionner plusieurs de ces ondes sinusoïdales pour revenir à notre image originale, quelle qu'elle soit.

Pour ce faire, chacune de nos ondes sinusoïdales sera également une image. Au lieu d'une onde sous la forme d'une ligne, nous avons maintenant des images avec des sections en noir et blanc. Pour représenter la taille d'une onde, chaque image aura plus ou moins de contraste.

Nous pouvons également les utiliser pour représenter la couleur de la même manière, mais commençons par les images en noir et blanc pour le moment. Pour représenter des images sans couleur, nous avons besoin d'images d'ondes horizontales,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Avec des images d'ondes verticales.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

En soit, les images horizontales et verticales ne suffisent pas pour représenter les types d'images que nous obtenons. Nous avons également besoin de quelques-unes supplémentaires qu'on obtient en multipliant ces images entre elles.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Pour une image 8x8, voici toutes les images dont nous avons besoin.

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

Si nous prenons ces images, ajustons leur contraste judicieusement, puis les additionnons, nous pouvons créer n’importe quelle image.

Commençons par cette lettre 'A'. C'est assez petit, mais nous avons besoin que ce soit petit sinon nous allons nous retrouver avec trop d'images.

<img src="img/a.png" class="sketch sketch-letter">

À mesure que nous ajoutons plus d'images, nous obtenons quelque chose qui se rapproche de plus en plus de l'image d'origine. Mais je pense que vous constaterez ici que nous obtenons une approximation raisonnable avec seulement quelques-unes d'entre elles.

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

Pour les vraies images JPEG, il y a juste quelques détails supplémentaires.

L'image est divisée en morceaux 8x8, et chaque morceau est décomposé séparément. Nous utilisons un ensemble de fréquences pour déterminer la luminosité ou l’obscurité de chaque pixel, puis deux autres ensembles pour la couleur, un pour le rouge-vert et un autre pour le bleu-jaune. Le nombre de fréquences que nous utilisons pour chaque morceau détermine la qualité du JPEG.

Voici une vraie image JPEG agrandie pour que nous puissions voir les détails. Lorsque nous jouons avec les niveaux de qualité, nous pouvons voir le processus en question en action.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Conclusion

Alors récapitulons :

- les transformations de Fourier nous permettent de prendre quelque chose et de le décomposer en fréquences,
- les fréquences nous donnent certaines propriétés fondamentales des données dont nous disposons,
- et peuvent compresser les données en ne stockant que les fréquences importantes,
- et nous pouvons également les utiliser pour créer des animations sympas avec des cercles.

Cela n'a fait qu'égratigner la surface avec quelques applications. La transformation de Fourier est un outil extrêmement puissant, car la décomposition de quelque chose en fréquences est fondamentale. Elle est utilisée dans de nombreux domaines, comme la conception de circuits, les signaux de téléphone mobile, l'imagerie par résonance magnétique (IRM) et la physique quantique !

## Questions pour les curieux

J'ai omis la plupart des calculs mathématiques ici, mais si vous êtes intéressés par les principes sous-jacents du fonctionnement de la transformation de Fourier, voici quelques questions que vous pouvez utiliser pour guider votre recherche :

- Comment représentez-vous mathématiquement une transformation de Fourier ?
- Quelle est la différence entre une transformation de Fourier en temps continu et une transformation de Fourier en temps discret ?
- Comment calculez-vous une transformation de Fourier ?
- Comment faites-vous la transformation de Fourier d'une chanson entière (plutôt qu'une simple note) ?

## 'Lecture' supplémentaire

Pour en savoir plus, voici de très bonnes ressources que vous pouvez consulter :

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Un excellent article qui creuse de ce qui se passe mathématiquement.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Une superbe vidéo Youtube de 3Blue1Brown, expliquant également le calcul de la transformation de Fourier d'un point de vue audio.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Un autre article expliquant comment utiliser les épicycles pour dessiner un chemin, expliqué dans une perspective d'algèbre linéaire.

[Transformation de Fourier (Wikipedia)](https://fr.wikipedia.org/wiki/Transformation_de_Fourier)
Et bien sûr, l'article de Wikipedia est également très bon.

## L'auteur

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Je suis Jez ! Je travaille à plein temps dans une [société de recherche](https://www.google.com/) dans la région de la baie de San Francisco, et pendant mon temps libre, j'aime créer des jeux et des codes interactifs comme celui-ci !

Cette page web est open-source, vous pouvez aller regarder le code sur [GitHub](https://github.com/Jezzamonn/fourier) ! Si vous avez des commentaires ou souhaitez poser des questions, n'hésitez pas à m'envoyer un mail à <span id="email-text">fourier [at] jezzamon [dot] com</span> ou à m'envoyer un tweet sur [Twitter](https://twitter.com/jezzamonn).

Si vous voulez en voir plus sur mon travail, consultez ma [page d'accueil](/), et si vous voulez voir ce que je compte faire, vous pouvez suivre mon compte Twitter, [@jezzamonn](https://twitter.com/jezzamonn) !

## Traduction française

Proposée par [Florian Richoux](http://www.richoux.fr) que vous pouvez suivre sur Twitter [@FloRicx](https://twitter.com/floricx) et GitHub [github.com/richoux](https://github.com/richoux).
