---
languageName: "हिंदी"
title: "एक इंटरएक्टिव इंट्रोडक्शन टू फ़ोरियर ट्रांसफ़ॉर्म"
description: "फ़ूरियर ट्रांसफ़ॉर्म एक ऐसा टूल है जिसका इस्तेमाल कई अलग-अलग चीज़ों में किया जाता है। यहाँ बताया गया है कि फ़ूरियर ट्रांसफ़ॉर्म क्या करता है और यह किन-किन तरीकों से काम आ सकता है।"
translatorMarkdown: " अनुवादक [Rohit Ranjan](https://github.com/rohit0839)"
outFileName: "hi.html"
---

फ़ूरियर ट्रांसफ़ॉर्म एक ऐसा टूल है जिसका इस्तेमाल कई अलग-अलग चीज़ों में किया जाता है। यहाँ बताया गया है कि फ़ूरियर ट्रांसफ़ॉर्म क्या करता है और यह किन अलग-अलग तरीकों से काम आ सकता है। और आप इसकी मदद से कितनी सुंदर चीज़ें बना सकते हैं, जैसे कि यह चीज़:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

मैं आपको समझाऊंगा कि वह एनिमेशन कैसे काम करता है, और साथ ही फ़ूरियर ट्रांसफ़ॉर्म के बारे में भी बताऊंगा!

आखिर तक आपको इनके बारे में अच्छी जानकारी हो जाएगी:
- फ़ूरियर ट्रांसफ़ॉर्म क्या करता है
- फ़ूरियर ट्रांसफ़ॉर्म के कुछ प्रैक्टिकल इस्तेमाल
- फ़ूरियर ट्रांसफ़ॉर्म के कुछ ऐसे इस्तेमाल जो भले ही किसी काम के न हों, पर मज़ेदार हैं

अभी हम गणित और समीकरणों को इसमें शामिल नहीं करेंगे। इसके पीछे कई दिलचस्प गणितीय बातें हैं, लेकिन बेहतर होगा कि हम पहले यह जानें कि यह असल में क्या करता है और आप इसका इस्तेमाल क्यों करना चाहेंगे। अगर आप इसके काम करने के तरीके के बारे में और जानना चाहते हैं, तो नीचे कुछ और पढ़ने के लिए सुझाव दिए गए हैं!

## तो यह चीज़ क्या है?

आसान शब्दों में कहें तो, फ़ूरियर ट्रांसफ़ॉर्म किसी चीज़ को कई साइन वेव्स में बांटने का एक तरीका है। हमेशा की तरह, यह नाम फ़ूरियर नाम के एक व्यक्ति के नाम पर पड़ा है, जो बहुत पहले हुए थे।

आइए कुछ आसान उदाहरणों से शुरुआत करते हैं और धीरे-धीरे आगे बढ़ते हैं। सबसे पहले हम वेव्स को देखेंगे - ऐसे पैटर्न जो समय के साथ दोहराए जाते हैं।

यहाँ एक उदाहरण वाली वेव है:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

यहाँ दिख रहे लहरदार पैटर्न को साइन वेव्स में बाँटा जा सकता है। यानी, जब हम दो साइन वेव्स को जोड़ते हैं, तो हमें वापस वही ओरिजिनल वेव मिल जाती है।

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

फ़ूरियर ट्रांसफ़ॉर्म एक ऐसा तरीका है जिससे हम मिली-जुली वेव से हर एक साइन वेव को अलग-अलग कर सकते हैं। इस उदाहरण में, आप असल वेव को देखकर ही लगभग यह काम अपने दिमाग में कर सकते हैं।

ऐसा क्यों है? असल में, असल दुनिया में बहुत सी चीज़ें इन्हीं साइन वेव्स के आधार पर काम करती हैं। हम आम तौर पर इन्हें वेव की फ़्रीक्वेंसी कहते हैं।

इसका सबसे साफ़ उदाहरण आवाज़ है – जब हम कोई आवाज़ सुनते हैं, तो हमें वह टेढ़ी-मेढ़ी लाइन सुनाई नहीं देती, बल्कि हमें उन साइन वेव्स की अलग-अलग फ़्रीक्वेंसी सुनाई देती हैं जिनसे वह आवाज़ बनी होती है।

<button id="together-button" class="button">पूरी वेव चलाएं</button>

