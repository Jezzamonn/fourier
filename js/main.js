import Controller from './controller.js';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Currently assuming square proportions.
const SIZE = 500;

// Variables relating to resizing.
let scale = 1;
let centerX = SIZE / 2;
let centerY = SIZE / 2;

let controller;

function init() {
	controller = new Controller();

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
	controller.update();
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	// You can also pass in other stuff here depend on how you want to resize
	controller.render(context, scale, centerX, centerY);
}

function handleResize(evt) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Math.max -> no borders (will cut off edges of the thing)
	// Math.min -> show all (with borders)
	// There are other options too :)
	scale = Math.min(canvas.width, canvas.height) / SIZE;
	// Changing the `0.5` here changes what point it resizes around.
	centerX = 0.5 * canvas.width / scale;
	centerY = 0.5 * canvas.height / scale;

	render();
}

init();