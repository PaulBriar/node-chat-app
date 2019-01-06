let expect = require('expect');

let {generateMessage} = require('./message');

describe('generate message', () => {
    it('Should generate the correct message object', () => {
        let res = generateMessage('Paul', 'Hello');
            expect(res.from).toBe('Paul')
            expect(res.text).toBe('Hello')
            expect(typeof res.createdAt).toBe('number')
    });
});