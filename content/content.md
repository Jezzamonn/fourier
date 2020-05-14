傅立葉轉換是用於許多不同事物中的工具。這裡以不同的方式介紹了傅立葉轉換能做些什麼事情。同時，也能夠用它製作漂亮的東西，像是下面這張圖：

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

接著，開始說明這個動畫的原理是什麼，並且一路讓您了解到傅立葉轉換的過程會是如何。

閱讀到最後，您將會有很大的收穫，像是：
- 傅立葉轉換能做什麼
- 傅立葉轉換的實際用途
- 傅立葉轉換的一些毫無意義但很酷的用法

我們先暫時不考慮數學和方程式。雖然它背後有許多有趣的數學運算，不過我們還是先來了解它的運作原理，以及為什麼要使用它。如果你想要了解到更多的相關參考資料，下面會有一些可以建議您閱讀的文章！

## 所以傅立葉轉換(Fourier transform)是什麼？

簡而言之，傅立葉轉換是一種將某些東西分解為一堆正弦波的方法。而這個名稱，是來自一個很久以前的故人，叫做傅立葉(Fourier)。

讓我們從一些簡單的示例開始，然後逐步進行。首先，我們看波形隨著時間的推移，一直按照某一規律的變化。

這是一個波形的例子：

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

這裡的這種波形可以分為多個正弦波。也就是說，當我們將兩個正弦波相加時，我們就會得到原始的波形。

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

傅立葉轉換是讓我們從組合的波形中，取出每個正弦波的一種方式。在範例中，只需看著原始波形，您幾乎就可以想像得出來。

為什麼？事實證明，現實世界中的許多事物都是基於這些正弦波進行交互的。 我們通常稱它們為波的頻率。

最明顯的例子是聲音。當我們聽到聲音時，沒有聽到那條彎彎曲曲的線條，但是我們聽到了構成聲音中不同頻率的正弦波。

<button id="together-button" class="button">Play Full Wave</button>

<button id="split-button-1" class="button">Play High Frequency</button>

<button id="split-button-2" class="button">Play Low Frequency</button>

在電腦上將音頻分開後，能夠使我們聽到個別實際的聲音。如此可以了解聲音的高低，也可以知道有哪些音符。

相同的處理方式，可以應用在正弦波以外的波形上。

底下這種波形，叫做方波：

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

雖然它看起來是方方正正的波形，但實際上確實能夠分解成許多的正弦波。換句話說，方波是能夠由多個正弦波組合而成的！

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

這次我們分層解說。從技術上來說，波形可以是無限多層疊加出來的，然而隨著我們有越來越多的正弦波相加，波形會逐漸地和一開始的方波越來越接近。

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Play Wave</button>

*試著滑動看看，觀察每層正弦波相加後得到的波形會是如何。*

從視覺上來看，您會注意到實際上前幾個正弦波是最大的正弦波。將滑塊移到一半時，我們具有方波的大致形狀，但波形上方有許多看似小幅擺動的鋸齒狀圖案。我們只需要將其餘的小正弦波相加後就可以使方波上的擺動變得平坦。

當您波放這個波形時，您會聽到很低的聲音，因為我們去除了聲音中較高的頻率。

這樣的方法，能夠處理任何具有週期性的波形。試試吧，嘗試自己繪製一個波形！

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Draw here!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Play Wave</button>

*試著滑動看看，隨著正弦波疊加的層數越多，圖形就會越接近您所畫的波形*

和上一個過程一樣，當滑動到中間的位置時，除了有些小幅的擺動之外，產生出來的波形已經很接近您所畫的波形了。

由此可以驗證一件事情：使用傅立葉轉換，可以將聲音中最重要的音頻成份分析出來，並且得到和原始聲音非常接近的波形。

在電腦中，波形會以一系列的點，來作為儲存訊號的方法。

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

基本上，這就是 MP3 的工作原理，只是在演算法上面能夠更準確的保留那些音頻，以及捨棄那些音頻。

所以，我們能夠使用傅立葉轉換來理解波形的基本屬性，然後將其應用在類似數據壓縮的事情。

好的，接著來更深入了解傅立葉轉換。下一個部分看起來很酷，也能更加瞭解傅立葉轉換的作用，不過大多只是看起來很酷而已。

