const SAMPLE_RATE = 44100;

export function playSoundWave(wave) {
    const audioContext = new AudioContext();
    const buffer = audioContext.createBuffer(1, SAMPLE_RATE, SAMPLE_RATE);
    
    const channel = buffer.getChannelData(0);
    const frequency = 440; // A4
    for (let i = 0; i < buffer.length; i ++) {
        // Where we are in the save, in seconds.
        const t = i / SAMPLE_RATE;
        channel[i] = Math.sin(2 * Math.PI * frequency * t);
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}