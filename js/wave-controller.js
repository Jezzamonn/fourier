import Controller from "./controller";
import { to2dIsometric, easeInOut, sinEaseInOut } from "./util";

export default class WaveController extends Controller {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.animAmt = 0;
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
        this.context.translate(0, this.context.canvas.height / 2);
        this.context.beginPath();
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1;

    
        for (let i = 0; i < 100; i ++ ) {
            const amt = i / 99;
            const timeAmt = amt + this.animAmt;
            const waveHeight = 0.3 * 0.5 * this.height;
            const x = this.width * amt;
            const y = waveHeight * (Math.sin(2 * Math.PI * timeAmt) + 0.5 * Math.sin(2 * Math.PI * 8 * timeAmt));

            if (i == 0) {
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }

        this.context.stroke();
    }
}