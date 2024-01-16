---
languageName: "한국어"
title: "푸리에 변환을 반응형으로 소개합니다"
description: "푸리에 변환은 여러 분야에 적재적소로 사용할 수 있는 도구입니다. 이 글에서는 푸리에 변환이 무엇이고, 어떻게 활용할 수 있는지 설명합니다."
translatorMarkdown: "잇창명 번역, [RanolP](https://ranolp.github.io/) 검수"
outFileName: "ko.html"
---

푸리에 변환은 여러 분야에 적재적소로 사용할 수 있는 도구입니다. 이 글에서는 푸리에 변환이 무엇이고, 어떻게 활용할 수 있는지 설명하려고 합니다. 이것처럼 신기한 것을 만들 수 있다는 것도 빼놓을 수 없죠.

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

이제부터 이 애니메이션을 어떻게 만들었는지 살펴보고, 그 과정에서 푸리에 변환에 대해 같이 알아봅시다!

이 글을 끝까지 읽으면 다음과 같은 세 가지를 배울 수 있습니다.
- 푸리에 변환이란 무엇인가
- 푸리에 변환의 실용적 활용
- 푸리에 변환의 무의미하긴 한데 엄청 신기한 활용

이 글에서는 수학이나 수식을 사용하지 않습니다. 푸리에 변환을 살펴보면 흥미로운 수식이 많지만, 일단 푸리에 변환이 실제로 어떤 것이고, 왜 써야 하는지부터 시작하는 것이 낫겠죠. 푸리에 변환에 대해 더 관심이 생기셨다면 글 아래에 달린 자료를 확인해 주세요!

## 그래서 푸리에 변환이 뭔가요?

간단히 말하자면 푸리에 변환은 어떤 함수를 사인파 여러 개로 나누는 것입니다. 이미 예상하셨겠지만, 옛날 옛적에 살았던 푸리에라는 사람의 이름을 땄습니다.

간단한 예시부터 차근차근 살펴봅시다. 우선 간단한 파동, 그러니까 일정한 시간마다 반복하는 패턴을 보겠습니다.

아래의 파동을 봐 주세요.

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

이 물결무늬 패턴을 사인파로 나눌 수 있습니다. 즉, 이 두 사인파를 합쳐서 원래 파동을 만들 수 있습니다.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

푸리에 변환이란 이렇게 합쳐진 파동이 주어졌을 때 원래의 사인파를 찾아내는 과정입니다. 이 예시에서는 원래 파동을 보기만 해도 머릿속으로 따라해볼 수 있습니다.

그런데 이게 왜 필요한 걸까요? 사실 현실에서는 생각보다 많은 것들이 이 사인파로 이루어져 있습니다. 보통 이러한 사인파를 주파수로 지칭합니다.

파동으로는 소리가 가장 먼저 떠오를 것입니다. 우리가 어떤 소리를 들을 때는 파동이라는 구불구불한 선을 듣는 것이 아니라 그 소리를 이루는 여러 주파수의 사인파를 듣습니다.

<button id="together-button" class="button">전체 파동 재생</button>

<button id="split-button-1" class="button">고주파만 재생</button>

<button id="split-button-2" class="button">저주파만 재생</button>

컴퓨터로 파동을 나눔으로써 사람이 실제로 어떤 소리를 듣는지 이해할 수 있습니다. 주파수를 알면 그 소리가 높은 소리인지 낮은 소리인지 알아내거나, 혹은 정확한 음높이를 구할 수 있습니다.

이 과정은 전혀 사인파로 만든 것처럼 보이지 않는 파동에도 적용할 수 있습니다.

이 파동을 살펴봅시다. 이 파동은 특별히 사각파라고 합니다.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

전혀 그렇게 보이지는 않겠지만, 사각파도 사인파로 나눌 수 있습니다.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

