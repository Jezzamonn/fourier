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
import WaveSamplesController from './controller/wave-samples-controller.js';
import HeadingController from './controller/heading-controller.js';
import WaveFrequenciesController from './controller/wave-frequencies-controller.js';
import SelfDrawController from './controller/self-draw/self-draw-controller.js';
import ImageMultController from './controller/image-mult-controller.js';
import { getScrollPosition } from './controller/controller-util.js';

let conductor = null;

function init() {

	let controllers = [];

	if (hasElement('header-background')) {
		let controller = new HeadingController('header-background');
		controllers.push(controller);
	}

	if (hasElement('self-draw')) {
		let controller = new SelfDrawController('self-draw');
		controllers.push(controller);
	}

	const comboWave = getWave(t => Math.sin(2 * Math.PI * t) + 0.5 * Math.sin(6 * Math.PI * t), 128);
	if (hasElement('combo-sine-wave')) {
		let controller = new WaveController('combo-sine-wave');
		// Here we stretch out the wave to make it look nicer. Kind of lazy but w/e.
		controller.setPath(comboWave.map(t => 2 * t));
		controllers.push(controller);
	}
	if (hasElement('combo-sine-wave-split')) {
		let controller = new WaveSplitController('combo-sine-wave-split');
		controller.setPath(comboWave);
		controller.fadeFrequencies = false;
		controllers.push(controller);
	}

	if (hasElement('together-button')) {
		const button = document.getElementById('together-button');
		button.addEventListener('click', () => playSoundWave(t => Math.sin(2 * Math.PI * t) + 0.5 * Math.sin(6 * Math.PI * t)));
	}
	if (hasElement('split-button-1')) {
		const button = document.getElementById('split-button-1');
		button.addEventListener('click', () => playSoundWave(t => 0.5 * Math.sin(6 * Math.PI * t)));
	}
	if (hasElement('split-button-2')) {
		const button = document.getElementById('split-button-2');
		button.addEventListener('click', () => playSoundWave(t => Math.sin(2 * Math.PI * t)));
	}

	if (hasElement('square-wave')) {
		let controller = new WaveController('square-wave');
		controller.setPath(getWave(squareWave, 128));
		controllers.push(controller);
	}

	let squareWaveSplitController;
	if (hasElement('square-wave-split')) {
		squareWaveSplitController = new WaveSplitController('square-wave-split');
		squareWaveSplitController.setPath(getWave(squareWave, 256));
		controllers.push(squareWaveSplitController);
	}

	let squareWaveBuildUpController;
	if (hasElement('square-wave-build-up')) {
		squareWaveBuildUpController = new WaveSplitController('square-wave-build-up');
		squareWaveBuildUpController.setPath(getWave(squareWave, 128));
		squareWaveBuildUpController.splitAnim = false;
		controllers.push(squareWaveBuildUpController);
	}
	if (hasElement('square-wave-build-up-slider')) {
		const slider = new RangeController('square-wave-build-up-slider');
		if (squareWaveBuildUpController) {
			slider.onValueChange.push(val => squareWaveBuildUpController.fourierAmt = val);
		}
		controllers.push(slider);
	}
	if (hasElement('square-wave-button')) {
		const button = document.getElementById('square-wave-button');
		if (squareWaveBuildUpController) {
			button.addEventListener('click', () => playSoundWave(squareWaveBuildUpController.partialWave));
		}
	}

	let waveDrawController, waveDrawSliderController, waveDrawButton, waveDrawSplitController;
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
		waveDrawSplitController = new WaveSplitController('wave-draw-split');
		if (waveDrawController != null) {
			waveDrawController.onDrawingStart.push(() => {
				waveDrawSplitController.splitAnim = true;
				waveDrawSplitController.setPath([]);
			});
			waveDrawController.onDrawingEnd.push(() => {
				waveDrawSplitController.splitAnim = true;
				waveDrawSplitController.setPath(waveDrawController.normPath);
			});
			// Reset the slider back to 1 when the wave changes to draw the full wave.
			if (waveDrawSliderController) {
				waveDrawController.onDrawingStart.push(() => waveDrawSliderController.slider.value = 1);
				waveDrawController.onDrawingEnd.push(() => waveDrawSliderController.slider.value = 1);
			}
		}
		if (waveDrawSliderController != null) {
			waveDrawSliderController.onValueChange.push(val => {
				waveDrawSplitController.fourierAmt = val;
				waveDrawSplitController.splitAnim = false;
			});
		}
		controllers.push(waveDrawSplitController);
	}
	if (hasElement('wave-draw-button')) {
		const button = document.getElementById('wave-draw-button');
		if (button) {
			button.addEventListener('click', () => playSoundWave(waveDrawSplitController.partialWave));
		}
	}

	if (hasElement('wave-samples')) {
		const waveSamplesController = new WaveSamplesController('wave-samples');
		// Initially set it to the square wave
		waveSamplesController.setWave(getWave(squareWave, 256));
		if (waveDrawController) {
			waveDrawController.onDrawingEnd.push(() => {
		        // Map from [0, 1] to [-1, 1]
				waveSamplesController.setWave(waveDrawController.normPath);
			});
		}
		controllers.push(waveSamplesController);
	}
	if (hasElement('wave-frequencies')) {
		const waveFrequenciesController = new WaveFrequenciesController('wave-frequencies');
		// Intially use the frequencies from the square wave
		if (squareWaveSplitController) {
			waveFrequenciesController.setFourierData(squareWaveSplitController.fourierData);
		}
		if (waveDrawSplitController) {
			waveDrawSplitController.onFourierChange.push(() => {
		        // Map from [0, 1] to [-1, 1]
				waveFrequenciesController.setFourierData(waveDrawSplitController.fourierData);
			});
		}
		controllers.push(waveFrequenciesController);
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
		if (hasElement('circle-zone-download-button')) {
			const downloadButton = document.getElementById('circle-zone-download-button');
			downloadButton.addEventListener('click', () => {
				epicycles.jsonData();
				var jsonData = "data:text/json;charset=utf-8,"+JSON.stringify(epicycles.data);
				var downloadElem = document.getElementById('download-elem');
				downloadElem.setAttribute("href", jsonData);
				downloadElem.setAttribute("download", "fourier-data.json");
				// console.log(jsonData);
			});
		}
		controllers.push(epicycles);
	}

	if (hasElement('fourier-title')) {
		let fourierTitle = new EpicyclesController('fourier-title');
		fourierTitle.setPath(
			titlePoints.map(p => {
				return {
					x: p.x * 0.9,
					y: p.y * 0.9 - 40}
			}));
		fourierTitle.period = 15;
		controllers.push(fourierTitle);
	}

	if (hasElement('img-x-component')) {
		let controller = new ImageSwapController('img-x-component');
		const imageSrcs = [];
		for (let i = 1; i < 8; i ++) {
			imageSrcs.push('img/components-0-' + i + '.png');
		}
		controller.imageSrcs = imageSrcs;
		controllers.push(controller);
	}
	if (hasElement('img-y-component')) {
		let controller = new ImageSwapController('img-y-component');
		const imageSrcs = [];
		for (let i = 1; i < 8; i ++) {
			imageSrcs.push('img/components-' + i + '-0.png');
		}
		controller.imageSrcs = imageSrcs;
		controllers.push(controller);
	}

	let imgMultXController, imgMultYController;
	if (hasElement('img-mult-x-component')) {
		imgMultXController = new ImageSwapController('img-mult-x-component');
		const imageSrcs = [];
		for (let i = 1; i < 8; i ++) {
			imageSrcs.push('img/components-0-' + i + '.png');
		}
		imgMultXController.imageSrcs = imageSrcs;
		imgMultXController.maxY = 0.5;
		controllers.push(imgMultXController);
	}
	if (hasElement('img-mult-y-component')) {
		imgMultYController = new ImageSwapController('img-mult-y-component');
		const imageSrcs = [];
		for (let i = 1; i < 8; i ++) {
			imageSrcs.push('img/components-' + i + '-0.png');
		}
		imgMultYController.imageSrcs = imageSrcs;
		imgMultYController.minY = 0.5;
		controllers.push(imgMultYController);
	}
	if (hasElement('img-x-y-component')) {
		let controller = new ImageMultController('img-x-y-component', imgMultXController, imgMultYController);
		controllers.push(controller);
	}

	let letterBuildUpController;
	if (hasElement('letter-buildup-letter')) {
		letterBuildUpController = new ImageSwapController('letter-buildup-letter');
		const imageSrcs = [];
		for (let [y, x] of loopLikeAJpeg(8)) {
			imageSrcs.push('img/img-buildup-' + x + '-' + y + '.png');
		}
		letterBuildUpController.imageSrcs = imageSrcs;
		letterBuildUpController.scrollFocus = document.querySelector('#letter-buildup');
		letterBuildUpController.minY = 0.2;
		letterBuildUpController.maxY = 0.6;
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

	if (hasElement('email-text')) {
		const emailElement = document.getElementById('email-text');
		// Add my email using js so that non-js scrapers can't just get it
		const email = 'fourier' + '@' + 'jezzamon.com';
		const emailText = `<a href="mailto:${email}">${email}</a>`;
		emailElement.innerHTML = emailText;
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