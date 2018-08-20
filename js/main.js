import DrawController from './draw-controller.js';
import EpicyclesController from './epicycles-controller.js';
import WaveController from './wave-controller.js';
import Conductor from './conductor.js';

let conductor = null;

function init() {
	let drawZone, circles, epicycles, waves;
	let controllers = [];
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

	conductor = new Conductor(controllers);
	conductor.start();
}

function hasElement(id) {
	return document.getElementById(id) != null;
}

init();