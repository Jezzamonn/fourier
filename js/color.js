import { clamp } from './util.js';

export function rgb(r, g, b) {
    return 'rgb('+r+','+g+','+b+')';
}

export function grey(whiteAmt) {
    whiteAmt = clamp(whiteAmt, 0, 1);
    const whiteRgb = Math.floor(255 * whiteAmt);
    return rgb(whiteRgb, whiteRgb, whiteRgb);
}

export const palette = {
    black: '#333',
    blue: '#4657d7',
    cyan: '#57a7cc',
    pink: '#e91e63',
    orange: '#ed7656',
}