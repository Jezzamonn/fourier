import Controller from "../controller";
import { to2dIsometric, easeInOut, sinEaseInOut, slurp } from "../util";
import { palette } from "../color";

const transitionFactor = (1 / 18);

export default class ComplexSinusoidController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
        // Functions so that they can be overridden elsewhere.
        this.xzAngleFn = () => this.xzAngle;
        this.yAngleFn = () => 0;
        this.radius = 0.2 * this.height;
        this.length = 0.7 * this.width;
        this.xzAngle = 0;
    }

	update(dt, mousePosition) {
        const period = 7;
        this.animAmt += dt / period;
        this.animAmt %= 1;

        const pos = this.getScrollPosition();
        let desiredAngle = 0;
        if (pos < 0.5) {
            desiredAngle = Math.PI / 2;
        }
        this.xzAngle += transitionFactor * (desiredAngle - this.xzAngle);
    }

	render() {
        this.clear();
        this.renderWave();
    }

    renderWave() {
        this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
        this.context.beginPath();
        this.context.strokeStyle = palette.blue;
        this.context.lineWidth = 2;

    
        const xzAngle = this.xzAngleFn(this.animAmt);
        const yAngle = this.yAngleFn(this.animAmt);
        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const x = this.length * (amt - 0.5);
            const y = this.radius * Math.sin(2 * Math.PI * (3 * amt - 4 * this.animAmt));
            const z = this.radius * Math.cos(2 * Math.PI * (3 * amt - 4 * this.animAmt));


            const points = to2dIsometric(x, y, z, xzAngle, yAngle);
            if (amt == 0) {
                this.context.arc(points.x, points.y, 3, 0, 2 * Math.PI);
            }
            if (i == 0) {
                this.context.moveTo(points.x, points.y);
            }
            else {
                this.context.lineTo(points.x, points.y);
            }
        }

        this.context.stroke();
    }

}