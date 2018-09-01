import Controller from "../controller";
import { slurp } from "../util";
 
export default class WaveDrawController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        // just a list
        this.wavePoints = new Array(128).fill(this.height / 2);

        this.drawing = false;
        this.onDrawingStart = [];
        this.onDrawingEnd = [];
        this.lastMousePoint = null;

        this.canvas.addEventListener('mousedown', () => this.startDrawing());
        this.canvas.addEventListener('touchstart', () => this.stopDrawing());

        document.addEventListener('mouseup', () => this.stopDrawing());
        document.addEventListener('touchend', () => this.stopDrawing());
    }

   startDrawing() {
        this.drawing = true;
        this.lastMousePoint = null;

        this.onDrawingStart.forEach(fn => fn());
    }

    stopDrawing() {
        this.drawing = false;
        this.lastMousePoint = null;

        this.onDrawingEnd.forEach(fn => fn());
    }

 	update(dt, mousePosition) {
        if (!mousePosition || !this.drawing) {
            return;
        }

        // TODO: Some minimum point length
        const canvasPosition = this.canvas.getBoundingClientRect();
        const mousePoint = {
            x: mousePosition.x - canvasPosition.x,
            y: mousePosition.y - canvasPosition.y,
        }
        if (this.lastMousePoint == null) {
            this.lastMousePoint = mousePoint;
        }

        const xDiff = Math.abs(mousePoint.x - this.lastMousePoint.x);
        const pointsGap = this.width / this.wavePoints.length;
        const lerpPoints = 2 * Math.ceil(xDiff / pointsGap);
        for (let i = 0; i < lerpPoints; i ++) {
            const amt = (i - 1) / lerpPoints;

            const index = this.getNearestIndex(slurp(this.lastMousePoint.x, mousePoint.x, amt));
            this.wavePoints[index] = slurp(this.lastMousePoint.y, mousePoint.y, amt);
        }

        this.lastMousePoint = mousePoint;
    }
    
    /**
     * Gets the nearest index in the wave array to the x coord on the screen
     * @param {Number} x 
     */
    getNearestIndex(x) {
        const xAmt = (x / this.width)
        let pos = Math.round(this.wavePoints.length * xAmt) % this.wavePoints.length;
        if (pos < 0) {
            pos += this.wavePoints.length;
        }
        return pos;
    }
    
	render() {
        this.clear();

        this.renderWave();
    }

    renderWave() {
        this.context.beginPath();
        for (let i = 0; i <= this.wavePoints.length; i ++) {
            const index = i % this.wavePoints.length;
            const amt = i / this.wavePoints.length;

            const x = this.width * amt;
            const y = this.wavePoints[index];

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }
        this.context.stroke();
    }
}
