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

    context.font = '16px "Open Sans", sans-serif';
    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;

    // For the moment, set it to what it would be if it was facing the right
    let labelX = x + labelDist;
    const labelY = y - labelDist;

    if (labelX + textWidth + textPadding < maxX) {
        // slanting to the right
        labelX = x + labelDist;
        context.fillText(text, labelX + textPadding, labelY - textPadding);
    }
    else {
        // slanting to the left
        labelX = x - labelDist;
        context.fillText(text, labelX - textWidth - textPadding, labelY - textPadding)
    }

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(labelX, labelY);
    context.stroke();

}
