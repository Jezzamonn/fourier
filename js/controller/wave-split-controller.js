import Controller from "../controller";
import { easeInOut, clamp, slurp } from "../util";

export default class WaveSplitController extends Controller {

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

        const splitAmt = easeInOut(clamp(4 * this.animAmt, 0, 1), 3);
        const displaceAmt = 0.25 * this.context.canvas.height * splitAmt;
        let fadeAmt = 2 * this.animAmt;
        if (fadeAmt > 1) {
            fadeAmt = 2 - fadeAmt;
        }
        fadeAmt = easeInOut(clamp(4 * fadeAmt, 0, 1));

        this.context.beginPath();
        this.context.translate(0, 0.3 * this.context.canvas.height);

        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const timeAmt = amt + this.animAmt;
            const waveHeight = 0.3 * 0.5 * this.height;

            const x = this.width * amt;
            const firstWaveAmt = Math.sin(2 * Math.PI * timeAmt);
            const secondWaveAmt = 0.5 * Math.sin(2 * Math.PI * 3 * timeAmt);
            const fullWaveAmt = firstWaveAmt + secondWaveAmt;
            const y = waveHeight * fullWaveAmt;

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();

        this.context.beginPath();
        this.context.translate(0, displaceAmt);
        this.context.globalAlpha = fadeAmt;
        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const timeAmt = amt + this.animAmt;
            const waveHeight = 0.3 * 0.5 * this.height;

            const x = this.width * amt;
            const firstWaveAmt = Math.sin(2 * Math.PI * timeAmt);
            const secondWaveAmt = 0.5 * Math.sin(2 * Math.PI * 3 * timeAmt);
            const fullWaveAmt = firstWaveAmt + secondWaveAmt;
            const y = waveHeight * slurp(fullWaveAmt, firstWaveAmt, splitAmt);

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();

        this.context.beginPath();
        this.context.translate(0, displaceAmt);
        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const timeAmt = amt + this.animAmt;
            const waveHeight = 0.3 * 0.5 * this.height;

            const x = this.width * amt;
            const firstWaveAmt = Math.sin(2 * Math.PI * timeAmt);
            const secondWaveAmt = 0.5 * Math.sin(2 * Math.PI * 3 * timeAmt);
            const fullWaveAmt = firstWaveAmt + secondWaveAmt;
            const y = waveHeight * slurp(fullWaveAmt, secondWaveAmt, splitAmt);

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }

        this.context.stroke();
        this.context.globalAlpha = 1;
    }
}