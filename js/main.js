import DrawController from './draw-controller.js';
import EpicyclesController from './epicycles-controller.js';
import WaveController from './wave-controller.js';

let lastTime;
let controllers;
let mousePosition;

function init() {
	lastTime = Date.now();
	controllers = [];

	let drawZone, circles, epicycles, waves;
	if (hasElement('drawzone')) {
		drawZone = new DrawController('drawzone', 500, 500);
		window.drawZone = drawZone;
		controllers.push(drawZone);
	}
	if (hasElement('plaincircles')) {
		circles = new EpicyclesController('plaincircles', 500, 500);
		circles.animate = false;
		if (drawZone) {
			drawZone.onDrawingStart.push(() => circles.setPath([]));
			drawZone.onDrawingEnd.push(() => circles.setPath(drawZone.path));
		}
		controllers.push(circles);
	}
	if (hasElement('circlezone')) {
		epicycles = new EpicyclesController('circlezone', 500, 500);
		if (drawZone) {
			drawZone.onDrawingStart.push(() => epicycles.setPath([]));
			drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path));
		}
		controllers.push(epicycles);
	}
	if (hasElement('wave')) {
		waves = new WaveController('wave', 500, 500);
		controllers.push(waves);
	}

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

function hasElement(id) {
	return document.getElementById(id) != null;
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