<button id="split-button-1" class="button">हाई फ़्रीक्वेंसी चलाएं</button>

<button id="split-button-2" class="button">लो फ़्रीक्वेंसी चलाएं</button>

कंप्यूटर पर उन्हें अलग-अलग करने से हमें यह समझने में मदद मिल सकती है कि कोई व्यक्ति असल में क्या सुनता है। हम यह समझ सकते हैं कि आवाज़ कितनी ऊँची या नीँची है, या यह पता लगा सकते हैं कि वह कौन सा नोट है।

हम इस प्रोसेस का इस्तेमाल उन तरंगों पर भी कर सकते हैं जो देखने में साइन वेव जैसी नहीं लगतीं।

आइए, इसे देखते हैं। इसे स्क्वायर वेव कहते हैं।

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

भले ही यह ऐसा न दिखे, लेकिन इसे भी साइन वेव्स में बांटा जा सकता है।

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

इस बार हमें इनकी बहुत बड़ी संख्या की ज़रूरत है – असल में, इसे पूरी तरह से दिखाने के लिए अनगिनत संख्या की ज़रूरत है। जैसे-जैसे हम और ज़्यादा साइन वेव्स जोड़ते जाते हैं, पैटर्न उस स्क्वेयर वेव के और करीब पहुँचता जाता है जिससे हमने शुरुआत की थी।

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">वेव चलाएं</button>

*ऊपर दिए गए स्लाइडर को खींचकर देखें कि कितने साइन तरंग हैं।*

देखने पर आपको पता चलेगा कि असल में शुरुआती कुछ साइन वेव्स ही सबसे ज़्यादा फ़र्क डालती हैं। जब स्लाइडर बीच में होता है, तो हमें वेव का आम आकार तो मिल जाता है, लेकिन वह टेढ़ा-मेढ़ा होता है। उस टेढ़े-मेढ़ेपन को सीधा करने के लिए हमें बाकी छोटी वेव्स की ज़रूरत होती है।

जब आप वेव की आवाज़ सुनेंगे, तो आपको आवाज़ धीमी होती हुई सुनाई देगी, क्योंकि हम ऊँची फ़्रीक्वेंसी को हटा रहे हैं।

यह तरीका किसी भी दोहराई जाने वाली लाइन के लिए काम करता है। इसे आज़माएँ, अपनी खुद की लाइन बनाकर देखें!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Draw here!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">वेव चलाएं</button>

*स्लाइडर को घुमाकर देखें कि जैसे-जैसे हम और साइन वेव जोड़ते हैं, यह आपकी ड्राइंग के और करीब आती जाती है।*

फिर से, ज़्यादा घुमाव के अलावा, वेव सिर्फ़ आधी साइन वेव के साथ भी काफ़ी मिलती-जुलती दिखती है।

हम असल में इस बात का फ़ायदा उठा सकते हैं कि वेव काफ़ी मिलती-जुलती है। फूरियर ट्रांसफ़ॉर्म का इस्तेमाल करके, हम किसी साउंड के ज़रूरी हिस्से पा सकते हैं, और उन्हें सिर्फ़ स्टोर करके कुछ ऐसा बना सकते हैं जो ओरिजिनल साउंड के काफ़ी करीब हो।

आम तौर पर कंप्यूटर पर हम एक वेव को पॉइंट्स की एक सीरीज़ के तौर पर स्टोर करते हैं।

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

इसके बजाय, हम इसे कई साइन वेव्स के तौर पर दिखा सकते हैं। फिर हम छोटी फ़्रीक्वेंसीज़ को नज़रअंदाज़ करके आवाज़ को कंप्रेस कर सकते हैं। हमारा नतीजा बिल्कुल वैसा तो नहीं होगा, लेकिन सुनने में यह काफ़ी हद तक वैसा ही लगेगा।

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

एमपी3 अनिवार्य रूप से यही करते हैं, सिवाय इसके कि वे इस बारे में अधिक चतुर होते हैं कि वे कौन सी आवृत्तियों को रखते हैं और किसे फेंक देते हैं।

तो इस मामले में, हम तरंग के मूलभूत गुणों को समझने के लिए फूरियर ट्रांसफॉर्म का उपयोग कर सकते हैं, और फिर हम संपीड़न जैसी चीजों के लिए इसका उपयोग कर सकते हैं।

