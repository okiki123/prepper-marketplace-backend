"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bluebird_1 = __importDefault(require("bluebird"));
mongoose_1.default.Promise = bluebird_1.default;
var Db = (function () {
    function Db() {
        this.host = process.env.DB_HOST;
        this.name = process.env.DB_NAME;
        this.username = process.env.DB_USERNAME;
        this.password = process.env.DB_PASSWORD;
        this.protocol = process.env.DB_PROTOCOL;
        this.additionalData = process.env.ADDITIONAL_DATA;
        this.validateEnvParams(this.host, 'DB_HOST');
        this.validateEnvParams(this.name, 'DB_NAME');
        this.validateEnvParams(this.username, 'DB_USERNAME');
        this.validateEnvParams(this.password, 'DB_PASSWORD');
        this.validateEnvParams(this.protocol, 'DB_PROTOCOL');
        this.dbUrl = this.protocol + "://" + this.username + ":" + this.password + "@" + this.host + "/" + this.name + this.additionalData;
        console.log(this.dbUrl);
    }
    Db.prototype.connect = function () {
        var _this = this;
        mongoose_1.default.connect(this.dbUrl, { useNewUrlParser: true, autoReconnect: true })
            .then(function () {
            return console.log("Successfully connected to " + _this.dbUrl);
        })
            .catch(function (err) {
            console.log("Error connecting to database: ", err);
            return process.exit(1);
        });
        mongoose_1.default.connection.on('open', this.connecting);
        mongoose_1.default.connection.on('disconnected', function (err) {
            console.log('mongoose disconnected ' + err);
        });
    };
    Db.prototype.connecting = function () {
        console.log('mongoose connecting to ' + this.dbUrl);
    };
    Db.prototype.disconnected = function (err) {
        console.log('mongoose disconnected ' + err);
    };
    Db.prototype.validateEnvParams = function (param, paramName) {
        if (!param) {
            throw new Error(paramName + " is not set in the .env file");
        }
    };
    return Db;
}());
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBQ2hDLHNEQUFnQztBQUNoQyxrQkFBUSxDQUFDLE9BQU8sR0FBRyxrQkFBUSxDQUFDO0FBRTVCO0lBU0k7UUFSQSxTQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0IsU0FBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzNCLGFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxhQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkMsYUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ25DLG1CQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFJekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssR0FBTSxJQUFJLENBQUMsUUFBUSxXQUFNLElBQUksQ0FBQyxRQUFRLFNBQUksSUFBSSxDQUFDLFFBQVEsU0FBSSxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWdCLENBQUM7UUFDcEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELG9CQUFPLEdBQVA7UUFBQSxpQkFlQztRQWRHLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQzthQUNyRSxJQUFJLENBQUM7WUFDRixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQTZCLEtBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFUCxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoRCxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsR0FBUTtZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHVCQUFVLEdBQWxCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLHlCQUFZLEdBQXBCLFVBQXFCLEdBQVE7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU8sOEJBQWlCLEdBQXpCLFVBQTBCLEtBQXlCLEVBQUUsU0FBaUI7UUFDbEUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENBQUksU0FBUyxpQ0FBOEIsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUNMLFNBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLGdCQUFFIn0=