## 周轉園(均輪和本輪, Epicycle)

首先，前面介紹過傅立葉轉換能將事物分析成多個正弦波。實際上，它產生出來的正弦波並不是一般的正弦波，而是3D(立體)的波形。也能稱為「複雜的正弦曲線」或「螺旋」。

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

如果我們從側面看，它們看起來就像正弦波。從正面看，這些看起來像圓圈。

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

目前為止，我們所做的一切只需要常規的2D(平面)正弦波。當我們對2D正弦波進行傅立葉轉換時，「複雜的」部分被忽略了，所以我們最終得到了正弦波。
但是我們可以使用3D正弦波來使事情變得有趣，就像這樣：

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

這裡發生了什麼事情呢？

我們可以將一個手繪圖理解成一個3D的形狀，因為點的位置在隨著時間移動。如果您想像一個人證在繪製一隻手的圖形，那麼這三個維度就代表了某一個時刻中，鉛筆筆尖的位置。因此，除了 x 和 y 維度告訴我們筆尖得位置，還有一個 z 時間維度，構成了這樣的一個圖形。

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

現在我們有了3D圖形，我們就不能使用一般2D正弦波來表示它。無論有多少個2D正弦波相加，我們都永遠不會得到3D。所以，我們還需要其他東西。

我們可以使用的是之前的3D螺旋正弦波。如果我們將很多個螺旋相加，得到的結果就會看起來像是3D的形狀。

請記住，當我們從正面看時，這些波形看起來像是圓圈。圍繞另一個圓圈運動的圓圈圖案，名稱就稱為「周轉園(均輪和本輪, Epicycle)」。

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*試著滑動看看，觀察到底有幾個圓圈。*

如同前面敘述，只需要用幾個圓圈，就可以畫出很接近於原始的圖形。因為這是一個相當簡單的形狀，所以只要在最後添加小圓，就可以使邊緣更加精確。

這個方法適用於任何一種圖案，現在，就是發揮您創作的機會啦！

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Draw here!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Undo</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*試著滑動看看，控制您要加入多少個圓圈。*

同樣的，您會發現對於大多數的形狀，我們可以用少量的圓圈來盡可能的表達出類似的圖形，而不必要使用所有的點。

這種方法可以應用在實際的數據嗎？答案是可以的！實際上，我們還有另一種數據格式，SVG，它對於我們所創作的圖案能夠有更好的數據呈現方式，所以，目前為止，實際上只是應用在製作酷炫的小GIF動畫。

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

此外，還有另一種類型的視覺數據會使用到傅立葉轉換。

## JPEG

您知道，傅立葉轉換除了可以表達簡單的手繪線條之外，還可以應用於影像嗎？其實，我們無時無刻都在使用，因為這就是JEPG圖檔的壓縮原理！我們對圖檔，以相同的原理將某物件分析成多個正弦波，然後只儲存重要的幾個正弦波形。

要處理影像，需要另一種類型的正弦波。無論是什麼影像，都能將這些正弦波相加，來還原原始的圖像。

要做到這一點，每個所使用的正弦波也將是一個個的小圖案。現在，我們使用一些黑白條紋的小圖案，這些更可以表達為「線」，而不是波。為了表示「波」的大小，每個圖案將具有或多或少的明暗對比度。

另外，也可以使用類似的方式表示顏色，但是我們先從黑白圖像開始解釋。為了表示灰階圖案，我們需要一些水平波形的圖案：

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

以及垂直波形的圖案：

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

如果只有水平和垂直的圖案，是不足以表達我們要形成的影像。我們還需要將兩種圖案相乘，來得到一些額外的圖形。

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

將8x8大小的圖案交互相乘後，就能獲得下面所有圖案。

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

如果我們把這些小圖案的對比度調整到適當的值，然後再將它們相加，就可以創造出任何的圖案。

讓我們從字母 "A" 開始。它非常小，但我們也需要它很小，否則拼湊時，我們會有太多其他的圖案呈現出來。

<img src="img/a.png" class="sketch sketch-letter">

隨著這些圖案的增加，我們最後就能得到更接近實際的圖案。但我認為您只要相加少部分的圖案，就能大致看出字母 "A" 的輪廓。

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

