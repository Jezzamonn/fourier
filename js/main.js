import Controller from './controller.js';
import DrawController from './draw-controller.js';

let lastTime;
let controllers;
let mousePosition;

function init() {
	lastTime = Date.now();
	controllers = [];
	controllers.push(new DrawController('canvas'));

	document.addEventListener('mousemove', handleMouseEvent);
	document.addEventListener('mousedown', handleMouseEvent);
	document.addEventListener('mouseup', handleMouseEvent);
	// We can handle these all the same actually.
	document.addEventListener('touchmove', handleTouchEvent);
	document.addEventListener('touchstart', handleTouchEvent);
	document.addEventListener('touchend', handleTouchEvent);

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

function handleMouseEvent(evt) {
	mousePosition = {x: evt.clientX, y: evt.clientY};
}

function handleTouchEvent(evt) {
	mousePosition = {x: evt.touches[0].clientX, y: evt.touches[0].clientY};
	evt.preventDefault();
}

init();