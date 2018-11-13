const SAMPLE_RATE = 44100;

export function playSoundWave(fn) {
    const audioContext = new AudioContext();
    const buffer = audioContext.createBuffer(1, SAMPLE_RATE, SAMPLE_RATE);
    
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i ++) {
        // Where we are in the sound, in seconds.
        const t = i / SAMPLE_RATE;
        // The waves are visually at a very low frequency, we need to bump that up a bunch
        channel[i] += fn(220 * t);
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}