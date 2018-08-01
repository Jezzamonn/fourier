export default class Controller {

	constructor(id, width, height) {
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext('2d');

		const pixelRatio = window.devicePixelRatio || 1;
		this.canvas.width = width * pixelRatio;
		this.canvas.height = height * pixelRatio;
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
	}

	clear() {
		// Clear the previous frame
		this.context.resetTransform();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}
