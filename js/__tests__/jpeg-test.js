import { loopLikeAJpeg, range } from '../jpeg'

describe(range, () => {
    it('should work with 1 param', () => {
        expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });
    
    it('should work with 2 params', () => {
        expect(range(3, 7)).toEqual([3, 4, 5, 6]);
    });
})

describe(loopLikeAJpeg, () => {
    it('should work for 3x3', () => {
        expect(loopLikeAJpeg(3)).toEqual(
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