export default class CanvasController {

	constructor(id, width=null, height=null) {
		this.id = id;
		this.canvas = document.getElementById(id);
		if (width == null) {
			width = this.canvas.width;
		}
		if (height == null) {
			height = this.canvas.height;
		}

		this.context = this.canvas.getContext('2d');
		this.width = width;
		this.height = height;
	}

	isOnScreen() {
		// Thanks stack overflow https://stackoverflow.com/a/7557433
		const boundingRect = this.canvas.getBoundingClientRect();

		return (
			boundingRect.bottom >= 0 &&
			boundingRect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
			boundingRect.right >= 0 &&
			boundingRect.left <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	getScrollPosition() {
		const boundingRect = this.canvas.getBoundingClientRect();
		const centerY = (boundingRect.top + boundingRect.bottom) / 2;
		return centerY / (window.innerHeight || document.documentElement.clientHeight);
	}

	clear() {
		// Clear the previous frame
		this.context.resetTransform();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}
