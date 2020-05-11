import CanvasController from "./canvas-controller";
import { palette } from "../color";
import { renderWave, normaliseWave, getWaveFunction, getWave } from "../wave-things";
import { slurp, clamp, posMod, divideInterval } from "../util";
import { renderLabel } from "./render-label";
import { baseFrequency } from "../synth";


export default class WaveFrequenciesController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.fourierData = [];
        this.totalHeight = 0;

        this.selectedIndex = 0;

        this.waveSpacingMultiple = 0.7;
        this.waveTopAmt = 0.2;
        this.waveBottomAmt = 0.9;
        this.waveHeightAmt = this.waveBottomAmt - this.waveTopAmt;
    }

    setFourierData(fourierData) {
        this.fourierData = fourierData.slice();
        // Sort by frequency this time
        this.fourierData.sort((a, b) => a.freq - b.freq);

        // Only just the first few to make it look nicer
        this.fourierData = this.fourierData.slice(0, 20);

        this.totalHeight = 0;
        this.fourierData.forEach((el) => this.totalHeight += 2 * el.amplitude);
    }

    update(dt, mousePosition) {
        const pos = 1 - this.getScrollPosition();
        const fourierAmt = divideInterval(pos, 0.2, 0.6);

        const unclampedIndex = Math.floor(this.fourierData.length * fourierAmt);
        this.selectedIndex = clamp(unclampedIndex, 0, this.fourierData.length - 1);
    }

	render() {
        this.clear();

        this.renderWaves();
        this.renderLabel();
    }

    renderWaves() {
        const waveSpacingMultiple = 0.7;

        let waveTop = 0;
        for (let i = 0; i < this.fourierData.length; i ++) {
            const waveData = this.fourierData[i];
            const wave = getWave(t => waveData.amplitude * Math.cos(2 * Math.PI * waveData.freq * t + waveData.phase));
            const yPositionAmt = (1 / this.totalHeight) * (waveTop + waveData.amplitude);
            const yPosition = this.height * slurp(this.waveTopAmt, this.waveBottomAmt, yPositionAmt);
            
            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.strokeStyle = palette.blue;
            if (i != this.selectedIndex) {
                this.context.globalAlpha = 0.1;
            }
            renderWave({
                context: this.context,
                wave: wave,
                width: this.width,
                yPosition: yPosition,
                yMultiple: this.waveHeightAmt * waveSpacingMultiple * (this.height / this.totalHeight),
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
        const yAmt = (1 / this.totalHeight) * (waveTop + waveData.amplitude + this.waveSpacingMultiple * waveValue);
        const y = this.height * slurp(this.waveTopAmt, this.waveBottomAmt, yAmt);

        const freqString = (baseFrequency * waveData.freq).toFixed(0);
        const ampString = toScientificNotation(waveData.amplitude);
        const text = `frequency = ${freqString} Hz\namplitude = ${ampString}`;
        renderLabel(this.context, text, x, y, 0.1 * this.height, palette.cyan, 0, this.width);

    }
    
}

/**
 * Returns a nicely formatted number
 * @param {number} number 
 */
function toScientificNotation(number) {
    // because I'm lazy and don't want to do this by tweaking the size when drawing on the canvas.
    const superscripts = {
        '-': '⁻',
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
    }
    let [significand, exponent] = number.toExponential(2).replace('+', '').split('e');
    let superscriptExponent = '';
    for (const digit of exponent) {
        superscriptExponent += superscripts[digit];
    }
    return significand + '×10' + superscriptExponent;
}