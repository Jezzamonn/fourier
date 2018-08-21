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
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;

        this.context.beginPath();
        this.context.translate(0, 0.3 * this.context.canvas.height);

        const numPoints = 100;
        let startXAmt = -this.animAmt;
        let startI = 0;
        const step = 1 / (numPoints);
        // TODO: Skip drawing the start things that are already defined.
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const amt = (i / numPoints) % 1;
            const waveHeight = 0.3 * 0.5 * this.height;

            const x = this.width * xAmt;
            const y = waveHeight * beThereBeSquare(amt);

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