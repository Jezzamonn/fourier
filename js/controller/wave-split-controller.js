import Controller from "../controller";
import { easeInOut, clamp, slurp } from "../util";
import { getRealFourierData } from "../justfourierthings";
import { palette } from "../color";

export default class WaveSplitController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
        this.wavePoints = [];
        this.fourierPoints = [];

        this.waveTop = 0;
        this.waveBottom = 0;
        this.totalHeight = 0;
        this.fadeFrequencies = true;
        this.splitAnim = true;
        // How many of the waves to draw
        this.fourierAmt = 1;
    }

    setPath(path) {
        // Update the wave points. For the sake of removing the constant term in the FFT,
        // Set the mean to be 0.
        const pathAverage = path.reduce((a, b) => a + b, 0) / path.length;
        this.wavePoints = path.map(p => p - pathAverage);
        // Calculate fourier points, and drop the small things.
        this.fourierData = getRealFourierData(this.wavePoints).filter(f => f.amplitude > 0.001);
        this.fourierData.sort((a, b) => b.amplitude - a.amplitude);

        // Calculate the heights of the main wave and all the sine things
        this.waveTop = Math.min(...this.wavePoints);
        this.waveBottom = Math.max(...this.wavePoints);

        // Total height. Start with the main wave...
        this.totalHeight = this.waveBottom - this.waveTop;
        // Then add all the sine thingos
        this.fourierData.forEach((el) => this.totalHeight += 2 * el.amplitude);

        // reset the animation too
        this.animAmt = 0;
    }

	update(dt, mousePosition) {
        const period = 7;
        this.animAmt += dt / period;
        this.animAmt %= 1;
    }

	render() {
        this.clear();
        this.renderWave();
    }

    renderWave() {
        if (this.wavePoints.length == 0) {
            return;
        }
        this.context.strokeStyle = palette.cyan;
        this.context.lineWidth = 2;

        const numBabies = Math.min(50, this.fourierData.length);
        const top = 0.1 * this.context.canvas.height;
        const bottom = 0.9 * this.context.canvas.height;
        // TODO: also incorporate into the frequencies to scale that too?
        const sizeMultiple = (bottom - top) / this.totalHeight;
        const spacingMultiplier = 0.8;

        // Running thing that says where to draw each wave.
        let curWavePos = 0;

        let startXAmt = -this.animAmt;
        let startI = 0;
        // (I think the wavelength of the wave can be configured by changing the 1 here)
        const step = 1 / (this.wavePoints.length);
        // TODO: Skip drawing the start things that are already defined.

        // Actually, we're going to skip drawing the main wave here and draw it later.
        curWavePos += this.waveBottom - this.waveTop;

        let splitAmt = 1;
        let fadeAmt = 1;
        if (this.splitAnim) {
            splitAmt = easeInOut(clamp(4 * this.animAmt, 0, 1), 4);
            fadeAmt = 2 * this.animAmt;
            if (fadeAmt > 1) {
                fadeAmt = 2 - fadeAmt;
            }
            fadeAmt = easeInOut(clamp(4 * fadeAmt, 0, 1));
        }

        // Draw its little babies.
        // Also sum up their values to draw the partial wave.
        let paritialWave = this.wavePoints.slice().fill(0);
        const renderedBabies = Math.round(slurp(1, numBabies, this.fourierAmt));
        for (let babe = 0; babe < renderedBabies; babe ++) {
            let babeAmt = babe / (numBabies - 1);
            const waveData = this.fourierData[babe];
            curWavePos += waveData.amplitude;
            const wavePosition = slurp(-this.waveTop, curWavePos, splitAmt);

            this.context.beginPath();
            this.context.globalAlpha = fadeAmt;
            if (this.fadeFrequencies) {
                this.context.globalAlpha *= (1 - babeAmt);
            }
            for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
                const index = i % this.wavePoints.length;
                const indexAmt = index / this.wavePoints.length;
    
                const x = this.width * xAmt;
                const fullWaveAmt = this.wavePoints[index];
                const sineAmt = waveData.amplitude * Math.cos(2 * Math.PI * waveData.freq * indexAmt + waveData.phase);
                const y = top + sizeMultiple * (wavePosition + spacingMultiplier * slurp(fullWaveAmt, sineAmt, splitAmt));
    
                if (i == 0) {
                    this.context.moveTo(x, y);
                }
                else {
                    this.context.lineTo(x, y);
                }

                // ALSO update the partial wave
                if (i - startI < this.wavePoints.length) {
                    paritialWave[index] += sineAmt;
                }
            }
            curWavePos += waveData.amplitude;
            this.context.stroke();
            this.context.globalAlpha = 1;
        }

        curWavePos = 0;
        curWavePos -= this.waveTop;
        if (this.fourierAmt == 1) {
            // Eh just make it the full wave.
            paritialWave = this.wavePoints;
        }

        // Now, lets go back and draw the main wave
        // Draw the main boy
        this.context.strokeStyle = palette.blue;
        this.context.lineWidth = 2;
        this.context.beginPath();
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const index = i % this.wavePoints.length;

            const x = this.width * xAmt;
            const fullWaveAmt = paritialWave[index];
            const y = top + sizeMultiple * (curWavePos + spacingMultiplier * fullWaveAmt);

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();
    }
}