ठीक है, अब आइए फूरियर रूपांतरण के बारे में और गहराई से जानें। यह अगला भाग अच्छा दिखता है, लेकिन आपको फूरियर रूपांतरण क्या करता है इसकी थोड़ी और समझ भी देता है। लेकिन अधिकतर अच्छा दिखता है.

## एपिसाइकिल

शुरुआत में मैंने कहा था कि यह चीज़ों को साइन वेव्स में बांटता है। असल में, जो साइन वेव्स यह बनाता है, वे आम साइन वेव्स नहीं होतीं, बल्कि 3D होती हैं। आप उन्हें "कॉम्प्लेक्स साइनुसोइड्स" कह सकते हैं। या बस "स्पाइरल्स"।

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

अगर हम इन्हें साइड से देखें, तो ये साइन वेव जैसे दिखते हैं। लेकिन सामने से देखने पर ये गोल जैसे लगते हैं।

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

अब तक हमने जो भी किया है, उसमें सिर्फ़ रेगुलर 2D साइन वेव्स की ज़रूरत पड़ी है। जब हम 2D वेव्स पर फ़ूरियर ट्रांसफ़ॉर्म करते हैं, तो कॉम्प्लेक्स हिस्से कट जाते हैं और आखिर में हमारे पास सिर्फ़ साइन वेव्स बचती हैं।

लेकिन हम 3D साइन वेव्स का इस्तेमाल करके कुछ मज़ेदार चीज़ बना सकते हैं, जो ऐसी दिखेगी:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

यहाँ क्या हो रहा है?

खैर, हम इस ड्राइंग को एक 3D शेप की तरह सोच सकते हैं क्योंकि यह समय के साथ जिस तरह से घूमती है। अगर आप कल्पना करें कि कोई व्यक्ति हाथ बना रहा है, तो तीन डाइमेंशन दिखाते हैं कि उस समय उनकी पेंसिल की नोक कहाँ है। x और y डाइमेंशन हमें जगह बताते हैं, और फिर टाइम डाइमेंशन उस समय का समय होता है।

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

अब जब हमारे पास एक 3D पैटर्न है, तो हम इसे दिखाने के लिए आम 2D साइन वेव्स का इस्तेमाल नहीं कर सकते। हम चाहे कितनी भी 2D साइन वेव्स को जोड़ लें, हमें कभी भी 3D चीज़ नहीं मिलेगी। इसलिए हमें किसी और चीज़ की ज़रूरत है।

हम पहले वाली 3D स्पाइरल साइन वेव्स का इस्तेमाल कर सकते हैं। अगर हम उनमें से बहुत सारी वेव्स को जोड़ें, तो हमें ऐसी चीज़ मिल सकती है जो हमारे 3D पैटर्न जैसी दिखे।

याद रखें, जब हम इन वेव्स को सामने से देखते हैं तो ये गोल घेरों जैसी दिखती हैं। एक गोल घेरे के चारों ओर घूमते हुए दूसरे गोल घेरे के पैटर्न को 'एपिसाइकिल' कहते हैं।

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*ऊपर दिए गए स्लाइडर का इस्तेमाल करके तय करें कि कितने सर्कल होंगे।*

पहले की तरह ही, हमें बस कुछ ही सर्कल से अपने पैटर्न काफ़ी हद तक मिल जाता है। क्योंकि यह एक काफ़ी आसान शेप है, इसलिए बाद वाले सर्कल बस किनारों को थोड़ा और साफ़ या शार्प बनाते हैं।

असल में, यह बात किसी भी ड्रॉइंग पर लागू होती है! अब आपकी बारी है कि आप इसे आज़माकर देखें।

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">यहाँ ड्रॉ करें!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">पूर्ववत</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*अपनी ड्राइंग के लिए कितने सर्कल इस्तेमाल करने हैं, यह तय करने के लिए स्लाइडर का इस्तेमाल करें*

फिर से, आप देखेंगे कि ज़्यादातर शेप्स के लिए, हम सभी पॉइंट्स को सेव करने के बजाय, बस कुछ ही सर्कल्स से उनका काफ़ी अच्छा अंदाज़ा लगा सकते हैं।

क्या हम इसे असली डेटा के लिए इस्तेमाल कर सकते हैं? हाँ, कर सकते हैं! असल में, हमारे पास SVG नाम का एक और डेटा फ़ॉर्मैट है, जो शायद उन शेप्स के लिए बेहतर काम करता है जिन्हें हम आम तौर पर बनाते हैं। इसलिए अभी के लिए, यह असल में बस मज़ेदार छोटे GIF बनाने के लिए है।

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

