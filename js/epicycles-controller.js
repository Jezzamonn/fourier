import Controller from "./controller";
import { getFourierData } from "./justfourierthings";

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
        const period = 5;
        this.animAmt += dt / period;

        while (this.niceAnimAmt < this.animAmt) {
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

        this.renderCircles();
        this.renderPath(this.fourierPath);
    }

    renderPath(path, close=false) {
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        for (let i = 0; i < path.length; i ++) {
            if (i == 0) {
                this.context.moveTo(path[i].x, path[i].y);
            }
            else {
                this.context.lineTo(path[i].x, path[i].y);
            }
        }
        if (close) {
            this.context.closePath();
        }
        this.context.stroke();
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
            this.context.beginPath();
            this.context.strokeStyle = 'black';
            this.context.moveTo(runningX, runningY);
            this.context.arc(runningX, runningY, amplitude, angle - Math.PI, angle + Math.PI);
            this.context.stroke();
        }
    }

}