이번에는 매우 많은 사인파가 필요합니다. 사각파를 정확히 나타내려면 이론상 무한개를 합해야 합니다. 더하는 사인파가 많을수록 나타나는 패턴은 처음 시작했던 사각파에 가까워집니다.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">파동 재생</button>

*위의 슬라이더를 움직여서 사인파의 개수를 바꿀 수 있습니다.*

시각적으로 보면 처음 몇 개의 사인파가 가장 큰 차이를 만드는 것을 알 수 있습니다. 슬라이더를 중간으로 옮기면 사각파의 전체적인 모양은 잡히지만 아직은 구불구불합니다. 이 구불구불한 모양을 없애려면 나머지 사각파만을 모두 더하면 됩니다.

이 파동을 들어보면 소리가 낮아지는 것을 느낄 수 있는데, 이는 높은 주파수를 제거했기 때문입니다.

이 과정은 반복되는 패턴이라면 아무 데나 적용할 수 있습니다. 아래에 파동을 직접 그려보세요!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">파동을 그려보세요!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">파동 재생</button>

*위의 슬라이더를 움직이면서 사인파의 개수가 많아질수록 원래 그림과 가까워지는 것을 확인해 보세요.*

역시 구불구불한 모양을 빼면 사인파를 절반만 더해도 원래 그림과 꽤 비슷해 보입니다.

적은 사인파만 있어도 원래 파동과 비슷한 파동을 만들 수 있다는 이러한 사실을 활용할 수 있습니다. 푸리에 변환을 통해 음원의 중요한 부분만을 추출하고 저장해도 원음과 매우 비슷한 소리를 재현할 수 있습니다.

보통 컴퓨터에서는 파동을 여러 점의 집합으로 나타냅니다.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

이렇게 하는 대신, 같은 파동을 여러 개의 사인파로 나타낼 수 있습니다. 그러면 진폭이 작은 주파수를 없앰으로써 음원을 압축할 수 있습니다. 최종적인 결과는 원음과 다르겠지만, 사람이 듣기에는 꽤 비슷하게 들릴 겁니다.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

MP3가 근본적으로 이 방법을 활용하지만, 어떤 주파수를 남기고 어떤 주파수를 지울지 스마트하게 결정한다는 차이점이 있습니다.

정리하자면, 이 경우에는 푸리에 변환을 사용함으로써 파동의 근본적인 성질을 이해하고 이를 압축 등에 활용할 수 있습니다.

그러면 이제부터 푸리에 변환에 대해 더 자세히 알아봅시다. 다음 절은 멋져 보이기도 하지만, 푸리에 변환에 대한 더 깊은 내용을 담고 있습니다. 근데 일단 멋져 보이는 게 큽니다.

## 주전원

이 글을 시작하면서 푸리에 변환으로 파동을 사인파로 나눌 수 있다고 했습니다. 사실, 이 사인파들은 그냥 사인파가 아니라 3D 사인파입니다. 이를 "복소 사인파"(complex sinusoid)나, 그냥 "나선"이라고 부를 수 있습니다.

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

복소 사인파를 옆에서 보면 보통의 사인파처럼 보이지만, 앞에서 보면 원처럼 보입니다.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

지금까지 여기서 했던 것들은 모두 보통의 2차원 사인파만 있으면 됩니다. 2차원 파동에 푸리에 변환을 적용하면 허수 부분이 모두 사라지기 때문에 사인파만이 남습니다.

그런데 이 3차원 사인파를 이용해서 이런 식으로 재미있는 것을 만들 수 있습니다.

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

뭐가 어떻게 된 걸까요?

위의 그림에 시간축을 더하면 3차원 그림이라고 생각할 수 있습니다. 사람이 위의 손 모양을 그린다고 할 때, 이 세 차원이 그 시점에 연필심이 어디 있는지를 나타냅니다. x와 y축으로부터 연필심의 위치, 시간축으로부터 시간을 알 수 있습니다.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

이 그림은 3차원이니, 보통의 2차원 사인파만으로 나타낼 수 없습니다. 2차원 사인파를 얼마나 더하든 3차원이 나오지는 않으니까요. 무언가 다른 것이 필요합니다.

