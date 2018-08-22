
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