對於實際的JPEG影像來說，這只是它基本的原理，剩下的只有一些額外的細節說明。

圖案分成8x8的小圖塊，每個圖塊分別放置。我們使用一組頻率來決定每個像素的明暗程度，然後再使用兩組頻率來決定顏色，一組用於紅、綠色，另一組用於藍、黃色。 每個圖塊所使用的頻率多寡，決定了這張JPEG圖案的品質。

這是一張真實的JPEG圖案，經過放大後，可以看到圖塊的細節。當改變JPEG圖案的品質時(增加圖塊所使用的頻率)，就能觀察出圖案在品質上的區別。

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## 結論

讓我們回顧一下：

- 傅立葉轉換能將某些東西分解成頻率(或正弦波)。
- 頻率告訴我們有關數據的一些基本屬性
- 並且可以藉由著只存儲重要的頻率來壓縮數據
- 我們還可以使用它們製作一個有很多圓圈的炫酷動畫

這只是應用中最基礎的一個層面。傅立葉轉換是一個非常強大的工具，因為將事物分解為多個頻率是個很重要的分析方法。它們被用於許多的領域，包括電路設計，無線通訊信號，核磁共振成像（MRI）和量子物理學！

## 其他的問題

我在這裡跳過了大部分的數學運算和原理，但是如果您對數學原理感興趣的話，可以使用以下問題來幫助您的研究：

- 您如何在數學上表示傅立葉轉換？
- 連續時間傅立葉轉換和離散時間傅立葉轉換之間有什麼區別？
- 如何計算傅立葉轉換？
- 如何對整首歌曲進行傅立葉轉換？ （而不只是一個音符。）

## 延伸問題

小波轉換(或稱小波分析, wavelet analysis)，就是由傅立葉轉換的基礎而衍伸出來的方法。而小波轉換的不同處在於，將原本無限長度的正弦波，轉換成了有限長度，並且會衰減的小載波。

簡單來說，做傅立葉轉換能夠得到頻率，而做小波轉換，能夠得到時間和頻率。

目前離散小波轉換（DWT）常被用於訊號編碼，像是工程和計算機科學，而連續小波轉換（CWT）常被用於訊號分析，即科學研究類。尤其在生醫領域中，心電圖 (Electrocardiography) 與腦波圖 (Electroencephalography) 是兩項常見的生醫應用。

## 延伸閱讀

要瞭解到更多的訊息，這裡有一些非常好用的資源可以參考(作者推薦的資源是英文版的)：

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
從數學角度更加深刻的介紹傅立葉轉換。

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
Blue1Brown 制作的 YouTube 影片，從音頻的角度解釋傅立葉轉換的數學原理。

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
從線性代數的角度解釋如何用周轉園來畫出形狀

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
當然，為基本科的解釋也很不錯的！

以下是譯者為您推薦的一些中文參考資料：

[傅立葉轉換 (維基百科 中文版)](https://zh.wikipedia.org/wiki/%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2)

[圖解傅立葉轉換](https://hackmd.io/@sysprog/fourier-transform)

## 作者

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

我叫Jez! 我全職在美國海灣地區的[搜尋引擎公司](https://www.google.com/) 工作，在業餘時間我喜歡製作遊戲和互相交流程式碼。

這個網頁是開源的，您可以在[GitHub](https://github.com/Jezzamonn/fourier)上查看程式碼! 如果您有任何回饋意見或想提出任何問題，請隨時透過email<span id="email-text">fourier [at] jezzamon [dot] com</span>發送電子郵件給我，或在tweetr上[Twitter](https://twitter.com/jezzamonn)發一個推文給我。

如果您想了解我的更多作品，請查看我的[主頁](/)，如果您想了解我下一步的工作，可以關注我的Twitter[@jezzamonn](https://twitter.com/jezzamonn)!

## 譯者

您好，我是培鈞！目前我是一名研究生，就讀於正修科技大學 / 電機工程所。如果有相關的知識或技術可以分享，歡迎透過email<span id="email-text">k40005238 [at] gcloud [dot] csu [dot] edu [dot] tw</span>發送電子郵件給我。
