const SAMPLE_RATE = 44100;

export function playSoundWave(freqs) {
    const audioContext = new AudioContext();
    const buffer = audioContext.createBuffer(1, SAMPLE_RATE, SAMPLE_RATE);
    
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i ++) {
        // Where we are in the sound, in seconds.
        const t = i / SAMPLE_RATE;
        for (const freq of freqs) {
            channel[i] += Math.sin(2 * Math.PI * freq * t);
        }
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}