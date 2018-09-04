import { to2dIsometric } from "../util";

export function renderBoundingCube(context, minX, maxX, minY, maxY, minZ, maxZ, xzAngle, yAngle) {
    const xs = [minX, maxX];
    const ys = [minY, maxY];
    const zs = [minZ, maxZ];

    context.beginPath();
    context.globalAlpha = 0.1;

    const permutations = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ]
    for (let [p1, p2] of permutations) {
        // edges along x axis
        line3d(context,
            xs[0], ys[p1], zs[p2],
            xs[1], ys[p1], zs[p2],
            xzAngle, yAngle);
        // along y axis
        line3d(context,
            xs[p1], ys[0], zs[p2],
            xs[p1], ys[1], zs[p2],
            xzAngle, yAngle);
        // along z axis
        line3d(context,
            xs[p1], ys[p2], zs[0],
            xs[p1], ys[p2], zs[1],
            xzAngle, yAngle);
    }

    context.stroke();
    context.globalAlpha = 1;
}

function line3d(context, x1, y1, z1, x2, y2, z2, xzAngle, yAngle) {
    const startPoint = to2dIsometric(x1, y1, z1, xzAngle, yAngle);
    const endPoint = to2dIsometric(x2, y2, z2, xzAngle, yAngle);
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
}
