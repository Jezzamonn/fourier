import Controller from "../controller";
import { easeInOut, clamp, slurp } from "../util";
import { getRealFourierData } from "../justfourierthings";

function beThereBeSquare(val) {
    const normVal = val % 1;

    return (normVal < 0.5) ? 1 : 0;
}

export default class SquareWaveSplitController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
        this.wavePoints = [];
        this.fourierPoints = [];
    }

    setPath(path) {
        this.wavePoints = path;
        // Calculate fourier points, and drop the small things.
        this.fourierData = getRealFourierData(path).filter(p => p.amplitude > 0);
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

        const waveHeight = 0.2 * 0.5 * this.height;
        const waveTop = 0.2 * this.context.canvas.height;
        const waveBottom = 0.8 * this.context.canvas.height;

        let startXAmt = -this.animAmt;
        let startI = 0;
        // (I think the wavelength of the wave can be configured by changing the 1 here)
        const step = 1 / (this.wavePoints.length);
        // TODO: Skip drawing the start things that are already defined.

        // Draw the main boy
        this.context.beginPath();
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const index = i % this.wavePoints.length;

            const x = this.width * xAmt;
            const fullWaveAmt = this.wavePoints[index];
            const y = waveTop + waveHeight * fullWaveAmt;

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();

        const splitAmt = easeInOut(clamp(4 * this.animAmt, 0, 1), 3);
        let fadeAmt = 2 * this.animAmt;
        if (fadeAmt > 1) {
            fadeAmt = 2 - fadeAmt;
        }
        fadeAmt = easeInOut(clamp(4 * fadeAmt, 0, 1));

        // Draw its little babies
        this.context.beginPath();
        this.context.globalAlpha = fadeAmt;
        const numBabies = Math.min(20, this.fourierData.length);
        for (let babe = 0; babe < numBabies; babe ++) {
            const wavePosition = slurp(waveTop, slurp(waveTop, waveBottom, (babe + 1) / numBabies), splitAmt);
            const waveData = this.fourierData[babe];
            for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
                const index = i % this.wavePoints.length;
                const indexAmt = index / this.wavePoints.length;
    
                const x = this.width * xAmt;
                const fullWaveAmt = this.wavePoints[index];
                const sineAmt = waveData.amplitude * Math.cos(2 * Math.PI * waveData.freq * indexAmt + waveData.phase);
                const y = wavePosition + waveHeight * slurp(fullWaveAmt, sineAmt, splitAmt);
    
                if (i == 0) {
                    this.context.moveTo(x, y);
                }
                else {
                    this.context.lineTo(x, y);
                }
            }
        }
        this.context.stroke();
        this.context.globalAlpha = 1;
    }
}