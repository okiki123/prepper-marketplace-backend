"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = __importDefault(require("./config/middlewares"));
var db_1 = require("./config/db");
var app = express_1.default();
var db = new db_1.Db();
var PORT = process.env.PORT;
app.use(middlewares_1.default);
db.connect();
app.get('/', function (req, res) {
    res.json({ message: "testing" });
});
app.listen(PORT, function () {
    console.log("Node Server listening on Port " + PORT);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUFtRDtBQUNuRCxxRUFBK0M7QUFDL0Msa0NBQStCO0FBRS9CLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixJQUFNLEVBQUUsR0FBRyxJQUFJLE9BQUUsRUFBRSxDQUFDO0FBQ3BCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBRTlCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVcsQ0FBQyxDQUFDO0FBQ3JCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUViLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFpQyxJQUFNLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUMsQ0FBQyJ9