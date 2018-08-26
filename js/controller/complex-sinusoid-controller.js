import Controller from "../controller";
import { to2dIsometric, easeInOut, sinEaseInOut } from "../util";

export default class ComplexSinusoidController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
        this.xzAngleFn = () => 0;
        this.yAngleFn = () => 0;
    }

	update(dt, mousePosition) {
        const period = 7;
        this.animAmt += dt / period;
        this.animAmt %= 1;
    }

	render() {
        this.clear();
        this.renderWave();
    }

    renderWave() {
        this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;

    
        const xzAngle = this.xzAngleFn(this.animAmt);
        const yAngle = this.yAngleFn(this.animAmt);
        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const spiralRadius = 0.2 * this.height;
            const x = 0.7 * this.width * (amt - 0.5);
            const y = spiralRadius * Math.sin(2 * Math.PI * (3 * amt - 4 * this.animAmt));
            const z = spiralRadius * Math.cos(2 * Math.PI * (3 * amt - 4 * this.animAmt));


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

    lineTo3d(context, x, y, z, xzAngle=0, yAngle=0) {
        const points = to2dIsometric(x, y, z, xzAngle, yAngle);
        context.lineTo(points.x, points.y);
    }

}