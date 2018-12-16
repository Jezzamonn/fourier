import { elementInView, getScrollPosition } from "./controller-util";
import Controller from "./controller";

export default class CanvasController extends Controller {

	constructor(id, width=null, height=null) {
		super();
		this.id = id;
		this.canvas = document.getElementById(id);
		if (width == null) {
			width = this.canvas.width;
		}
		if (height == null) {
			height = this.canvas.height;
		}

		/** @type {CanvasRenderingContext2D} */
		this.context = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
	}

	isOnScreen() {
		return elementInView(this.canvas);
	}

	getScrollPosition() {
		return getScrollPosition(this.canvas)
	}

	clear() {
		// Clear the previous frame
		this.context.resetTransform();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}