그 대신 위에서 보았던 3차원 나선 사인파를 쓸 수 있습니다. 이들을 여러 더하면 위의 3차원 패턴과 비슷한 것을 얻을 수 있습니다.

위에서 보았듯이 이 파동은 앞에서 보면 원처럼 보입니다. 이렇게 한 원이 다른 원 주변을 도는 것을 주전원(epicycle)이라고 합니다.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*위의 슬라이더를 움직여서 원의 개수를 바꿀 수 있습니다.*

아까와 같이 적은 개수의 원만으로도 원래 패턴에 꽤 정확히 근사합니다. 이 도형은 꽤 단순하기 때문에, 나중의 원들은 모서리를 더 날카롭게 만드는 정도의 역할을 합니다.

지금까지 한 이야기 역시 아무 그림에 적용할 수 있습니다. 진짜로요! 이번에는 여러분이 원하는 그림을 그려볼 차례입니다.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">그림을 그려보세요!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">실행 취소</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*위의 슬라이더를 움직여서 그림에 사용할 원의 개수를 바꿀 수 있습니다.*

이번에도 모든 점을 저장하는 대신 적은 개수의 원만으로도 원래 그림을 매우 정확하게 표현할 수 있습니다.

실제 데이터에도 활용할 수 있을까요? 물론이죠! 현실에서는 SVG라는 다른 유형의 파일 포맷이 우리가 만드는 도형에 더 적합합니다. 일단 이걸로는 멋진 움짤을 만드는 걸로 만족해야 할 것 같네요.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

그렇지만 실제로 푸리에 변환을 활용하는 이미지 파일 포맷도 있습니다.

## JPEG

이미지에도 푸리에 변환을 활용할 수 있다는 걸 알고 계셨나요? 사실은 우리 모두 매일 활용하고 있습니다. JPEG가 그렇게 작동하기 때문이죠! 위에서 말한 원리, 즉 사인파 여러 개로 나누고 중요한 것만 저장하는 것을 이미지에도 그대로 적용할 수 있습니다.

파동 대신 이미지를 다루려면 다른 형태의 사인파가 필요합니다. 무슨 이미지가 주어지든 이 사인파를 여러 개 합하면 원래 이미지로 돌아갈 수 있어야 합니다.

이러한 목적을 달성하려면 사인파 역시 이미지여야 합니다. 곡선으로 이루어진 파동 대신 검은 부분과 흰 부분이 있는 이미지를 사용합니다. 각각의 이미지에 대비를 설정함으로써 사인파의 진폭에 해당하는 역할을 할 수 있습니다.

색상 역시 똑같은 방식으로 표현할 수 있지만, 일단 흑백 이미지로 시작해 봅시다. 무채색 이미지를 표현하려면 가로 파동에 해당하는 이미지와...

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

...세로 파동에 해당하는 이미지가 필요합니다.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

가로와 세로 이미지만으로는 우리가 원하는 이미지를 재현할 수 없습니다. 둘을 곱해서 나오는 새로운 이미지 또한 필요합니다.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

8x8 이미지의 경우에는 아래의 이미지가 있으면 됩니다.

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

각각의 이미지에 적절한 대비를 주고 모두 합함으로써 어떤 이미지든 만들어낼 수 있습니다.

이 'A'라는 글자로 시작해 봅시다. 꽤 작은 이미지이긴 하지만, 이렇게 작은 이미지가 아니면 지나치게 많은 가로세로 이미지가 필요합니다.

<img src="img/a.png" class="sketch sketch-letter">

이 이미지들을 더할수록 원래 이미지와 점점 가까워지는 것을 볼 수 있습니다. 이미 눈치채셨겠지만, 적은 수의 이미지만으로도 매우 비슷한 이미지를 얻을 수 있습니다.

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

