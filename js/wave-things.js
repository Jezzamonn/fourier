
// Generates a wave from a function in the range [0, 1)
export function getWave(fn, numSamples = 128) {
    let points = [];
    for (let i = 0; i < numSamples; i ++) {
        const amt = i / numSamples;
        points.push(fn(amt));
    }
    return points;
}


export function squareWave(t) {
    // Do ya own normalising ya dangus
    return t < 0.5 ? -1 : 1
}

export function renderWave({context, wave, width, yPosition, yMultiple, startXAmt}) {
    let startI = 0;
    // (I think the wavelength of the wave can be configured by changing the 1 here)
    const step = 1 / wave.length;
    // TODO: Skip drawing the start things that are already defined.
    for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
        const index = i % wave.length;

        const x = width * xAmt;
        const y = yPosition + yMultiple * wave[index];

        if (i == 0) {
            context.moveTo(x, y);
        }
        else {
            context.lineTo(x, y);
        }
    }
}