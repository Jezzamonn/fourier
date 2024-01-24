import { loopLikeAJpeg, range } from './jpeg.js'
import { expect } from 'chai.js';

describe("range", () => {
    it('should work with 1 param', () => {
        expect(range(5)).to.deep.equal([0, 1, 2, 3, 4]);
    });

    it('should work with 2 params', () => {
        expect(range(3, 7)).to.deep.equal([3, 4, 5, 6]);
    });
})

describe("loopLikeAJpeg", () => {
    it('should work for 3x3', () => {
        expect(loopLikeAJpeg(3)).to.deep.equal(
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [0, 2],
                [1, 1],
                [2, 0],
                [2, 1],
                [1, 2],
                [2, 2],
            ]
        )
    })
});