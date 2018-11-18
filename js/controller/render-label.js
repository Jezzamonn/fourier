/**
 * Draws a label, keeping it within the bounds of the canvas.
 * @param {CanvasRenderingContext2D} context Rendering context
 * @param {string} text Text to display
 * @param {number} x X coord of what the label is pointing to
 * @param {number} y Y coord of what the label is pointing to
 * @param {number} labelDist Distance between the label and the thing the label's labelling
 * @param {string} color Color of the label
 */
export function renderLabel(context, text, x, y, labelDist, color, minX, maxX, textPadding=5) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.fillStyle = color;

    // TODO: move this back to the wave samples controller
    // draw li'l circle (?)
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.stroke();

    context.font = '16px "Open Sans", sans-serif';
    const textMetrics = context.measureText(text);

    let labelX = x + labelDist;
    if (labelX + textMetrics.width + textPadding > maxX) {
        labelX = maxX - textMetrics.width - textPadding;
    }
    if (labelX - textPadding < minX) {
        labelX = minX + textPadding;
    }
    let labelY = y - labelDist;

    context.fillText(text, labelX, labelY);

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(labelX - textPadding, labelY + textPadding);
    context.stroke();

}
