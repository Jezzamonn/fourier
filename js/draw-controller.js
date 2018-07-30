import Controller from "./controller";
import FFT from 'fft.js';
import { slurp } from "./util";
 
function getFourierData(points) {
    const numPoints = 1024;
    const fft = new FFT(numPoints);
    // just... do this???
    const inputPoints = fftFriendly2dPoints(points, numPoints);
     
    const out = fft.createComplexArray();
    fft.transform(out, inputPoints);
    
    const fftData = [];
    for (let i = 0; i < numPoints; i ++) {
        const x = out[2 * i];
        const y = out[2 * i + 1];
        fftData.push({
            freq: i,
            // a little expensive
            amplitude: Math.sqrt(x * x + y * y) / numPoints,
            // a lottle expensive :(
            phase: Math.atan2(y, x),
        });
    }
    console.log('fft data')
    console.log(fftData);
    return fftData;
}

function fftFriendly2dPoints(points, numSamples) {
    // TODO?: Make these based off space, not time
    let newPoints = [];
    for (let i = 0; i < numSamples; i ++) {
        let position = points.length * (i / numSamples);
        let index = Math.floor(position);
        let nextIndex = (index + 1) % points.length;
        let amt = position - index;
        newPoints.push(
            /* x */ slurp(points[index].x, points[nextIndex].x, amt),
            /* y */ slurp(points[index].y, points[nextIndex].y, amt),
        )
    }
    console.log('points')
    console.log(points);
    console.log('new points')
    console.log(newPoints);
    return newPoints;
}

// Compute nearest lower power of 2 for n in [1, 2**31-1]:
function nearestPowerOf2(v) {
    v--;
    v |= v >> 1;
    v |= v >> 2;
    v |= v >> 4;
    v |= v >> 8;
    v |= v >> 16;
    v++;
    return v;
}

export default class DrawController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        // [ {x, y} ]
        this.points = [];
        const numPoints = 30;
        for (let i = 0; i < numPoints; i ++) {
            const amt = i / numPoints
            this.points.push({
                x: 100 + 20 * Math.cos(2 * Math.PI * amt) + 20 * Math.cos(4 * Math.PI * amt) + 20 * Math.cos(6 * Math.PI * amt),
                y: 100 + 20 * Math.sin(2 * Math.PI * amt) + 20 * Math.sin(4 * Math.PI * amt) + 20 * Math.sin(6 * Math.PI * amt),
            })
        }
        // [ {freq, amplitude, phase }]
        this.fourierData = [];
        this.fourierPath = [];
        this.fourierData = getFourierData(this.points);

        this.drawing = false;
        this.animAmt = 0;
        this.niceAnimAmt = 0;

        canvas.addEventListener('mousedown', () => this.startDrawing());
        canvas.addEventListener('touchstart', () => this.stopDrawing());

        document.addEventListener('mouseup', () => this.stopDrawing());
        document.addEventListener('touchend', () => this.stopDrawing());
    }

    startDrawing() {
        this.points = [];
        this.fourierData = [];
        this.fourierPath = [];
        this.drawing = true;
    }

    stopDrawing() {
        this.drawing = false;
        // Calculate Fourier transform magically here
        this.fourierData = getFourierData(this.points);
    }

	update(dt, mousePosition) {
        const period = 10;
        this.animAmt += dt / period;

        while (this.niceAnimAmt < this.animAmt) {
            this.niceAnimAmt += 1 / 1024;

            this.addToPath();

            if (!mousePosition || !this.drawing) {
                return;
            }
    
            // TODO: Some minimum point length
            const canvasPosition = canvas.getBoundingClientRect();
            const point = {
                x: mousePosition.x - canvasPosition.x,
                y: mousePosition.y - canvasPosition.y,
            }
            if (this.points.length == 0) {
                this.points.push(point);
            }
            else {
                // only add it if it's far enough away from the last thing
                const lastPoint = this.points[this.points.length - 1];
                const dx = point.x - lastPoint.x;
                const dy = point.y - lastPoint.y;
                const sqDist = dx * dx + dy * dy;
                if (sqDist > 10 * 10) {
                    this.points.push(point);
                }
            }
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
            const angle = 2 * Math.PI * 2 * this.fourierData[i].freq * this.niceAnimAmt + this.fourierData[i].phase;
            runningX += amplitude * Math.cos(angle);
            runningY += amplitude * Math.sin(angle);
        }
        this.fourierPath.push({x: runningX, y:runningY});
    }

	render() {
        this.clear();

        this.renderPath(this.points, true);
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
            const angle = 2 * Math.PI * 2 * this.fourierData[i].freq * this.niceAnimAmt + this.fourierData[i].phase;
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
