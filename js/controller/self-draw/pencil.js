import {data, dataLength} from './circle-thing.js';

let points = [];
let extremeX_X = 0;
let extremeX_Y = 0;
for (let i = 0; i < dataLength; i ++) {
    let sumX = 0;
    let sumY = 0;
    for (let j = 0; j < data.length; j ++) {
        let size = data[j][0];
        let frequency = data[j][1];
        let phase = data[j][2];
        sumX += size * Math.cos(2 * Math.PI * i * frequency + phase);
        sumY += size * Math.sin(2 * Math.PI * i * frequency + phase);
    }
    sumX /= dataLength;
    sumY /= dataLength;

    if (sumX > extremeX_X) {
        extremeX_X = sumX;
        extremeX_Y = sumY;
    }
    points.push({x:sumX, y:sumY});
}
// console.log(points);

export default class Pencil {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
    }

    render(context, xOffset, yOffset, scale) {
        context.beginPath();
        context.globalAlpha = this.alpha;
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.moveTo(
            scale * (this.x + points[0].x - extremeX_X + xOffset),
            scale * (this.y + points[0].y - extremeX_Y + yOffset));
        for (let i = 1; i < points.length; i ++) {
            context.lineTo(
                scale * (this.x + points[i].x - extremeX_X + xOffset),
                scale * (this.y + points[i].y - extremeX_Y + yOffset));
        }
        context.closePath();
        context.fill();
        context.stroke();
        context.globalAlpha = 1;
    }

    get circlePosX() {
        return extremeX_X;
    }

    get circlePosY() {
        return extremeX_Y;
    }

    // After being drawn, it needs to be in this position.
    moveToCirclePosition() {
        this.x = extremeX_X;
        this.y = extremeX_Y;
    }
}
