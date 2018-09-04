<canvas id='fourier-title' width=500 height=300></canvas>

# Fourier transforms. What the heck are they???

This is a super simple explanation of what a fourier transform does, and some different ways it can useful. I’m going to do my best to keep it simple and math-free.

## So what is this thing??

Put simply, Fourier transform is a way of changing something into a bunch of sine waves. As usual, the name comes from some person called Fourier who lived a long time ago.

Let’s start with a simple examples and work our way up. Here’s a wave pattern. (It repeats forever?)

<canvas id='combo-sine-wave' width=500 height=300></canvas>

This pattern wavy pattern here can be split up into sine waves.

<canvas id='combo-sine-wave-split' width=500 height=500></canvas>

That example might seem kind of obvious. But we can actually it that with any line like that.

Let's take a look at this guy. It’s called a square wave.

<canvas id='square-wave' width=500 height=300></canvas>

It doesn’t look like we can make it out of sine waves, but if we have enough we can do it.

<canvas id='square-wave-split' width=500 height=500></canvas>

This process works like that for any repeating line. Give it a go, try draw your own!

<canvas id='wave-draw' width=500 height=300></canvas>

<canvas id='wave-draw-split' width=500 height=500></canvas>

Um, ok. So it looks cool. But why?

Turns out a lot of things in the real world interact based on these sine waves.

The most obvious example is music -- when we hear a sound, we don’t hear the shape of the sound wave, we hear the different frequencies of the sine waves that make up the sound. It applies to a lot of other things too though, like how electricity flows, or building vibrations.

Ok, now let's dig more into the Fourier transform. This next part looks cool, but also gives you a bit more understanding of what’s going on. But mostly looks cool.

## Epicycles

Now at the start, I said it splits intos into sine waves. The thing is, the sine waves it creates are not just regular sine waves, but they’re 3D.

<canvas id='complex-sinusoid' width=500 height=500></canvas>

If we take a look from the side, they look like sine waves. From front on, though, these look like circles.

<canvas id='complex-sinusoid-turn' width=500 height=500></canvas>

So far everything we’ve been doing has only required the regular 2D sine waves. In a lot of cases, when we do a Fourier transform we only care about the frequencies, so we don’t worry about the fact it’s 3D.* (when we put in regular things the wavy parts cancel out?)

But we can use the 3D sine waves to make something fun looking like this:

[ Something simple being drawn -- maybe the picture of me? ]

What’s going on here? Well we can think of the drawing as a 3D line because of the way it moves around in time. And then those circles spinning are the same 3D sine waves we saw earlier.

[ 3D version of the thing being drawn? ]

So, we can apply this process to any drawing really! Now it’s your chance to play around with it!

<canvas id='draw-zone' width=500 height=500></canvas>

<canvas id='circle-zone' width=500 height=500></canvas>


Other ideas:

- Show plot in the frequency domain?
- Talk about JPEG
- Music, windows, etc