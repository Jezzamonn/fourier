import CanvasController from './canvas-controller.js';
import { palette } from '../color.js';
import { renderWave } from '../wave-things.js';

export default class WaveSplitController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.animAmt = 0;
        this.wavePoints = [];
    }

    setPath(path) {
        this.wavePoints = path;
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
        this.context.strokeStyle = palette.blue;
        this.context.lineWidth = 2;

        const waveHeight = 0.2 * 0.5 * this.height;
        const wavePos = 0.5 * this.context.canvas.height;

        let startXAmt = -this.animAmt;

        this.context.beginPath();
        renderWave({
            context: this.context,
            width: this.width,
            wave: this.wavePoints,
            yPosition: wavePos,
            yMultiple: waveHeight,
            startXAmt: startXAmt
        })
        this.context.stroke();
    }
}