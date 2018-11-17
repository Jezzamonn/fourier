import { slurp } from "./util";

const SAMPLE_RATE = 44100;
const baseFrequency = 220;

/**
 * 
 * @param {function(number):number|Array<number>} wave 
 */
export function playSoundWave(wave) {
    if (wave.constructor === Array) {
        // transform our wave array into a function we can call
        wave = getWaveFunction(wave);
    }

    const audioContext = new AudioContext();
    const buffer = audioContext.createBuffer(1, SAMPLE_RATE, SAMPLE_RATE);
    
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i ++) {
        // Where we are in the sound, in seconds.
        const t = i / SAMPLE_RATE;
        // The waves are visually at a very low frequency, we need to bump that up a bunch
        channel[i] += wave(baseFrequency * t);
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}

/**
 * Creates a function that gives the value of a wave at a certain point.
 * @param {Array<number>} wave 
 * @returns {function(number):number} A wave function (mainly to be used by the playSoundWave thing)
 */
export function getWaveFunction(wave) {
    // TODO: Interpolation?
    const min = Math.min(...wave);
    const max = Math.max(...wave)
    return t => {
        t %= 1;
        if (t < 0) {
            t ++;
        }
        const index = Math.floor(wave.length * t);
        // normalise to range 0 to 1
        const waveAmt = (wave[index] - min) / (max - min);
        // Then adjust to some volume.
        return slurp(-1, 1, waveAmt);
    }
}