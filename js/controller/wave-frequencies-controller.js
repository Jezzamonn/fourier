import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, normaliseWave, getWaveFunction, getWave } from "../wave-things";
import { slurp, clamp, posMod } from "../util";
import { renderLabel } from "./render-label";


export default class WaveFrequenciesController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.fourierData = [];
        this.totalHeight = 0;

        this.selectedIndex = 0;
    }

    setFourierData(fourierData) {
        this.fourierData = fourierData.slice();
        // Sort by frequency this time
        this.fourierData.sort((a, b) => a.freq - b.freq);

        this.totalHeight = 0;
        this.fourierData.forEach((el) => this.totalHeight += 2 * el.amplitude);
    }

    update(dt, mousePosition) {
        const pos = 1 - this.getScrollPosition();
        this.selectedIndex = clamp(Math.floor(this.fourierData.length * pos), 0, this.fourierData.length - 1);
    }

	render() {
        this.clear();

        this.renderWaves();
        this.renderLabel();
    }

    renderWaves() {
        let waveTop = 0;
        for (let i = 0; i < this.fourierData.length; i ++) {
            const waveData = this.fourierData[i];
            const wave = getWave(t => waveData.amplitude * Math.cos(2 * Math.PI * waveData.freq * t + waveData.phase));
            
            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.strokeStyle = palette.blue;
            if (i != this.selectedIndex) {
                this.context.globalAlpha = 0.3;
            }
            renderWave({
                context: this.context,
                wave: wave,
                width: this.width,
                yPosition: (this.height / this.totalHeight) * (waveTop + waveData.amplitude),
                yMultiple: 0.7 * (this.height / this.totalHeight),
            })
            this.context.stroke();
            this.context.globalAlpha = 1;
    
            waveTop += 2 * waveData.amplitude;
        }
    }

    renderLabel() {
        if (this.fourierData.length == 0) {
            return;
        }
        const waveData = this.fourierData[this.selectedIndex];
        const xAmt = 0.2;
        const x = this.width * xAmt;
        const waveValue = waveData.amplitude * Math.cos(2 * Math.PI * waveData.freq * xAmt + waveData.phase);
        let waveTop = 0;
        for (let i = 0; i < this.selectedIndex; i ++) {
            waveTop += 2 * this.fourierData[i].amplitude;
        }
        const y = (this.height / this.totalHeight) * (waveTop + waveData.amplitude + 0.7 * waveValue);

        renderLabel(this.context, "hello", x, y, 100, palette.cyan, 0, this.width);

    }
    
}