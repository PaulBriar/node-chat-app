let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('Should generate the correct message object', () => {
        let res = generateMessage('Paul', 'Hello');
            expect(res.from).toBe('Paul')
            expect(res.text).toBe('Hello')
            expect(res.createdAt).toBeA('number')
    });
});

describe('generate location url', () => {
    it('Should generate location', () => {
        let res = generateLocationMessage('admin', 15, -19);
        expect(res.from).toBe('admin')
        expect(res.url).toBe('https://www.google.com/maps?q15,-19')
        expect(res.createdAt).toBeA('number')
    });
});