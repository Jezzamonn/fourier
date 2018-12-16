export default class Circle {

    constructor(size, rotation, frequency, parent = null) {
        this.size = size;
        this.startRotation = rotation;
        this.rotation = rotation;
        this.frequency = frequency;
        this.parent = parent;
        this.x = 0;
        this.y = 0;
    }

    moveToParent() {
        this.x = this.parent.endX;
        this.y = this.parent.endY;
    }

    reset() {
        this.rotation = this.startRotation;
        if (this.parent != null) {
            this.moveToParent();
        }
    }

    update(deltaT) {
        // TODO: Some delta T
        this.rotation += 2 * Math.PI * this.frequency * deltaT;
        if (this.parent != null) {
            this.moveToParent();
        }
    }

    get endX() {
        return this.x + this.size * Math.cos(this.rotation);
    }

    get endY() {
        return this.y + this.size * Math.sin(this.rotation);
    }

    get end() {
        return {
            x: this.endX,
            y: this.endY
        }
    }

    get length() {
        // Circumference of circle + radius
        return 2 * Math.PI * this.size + this.size
    }

    render(context, xOffset, yOffset, scale) {
        context.beginPath();
        context.arc(
            scale * (this.x + xOffset),
            scale * (this.y + yOffset),
            scale * this.size,
            0, 2 * Math.PI);
        context.moveTo(
            scale * (this.x + xOffset),
            scale * (this.y + yOffset));
        context.lineTo(
        	scale * (this.endX + xOffset),
        	scale * (this.endY + yOffset));
        context.stroke();
    }

    renderAmt(context, xOffset, yOffset, scale, amt) {
        if (amt < 0) {
            // useless
            return;
        }
        context.beginPath();

        // Draw radius
        var radiusAmt = amt / this.size;
        if (radiusAmt > 1) {
            radiusAmt = 1;
        }
        context.moveTo(
            scale * (this.x + xOffset),
            scale * (this.y + yOffset));
        context.lineTo(
            scale * ((this.x + this.size * radiusAmt * Math.cos(this.rotation)) + xOffset),
            scale * ((this.y + this.size * radiusAmt * Math.sin(this.rotation)) + yOffset));
        amt -= this.size;
        context.stroke();

        // Draw arc
        var arcAmt = amt / (2 * Math.PI * this.size)
        // But also only draw if we have enough to draw
        if (arcAmt < 0) {
            // That's ok. That's fine.
            return;
        }

        if (arcAmt > 1) {
            arcAmt = 1;
        }
        context.beginPath();
        context.arc(
            scale * (this.x + xOffset),
            scale * (this.y + yOffset),
            scale * this.size,
            this.rotation,
            this.rotation + 2 * Math.PI * arcAmt);
        context.stroke();
    }

    getDrawPosition(amt) {
        var radiusAmt = amt / this.size;
        if (radiusAmt <= 1) {
            return {
                x: this.x + this.size * radiusAmt * Math.cos(this.rotation),
                y: this.y + this.size * radiusAmt * Math.sin(this.rotation)
            };
        }
        amt -= this.size;
        var arcAmt = amt / (2 * Math.PI * this.size);
        return {
            x: this.x + this.size * Math.cos(this.rotation + 2 * Math.PI * arcAmt),
            y: this.y + this.size * Math.sin(this.rotation + 2 * Math.PI * arcAmt)
        };
    }
}