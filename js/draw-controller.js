import Controller from "./controller";

export default class DrawController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        this.points = [];
        this.drawing = false;

        canvas.addEventListener('mousedown', () => this.startDrawing());
        canvas.addEventListener('touchstart', () => this.stopDrawing());

        document.addEventListener('mouseup', () => this.stopDrawing());
        document.addEventListener('touchend', () => this.stopDrawing);
    }

    startDrawing() {
        this.points = [];
        this.drawing = true;
    }

    stopDrawing() {
        this.drawing = false;
    }

	update(dt, mousePosition) {
        if (!mousePosition || !this.drawing) {
            return;
        }

        // TODO: Some minimum point length
        let canvasPosition = canvas.getBoundingClientRect();
        let point = {
            x: mousePosition.x - canvasPosition.x,
            y: mousePosition.y - canvasPosition.y,
        }
        this.points.push(point)
	}

	render() {
        this.clear();

        this.context.beginPath();
        this.context.strokeStyle = 'black';
        for (let i = 0; i < this.points.length; i ++) {
            if (i == 0) {
                this.context.moveTo(this.points[i].x, this.points[i].y);
            }
            else {
                this.context.lineTo(this.points[i].x, this.points[i].y);
            }
        }
        this.context.stroke();
	}

}
