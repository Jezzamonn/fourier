import Controller from "../controller";
import { easeInOut, clamp, slurp } from "../util";
import { getRealFourierData } from "../justfourierthings";

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
        this.splitAnim = false;
        // How many of the waves to draw
        this.fourierAmt = 1;
    }

    setPath(path) {
        this.wavePoints = path;
        // Calculate fourier points, and drop the small things.
        this.fourierData = getRealFourierData(path).filter(p => p.amplitude > 0.001 && p.freq > 0);

        // Calculate the heights of the main wave and all the sine things
        this.waveTop = Math.min(...path);
        this.waveBottom = Math.max(...path);

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
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;

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

        // Draw the main boy
        curWavePos -= this.waveTop;
        this.context.beginPath();
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const index = i % this.wavePoints.length;

            const x = this.width * xAmt;
            const fullWaveAmt = this.wavePoints[index];
            const y = top + sizeMultiple * (curWavePos + spacingMultiplier * fullWaveAmt);

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();
        curWavePos += this.waveBottom;

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

        // Draw its little babies
        for (let babe = 0; babe < numBabies; babe ++) {
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
            }
            curWavePos += waveData.amplitude;
            this.context.stroke();
            this.context.globalAlpha = 1;
        }
    }
}