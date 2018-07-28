import Controller from "./controller";

export default class DrawController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        this.point = null;
	}

	update(dt, mousePosition) {
        if (!mousePosition) {
            return;
        }
        // 👨‍💻 <( Don't mutate this pls )
        let canvasPosition = canvas.getBoundingClientRect();
        this.point = {
            x: mousePosition.x - canvasPosition.x,
            y: mousePosition.y - canvasPosition.y,
        }
	}

	render() {
		this.clear();

        if (this.point) {
            this.context.beginPath();
            this.context.strokeStyle = 'black';
            this.context.moveTo(0, 0);
            this.context.lineTo(this.point.x, this.point.y);
            this.context.stroke();
        }
	}

}
