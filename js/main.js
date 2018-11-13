import DrawController from './controller/draw-controller.js';
import EpicyclesController from './controller/epicycles-controller.js';
import ComplexSinusoidController from './controller/complex-sinusoid-controller.js';
import Conductor from './conductor.js';
import { titlePoints } from './points/title-points.js';
import WaveController from './controller/wave-controller.js';
import WaveSplitController from './controller/wave-split-controller.js';
import { getWave, squareWave } from './wave-things.js';
import SkewedSinusoidController from './controller/skewed-sinusoid-controller.js';
import WaveDrawController from './controller/wave-draw-controller.js';
import RangeController from './controller/range-controller.js';
import { peaceHandPoints } from './points/peace-hand-points.js';
import SkewedPathController from './controller/skewed-path-controller.js';
import { mePoints } from './points/me-points.js';
import ImageSwapController from './controller/image-swap-controller.js';
import { loopLikeAJpeg } from './jpeg.js';
import ImageBuildUpController from './controller/image-build-up-controller.js';
import JpegCompressorController from './controller/jpeg-compressor-controller.js';
import { playSoundWave } from './synth.js';

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
		controller.setPath(getWave(t => Math.sin(2 * Math.PI * t) + 0.5 * Math.sin(6 * Math.PI * t), 128));
		controllers.push(controller);
	}
	if (hasElement('combo-sine-wave-split')) {
		let controller = new WaveSplitController('combo-sine-wave-split');
		controller.setPath(getWave(t => Math.sin(2 * Math.PI * t) + 0.5 * Math.sin(6 * Math.PI * t), 128));
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
		squareWaveBuildUpSlider = new RangeController('square-wave-build-up-slider');
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
	if (hasElement('wave-draw-instruction')) {
		const instruction = document.getElementById('wave-draw-instruction');
		if (waveDrawController) {
			waveDrawController.onDrawingStart.push(() => instruction.classList.add('hidden'))
		}
	}
	if (hasElement('wave-draw-slider')) {
		waveDrawSliderController = new RangeController('wave-draw-slider');
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

	if (hasElement('together-button')) {
		const button = document.getElementById('together-button');
		button.addEventListener('click', () => playSoundWave([220, 660]));
	}
	if (hasElement('split-button-1')) {
		const button = document.getElementById('split-button-1');
		button.addEventListener('click', () => playSoundWave([660]));
	}
	if (hasElement('split-button-2')) {
		const button = document.getElementById('split-button-2');
		button.addEventListener('click', () => playSoundWave([220]));
	}
	
	if (hasElement('complex-sinusoid')) {
		let controller = new SkewedSinusoidController('complex-sinusoid');
		controllers.push(controller);
	}
	if (hasElement('complex-sinusoid-turn')) {
		let controller = new ComplexSinusoidController('complex-sinusoid-turn');
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
		peaceBuildUpSlider = new RangeController('peace-build-up-slider');
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
	if (hasElement('draw-zone-instruction')) {
		const instruction = document.getElementById('draw-zone-instruction');
		if (drawZone) {
			drawZone.onDrawingStart.push(() => instruction.classList.add('hidden'))
		}
	}
	if (hasElement('draw-zone-undo-button')) {
		const undoButton = document.getElementById('draw-zone-undo-button');
		if (drawZone) {
			undoButton.addEventListener('click', () => drawZone.undo());
		}
	}
	if (hasElement('circle-zone-slider')) {
		circleZoneSlider = new RangeController('circle-zone-slider');
		circleZoneSlider.animate = false;
		controllers.push(circleZoneSlider);
	}
	if (hasElement('circle-zone')) {
		let epicycles = new EpicyclesController('circle-zone');
		epicycles.animatePathAmt = false;
		if (drawZone) {
			drawZone.onDrawingStart.push(() => epicycles.setPath([]));
			drawZone.onDrawingEnd.push(() => epicycles.setPath(drawZone.path, 1024));
			// Reset the slider back to 1 to draw the full shape when it changes.
			if (circleZoneSlider) {
				drawZone.onDrawingStart.push(() => {
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

	if (hasElement('img-x-component')) {
		let controller = new ImageSwapController('img-x-component');
		const imageSrcs = [];
		for (let i = 0; i < 8; i ++) {
			imageSrcs.push('img/components-0-' + i + '.png');
		}
		controller.imageSrcs = imageSrcs;
		controllers.push(controller);
	}
	if (hasElement('img-y-component')) {
		let controller = new ImageSwapController('img-y-component');
		const imageSrcs = [];
		for (let i = 0; i < 8; i ++) {
			imageSrcs.push('img/components-' + i + '-0.png');
		}
		controller.imageSrcs = imageSrcs;
		controllers.push(controller);
	}
	if (hasElement('img-x-y-component')) {
		let controller = new ImageSwapController('img-x-y-component');
		const imageSrcs = [];
		for (let i = 0; i < 8; i ++) {
			imageSrcs.push('img/components-' + i + '-' + i + '.png');
		}
		controller.imageSrcs = imageSrcs;
		controllers.push(controller);
	}

	let letterBuildUpController;
	if (hasElement('letter-buildup')) {
		letterBuildUpController = new ImageSwapController('letter-buildup');
		const imageSrcs = [];
		for (let [y, x] of loopLikeAJpeg(8)) {
			imageSrcs.push('img/img-buildup-' + x + '-' + y + '.png');
		}
		letterBuildUpController.imageSrcs = imageSrcs;
		controllers.push(letterBuildUpController);
	}
	if (hasElement('letter-buildup-components')) {
		let controller = new ImageBuildUpController('letter-buildup-components', letterBuildUpController);
		controllers.push(controller);
	}
	if (hasElement('jpeg-example')) {
		let controller = new JpegCompressorController('jpeg-example');
		controllers.push(controller);
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