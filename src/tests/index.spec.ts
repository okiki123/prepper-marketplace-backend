import request from 'supertest';
import {App} from '../app';
import {STATUS} from "../constants/status-code";

describe('Testing endpoint', function () {
    let app;
    beforeAll(async () => {
        app = new App().run();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return a response with message Works like charm', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(STATUS.OK);
        expect(JSON.parse(response.text)).toEqual({"message": 'Works like Charm'});
    });
});
