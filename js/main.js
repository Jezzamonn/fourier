import Controller from './controller.js';
import DrawController from './draw-controller.js';

let lastTime;
let controllers;
let mousePosition;

function init() {
	lastTime = Date.now();
	controllers = [];
	controllers.push(new DrawController('canvas'));

	// We can handle these all the same really.
	document.addEventListener('mousemove', updateMousePosition);
	document.addEventListener('mousedown', updateMousePosition);
	document.addEventListener('mouseup', updateMousePosition);

	document.addEventListener('touchmove', updateTouchPosition);
	document.addEventListener('touchstart', updateTouchPosition);
	document.addEventListener('touchend', updateTouchPosition);

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
	let curTime = Date.now();
	let dt = (curTime - lastTime) / 1000;

	controllers.forEach(controller => {
		controller.update(dt, mousePosition);
	});
	
	lastTime = curTime;
}

function render() {
	controllers.forEach(controller => {
		controller.render();
	});
}

function updateMousePosition(evt) {
	mousePosition = {x: evt.clientX, y: evt.clientY};
}

function updateTouchPosition(evt) {
	mousePosition = {x: evt.touches[0].clientX, y: evt.touches[0].clientY};
	evt.preventDefault();
}

init();