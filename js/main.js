import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import ComplexSinusoidController from './controller/complex-sinusoid-controller.js';
import Conductor from './conductor.js';
import { titlePoints } from './title-points.js';
import WaveController from './controller/wave-controller.js';
import WaveSplitController from './controller/wave-split-controller.js';
import SquareWaveSplitController from './controller/square-wave-split-controller.js';

let conductor = null;

function init() {
	let drawZone, circles, epicycles, waves, fourierTitle;
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
	if (hasElement('complexsinusoid')) {
		waves = new ComplexSinusoidController('complexsinusoid', 500, 500);
		controllers.push(waves);
	}
	if (hasElement('wave')) {
		waves = new WaveController('wave', 500, 500);
		controllers.push(waves);
	}
	if (hasElement('wavesplit')) {
		waves = new WaveSplitController('wavesplit', 500, 500);
		controllers.push(waves);
	}
	if (hasElement('squarewavesplit')) {
		waves = new SquareWaveSplitController('squarewavesplit', 500, 500);
		controllers.push(waves);
	}
	if (hasElement('fouriertitle')) {
		fourierTitle = new EpicyclesController('fouriertitle', 500, 500);
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