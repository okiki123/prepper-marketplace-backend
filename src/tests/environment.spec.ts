describe('.env test', () => {
    it('should be a testing environment', function () {
        expect(process.env.APP_ENVIRONMENT).toBe('test');
    });

    it('should have a PORT NUMBER', function () {
        expect(process.env.PORT).toBeTruthy();
    });

    it('should have a DB HOST', function () {
        expect(process.env.DB_HOST).toBeTruthy();
    });

    it('should have a DB NAME', function () {
        expect(process.env.DB_NAME).toBeTruthy();
    });

    it('should have a DB USER', function () {
        expect(process.env.DB_USERNAME).toBeTruthy();
    });

    it('should have a DB PASSWORD', function () {
        expect(process.env.DB_PASSWORD).not.toBeUndefined();
    });

    it('should have a DB PROTOCOL', function () {
        expect(process.env.DB_PROTOCOL).toBeTruthy();
    });

    it('should have a DB ADDITIONAL DATA', function () {
        expect(process.env.ADDITIONAL_DATA).not.toBeUndefined();
    });
});
