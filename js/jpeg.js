/**
 * Returns a bunch of x-y coordiantes in the order that jpegs are broken up.
 *
 * Jpegs loop in a zig-zag type pattern from the top left corner to the bottom right.
 * That's what this does.
 *
 * @param {Number} size How big the square matrix thing that we're loopig through is.
 */
export function loopLikeAJpeg(size) {
    let flip_dir = false;
    let coordinates = [];

    for (let i of range(size)) {
        let r = range(i + 1);
        if (flip_dir) {
            r.reverse();
        }

        for (let j of r) {
            // Start at the right edge (0, i), and go upwards to the right.
            coordinates.push([0 + j, i - j]);
        }
        flip_dir = !flip_dir;
    }
    for (let i of range(1, size)) {
        let r = range(size - i);
        if (flip_dir) {
            r.reverse();
        }

        for (let j of r) {
            // Start the the bottom edge (i, size-1) and go upwards to the right.
            coordinates.push([i + j, (size - 1) - j]);
        }
        flip_dir = !flip_dir;
    }
    return coordinates;
}

// Exported just for testing.
export function range(min, max=null) {
    if (max == null) {
        max = min;
        min = 0;
    }
    // Neat little trick from
    // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
    return Array.from(Array(max - min).keys()).map(el => el + min);
}