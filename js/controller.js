export default class Controller {

	constructor(id, width, height) {
		this.canvas = document.getElementById(id);
		this.context = canvas.getContext('2d');

		this.animAmt = 0;
	}

	clear() {
		// Clear the previous frame
		this.context.resetTransform();
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}

}
