Fourier transforms are a tool used in a whole bunch of different things. This is a explanation of what a Fourier transform does, and some different ways it can useful. And how you can make pretty things with it, like this thing:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

I'm going to explain how that animation works, and along the way explain Fourier transforms!

By the end you should have a good idea about
- What a Fourier transform does
- Some practical uses of Fourier transforms
- Some pointless but cool uses of Fourier transforms

We're going to leave the mathematics and equations out of it for now. There's a bunch of interesting maths behind it, but it's better to start with what it actually does, and why you'd want to use it first. If you want to know more about the how, there's some further reading suggestions below!

## So what is this thing?

Put simply, the Fourier transform is a way of splitting something up into a bunch of sine waves. As usual, the name comes from some person who lived a long time ago called Fourier.

Let’s start with some simple examples and work our way up. First up we're going to look at waves - patterns that repeat over time.

Here’s an example wave:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

This wavy pattern here can be split up into sine waves. That is, when we add up the two sine waves we get back the original wave.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

The Fourier transform is a way for us to take the combined wave, and get each of the sine waves back out. In this example, you can almost do it in your head, just by looking at the original wave.

Why? Turns out a lot of things in the real world interact based on these sine waves. We usually call them the wave's frequencies.

The most obvious example is sound – when we hear a sound, we don’t hear that squiggly line, but we hear the different frequencies of the sine waves that make up the sound.

<button id="together-button" class="button">Play Full Wave</button>

<button id="split-button-1" class="button">Play High Frequency</button>

<button id="split-button-2" class="button">Play Low Frequency</button>

Being able to split them up on a computer can give us an understanding of what a person actually hears. We can understand how high or low a sound is, or figure out what note it is.

We can also use this process on waves that don't look like they're made of sine waves.

Let's take a look at this guy. It’s called a square wave.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

It might not look like it, but it also can be split up into sine waves.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

We need a lot of them this time – technically an infinite amount to perfectly represent it. As we add up more and more sine waves the pattern gets closer and closer to the square wave we started with.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Play Wave</button>

*Drag the slider above to play with how many sine waves there are.*

Visually, you'll notice that actually the first few sine waves are the ones that make the biggest difference. With the slider halfway, we have the general shape of the wave, but it's all wiggly. We just need the rest of the small ones to make the wigglyness flatten out.

When you listen to the wave, you'll hear the sound get lower, because we're removing the higher frequencies.

This process works like that for any repeating line. Give it a go, try draw your own!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Draw here!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Play Wave</button>

*Move the slider to see how as we add move sine waves, it gets closer and closer to your drawing*

Again, aside from the extra wigglyness, the wave looks pretty similar with just half of the sine waves.

We can actually use the fact that the wave is pretty similar to our advantage. By using a Fourier transform, we can get the important parts of a sound, and only store those to end up with something that's pretty close to the original sound.

Normally on a computer we store a wave as a series of points.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

What we can do instead is represent it as a bunch of sine waves. Then we can compress the sound by ignoring the smaller frequencies. Our end result won't be the same, but it'll sound pretty similar to a person.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

This is essentially what MP3s do, except they're more clever about which frequencies they keep and which ones they throw away.

So in this case, we can use Fourier transforms to get an understanding of the fundamental properties of a wave, and then we can use that for things like compression.

Ok, now let's dig more into the Fourier transform. This next part looks cool, but also gives you a bit more understanding of what the Fourier transform does. But mostly looks cool.

## Epicycles

Now at the start, I said it splits things into sine waves. The thing is, the sine waves it creates are not just regular sine waves, but they’re 3D. You could call them "complex sinusoids". Or just "spirals".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

If we take a look from the side, they look like sine waves. From front on, though, these look like circles.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

So far everything we’ve been doing has only required the regular 2D sine waves. When we do a Fourier transform on 2D waves, the complex parts cancel out so we just end up with sine waves.

But we can use the 3D sine waves to make something fun looking like this:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

What’s going on here?

Well, we can think of the drawing as a 3D shape because of the way it moves around in time. If you imagine the hand being drawn by a person, the three dimensions represent where the tip of their pencil is at that moment. The x and y dimensions tell us the position, and then the time dimension is the time at that moment.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Now that we have a 3D pattern, we can't use the regular 2D sine waves to represent it. No matter how many of the 2D sine waves we add up, we'll never get something 3D. So we need something else.

