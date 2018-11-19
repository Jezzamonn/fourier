import { slurp } from "./util";

// Generates a wave from a function in the range [0, 1)
export function getWave(fn, numSamples = 128) {
    let points = [];
    for (let i = 0; i < numSamples; i ++) {
        const amt = i / numSamples;
        points.push(fn(amt));
    }
    return points;
}

/**
 * @param {Array<number>} wave
 * @returns {Array<number>} Normalised wave (in the range -1 to 1)
 */
export function normaliseWave(wave) {
    const min = Math.min(...wave);
    const max = Math.max(...wave);
    return wave.map(sample => slurp(-1, 1, (sample - min) / (max - min)));
}

/**
 * Creates a function that gives the value of a wave at a certain point. Does some interpolation.
 * @param {Array<number>} wave 
 * @returns {function(number):number} A wave function (mainly to be used by the playSoundWave thing)
 */
export function getWaveFunction(wave) {
    return t => {
        t %= 1;
        if (t < 0) {
            t ++;
        }
        const index = Math.floor(wave.length * t);
        const nextIndex = (index + 1) % wave.length;
        // The remainder from doing the divide
        const extra = (wave.length * t) % 1;

        return slurp(wave[index], wave[nextIndex], extra);
    }
}


export function squareWave(t) {
    // Do ya own normalising ya dangus
    return t < 0.5 ? -1 : 1
}

export function renderWave({context, wave, width, yPosition=0, yMultiple, startXAmt=0, type='wave'}) {
    let startI = 0;
    // (I think the wavelength of the wave can be configured by changing the 1 here)
    const step = 1 / wave.length;
    // TODO: Skip drawing the start things that are already defined.
    for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
        const index = i % wave.length;

        const x = width * xAmt;
        const y = yPosition + yMultiple * wave[index];

        if (type == 'wave') {
            if (i == 0) {
                context.moveTo(x, y);
            }
            else {
                context.lineTo(x, y);
            }
        }
        else if (type == 'samples') {
            context.beginPath();
            context.arc(x, y, 2, 0, 2 * Math.PI);
            context.fill();
        }
    }
}