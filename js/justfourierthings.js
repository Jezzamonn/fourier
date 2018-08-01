import FFT from 'fft.js';
import { slurp } from "./util";

export function getFourierData(points, numPoints) {
    if (points.length == 0) {
        return [];
    }
    const fft = new FFT(numPoints);
    
    const inputPoints = fftFriendly2dPoints(points, numPoints);
     
    const out = fft.createComplexArray();
    fft.transform(out, inputPoints);
    
    const fftData = [];
    for (let i = 0; i < numPoints; i ++) {
        // to reorder the frequencies a little nicer, we pick from the front and back altermatively
        const j = i % 2 == 0 ? i / 2 : numPoints - ((i+1) / 2);
        const x = out[2 * j];
        const y = out[2 * j + 1];
        fftData.push({
            freq: j,
            // a little expensive
            amplitude: Math.sqrt(x * x + y * y) / numPoints,
            // a lottle expensive :(
            phase: Math.atan2(y, x),
        });
    }
    return fftData;
}

function fftFriendly2dPoints(points, numSamples) {
    // TODO?: Make these based off space, not time
    let newPoints = [];
    for (let i = 0; i < numSamples; i ++) {
        let position = points.length * (i / numSamples);
        let index = Math.floor(position);
        let nextIndex = (index + 1) % points.length;
        let amt = position - index;
        newPoints.push(
            /* x */ slurp(points[index].x, points[nextIndex].x, amt),
            /* y */ slurp(points[index].y, points[nextIndex].y, amt),
        )
    }
    return newPoints;
}