हालाँकि, एक और तरह का विज़ुअल डेटा भी है जिसमें फ़ूरियर ट्रांसफ़ॉर्म का इस्तेमाल होता है।

## JPEGs

क्या आप जानते हैं कि फूरियर ट्रांसफॉर्म का इस्तेमाल इमेज पर भी किया जा सकता है? असल में, हम इसे हर समय इस्तेमाल करते हैं, क्योंकि JPEG ऐसे ही काम करते हैं! हम इमेज पर भी यही प्रिंसिपल अप्लाई कर रहे हैं – किसी चीज़ को कई साइन वेव में बांटना, और फिर सिर्फ़ ज़रूरी वेव को स्टोर करना।

अब जब हम इमेज के बारे में बात कर रहे हैं, तो हमें एक अलग तरह की साइन वेव चाहिए। हमारे पास कुछ ऐसा होना चाहिए कि हमारे पास कोई भी इमेज हो, हम इन साइन वेव को जोड़कर अपनी ओरिजिनल इमेज पर वापस आ सकें।

ऐसा करने के लिए, हमारी हर साइन वेव भी इमेज होगी। एक लाइन वाली वेव के बजाय, अब हमारे पास ब्लैक एंड व्हाइट सेक्शन वाली इमेज हैं। वेव का साइज़ दिखाने के लिए, हर इमेज में कम या ज़्यादा कंट्रास्ट होगा।

हम इनका इस्तेमाल उसी तरह कलर दिखाने के लिए भी कर सकते हैं, लेकिन अभी के लिए ब्लैक-एंड-व्हाइट इमेज से शुरू करते हैं। कलरलेस इमेज दिखाने के लिए, हमें कुछ हॉरिजॉन्टल वेव इमेज चाहिए,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

कुछ वर्टिकल वेव इमेज के साथ।

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

सिर्फ़ हॉरिज़ॉन्टल और वर्टिकल इमेज ही उन सभी तरह की इमेज को दिखाने के लिए काफ़ी नहीं हैं जो हमें मिलती हैं। हमें कुछ और इमेज की भी ज़रूरत होती है, जो इन दोनों को आपस में गुणा करने पर मिलती हैं।

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

8x8 इमेज के लिए, हमें इन सभी इमेज की ज़रूरत है।

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

अगर हम इमेज लें, उनका कंट्रास्ट सही अमाउंट में एडजस्ट करें, और फिर उन्हें जोड़ें तो हम कोई भी इमेज बना सकते हैं।

चलिए इस लेटर 'A' से शुरू करते हैं। यह काफी छोटा है, लेकिन हमें इसे छोटा ही रखना है वरना हमारे पास बहुत सारी दूसरी इमेज हो जाएंगी।

<img src="img/a.png" class="sketch sketch-letter">

जैसे-जैसे हम ऐसी और तस्वीरें जोड़ते जाते हैं, हमें एक ऐसी तस्वीर मिलती है जो असली तस्वीर के काफ़ी करीब होती है। लेकिन मुझे लगता है कि आप यहाँ पैटर्न देख पाएँगे, क्योंकि कुछ ही तस्वीरों से हमें काफ़ी हद तक सही अंदाज़ा मिल जाता है।

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

असल JPEG इमेज के लिए कुछ और बातें भी हैं।

इमेज को 8x8 के हिस्सों में बांटा जाता है और हर हिस्से को अलग-अलग प्रोसेस किया जाता है। हम यह पता लगाने के लिए फ़्रीक्वेंसी के एक सेट का इस्तेमाल करते हैं कि हर पिक्सल कितना हल्का या गहरा है, और फिर रंग के लिए दो और सेट का इस्तेमाल करते हैं - एक लाल-हरे के लिए और दूसरा नीले-पीले के लिए। हर हिस्से के लिए हम कितनी फ़्रीक्वेंसी का इस्तेमाल करते हैं, उससे JPEG की क्वालिटी तय होती है।

यहाँ एक असली JPEG इमेज है, जिसे ज़ूम किया गया है ताकि हम उसकी बारीकियों को देख सकें। जब हम क्वालिटी लेवल बदलते हैं, तो हम इस प्रोसेस को होते हुए देख सकते हैं।

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## निष्कर्ष

