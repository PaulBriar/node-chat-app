const expect = require('expect');

const {Users} = require('./users');

describe('Users', function () {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Julie',
            room: 'React Course'
        },{
            id: '3',
            name: 'Tim',
            room: 'Node Course'
        }];
    });
    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Paul',
            room: 'The Office Fans'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('Should remove user with id', () => {
        let userId = '1';
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('Should NOT remove user with id', () => {
        let userId = '99';
        let user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('Should find user with id', () => {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('Should not find user by id', () => {
        let user = users.getUser('4')
        expect(user).toNotExist();
    });
    it('Should return names for Node Course', () => {
        let userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Tim'])
    });
    it('Should return names for React Course', () => {
        let userList = users.getUserList('React Course');
        expect(userList).toEqual(['Julie'])
    });
});