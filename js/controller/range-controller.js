import { slurp, easeInOut } from "../util";

export default class RangeController {

	constructor(id) {
        this.id = id;
        this.slider = document.getElementById(id);

        this.onValueChange = [];

        this.holdValueCount = 0;
        /**
         * How long to pause on the value the person set before continuing
         */
        this.holdValueLength = 10;
        this.heldValue = 0;

        this.resumeCount = 0;
        /**
         * Time to transition back to being controller automatically
         */
        this.resumeLength = 2;

        this.animate = true;
        this.animAmt = 0;
        this.period = 10;

        this.slider.oninput = () => this.holdValue();
    }

    update(dt, mousePosition) {
        if (!this.animate) {
            return;
        }
        if (this.holdValueCount > 0) {
            this.holdValueCount -= dt;
            // Just set it back to zero to be clean about it.
            if (this.holdValueCount <= 0) {
                this.holdValueCount = 0;
            }
            // we're going to return here so we don't mangle the value of the slider
            return;
        }
        else if (this.resumeCount > 0) {
            this.resumeCount -= dt;
            if (this.resumeCount <= 0) {
                this.resumeCount = 0;
            }
        }

        // Goes from 0 to 1 as stuff resumes.
        const resumeAmt = 1 - (this.resumeCount / this.resumeLength);
        const easedResumeAmt = easeInOut(resumeAmt, 3);
        // Multiply by the resume amt to slow it down
        this.animAmt += easedResumeAmt * dt / this.period;
        this.animAmt %= 1;

        const sinePos = 0.5 * Math.cos(2 * Math.PI * this.animAmt) + 0.5;
        this.slider.value = sinePos;
        this.onValueChange.forEach(fn => fn(this.slider.value));
    }

    isOnScreen() {
        return true;
    }

    render() {
        // nothing.
    }

    holdValue() {
        this.holdValueCount = this.holdValueLength;
        this.resumeCount = this.resumeLength;
        this.heldValue = this.slider.value;
        // Calculate what the anim amt should be.
        this.animAmt = Math.acos(2 * this.heldValue - 1) / (2 * Math.PI);

        this.onValueChange.forEach(fn => fn(this.slider.value));
    }


}
