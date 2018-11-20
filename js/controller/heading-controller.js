import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, getWave } from "../wave-things";
import { slurp } from "../util";

export default class HeadingController extends CanvasController {

	constructor(id, width, height) {
        super(id, width, height);

        this.animAmt = 0;
        this.period = 10;

        this.onResize();
    }

    onResize() {
        const boundingBox = this.canvas.getBoundingClientRect();
        // Resize our canvas
        this.canvas.width = boundingBox.width;
        this.canvas.height = boundingBox.height;
        this.width = boundingBox.width;
        this.height = boundingBox.height;
    }

	update(dt, mousePosition) {
        this.animAmt += dt / this.period;
        this.animAmt %= 1;
    }

	render() {
        this.clear();

        this.context.beginPath();
        this.context.strokeStyle = palette.orange;
        this.context.lineWidth = 2;
        const freq = 10;
        for (let i = 0; i <= this.width; i += 3) {
            // some some arbitray mapping to real world things
            const t = i / 500 + this.animAmt;
            const waveAmt = 0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t);

            const x = i;
            const y = slurp(0, this.height, waveAmt);

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