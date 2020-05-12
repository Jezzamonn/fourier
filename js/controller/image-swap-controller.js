import { elementInView, getScrollPosition } from "./controller-util";
import { clamp, slurp, divideInterval } from "../util";
import Controller from "./controller";

export default class ImageSwapController extends Controller {

    constructor(id) {
        super();
        this.id = id;
        this.imageSrcs = [];

        this.img = document.getElementById(id);
        this.index = 0;

        this.minY = 0.2;
        this.maxY = 0.8;

        this.scrollFocus = this.img;
    }

    update() {
        if (this.imageSrcs.length == 0) {
            return;
        }
        const pos = 1 - getScrollPosition(this.scrollFocus);
        const posAmt = clamp(divideInterval(pos, this.minY, this.maxY), 0, 1);
        this.index = clamp(Math.floor(this.imageSrcs.length * posAmt), 0, this.imageSrcs.length - 1);

        this.img.src = this.imageSrcs[this.index];
    }

    isOnScreen() {
        return elementInView(this.scrollFocus);
    }

}