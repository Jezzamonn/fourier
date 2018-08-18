import Controller from "./controller";
import { to2dIsometric } from "./util";

export default class WaveController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
    }

	update(dt, mousePosition) {
        const period = 5;
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
        // for (let i = 0; i < 100; i ++ ) {
        //     let amt = i / 99;
        //     let x = amt;
        //     let y = 0.5 + 0.25 * Math.sin(2 * Math.PI * 2 * (amt + this.animAmt));
        //     let z = 0.5 * amt;

        //     if (i == 0) {
        //         this.context.moveTo(x * this.width, (y - z) * this.height);
        //     }
        //     else {
        //         this.context.lineTo(x * this.width, (y - z) * this.height);
        //     }
        // }

        this.moveTo3d(this.context, -50, -50,  50);
        this.lineTo3d(this.context,  50, -50,  50);
        this.lineTo3d(this.context,  50,  50,  50);
        this.lineTo3d(this.context, -50,  50,  50);
        this.context.closePath();

        this.moveTo3d(this.context, -50, -50, -50);
        this.lineTo3d(this.context,  50, -50, -50);
        this.lineTo3d(this.context,  50,  50, -50);
        this.lineTo3d(this.context, -50,  50, -50);
        this.context.closePath();

        this.context.stroke();
    }
    
    moveTo3d(context, x, y, z) {
        const points = to2dIsometric(x, y, z, 2 * Math.PI * this.animAmt, Math.PI / 6);
        context.moveTo(points.x, points.y);
    }

    lineTo3d(context, x, y, z) {
        const points = to2dIsometric(x, y, z, 2 * Math.PI * this.animAmt, Math.PI / 6);
        context.lineTo(points.x, points.y);
    }

}