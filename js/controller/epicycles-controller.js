import Controller from "../controller";
import { getFourierData, resample2dData } from "../justfourierthings";
import { slurp } from "../util";

export default class EpicyclesController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);

        this.animate = true;

        // [ {freq, amplitude, phase } ]
        this.fourierData = [];
        // [ {x, y} ]
        this.fourierPath = [];

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
        if (this.fourierPath.length > this.numPoints) {
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
            this.context.strokeStyle = 'black'
            this.context.lineWidth = 1;
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
            const angle = 2 * Math.PI * this.fourierData[i].freq * this.niceAnimAmt + this.fourierData[i].phase;
            runningX += amplitude * Math.cos(angle);
            runningY += amplitude * Math.sin(angle);
            if (i == 0) {
                continue; // we skip the first one because we just don't care about rendering the constant term
            }
            if (amplitude < 0.5) {
                continue; // skip the really tiny ones
            }
            this.context.beginPath();
            this.context.strokeStyle = 'black';
            this.context.globalAlpha = 0.7;
            this.context.lineWidth = 1;
            this.context.moveTo(runningX, runningY);
            this.context.arc(runningX, runningY, amplitude, angle - Math.PI, angle + Math.PI);
            this.context.stroke();
        }
        this.context.globalAlpha = 1;
    }

}
