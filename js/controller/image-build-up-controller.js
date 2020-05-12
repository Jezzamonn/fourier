import { loopLikeAJpeg } from "../jpeg";
import Controller from "./controller";

export default class ImageBuildUpController extends Controller {

    constructor(id, imageSwapController) {
        super();
        this.container = document.getElementById(id);
        this.swapController = imageSwapController;
    }

    update() {
        const jpegRange = loopLikeAJpeg(8);
        for (let i = 0; i < this.container.children.length; i ++) {
            const [y, x] = jpegRange[i];
            const index = 8 * y + x;
            const component = this.container.children[index];
            if (i <= this.swapController.index) {
                component.classList.remove('hidden');
            }
            else {
                component.classList.add('hidden');
            }
        }
    }

}