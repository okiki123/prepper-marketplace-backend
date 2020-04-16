import {App} from "../app";
import request from 'supertest';
import {UserModel as User} from "../models/user.model";
import {STATUS} from "../constants/status-code";

describe('Registration', () => {
    let app;
    beforeAll(async () => {
        app = new App().run();
    });

    afterEach(async () => {
    });

    afterAll(async () => {
        await User.remove({});
        await app.close();
    });

    it('should create user account if user does not exist', async () => {
        const requestBody = {
            username: "jonkfkern",
            email: "jonnwdldlp@gmail.com",
            password: "password"
        };
        const expectedResponse = {
            "message": "User created successfully"
        };
        const response = await request(app).post('/auth/register').send(requestBody);
        expect(response.status).toBe(STATUS.RESOURCE_CREATED);
        expect(JSON.parse(response.text)).toEqual(expectedResponse);
    });
});
