<canvas id='fourier-title' width=500 height=300></canvas>

# Fourier transforms. What the heck are they???

This is a super simple explanation of what a Fourier transform does, and some different ways it can useful. I’m going to do my best to keep it simple and math-free.

## So what is this thing??

Put simply, Fourier transform is a way of changing something into a bunch of sine waves. As usual, the name comes from some person called Fourier who lived a long time ago.

Let’s start with a simple examples and work our way up. First up we're going to look at waves -- these repeating functions.

Here’s an example wave:

<canvas id='combo-sine-wave' width=500 height=300></canvas>

This pattern wavy pattern here can be split up into sine waves.

<canvas id='combo-sine-wave-split' width=500 height=500></canvas>

That example might seem kind of obvious. But we can actually it that with any line.

Let's take a look at this guy. It’s called a square wave.

<canvas id='square-wave' width=500 height=300></canvas>

It might not look like it, but it also can be split up into sine waves.

<canvas id='square-wave-split' width=500 height=500></canvas>

We need a lot of them this time -- technically an infinite amount to perfectly represent it. As we add more and more sine waves the pattern gets closer and closer to the square wave we started with.

<canvas id='square-wave-build-up' width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

This process works like that for any repeating line. Give it a go, try draw your own!

<canvas id='wave-draw' width=500 height=300></canvas>
<canvas id='wave-draw-split' width=500 height=500></canvas>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">

Um, ok. So it looks cool. But why?

Turns out a lot of things in the real world interact based on these sine waves.

The most obvious example is music -- when we hear a sound, we don’t hear the shape of the sound wave, we hear the different frequencies of the sine waves that make up the sound. It applies to a lot of other things too though, like how electricity flows, or building vibrations.

Ok, now let's dig more into the Fourier transform. This next part looks cool, but also gives you a bit more understanding of what’s going on. But mostly looks cool.

## Epicycles

Now at the start, I said it splits intos into sine waves. The thing is, the sine waves it creates are not just regular sine waves, but they’re 3D.

<canvas id='complex-sinusoid' width=500 height=500></canvas>

If we take a look from the side, they look like sine waves. From front on, though, these look like circles.

<canvas id='complex-sinusoid-turn' width=500 height=500></canvas>

So far everything we’ve been doing has only required the regular 2D sine waves. When we do a Fourier transform on 2D waves, the complex parts cancel out so we just end up with sine waves.

But we can use the 3D sine waves to make something fun looking like this:

<canvas id='peace-epicycles' width=500 height=500></canvas>

What’s going on here? Well we can think of the drawing as a 3D wave because of the way it moves around in time.

<canvas id='peace-3d' width=500 height=500></canvas>

As we add more and more epicycles, we get closer to representing the original shape. With just a few it's able to create the shape fairly well, although it needs the smaller ones to draw the sharp edges.

<canvas id='peace-build-up' width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

So, we can apply this process to any drawing really! Now it’s your chance to play around with it!

<canvas id='draw-zone' width=500 height=500></canvas>

<canvas id='circle-zone' width=500 height=500></canvas>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

## Further questions for the curious

This is just scratching the surface into the applications of Fourier transforms. There's a lot more in this field!

To learn more, some really good resources you can check out are:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)  
A great article that digs more into the mathematics of what happens.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)  
A great Youtube video by 3Blue1Brown, also explaining the maths of Fourier transforms from an audio perspective.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)  
Another article explaining how you can use epicycles to draw a path, explaing from a linear algerbra perspective.

If you're interested learning about more applications you might want to think about:

- How do musical tuners use Fourier transforms?
- How do equalizer displays use Fourier transforms?
- Why should we use Fourier transforms to tell how loud something is?
- How are Fourier transforms used in compressing MP3s?
- How are Fourier transforms used in compressing JPGs?

If you're interested in the underlying principles of how it works, here are some questions you can use to guide your research:

- How do you mathematically do a Fourier transform?
- What's the difference between a continuous time Fourier transform and a discrete time fourier transform?
- What are the other types of frequency domain transforms (Fourier transform is not the only one!)
- How do you computationally do a Fourier transform?
- What are the different window functions and why would you use them?

## The author

<canvas id='its-meee' width=500 height=500></canvas>

I'm Jez! Full time I work at a search company in the Bay Area, and in my spare time I like making games and interactive code things like this!

If you want to see more of my work, check out my [homepage](/). On Twitter I'm [@jezzamonn](https://twitter.com/jezzamonn), and I'm currently posting fun little gifs there too :)
