import { elementInView, getScrollPosition } from "./controller-util";
import { clamp, slurp } from "../util";

export default class ImageSwapController {

	constructor(id) {
        this.id = id;
        this.imageSrcs = [];

        this.img = document.getElementById(id);
    }

	update() {
        if (this.imageSrcs.length == 0) {
            return;
        }
        const pos = getScrollPosition(this.img);
        const posAmt = clamp(slurp(1.2, -0.2, pos), 0, 1);
        const index = clamp(Math.floor(this.imageSrcs.length * posAmt), 0, this.imageSrcs.length - 1);

        this.img.src = this.imageSrcs[index];
    }

    isOnScreen() {
        return elementInView(this.img);
    }

	render() {
        // yeah nothing
    }

}