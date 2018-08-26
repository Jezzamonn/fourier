import Controller from "../controller";
import { to2dIsometric, easeInOut, sinEaseInOut, slurp } from "../util";
import ComplexSinusoidController from "./complex-sinusoid-controller";

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
        this.renderBoundingCube();
    }

    renderBoundingCube() {
        const halfHeight = this.sinusoidController.radius;
        const halfWidth = 0.5 * this.sinusoidController.length;
        const halfDepth = this.sinusoidController.radius;

        this.context.beginPath();
        this.context.globalAlpha = 0.1;

        const permutations = [
            [-1, -1],
            [-1,  1],
            [ 1, -1],
            [ 1,  1],
        ]
        for (let [p1, p2] of permutations) {
            // edges along x axis
            this.line3d(
                -halfWidth, p1 * halfHeight, p2 * halfDepth,
                halfWidth, p1 * halfHeight, p2 * halfDepth);
            // along y axis
            this.line3d(
                p1 * halfWidth, -halfHeight, p2 * halfDepth,
                p1 * halfWidth, halfHeight, p2 * halfDepth);
            // along z axis
            this.line3d(
                p1 * halfWidth, p2 * halfHeight, -halfDepth,
                p1 * halfWidth, p2 * halfHeight, halfDepth);
        }

        this.context.stroke();
        this.context.globalAlpha = 1;
    }

    line3d(x1, y1, z1, x2, y2, z2) {
        const startPoint = to2dIsometric(x1, y1, z1, this.xzAngle, this.yAngle);
        const endPoint = to2dIsometric(x2, y2, z2, this.xzAngle, this.yAngle);
        this.context.moveTo(startPoint.x, startPoint.y);
        this.context.lineTo(endPoint.x, endPoint.y);
    }
}