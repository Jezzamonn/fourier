export default class ImageSwapController {

	constructor(id) {
        this.id = id;
        this.imageSrcs = [];

        // temp debug thing
        this.currentImage = 0;
        this.swapCount = 0;

        this.img = document.getElementById(id);
    }

	update() {
        if (this.imageSrcs.length == 0) {
            return;
        }
        this.swapCount ++;
        if (this.swapCount > 10) {
            this.swapCount = 0;
            this.img.src = this.imageSrcs[this.currentImage];
            this.currentImage ++;
            this.currentImage %= this.imageSrcs.length;
        }
    }

    isOnScreen() {
        // sure
        return true;
    }

	render() {
        // yeah nothing
    }

}