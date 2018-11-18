import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, normaliseWave, getWaveFunction } from "../wave-things";
import { slurp } from "../util";
import { renderLabel } from "./render-label";


export default class WaveSamplesController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.wave = new Array(128).fill(0);
        this.waveFn = getWaveFunction(this.wave);

        this.animAmt = 0;
        this.period = 10;

        this.yPos = this.height / 2;
        this.yMultiple = this.height / 4;
    }

    setWave(wave) {
        // normalise this bad boi
        this.wave = normaliseWave(wave);
        this.waveFn = getWaveFunction(this.wave);
    }

    update(dt, mousePosition) {
        this.animAmt += dt / this.period;
        this.animAmt %= 1;
    }

	render() {
        this.clear();

        if (this.wave == null) {
            return;
        }

        this.renderWave();
        this.renderLabel();
    }

    renderWave() {
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = palette.blue;
        renderWave({
            context: this.context,
            width: this.width,
            wave: this.wave,
            yPosition: this.yPos,
            yMultiple: this.yMultiple
        });
        this.context.stroke();
    }

    renderLabel(context, text, labelDist, color) {
        // What point from the wave to use
        const waveAmt = this.animAmt;
        const waveValue = this.waveFn(waveAmt);
    
        const x = this.width * waveAmt;
        const y = this.yPos + this.yMultiple * waveValue;

        // draw li'l circle (?)
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, 2 * Math.PI);
        this.context.stroke();

        const label = `t = ${waveAmt.toFixed(2)}\namplitude = ${waveValue.toFixed(2)}`
        renderLabel(this.context, label, x, y, 0.1 * this.height, palette.cyan, 0, this.width);
    }
    
}