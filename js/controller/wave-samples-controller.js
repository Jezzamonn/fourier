import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, normaliseWave, getWaveFunction } from "../wave-things";
import { slurp, clamp } from "../util";
import { renderLabel } from "./render-label";


export default class WaveSamplesController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.wave = new Array(128).fill(0);

        this.sampleAmt = 0;
        this.waveShiftAmt = 0;

        this.yPos = this.height / 2;
        this.yMultiple = this.height / 4;
    }

    setWave(wave) {
        // normalise this bad boi
        this.wave = normaliseWave(wave);
    }

    update(dt, mousePosition) {
        const pos = 1 - this.getScrollPosition();
        this.sampleAmt = pos;
        this.waveShiftAmt = slurp(0.1, -0.1, pos);
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
        this.context.lineWidth = 1;
        this.context.strokeStyle = palette.blue;
        this.context.fillStyle = palette.blue;
        this.context.globalAlpha = 0.5;
        // Render the line...
        renderWave({
            context: this.context,
            width: this.width,
            wave: this.wave,
            startXAmt: this.waveShiftAmt - 1,
            yPosition: this.yPos,
            yMultiple: this.yMultiple,
            type: 'wave'
        });
        this.context.stroke();

        this.context.globalAlpha = 1;
        // Then render the samples
        renderWave({
            context: this.context,
            width: this.width,
            wave: this.wave,
            startXAmt: this.waveShiftAmt - 1,
            yPosition: this.yPos,
            yMultiple: this.yMultiple,
            type: 'samples'
        });
    }

    renderLabel() {
        // What point from the wave to use
        const waveAmt = (this.sampleAmt + 1) % 1;
        const waveIndex = Math.floor((this.wave.length - 1) * waveAmt);
        const waveValue = this.wave[waveIndex];

        const adjustedWaveAmt = (waveAmt + this.waveShiftAmt + 2) % 1;
    
        const x = this.width * adjustedWaveAmt;
        const y = this.yPos + this.yMultiple * waveValue;

        // draw li'l circle (?)
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, 2 * Math.PI);
        this.context.stroke();

        const label = `t = ${waveAmt.toFixed(2)}\nvalue = ${-waveValue.toFixed(2)}`
        renderLabel(this.context, label, x, y, 0.1 * this.height, palette.cyan, 0, this.width);
    }
    
}