실제 JPEG 이미지의 경우 여기에 추가로 몇 가지 디테일만 더 들어갑니다.

JPEG 이미지는 여러 개의 8x8 크기의 조각으로 나뉘고, 각각의 조각이 여러 주파수로 나뉩니다. 한 세트의 주파수로는 각 픽셀의 밝기를 결정하고, 다른 두 세트의 주파수로는 각각 빨강-초록, 파랑-노랑 톤을 결정합니다. 조각마다 사용하는 주파수의 개수가 JPEG 파일의 품질을 결정합니다.

아래 사진은 실제 JPEG 이미지이며, 세부사항이 보이도록 확대했습니다. 이미지의 품질을 조절할 때 이 현상이 발생함을 볼 수 있습니다.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## 결론

지금까지 배운 것들을 정리해 봅시다.

- 푸리에 변환은 무언가를 넣으면 여러 주파수로 나눠주는 것이다.
- 이 주파수들로부터 데이터의 근본적인 성질을 알 수 있다.
- 중요한 주파수만 저장함으로써 데이터를 압축할 수도 있다.
- 여러 개의 원을 사용해서 엄청 신기한 애니메이션을 만들 수도 있다.

위에 나열한 것들은 푸리에 변환의 활용 중에서도 빙산의 일각입니다. 여러 주파수로 나누는 것은 매우 근본적이기 때문에, 푸리에 변환은 매우 강력한 도구입니다. 회로 설계, 휴대폰 신호, MRI, 양자역학 등 다양한 분야에서 쓰이고 있습니다!

## 더 궁금한 게 있나요?

이 글에서 수학 얘기는 최대한 생략했지만, 혹시 푸리에 변환의 원리에 대해 관심이 생기셨다면 이 질문으로 탐구를 시작해보는 것도 좋습니다.

- 푸리에 변환을 수학적으로 어떻게 표현할까?
- 연속적 푸리에 변환과 이산 푸리에 변환의 차이점은 무엇일까?
- 푸리에 변환을 컴퓨터로는 어떻게 처리할까?
- (음표 하나가 아니라) 곡 전체에 어떻게 푸리에 변환을 할 수 있을까?

## 더 '읽어'보기

더 배우고 싶은 점이 있다면, 읽어볼 만한 정말 좋은 자료를 안내해 드리겠습니다.

[An Interactive Guide To The Fourier Transform (영문)](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
푸리에 변환의 수학에 대해 더 자세히 파고드는 글입니다.

[푸리에 변환이 대체 뭘까요? 그려서 보여드리겠습니다.](https://www.youtube.com/watch?v=spUNpyF58BY)
3Blue1Brown님의 유튜브 동영상입니다. 음향의 관점에서 푸리에 변환의 수학에 대해 설명합니다.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization (영문)](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
선형대수학의 관점에서 주전원을 이용한 경로 그리기에 대해 설명하는 글입니다.

[Fourier transform (영문 위키백과)](https://en.wikipedia.org/wiki/Fourier_transform)
물론 위키백과 글도 꽤 좋습니다.

## 저자 소개

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Jez예요! 만(灣) 지역에 있는 모 [IT 기업](https://www.google.com/)에서 풀타임으로 일하고 있고, 비는 시간에는 게임이나 이런 식으로 인터랙티브 코드 같은 걸 작성합니다.

이 웹페이지는 오픈소스입니다. [GitHub](https://github.com/Jezzamonn/fourier)에서 소스를 확인할 수 있습니다! 피드백이나 질문하고 싶은 것이 있다면 <span id="email-text">fourier [at] jezzamon [dot] com</span>으로 이메일을 보내거나 [트위터](https://twitter.com/jezzamonn)로 멘션을 쏴주세요.

다른 작업물이 궁금하시다면 [홈페이지](/)를 참고해 주시고, 다음에 만들 작업물이 보고 싶다면 제 트위터 계정 [@jezzamonn](https://twitter.com/jezzamonn)을 팔로우해 주세요!
