import { elementInView, getScrollPosition } from "./controller-util";
import { clamp, slurp, divideInterval } from "../util";
import imageCompression from 'browser-image-compression';

const originalImageSrc = "img/cat.png"

export default class JpegCompressorController {

	constructor(id) {
        this.id = id;
        this.imageSrcs = [];

        const div = document.getElementById(id);
        this.img = div.getElementsByTagName('img')[0];

        this.baseImage = null;
        this.canvas = null;
        this.context = null;

        // TODO: Just write my own loadImage function instead of using this library.
        imageCompression.loadImage(originalImageSrc).then(img => {
            this.baseImage = img;
            this.canvas = document.createElement('canvas');
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.context = this.canvas.getContext('2d');
        });
    }

	update() {
        if (!this.baseImage) {
            return;
        }
        const pos = 1 - getScrollPosition(this.img);
        let posAmt = clamp(divideInterval(pos, 0.4, 0.7), 0, 1);
        posAmt *= posAmt;

        this.context.drawImage(this.baseImage, 0, 0);
        const dataUrl = this.canvas.toDataURL('image/jpeg', posAmt);
        this.img.src = dataUrl;
    }

    isOnScreen() {
        return elementInView(this.img);
    }

	render() {
        // yeah nothing
    }

}