import Controller from "../controller";
 
const maxDrawDist = 3;

export default class WaveDrawController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        // just a list
        this.wavePoints = [0, 10, 500, 490];

        this.drawing = false;
        this.onDrawingStart = [];
        this.onDrawingEnd = [];

        this.canvas.addEventListener('mousedown', () => this.startDrawing());
        this.canvas.addEventListener('touchstart', () => this.stopDrawing());

        document.addEventListener('mouseup', () => this.stopDrawing());
        document.addEventListener('touchend', () => this.stopDrawing());
    }

   startDrawing() {
        this.drawing = true;

        this.onDrawingStart.forEach(fn => fn());
    }

    stopDrawing() {
        this.drawing = false;

        this.onDrawingEnd.forEach(fn => fn());
    }

 	update(dt, mousePosition) {
        if (!mousePosition || !this.drawing) {
            return;
        }

        // TODO: Some minimum point length
        const canvasPosition = this.canvas.getBoundingClientRect();
        const point = {
            x: mousePosition.x - canvasPosition.x,
            y: mousePosition.y - canvasPosition.y,
        }


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
