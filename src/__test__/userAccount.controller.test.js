import {jest} from '@jest/globals';

const userAccountServiceMock = {
    register: jest.fn(),
    removeUser: jest.fn(),
    updateUser: jest.fn(),
    changeRoles: jest.fn(),
    getUser: jest.fn()
};

jest.unstable_mockModule('../services/userAccount.service.js', () => ({
    default: userAccountServiceMock
}));

const {default: userAccountController} = await import('../controllers/userAccount.controller.js');

const createRes = () => {
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
    return res;
};

describe('userAccount.controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        test('returns 201 with created user', async () => {
            const req = {body: {login: 'alex', password: 'secret'}};
            const res = createRes();
            const next = jest.fn();
            const createdUser = {login: 'alex'};
            userAccountServiceMock.register.mockResolvedValue(createdUser);

            await userAccountController.register(req, res, next);

            expect(userAccountServiceMock.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdUser);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {body: {login: 'alex'}};
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User account already exists');
            userAccountServiceMock.register.mockRejectedValue(error);

            await userAccountController.register(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        test('returns deleted user', async () => {
            const req = {params: {login: 'alex'}};
            const res = createRes();
            const next = jest.fn();
            const deletedUser = {login: 'alex'};
            userAccountServiceMock.removeUser.mockResolvedValue(deletedUser);

            await userAccountController.deleteUser(req, res, next);

            expect(userAccountServiceMock.removeUser).toHaveBeenCalledWith('alex');
            expect(res.json).toHaveBeenCalledWith(deletedUser);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {params: {login: 'alex'}};
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User with login alex not found');
            userAccountServiceMock.removeUser.mockRejectedValue(error);

            await userAccountController.deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        test('returns updated user', async () => {
            const req = {
                params: {login: 'alex'},
                body: {firstName: 'Alex'}
            };
            const res = createRes();
            const next = jest.fn();
            const updatedUser = {login: 'alex', firstName: 'Alex'};
            userAccountServiceMock.updateUser.mockResolvedValue(updatedUser);

            await userAccountController.updateUser(req, res, next);

            expect(userAccountServiceMock.updateUser).toHaveBeenCalledWith('alex', req.body);
            expect(res.json).toHaveBeenCalledWith(updatedUser);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {
                params: {login: 'alex'},
                body: {firstName: 'Alex'}
            };
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User with login alex not found');
            userAccountServiceMock.updateUser.mockRejectedValue(error);

            await userAccountController.updateUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('addRole', () => {
        test('returns changed roles when role is added', async () => {
            const req = {params: {login: 'alex', role: 'moderator'}};
            const res = createRes();
            const next = jest.fn();
            const userRoles = {login: 'alex', roles: ['USER', 'MODERATOR']};
            userAccountServiceMock.changeRoles.mockResolvedValue(userRoles);

            await userAccountController.addRole(req, res, next);

            expect(userAccountServiceMock.changeRoles).toHaveBeenCalledWith('alex', 'moderator', true);
            expect(res.json).toHaveBeenCalledWith(userRoles);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {params: {login: 'alex', role: 'moderator'}};
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User with login alex not found');
            userAccountServiceMock.changeRoles.mockRejectedValue(error);

            await userAccountController.addRole(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('deleteRole', () => {
        test('returns changed roles when role is removed', async () => {
            const req = {params: {login: 'alex', role: 'moderator'}};
            const res = createRes();
            const next = jest.fn();
            const userRoles = {login: 'alex', roles: ['USER']};
            userAccountServiceMock.changeRoles.mockResolvedValue(userRoles);

            await userAccountController.deleteRole(req, res, next);

            expect(userAccountServiceMock.changeRoles).toHaveBeenCalledWith('alex', 'moderator', false);
            expect(res.json).toHaveBeenCalledWith(userRoles);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {params: {login: 'alex', role: 'moderator'}};
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User with login alex not found');
            userAccountServiceMock.changeRoles.mockRejectedValue(error);

            await userAccountController.deleteRole(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('getUser', () => {
        test('returns found user', async () => {
            const req = {params: {login: 'alex'}};
            const res = createRes();
            const next = jest.fn();
            const user = {login: 'alex', firstName: 'Alex'};
            userAccountServiceMock.getUser.mockResolvedValue(user);

            await userAccountController.getUser(req, res, next);

            expect(userAccountServiceMock.getUser).toHaveBeenCalledWith('alex');
            expect(res.json).toHaveBeenCalledWith(user);
            expect(next).not.toHaveBeenCalled();
        });

        test('passes service error to next', async () => {
            const req = {params: {login: 'alex'}};
            const res = createRes();
            const next = jest.fn();
            const error = new Error('User with login alex not found');
            userAccountServiceMock.getUser.mockRejectedValue(error);

            await userAccountController.getUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('not implemented methods', () => {
        test('login throws not implemented error', async () => {
            await expect(userAccountController.login({}, {}, jest.fn())).rejects.toThrow('Method not implemented.');
        });

        test('changePassword throws not implemented error', async () => {
            await expect(userAccountController.changePassword({}, {}, jest.fn())).rejects.toThrow('Method not implemented.');
        });
    });
});
