import CircleThing, {dataLength} from './circle-thing.js';
import Pencil from './pencil.js';
import CanvasController from '../canvas-controller.js';

let State = Object.freeze({
    handDrawing: 1,
    handMovingAway: 2,
    circlesDrawing: 3,
    circlesFading: 4,
    windowMove: 5,
});
let handMoveTime = 60 * 0.8;
let circleFadeTime = 180 * 0.8;
let windowMoveTime = 60;

export default class SelfDrawController extends CanvasController {

	constructor(id, width, height) {
        super(id, width, height);
        
        this.circleThing = new CircleThing();
        this.pencil = new Pencil();

        this.state = State.handDrawing;
        this.animCount = 0;
    }

    update() {
        switch (this.state) {
            case State.handDrawing: {

                this.circleThing.drawMore(0.7 * this.circleThing.totalPathLength / dataLength);
                let drawPoint = this.circleThing.getDrawPosition();
                this.pencil.x = drawPoint.x;
                this.pencil.y = drawPoint.y;

                if (this.circleThing.pathLength > this.circleThing.totalPathLength) {
                    this.state = State.handMovingAway;
                    this.animCount = 0;
                }

                break;
            }
            case State.handMovingAway: {

                let drawPoint = this.circleThing.getDrawPosition();
                this.animCount ++;
                let amt = this.animCount / handMoveTime;
                amt = easeInOut(amt, 2);
                this.pencil.alpha = (1 - amt);
                this.pencil.x = slurp(drawPoint.x, -500, amt);
                this.pencil.y = slurp(drawPoint.y, -100, amt);

                if (this.animCount > handMoveTime) {
                    this.state = State.circlesDrawing;
                    this.animCount = 0;
                    this.pencil.alpha = 1;
                }

                break;
            }
            case State.circlesDrawing: {

                this.circleThing.addDrawPoint();
                this.circleThing.rotateAll(1);
                this.circleThing.alpha = 1;
                this.animCount ++;

                if (this.circleThing.drawnPoints.length > dataLength) {
                    this.state = State.circlesFading;
                    this.circleThing.drawnPoints = [];
                    this.pencil.moveToCirclePosition();

                    this.animCount = 0;
                }

                break;
            }
            case State.circlesFading: {

                this.circleThing.rotateAll(1);
                this.animCount ++;
                let amt = this.animCount / circleFadeTime;
                amt = easeInOut(amt, 2);
                this.circleThing.alpha = 1 - amt;

                if (this.animCount > circleFadeTime) {
                    this.state = State.windowMove;
                    this.animCount = 0;
                    this.circleThing.pathLength = 0;
                    this.circleThing.reset();
                    this.circleThing.alpha = 1;

                    this.pencil.x = this.pencil.circlePosX;
                    this.pencil.y = this.pencil.circlePosY;
                }

                break;
            }
            case State.windowMove: {

                this.animCount ++;
                let amt = this.animCount / windowMoveTime;
                amt = easeInOut(amt, 2);
                this.pencil.x = slurp(this.pencil.circlePosX, 0, amt);
                this.pencil.y = slurp(this.pencil.circlePosY, 0, amt);

                if (this.animCount > windowMoveTime) {
                    this.animCount = 0;
                    this.state = State.handDrawing;
                }

                break;
            }
        }
    }

    render() {
        this.clear();

        const context = this.context;
        const xOffset = 0.66 * this.width;
        const yOffset = 0.5 * this.height;
        const scale = 1;
        switch (this.state) {
            case State.handDrawing:

                this.circleThing.render(context, xOffset, yOffset, scale);
                this.pencil.render(context, xOffset, yOffset, scale);

                break;
            case State.handMovingAway:

                this.circleThing.render(context, xOffset, yOffset, scale);
                this.pencil.render(context, xOffset, yOffset, scale);

                break;
            case State.circlesDrawing:

                this.circleThing.render(context, xOffset, yOffset, scale);

                break;
            case State.circlesFading:

                this.pencil.render(context, xOffset, yOffset, scale);
                this.circleThing.render(context, xOffset, yOffset, scale);

                break;

            case State.windowMove:

                this.pencil.render(context, xOffset, yOffset, scale);

                break;
        }
    }
}

function easeInOut(t, amt=2) {
    let tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}
