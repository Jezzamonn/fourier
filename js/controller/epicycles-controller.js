import CanvasController from './canvas-controller.js';
import { getFourierData, resample2dData } from '../just-fourier-things.js';
import { slurp, clampedSlurp } from '../util.js';
import { palette } from '../color.js';

export default class EpicyclesController extends CanvasController {

    constructor(id, width, height) {
        super(id, width, height);

        this.animate = true;

        // [ {freq, amplitude, phase } ]
        this.fourierData = [];
        // [ {x, y} ]
        this.fourierPath = [];
        this.numPoints = 0;
        // What percentage of the path to draw
        this.pathAmt = 1;
        this.animatePathAmt = true;

        this.animAmt = 0;
        this.niceAnimAmt = 0;
        this.period = 5;

        this.fourierAmt = 1;

        this.pathDirty = false;
    }

    setPath(path, numPoints=-1, minAmplitude=0.01) {
        if (numPoints < 0) {
            numPoints = path.length;
        }
        this.numPoints = numPoints;
        this.animAmt = 0;
        this.niceAnimAmt = 0;
        this.fourierPath = [];
        // Get the fourier data, also filter out the really small terms.
        this.fourierData = getFourierData(resample2dData(path, this.numPoints)).filter(f => f.amplitude > minAmplitude);
        this.fourierData.sort((a, b) => b.amplitude - a.amplitude);
        console.log(this.fourierData.length + '/' + numPoints)
    }

    setFourierAmt(amt) {
        this.fourierAmt = amt;
        this.pathDirty = true;
    }

    recalculatePath() {
        // then render everything.
        for (let i = 0; i < this.numPoints; i ++) {
            this.niceAnimAmt += 1 / this.numPoints;
            this.addToPath();
        }
        this.niceAnimAmt -= 1;
    }

    update(dt, mousePosition) {
        if (this.pathDirty) {
            this.recalculatePath();
            this.pathDirty = false;
        }

        if (!this.animate) {
            return;
        }
        this.animAmt += (dt / this.period) % 1;

        while (this.animAmt > 1) {
            this.animAmt --;
            this.niceAnimAmt --;
        }

        if (this.animatePathAmt) {
            const transitionFactor = (1 / 10);
            const pos = this.getScrollPosition();
            let desiredPathAmt = 0;
            if (pos < 0.8) {
                desiredPathAmt = 1;
            }
            this.pathAmt += transitionFactor * (desiredPathAmt - this.pathAmt);
            if (this.pathAmt >= 0.99) {
                this.pathAmt = 1;
            }
        }

        // some max iterations to stop it from hanging
        for (let i = 0; i < 20; i ++) {
            if (this.niceAnimAmt >= this.animAmt) {
                break;
            }
            this.niceAnimAmt += 1 / this.numPoints;
            this.addToPath();
        }
    }

    addToPath() {
        if (this.fourierData.length == 0) {
            return;
        }
        let runningX = 0;
        let runningY = 0;
        const numFouriers = Math.round(slurp(2, this.fourierData.length, this.fourierAmt));
        for (let i = 0; i < numFouriers; i ++) {
            const amplitude = this.fourierData[i].amplitude;
            const angle = 2 * Math.PI * this.fourierData[i].freq * this.niceAnimAmt + this.fourierData[i].phase;
            runningX += amplitude * Math.cos(angle);
            runningY += amplitude * Math.sin(angle);
        }

        this.fourierPath.push({x: runningX, y:runningY});
        while (this.fourierPath.length > this.numPoints * this.pathAmt && this.fourierPath.length > 0) {
            this.fourierPath.shift();
        }
    }

    render() {
        this.clear();

        this.renderPath(this.fourierPath);
        this.renderCircles();
    }

    renderPath(path) {
        for (let i = 0; i < path.length - 1; i ++) {
            this.context.beginPath();
            this.context.strokeStyle = palette.blue;
            this.context.lineWidth = 2;
            this.context.moveTo(path[i].x, path[i].y);
            this.context.lineTo(path[i+1].x, path[i+1].y);
            this.context.stroke();
        }
    }

    renderCircles() {
        if (this.fourierData.length == 0) {
            return;
        }
        let runningX = 0;
        let runningY = 0;
        const numFouriers = Math.round(slurp(2, this.fourierData.length, this.fourierAmt));
        for (let i = 0; i < numFouriers; i ++) {
            const amplitude = this.fourierData[i].amplitude;
            const angle = 2 * Math.PI * this.fourierData[i].freq * this.animAmt + this.fourierData[i].phase;
            runningX += amplitude * Math.cos(angle);
            runningY += amplitude * Math.sin(angle);
            if (i == 0) {
                continue; // we skip the first one because we just don't care about rendering the constant term
            }
            if (amplitude < 0.5) {
                continue; // skip the really tiny ones
            }
            this.context.beginPath();
            this.context.strokeStyle = palette.cyan;
            this.context.globalAlpha = 0.7;
            this.context.lineWidth = 1;
            this.context.moveTo(runningX, runningY);
            this.context.arc(runningX, runningY, amplitude, angle - Math.PI, angle + Math.PI);
            this.context.stroke();
        }
        this.context.globalAlpha = 1;
    }

}
