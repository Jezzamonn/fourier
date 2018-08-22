import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import ComplexSinusoidController from './controller/complex-sinusoid-controller.js';
import Conductor from './conductor.js';
import { titlePoints } from './title-points.js';
import WaveController from './controller/wave-controller.js';
import SquareWaveSplitController from './controller/square-wave-split-controller.js';
import { getWave, squareWave } from './wave-things.js';

let conductor = null;

function init() {
	let drawZone;
	let controllers = [];
	if (hasElement('drawzone')) {
		drawZone = new DrawController('drawzone', 500, 500);
		window.drawZone = drawZone;
		controllers.push(drawZone);
	}
	if (hasElement('plaincircles')) {
		let circles = new EpicyclesController('plaincircles', 500, 500);
		circles.animate = false;
		if (drawZone) {
			drawZone.onDrawingStart.push(() => circles.setPath([]));
			drawZone.onDrawingEnd.push(() => circles.setPath(drawZone.path));
		}
		controllers.push(circles);
	}
	if (hasElement('circlezone')) {
		let epicycles = new EpicyclesController('circlezone', 500, 500);
		if (drawZone) {
			drawZone.onDrawingStart.push(() => epicycles.setPath([]));
			drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path));
		}
		controllers.push(epicycles);
	}
	if (hasElement('complexsinusoid')) {
		let controller = new ComplexSinusoidController('complexsinusoid', 500, 500);
		controllers.push(controller);
	}
	if (hasElement('wave')) {
		let controller = new WaveController('wave', 500, 500);
		controllers.push(controller);
	}
	if (hasElement('squarewavesplit')) {
		let controller = new SquareWaveSplitController('squarewavesplit', 500, 500);
		controller.setPath(getWave(t => Math.sin(2 * Math.PI * t) + Math.sin(6 * Math.PI * t), 128));
		controllers.push(controller);
	}
	if (hasElement('fouriertitle')) {
		let fourierTitle = new EpicyclesController('fouriertitle', 500, 500);
		fourierTitle.setPath(
			titlePoints.map(p => {
				return {x: p.x * 0.9, y: p.y * 0.9}
			}));
		fourierTitle.period = 15;
		controllers.push(fourierTitle);
	}

	conductor = new Conductor(controllers);
	conductor.start();
}

function hasElement(id) {
	return document.getElementById(id) != null;
}

init();