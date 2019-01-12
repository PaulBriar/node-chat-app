const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        let res = isRealString(1235);
        expect(res).toBeFalsy()
    });
    it('Should reject string with only spaces', () => {
        let res = isRealString('   ');
        expect(res).toBeFalsy()
    });
    it('Should allow string with non-space characters', () => {
        let res = isRealString('Paul');
        expect(res).toBeTruthy()
    });
});