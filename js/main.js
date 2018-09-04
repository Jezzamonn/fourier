import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import ComplexSinusoidController from './controller/complex-sinusoid-controller.js';
import Conductor from './conductor.js';
import { titlePoints } from './title-points.js';
import WaveController from './controller/wave-controller.js';
import WaveSplitController from './controller/wave-split-controller.js';
import { getWave, squareWave } from './wave-things.js';
import { easeInOut, sinEaseInOut } from './util.js';
import SkewedSinusoidController from './controller/skewed-sinusoid-controller.js';
import WaveDrawController from './controller/wave-draw-controller.js';
import RangeController from './controller/range-controller.js';
import { peaceHandPoints } from './peace-hand-points.js';
import SkewedPathController from './controller/skewed-path-controller.js';

let conductor = null;

function init() {

	let controllers = [];

	if (hasElement('fourier-title')) {
		let fourierTitle = new EpicyclesController('fourier-title');
		fourierTitle.setPath(
			titlePoints.map(p => {
				return {x: p.x * 0.9, y: p.y * 0.9 - 40}
			}));
		fourierTitle.period = 15;
		controllers.push(fourierTitle);
	}
	if (hasElement('combo-sine-wave')) {
		let controller = new WaveController('combo-sine-wave');
		controller.setPath(getWave(t => Math.sin(2 * Math.PI * t) + Math.sin(6 * Math.PI * t), 128));
		controllers.push(controller);
	}
	if (hasElement('combo-sine-wave-split')) {
		let controller = new WaveSplitController('combo-sine-wave-split');
		controller.setPath(getWave(t => Math.sin(2 * Math.PI * t) + Math.sin(6 * Math.PI * t), 128));
		controller.fadeFrequencies = false;
		controllers.push(controller);
	}

	if (hasElement('square-wave')) {
		let controller = new WaveController('square-wave');
		controller.setPath(getWave(squareWave, 128));
		controllers.push(controller);
	}
	if (hasElement('square-wave-split')) {
		let controller = new WaveSplitController('square-wave-split');
		controller.setPath(getWave(squareWave, 256));
		controllers.push(controller);
	}

	let squareWaveBuildUpSlider;
	if (hasElement('square-wave-build-up-slider')) {
		squareWaveBuildUpSlider = new RangeController('square-wave-build-up-slider', 500);
		controllers.push(squareWaveBuildUpSlider);
	}
	if (hasElement('square-wave-build-up')) {
		let controller = new WaveSplitController('square-wave-build-up');
		controller.setPath(getWave(squareWave, 128));
		controller.splitAnim = false;
		if (squareWaveBuildUpSlider != null) {
			squareWaveBuildUpSlider.onValueChange.push(val => controller.fourierAmt = val);
		}
		controllers.push(controller);
	}

	let waveDrawController, waveDrawSliderController;
	if (hasElement('wave-draw')) {
		waveDrawController = new WaveDrawController('wave-draw');
		controllers.push(waveDrawController);
	}
	if (hasElement('wave-draw-slider')) {
		waveDrawSliderController = new RangeController('wave-draw-slider', 500);
		waveDrawSliderController.animate = false;
		controllers.push(waveDrawSliderController);
	}
	if (hasElement('wave-draw-split')) {
		let controller = new WaveSplitController('wave-draw-split');
		if (waveDrawController != null) {
			waveDrawController.onDrawingStart.push(() => {
				if (waveDrawSliderController != null) {
					waveDrawSliderController.slider.value = 1;
				}
				controller.splitAnim = true;
				controller.setPath([]);
			});
			waveDrawController.onDrawingEnd.push(() => {
				if (waveDrawSliderController != null) {
					waveDrawSliderController.slider.value = 1;
				}
				controller.splitAnim = true;
				controller.setPath(waveDrawController.normPath);
			});
		}
		if (waveDrawSliderController != null) {
			waveDrawSliderController.onValueChange.push(val => {
				controller.fourierAmt = val;
				controller.splitAnim = false;
			});
		}
		controllers.push(controller);
	}
	
	if (hasElement('complex-sinusoid')) {
		let controller = new SkewedSinusoidController('complex-sinusoid');
		controllers.push(controller);
	}
	if (hasElement('complex-sinusoid-turn')) {
		let controller = new ComplexSinusoidController('complex-sinusoid-turn');
		controller.xzAngleFn = (amt) => -Math.PI / 2 * easeInOut(sinEaseInOut(2 * amt), 4);
		controllers.push(controller);
	}

	const adjustedPeaceHandPoints = peaceHandPoints.map(p => {
		return {x: p.x * 1.5 - 170, y:p.y * 1.5 - 50}
	});
	if (hasElement('peace-epicycles')) {
		let controller = new EpicyclesController('peace-epicycles');
		controller.setPath(adjustedPeaceHandPoints, -1, 0.05);
		controllers.push(controller);
	}
	if (hasElement('peace-3d')) {
		let controller = new SkewedPathController('peace-3d');
		controller.setPath(adjustedPeaceHandPoints, -1, 0.05);
		controllers.push(controller);
	}
	let peaceBuildUpSlider;
	if (hasElement('peace-build-up-slider')) {
		peaceBuildUpSlider = new RangeController('peace-build-up-slider', 500);
		controllers.push(peaceBuildUpSlider);
	}
	if (hasElement('peace-build-up')) {
		let controller = new EpicyclesController('peace-build-up');
		controller.setPath(adjustedPeaceHandPoints, -1, 0.05);
		if (peaceBuildUpSlider) {
			peaceBuildUpSlider.onValueChange.push(val => controller.setFourierAmt(val));
		}
		controllers.push(controller);
	}
	
	let drawZone;
	if (hasElement('draw-zone')) {
		drawZone = new DrawController('draw-zone');
		controllers.push(drawZone);
	}
	if (hasElement('circle-zone')) {
		let epicycles = new EpicyclesController('circle-zone', 500, 500);
		if (drawZone) {
			drawZone.onDrawingStart.push(() => epicycles.setPath([]));
			drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path, 1024));
		}
		controllers.push(epicycles);
	}

	conductor = new Conductor(controllers);
	conductor.start();
}

function hasElement(id) {
	return document.getElementById(id) != null;
}

init();