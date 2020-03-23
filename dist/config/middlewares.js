"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../env/.env') });
router.use(morgan_1.default("dev"));
router.use(cors_1.default());
router.use(passport_1.default.initialize());
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: false }));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQThCO0FBQzlCLGtEQUE0QjtBQUM1Qiw0REFBcUM7QUFDckMsc0RBQWdDO0FBQ2hDLDhDQUF3QjtBQUN4QixrREFBNEI7QUFDNUIsOENBQXdCO0FBRXhCLElBQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLENBQUM7QUFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRXZELGtCQUFlLE1BQU0sQ0FBQyJ9