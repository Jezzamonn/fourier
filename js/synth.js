import { slurp } from "./util";
import { normaliseWave, getWaveFunction } from "./wave-things";

const SAMPLE_RATE = 44100;
const baseFrequency = 220;

/**
 * 
 * @param {function(number):number|Array<number>} wave 
 */
export function playSoundWave(wave) {
    const baseVolume = 0.8;
    const decay = 3;
    if (wave.constructor === Array) {
        // transform our wave array into a function we can call
        wave = getWaveFunction(normaliseWave(wave));
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

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(baseVolume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + decay);

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start();
    source.stop(audioContext.currentTime + decay);
}
