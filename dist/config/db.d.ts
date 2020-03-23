export declare class Db {
    host: string | undefined;
    name: string | undefined;
    username: string | undefined;
    password: string | undefined;
    protocol: string | undefined;
    additionalData: string | undefined;
    dbUrl: string;
    constructor();
    connect(): void;
    private connecting;
    private disconnected;
    private validateEnvParams;
}
