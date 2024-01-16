---
languageName: Português
title: Uma introdução interativa às transformadas de Fourier
description: Transformadas de Fourier são ferramentas utilizadas em vários contextos. Essa é uma explicação do que uma transformada de Fourier faz, e algumas maneiras diferentes que elas podem ser úteis.
translatorMarkdown: Traduzido por [Jean Oliveira Rodrigues de Araujo](https://twitter.com/_jaraujo_)
outFileName:
- pt-br.html
- pt_br.html # Backward compatibility with old links
url: /pt-br.html
---

Transformadas de Fourier são ferramentas utilizadas em vários contextos. Essa é uma explicação do que uma transformada de Fourier faz, e algumas maneiras diferentes que elas podem ser úteis. E como você pode fazer coisas bonitas com elas, como isto:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Irei explicar como essa animação funciona, e no caminho explicar as transformadas de Fourier!

No final, você deve ter uma boa noção sobre
- O que uma transformada de Fourier faz
- Alguns usos práticos das transformadas de Fourier
- Usos inúteis, mas legais das transformadas de Fourier

Iremos deixar a matemática e as equações de lado por enquanto. Tem bastante matemática interessante por trás delas, mas é melhor começar com o que elas fazem e motivos para você utilizá-las. Se você quiser saber mais sobre a teoria, há algumas sugestões de leitura abaixo!

## Então, o que é?

De maneira simples, a transformada de Fourier é uma maneira de dividir algo em várias ondas senoidais. Como de costume, o nome vem de uma pessoa, que viveu a bastante tempo atrás, chamada de Fourier.

Começaremos com alguns exemplos simples e depois faremos outros exemplos mais completos. Primeiro olharemos para ondas - padrões que se repetem com o tempo.

Um exemplo de onda:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Este padrão ondulado pode ser dividido em ondas senoidais. Isto é, quando nós adicionamos as duas ondas senoidais, obteremos a onda original novamente.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

A transformada de Fourier é uma maneira de nós, a partir de uma onda combinada, obter cada uma das ondas senoidais de volta. Neste exemplo, você quase consegue fazer isso na sua cabeça, só de olhar para a onda original.

Por quê? Diversas coisas na vida real interagem com base nessas ondas senoidais. Nós geralmente as chamamos de frequência da onda.

O exemplo mais óbvio é o som – quando ouvimos um som, só não ouvimos essa linha sinuosa, mas sim as diferentes frequências que compõem o som.

<button id="together-button" class="button">Tocar a onda completa</button>

<button id="split-button-1" class="button">Tocar a alta frequência</button>

<button id="split-button-2" class="button">Tocar a baixa frequência</button>

Ser capaz de dividi-las em um computador nos dá entendimento do que uma pessoa realmente ouve. Nós podemos entender o quão alto ou baixo um som é, ou descobrir qual nota que o som está.

Também podemos usar este processo em ondas que não parecem que são feitas de ondas senoidais.

Vamos dar uma olhada nesta. É chamada de onda quadrada.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Pode não parecer, mas também podemos dividi-la em ondas senoidais.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Nós precisamos de muitas desta vez – tecnicamente, uma quantidade infinita delas para representar. Na medida em que adicionamos mais e mais ondas senoidais, o padrão se aproxima cada vez mais da onda quadrada que começamos.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Tocar onda</button>

*Arraste o slider acima para alterar a quantidade de ondas senoidais.*

Visualmente, você perceberá que as primeiras ondas senoidais são as que mais fazem diferença. Com o slider na metade, temos a forma geral da onda, mas está toda ondulada. Só precisamos das pequenas que restaram para aplanar as ondulações.

Quando você ouvir a onda, você escutará o som ficando mais baixo porque estamos removendo as frequências mais altas.

Este processo funciona com qualquer linha que se repete. Tente desenhar uma!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Desenhe aqui!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Tocar onda</button>

*Mova o slider para ver como, na medida em que adicionamos mais ondas senoidais, fica cada vez mais parecido com seu desenho*

Novamente, apesar das ondulações extra, a onda é bastante parecida apenas com metade das ondas senoidais.

Nós podemos aproveitar o fato de que a onda é bastante parecida, a nosso favor. Ao utilizar uma transformada de Fourier, podemos pegar as partes importantes de um som, armazenar somente essas partes e terminar com algo bem parecido com o som original.

Normalmente, em um computador, armazenamos uma onda como uma série de pontos.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Em vez disso, podemos representá-la com várias ondas senoidais. Assim poderemos comprimir o som ao ignorar as frequências menores. Nosso resultado não será o mesmo, mas soará bem parecido com uma pessoa.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

Isto é essencialmente o que MP3s fazem, só que eles são mais espertos sobre quais frequências manter e quais jogar fora.

Então, neste caso, podemos utilizar transformadas de Fourier para entender as propriedades fundamentais de uma onda, e usar este conhecimento para outras coisas, como compressão.

Ok, nos aprofundaremos mais na transformada de Fourier. Esta próxima parte parece bem legal, mas também lhe dá maior entendimento sobre o que a transformada de Fourier faz. Mas principalmente parece legal.

## Epiciclos

No começo, eu disse que dividia coisas em ondas senoidais. A questão é, as ondas senoidais que são criadas não são ondas senoidais comuns, mas sim ondas 3D. Você pode simplesmente chamá-las de "espirais".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Se você as olhar de lado, elas parecem como ondas senoidais. Já olhando de frente, parecem com círculos.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Até então, tudo que temos feito só precisou de ondas senoidais 2D. Quando aplicamos a transformada de Fourier em ondas 2D, as partes complexas se anulam e simplesmente terminamos com ondas senoidais.

Mas podemos usar as ondas 3D para fazer coisas legais, que nem isto:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

O que está acontecendo aqui?

Bem, podemos pensar no desenho como uma forma 3D pelo jeito que ele se move com o tempo. Se você imaginar a mão sendo desenhada por uma pessoa, as três dimensões representam onde a ponta do lápis dela está naquele momento. As dimensões x e y nos dizem a posição, e a dimensão tempo é o tempo naquele momento.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Agora que temos um padrão 3D, não podemos usar as ondas senoidais 2D para representá-lo. Não importa quantas ondas senoidais 2D adicionarmos, nós nunca obteremos algo 3D. Então precisamos de outra coisa.

O que podemos usar são as ondas senoidais em espirais 3D de antes. Se adicionarmos várias dessas, podemos obter algo parecido com o nosso padrão 3D.

Lembre-se, essas ondas se parecem com círculos quando as olhamos de frente. O nome para o padrão de um círculo se movendo ao redor de outro círculo é epiciclo.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Use o slider acima para controlar a quantidade de círculos.*

Como antes, obtemos uma boa aproximação de nosso padrão apenas com alguns círculos. Considerando que esta é uma forma razoavelmente simples, tudo o que os últimos fazem, é deixar as pontas um pouco mais afiadas.

Tudo isto se aplica a qualquer desenho! Agora é sua vez de brincar.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Desenhe aqui!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Desfazer</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Use o slider para controlar a quantidade de círculos utilizados em seu desenho*

Novamente, você verá que para a maioria das formas, podemos aproximá-las razoavelmente bem com poucos círculos, em vez de salvar todos os pontos.

Podemos usar isso para dados reais? Bem, podemos! Na verdade, temos outro formato de dados chamado SVG, que provavelmente faz um trabalho melhor para as formas que queremos criar. Então, no momento, isto serve só para fazer pequenas gifs legais.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Entretanto, há outro tipo de dados visuais que utiliza transformadas de Fourier.

## JPEGs

Você sabia que as transformadas de Fourier também podem ser usadas em imagens? Na verdades, usamos o tempo todo, porque é assim que JPEGs funcionam! Nós aplicamos os mesmos princípios para imagens – dividimos algo em várias ondas senoidais, e então armazenamos apenas as importantes.

Agora que estamos lidando com imagens, nós precisamos de outro tipo de ondas senoidais. Nós precisamos de algo que com qualquer imagem, podemos adicionar várias ondas senoidais para obter a imagem original de volta.

Para isto, cada uma de nossas ondas senoidais serão imagens também. No lugar de uma onda, é uma linha, agora temos imagens com seções pretas e brancas. Para representar o tamanho de uma onda, cada imagem terá mais ou menos contraste.

Também podemos utilizá-las para representar cores da mesma maneira, mas no começaremos com imagens em preto-e-branco. Para representar imagens sem cor, precisamos de algumas imagens de ondas horizontais,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Junto de imagens de ondas verticais.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Somente imagens horizontais e verticais não são suficiente parar representar os tipos de imagens que queremos obter. Também precisamos de algumas extras que você obtêm multiplicando as duas.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Para uma imagem 8x8, aqui estão todas as imagens que precisamos.

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

Se pegarmos as imagens, ajustar seu contraste corretamente e então as adicionar, podemos criar qualquer imagem.

Começaremos com esta letra 'A'. É bem pequena, mas precisamos que seja pequena, caso contrário, teremos muitas outras imagens.

<img src="img/a.png" class="sketch sketch-letter">

Na medida em que adicionamos mais e mais dessas imagens, terminamos com algo que se parece cada vez mais com a verdadeira imagem. Mas imagino que você vê o padrão aqui, na medida em que obtemos uma aproximação razoável com apenas algumas delas.

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

Para imagens JPEG de verdade, há apenas alguns detalhes a mais.

A imagem é separada em pedaços 8x8 e cada pedaço é dividido separadamente. Usamos um conjunto de frequências para determinar o quão claro ou escuro cada pixel é, e depois outros dois conjuntos para a cor, um para vermelho-verde, e outro para azul-amarelo. O número de frequência que utilizamos para cada pedaço determina a qualidade do JPEG.

Aqui temos uma imagem JPEG de verdade, com zoom para vermos os detalhes. Quando nós alteramos os níveis de qualidade, podemos ver o processo acontecendo.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Conclusão

Então, recapitulando:

- Transformadas de Fourier são coisas que nos permite pegar algo e dividi-lo em suas frequências.
- As frequências nos dizem sobre as propriedades fundamentais dos dados que temos
- E também podemos comprimir dados ao armazenar somente as frequências importantes
- Também podemos utilizá-las para fazer animações legais com vários círculos

Isto é só a ponta do iceberg das aplicações! A transformada de Fourier é uma ferramenta extremamente poderosa, porque dividir algo em frequências é bem fundamental. Elas são utilizadas em várias áreas, incluindo design de circuitos, sinais de aparelhos móveis, imagem por ressonância magnética e física quântica!

## Questões para os curiosos

Pulei a maior parte da matemática aqui, mas se você estiver interessado nos princípios por baixo das funcionalidades, algumas questões que você pode usar para se guiar em sua pesquisa:

- Como se representa uma transformada de Fourier matematicamente?
- Qual é a diferença entre uma transformada de Fourier de tempo contínuo e uma transformada de Fourier de tempo discreto?
- Como se faz uma transformada de Fourier computacionalmente?
- Como você aplica a transformada de Fourier em uma música inteira? (Em vez de uma só nota.)

## 'Leitura' adicional

Para aprender mais, aqui estão alguns recursos que você pode checar:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Um ótimo artigo que explora mais a parte matemática do que acontece.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Um ótimo vídeo de YouTube pelo 3Blue1Brown, também explicando a matemática das transformadas de Fourier numa perspectiva de áudio.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Outro artigo explicando como você pode usar epiciclos para desenhar uma trajetória, explicado de uma perspectiva de álgebra linear.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
E claro, o artigo da Wikipédia é muito bom também.

## O autor

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Sou Jez! Trabalho em tempo integral em uma [empresa de busca](https://www.google.com/) na área da Baía de São Francisco, e no meu tempo livre gosto de fazer jogos e códigos interativos como este!

Esta página é open-source, você pode checar o código no [GitHub](https://github.com/Jezzamonn/fourier)! Se você tem algum feedback ou quer perguntar alguma coisa, sinta-se livre para me mandar um e-mail em <span id="email-text">fourier [at] jezzamon [dot] com</span> ou me enviar um tweet em [Twitter](https://twitter.com/jezzamonn).

Se você quer ver mais do meu trabalho, visite minha [homepage](/), e se quiser saber o que farei em seguida, pode seguir minha conta no Twitter, [@jezzamonn](https://twitter.com/jezzamonn)!
