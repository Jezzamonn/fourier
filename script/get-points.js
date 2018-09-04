let path = document.getElementsByTagName('path')[0];
let length = path.getTotalLength()
let numPoints = 256;
let points = [];
for (let i = 0; i < numPoints; i ++) {
    point = path.getPointAtLength(length * i / numPoints);
    points.push(point);
    // s += '' + point.x + ',' + point.y + '\n'
}

// Turn into a string of things
let s = points.reduce((s, point) => s + '{x:' + point.x + ',y:' + point.y + '},\n', '');
console.log(s);