What we can use is the 3D spiral sine waves from before. If we add up lots of those, we can get something that looks like our 3D pattern.

Remember, these waves look like circles when we look at them from front on. The name for the pattern of a circle moving around another circle is an epicycle.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Use the slider above to control how many circles there are.*

Like before, we get a pretty good approximation of our pattern with just a few circles. Because this is a fairly simple shape, all the last ones do is make the edges a little sharper.

All this applies to any drawing, really! Now it’s your chance to play around with it.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Draw here!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Undo</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Use the slider to control how many circles are used for your drawing*

Again, you'll see for most shapes, we can approximate them fairly well with just a small number of circles, instead of saving all the points.

Can we use this for real data? Well, we could! In reality we have another data format called SVG, which probably does a better job for the types of shapes we tend to create. So for the moment, this is really just for making cool little gifs.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

There is another type of visual data that does use Fourier transforms, however.

## JPEGs

Did you know Fourier transforms can also be used on images? In fact, we use it all the time, because that's how JPEGs work! We're applying the same principles to images – splitting up something into a bunch of sine waves, and then only storing the important ones.

Now we're dealing with images, we need a different type of sine wave. We need to have something that no matter what image we have, we can add up a bunch of these sine waves to get back to our original image.

To do that, each of our sine waves will be images too. Instead of a wave that's a line, we now have images with black and white sections. To represent the size of a wave, each image will have more or less contrast.

We can also use these to represent color in the same way, but let's start with black-and-white images for now. To represent colorless images, we need some horizontal wave images,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Along with some vertical wave images.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

By themselves, just horizontal and vertical images aren't enough to represent the types of images we get. We also need some extra ones that you get by multiplying the two together.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

For an 8x8 image, here are all the images we need.

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

If we take the images, adjust their contrast to the right amount, and then add them up we can create any image.

Let's start with this letter 'A'. It's pretty small, but we need it to be small otherwise we'll end up with too many other images.

<img src="img/a.png" class="sketch sketch-letter">

As we add more and more of these images, we end up with something that becomes closer and closer to the actual image. But I think you'll see the pattern here, as we get a reasonable approximation with just a few of them.

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

For actual JPEG images there are a just few extra details.

The image gets broken up into 8x8 chunks, and each chunk gets split up separately. We use a set of frequencies to determine how light or dark each pixel is, and then another two sets for the color, one for red-green, and another for blue-yellow. The number of frequencies that we use for each chunk determines the quality of the JPEG.

Here's a real JPEG image, zoomed in so we can see the details. When we play with the quality levels we can see this process happen.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Conclusion

So lets recap:

- Fourier transforms are things that let us take something and split it up into its frequencies.
- The frequencies tell us about some fundamental properties of the data we have
- And can compress data by only storing the important frequencies
- And we can also use them to make cool looking animations with a bunch of circles

This is just scratching the surface into some applications. The Fourier transform is an extremely powerful tool, because splitting things up into frequencies is so fundamental. They're used in a lot of fields, including circuit design, mobile phone signals, magnetic resonance imaging (MRI), and quantum physics!

## Questions for the curious

I skipped most of the math stuff here, but if you're interested in the underlying principles of how it works, here are some questions you can use to guide your research:

- How do you mathematically represent a Fourier transform?
- What's the difference between a continuous time Fourier transform and a discrete time Fourier transform?
- How do you computationally do a Fourier transform?
- How do you do a Fourier transform of a whole song? (Rather than just a single note.)

## Further 'reading'

To learn more, some really good resources you can check out are:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)  
A great article that digs more into the mathematics of what happens.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)  
A great Youtube video by 3Blue1Brown, also explaining the maths of Fourier transforms from an audio perspective.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)  
Another article explaining how you can use epicycles to draw a path, explained from a linear algebra perspective.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)  
And of course, the Wikipedia article is pretty good too.

## The author

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

I'm Jez! Full time I work at a [search company](https://www.google.com/) in the Bay Area, and in my spare time I like making games and interactive code things like this!

This webpage is open-source, you can check out the code on [GitHub](https://github.com/Jezzamonn/fourier)! If you have any feedback or want to ask any questions, feel free to<span id="email-text"></span> shoot me a tweet on [Twitter](https://twitter.com/jezzamonn).

If you want to see more of my work, check out my [homepage](/), and if you want to see what I'm making next, you can follow my Twitter account, [@jezzamonn](https://twitter.com/jezzamonn)!