तो चलिए, एक बार फिर से देख लेते हैं:

- फ़ूरियर ट्रांसफ़ॉर्म हमें किसी चीज़ को उसकी फ़्रीक्वेंसी में बांटने की सुविधा देते हैं।
- ये फ़्रीक्वेंसी हमें हमारे पास मौजूद डेटा की कुछ बुनियादी विशेषताओं के बारे में बताती हैं।
- और हम सिर्फ़ ज़रूरी फ़्रीक्वेंसी को स्टोर करके डेटा को कंप्रेस कर सकते हैं।
- और हम इनका इस्तेमाल कई सारे गोलों की मदद से शानदार दिखने वाले एनिमेशन बनाने के लिए भी कर सकते हैं।

ये तो बस कुछ इस्तेमाल की एक झलक है। फ़ूरियर ट्रांसफ़ॉर्म एक बहुत ही शक्तिशाली टूल है, क्योंकि चीज़ों को फ़्रीक्वेंसी में बांटना एक बहुत ही बुनियादी प्रक्रिया है। इनका इस्तेमाल सर्किट डिज़ाइन, मोबाइल फ़ोन सिग्नल, मैग्नेटिक रेज़ोनेंस इमेजिंग (MRI) और क्वांटम फ़िज़िक्स जैसे कई क्षेत्रों में किया जाता है!

## जिज्ञासु लोगों के लिए सवाल

मैंने यहाँ ज़्यादातर गणितीय बातें छोड़ दी हैं, लेकिन अगर आप यह जानना चाहते हैं कि यह असल में कैसे काम करता है, तो यहाँ कुछ सवाल दिए गए हैं जिनसे आप अपनी रिसर्च को आगे बढ़ा सकते हैं:

- फ़ूरियर ट्रांसफ़ॉर्म को गणितीय रूप में कैसे दिखाया जाता है?
- कंटीन्यूअस टाइम फ़ूरियर ट्रांसफ़ॉर्म और डिस्क्रीट टाइम फ़ूरियर ट्रांसफ़ॉर्म में क्या फ़र्क है?
- कंप्यूटर की मदद से फ़ूरियर ट्रांसफ़ॉर्म कैसे किया जाता है?
- पूरे गाने का फ़ूरियर ट्रांसफ़ॉर्म कैसे किया जाता है? (सिर्फ़ एक नोट का नहीं।)

## अग्रिम 'पठन'

और जानने के लिए, आप कुछ बहुत अच्छे रिसोर्स देख सकते हैं:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
एक बेहतरीन लेख जो इस प्रक्रिया के गणित को गहराई से समझाता है।

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)
3Blue1Brown का एक बेहतरीन यूट्यूब वीडियो, जो ऑडियो के नज़रिए से फ़ूरियर ट्रांसफ़ॉर्म के गणित को भी समझाता है।

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
एक और लेख जो बताता है कि आप लीनियर अलजेब्रा के नज़रिए से एपिसाइकल्स का इस्तेमाल करके रास्ता कैसे बना सकते हैं।

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
और हाँ, विकिपीडिया का लेख भी काफी अच्छा है।

## लेखक

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

मैं जेज़ हूँ! मैं बे एरिया में एक [सर्च कंपनी](https://www.google.com/) में फुल-टाइम काम करता हूँ, और खाली समय में मुझे गेम्स और ऐसी इंटरैक्टिव कोडिंग वाली चीज़ें बनाना पसंद है!

यह वेबपेज ओपन-सोर्स है, आप इसका कोड [GitHub](https://github.com/Jezzamonn/fourier) पर देख सकते हैं! अगर आपके पास कोई फ़ीडबैक है या आप कोई सवाल पूछना चाहते हैं, तो बेझिझक मुझे <span id="email-text">fourier [at] jezzamon [dot] com</span> पर ईमेल करें, या [X](https://x.com/jezzamonn) पर ट्वीट करें।

अगर आप मेरा और काम देखना चाहते हैं, तो मेरा [होमपेज](/)-देखें, और अगर आप जानना चाहते हैं कि मैं आगे क्या बना रहा हूँ, तो आप मेरे X अकाउंट, [@jezzamonn](https://x.com/jezzamonn) को फ़ॉलो कर सकते हैं!
