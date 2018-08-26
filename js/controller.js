export default class Controller {

	constructor(id, width=null, height=null) {
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

		const pixelRatio = window.devicePixelRatio || 1;
		this.canvas.width = width * pixelRatio;
		this.canvas.height = height * pixelRatio;
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
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

	clear() {
		// Clear the previous frame
		this.context.resetTransform();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

}
