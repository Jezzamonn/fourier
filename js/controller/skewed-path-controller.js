import Controller from "../controller";
import { to2dIsometric, slurp, sinEaseInOut } from "../util";
import { renderBoundingCube } from "./render-cube";

export default class SkewedPathController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);

        // Somehow in creating this it became backwards from what I was thinking so I just flipped the angle
        this.xzAngle = -3 * Math.PI / 4;
        this.yAngle = -Math.PI / 6;

        this.path = [];
        this.length = 0.7 * this.width;
        this.minX = -0.5 * this.length;
        this.maxX = 0.5 * this.length;
        this.minY = 0;
        this.maxY = 0;
        this.minZ = 0;
        this.maxZ = 0;

        this.animAmt = 0;
        this.period = 4;

        this.tiltAmt = 0;
        this.tiltPeriod = 10;
        // Actually half the range but close enough
        this.tiltRange = 0.05;
    }

    setPath(path) {
        this.path = path.map(p => {
            return {x: p.x - this.width / 2, y: p.y - this.height / 2}
        });
        this.minY = Math.min(...this.path.map(p => p.y));
        this.maxY = Math.max(...this.path.map(p => p.y));
        this.minZ = Math.min(...this.path.map(p => p.x));
        this.maxZ = Math.max(...this.path.map(p => p.x));
    }

	update(dt, mousePosition) {
        this.animAmt += dt / this.period;
        this.animAmt %= 1;

        this.tiltAmt += dt / this.tiltPeriod;
        this.tiltAmt %= 1;

        let xzAngleDiff = slurp(-this.tiltRange, this.tiltRange, sinEaseInOut(2 * this.tiltAmt));
        this.xzAngle = (-0.75 + xzAngleDiff) * Math.PI;
    }

	render() {
        this.clear();
        // Render points
        this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
        this.renderPath(this.minX, this.maxX);
        this.context.globalAlpha = 0.2;
        this.renderPath(this.maxX, this.maxX);
        this.context.globalAlpha = 1;

        // Gimme that bounding box
        renderBoundingCube(
            this.context,
            this.minX, this.maxX,
            this.minY, this.maxY,
            this.minZ, this.maxZ,
            this.xzAngle, this.yAngle);
    }

    renderPath(minX, maxX) {
        let startXAmt = -this.animAmt;
        let startI = 0;
        // The wavelength relative to the bounding box can be configured by the constant here.
        const step = 0.5 / (this.path.length);
        while (startXAmt < 0) {
            startXAmt += step;
            startI ++;
        }

        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;
        for (let xAmt = startXAmt, i = startI; xAmt <= 1 + step; xAmt += step, i ++) {
            const index = i % this.path.length;

            const x = slurp(minX, maxX, xAmt);
            const pathPoint = this.path[index];
            const screenPoint = to2dIsometric(
                x,
                pathPoint.y,
                pathPoint.x,
                this.xzAngle, this.yAngle);

            if (i == 0) {
                this.context.moveTo(screenPoint.x, screenPoint.y);
            }
            else {
                this.context.lineTo(screenPoint.x, screenPoint.y);
            }
        }
        this.context.stroke();
    }
}