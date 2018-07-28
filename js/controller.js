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

	update(dt) {
		const period = 2;
		this.animAmt += dt / period;
		this.animAmt %= 1;
	}

	render() {
		this.clear();

		this.context.strokeStyle = 'black';
		this.context.moveTo(0, 0);
		this.context.lineTo(300, 300);
		this.context.stroke();
	}

}
