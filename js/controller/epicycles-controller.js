import Controller from "../controller";
import { getFourierData } from "../justfourierthings";

const numPoints = 1024;
 
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
    }

    setPath(path) {
        this.animAmt = 0;
        this.niceAnimAmt = 0;
        this.fourierPath = [];
        this.fourierData = getFourierData(path, numPoints);
    }

	update(dt, mousePosition) {
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
            this.niceAnimAmt += 1 / numPoints;

            this.addToPath();
        }
    }
    
    addToPath() {
        if (this.fourierData.length == 0) {
            return;
        }
        let runningX = 0;
        let runningY = 0;
        for (let i = 0; i < this.fourierData.length; i ++) {
            const amplitude = this.fourierData[i].amplitude;
            const angle = 2 * Math.PI * this.fourierData[i].freq * this.niceAnimAmt + this.fourierData[i].phase;
            runningX += amplitude * Math.cos(angle);
            runningY += amplitude * Math.sin(angle);
        }

        this.fourierPath.push({x: runningX, y:runningY});
        if (this.fourierPath.length > this.fourierData.length) {
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
        let runningX = 0;
        let runningY = 0;
        for (let i = 0; i < this.fourierData.length; i ++) {
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
