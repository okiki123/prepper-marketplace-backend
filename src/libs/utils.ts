export class Utils {
    static sendJSONResponse(res, status, data) {
        return res.status(status).json(data);
    }
}
