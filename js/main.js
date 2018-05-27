// TODO: Import something here

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Currently assuming square proportions.
const SIZE = 500;

// Variables relating to resizing.
let scale = 1;
let centerX = SIZE / 2;
let centerY = SIZE / 2;

function init() {
	// TODO: Specific initialization stuff here

	handleResize();
	// Set up event listeners.
	window.addEventListener('resize', handleResize);
	// Kick off the update loop
	window.requestAnimationFrame(everyFrame);
}

// TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
function everyFrame() {
	update();
	render();
	requestAnimationFrame(everyFrame);
}

function update() {
	// TODO: Some specific updating logic
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	// TODO: Some rendering logic
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	scale = Math.min(canvas.width, canvas.height) / SIZE;
	// Changing the `0.5` here changes what point it resizes around.
	centerX = 0.5 * canvas.width / scale;
	centerY = 0.5 * canvas.height / scale;

	render();
}

init();