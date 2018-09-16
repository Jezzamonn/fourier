import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import ComplexSinusoidController from './controller/complex-sinusoid-controller.js';
import Conductor from './conductor.js';
import { titlePoints } from './points/title-points.js';
import WaveController from './controller/wave-controller.js';
import WaveSplitController from './controller/wave-split-controller.js';
import { getWave, squareWave } from './wave-things.js';
import { easeInOut, sinEaseInOut } from './util.js';
import SkewedSinusoidController from './controller/skewed-sinusoid-controller.js';
import WaveDrawController from './controller/wave-draw-controller.js';
import RangeController from './controller/range-controller.js';
import { peaceHandPoints } from './points/peace-hand-points.js';
import SkewedPathController from './controller/skewed-path-controller.js';
import { mePoints } from './points/me-points.js';

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
				controller.splitAnim = true;
				controller.setPath([]);
			});
			waveDrawController.onDrawingEnd.push(() => {
				controller.splitAnim = true;
				controller.setPath(waveDrawController.normPath);
			});
			// Reset the slider back to 1 when the wave changes to draw the full wave.
			if (waveDrawSliderController) {
				waveDrawController.onDrawingStart.push(() => waveDrawSliderController.slider.value = 1);
				waveDrawController.onDrawingEnd.push(() => waveDrawSliderController.slider.value = 1);
			}
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
	
	let drawZone, circleZoneSlider;
	if (hasElement('draw-zone')) {
		drawZone = new DrawController('draw-zone');
		controllers.push(drawZone);
	}
	if (hasElement('circle-zone-slider')) {
		circleZoneSlider = new RangeController('circle-zone-slider', 500);
		circleZoneSlider.animate = false;
		controllers.push(circleZoneSlider);
	}
	if (hasElement('circle-zone')) {
		let epicycles = new EpicyclesController('circle-zone');
		if (drawZone) {
			drawZone.onDrawingStart.push(() => epicycles.setPath([]));
			drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path, 1024));
			// Reset the slider back to 1 to draw the full shape when it changes.
			if (circleZoneSlider) {
				drawZone.onDrawingStart.push(() => {
					circleZoneSlider.slider.value = 1;
					epicycles.setFourierAmt(1);
				});
				drawZone.onDrawingEnd.push(() => {
					circleZoneSlider.slider.value = 1;
					epicycles.setFourierAmt(1);
				});
			}
		}
		if (circleZoneSlider) {
			circleZoneSlider.onValueChange.push(val => epicycles.setFourierAmt(val));
		}
		controllers.push(epicycles);
	}

	if (hasElement('its-meee')) {
		let controller = new EpicyclesController('its-meee');
		controller.setPath(mePoints, 256, 0.1);
		controllers.push(controller);
	}

	conductor = new Conductor(controllers);
	conductor.start();
}

function hasElement(id) {
	return document.getElementById(id) != null;
}

/**
 * Configure the canvases to be able to handle screens with higher dpi.
 * 
 * We can only call this once because after that, the width has changed!
 */
function updateCanvasSizes() {
	const pixelRatio = window.devicePixelRatio || 1;
	const canvases = document.getElementsByTagName("canvas");
	for (let canvas of canvases) {
		const width = canvas.width;
		const height = canvas.height;
		canvas.width = width * pixelRatio;
		canvas.height = height * pixelRatio;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	}
}

// updateCanvasSizes();
init();