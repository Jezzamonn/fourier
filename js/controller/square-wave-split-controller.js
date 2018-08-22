import Controller from "../controller";
import { easeInOut, clamp, slurp } from "../util";

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
        // calculate fourier points
        
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

        this.context.beginPath();
        this.context.translate(0, 0.3 * this.context.canvas.height);

        const waveHeight = 0.3 * 0.5 * this.height;

        let startXAmt = -this.animAmt;
        let startI = 0;
        // (I think the wavelength of the wave can be configured by changing the 1 here)
        const step = 1 / (this.wavePoints.length);
        // TODO: Skip drawing the start things that are already defined.
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const index = i % this.wavePoints.length;

            const x = this.width * xAmt;
            const y = waveHeight * this.wavePoints[index];

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