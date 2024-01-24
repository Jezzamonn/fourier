import { elementInView, getScrollPosition } from './controller-util.js';
import { clamp, slurp, divideInterval } from '../util.js';
import Controller from './controller.js';
import ImageSwapController from './image-swap-controller.js';

export default class ImageMultController extends Controller {

    /**
     * @param {string} id
     * @param {!ImageSwapController} multXController
     * @param {!ImageSwapController} multYController
     */
    constructor(id, multXController, multYController) {
        super();
        this.id = id;
        this.imageSrcs = [];

        this.img = document.getElementById(id);
        this.index = 0;

        this.multXController = multXController;
        this.multYController = multYController;
    }

    update() {
        if (this.multXController == null || this.multYController == null) {
            return;
        }
        this.xIndex = this.multXController.index + 1;
        this.yIndex = this.multYController.index + 1;

        this.img.src = `img/components-${this.yIndex}-${this.xIndex}.png`;
    }

    isOnScreen() {
        return elementInView(this.img);
    }

}