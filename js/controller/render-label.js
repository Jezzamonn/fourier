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

    const lines = text.split('\n');

    let textWidth = 0;
    context.font = '16px "Open Sans", sans-serif';
    for (const line of lines) {
        const textMetrics = context.measureText(line);
        if (textMetrics.width > textWidth) {
            textWidth = textMetrics.width;
        }
    }
    // Just hard code this because measuring it is more complicated
    let textHeight = 20;

    // For the moment, set it to what it would be if it was facing the right
    let labelX = x + labelDist;
    let labelY = 0;
    let textX = 0;
    let textY = 0;

    if (labelX + textWidth + textPadding < maxX) {
        // slanting to the right
        labelX = x + labelDist;
        labelY = y - labelDist;
        textX = labelX + textPadding
        textY = labelY - textPadding;
    }
    else {
        // slanting to the left
        labelX = x - labelDist;
        labelY = y - labelDist;
        textX = labelX - textWidth - textPadding;
        textY = labelY - textPadding;
    }
    for (let i = 0; i < lines.length; i ++) {
        const line = lines[i];
        const lineOffset = textHeight * ((lines.length - 1) - i)
        context.fillText(line, textX, textY - lineOffset);
    }

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(labelX, labelY);
    context.stroke();

}
