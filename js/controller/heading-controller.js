import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, getWave } from "../wave-things";
import { slurp } from "../util";

export default class HeadingController extends CanvasController {

	constructor(id, width, height) {
        super(id, width, height);

        this.animAmt = 0;
        this.mousePos = null;

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
        this.animAmt += dt;
        if (mousePosition) {
            this.mousePos = Object.assign({}, mousePosition);
        }
    }

	render() {
        this.clear();

        this.context.beginPath();
        this.context.strokeStyle = palette.orange;
        this.context.lineWidth = 2;

        const numLines = 4;
        for (let j = 0; j < numLines; j ++) {
            const waveHeight = this.height / numLines;
            const waveTop = (j + 0) * waveHeight;
            const waveMiddle = (j + 0.5) * waveHeight;
            const waveBottom = (j + 1) * waveHeight;

            const freq = 2 * Math.pow(2, (numLines - 1) - j);
            const speed = 0.05 + 0.02 * j;

            for (let i = 0; i <= this.width; i += 3) {
                // some some arbitray mapping to real world things
                let t = i / 500;
                const x = i;
                if (this.mousePos) {
                    const xDiff = (this.mousePos.x - x);
                    const yDiff = (this.mousePos.y - waveMiddle);
                    const stretchAmt = 0.5 * gaussianLike(yDiff, waveHeight);
                    t = stretch(t, xDiff / 500, 0.2, stretchAmt);
                }
                t += speed * this.animAmt;
                const waveAmt = 0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t);
    
                const y = slurp(waveTop, waveBottom, slurp(0.1, 0.9, waveAmt));
    
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

function gaussianLike(x, width) {
    // A gaussian type thing. It equals 1 at 0 (instead of having a total area of 1)
    return Math.exp(-0.5 * (x * x) / (width * width))
}

function stretch(t, diff, width, strength) {
    const stretchAmt = strength * diff * gaussianLike(diff, width);
    return t + stretchAmt;
}