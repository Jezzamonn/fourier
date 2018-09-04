import Controller from "../controller";
import { to2dIsometric, easeInOut, sinEaseInOut, slurp } from "../util";
import ComplexSinusoidController from "./complex-sinusoid-controller";
import { renderBoundingCube } from "./render-cube";

export default class SkewedSinusoidController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);

        this.xzAngle = Math.PI / 4;
        this.yAngle = -Math.PI / 6;
        
        this.sinusoidController = new ComplexSinusoidController(id, width, height);
		this.sinusoidController.xzAngleFn = () => this.xzAngle;
		this.sinusoidController.yAngleFn = () => this.yAngle;
    }

	update(dt, mousePosition) {
        this.sinusoidController.update(dt, mousePosition);
    }

	render() {
        this.clear();
        this.sinusoidController.renderWave();

        const halfHeight = this.sinusoidController.radius;
        const halfWidth = 0.5 * this.sinusoidController.length;
        const halfDepth = this.sinusoidController.radius;
        renderBoundingCube(
            this.context,
            -halfWidth, halfWidth,
            -halfHeight, halfHeight,
            -halfDepth, halfDepth,
            this.xzAngle, this.yAngle)
    }
}