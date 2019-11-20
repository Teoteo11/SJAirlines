"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
var Ticket = /** @class */ (function () {
    function Ticket(id_company, id_ticket, id_flight, isChecked) {
        this.id_company = id_company;
        this.id_ticket = id_ticket;
        this.id_flight = id_flight;
        this.isChecked = isChecked;
    }
    Ticket.counter = 0;
    return Ticket;
}());
var exampleJSON = { "tickets": Array() };
exampleJSON = Object(exampleJSON);
router.post("/", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket;
    return __generator(this, function (_a) {
        if (Number(req.body.id_company) && Number(req.body.id_flight)) {
            ticket = new Ticket(req.body.id_company, Ticket.counter++, req.body.id_flight, false);
            Object(exampleJSON)["tickets"].push(JSON.parse(JSON.stringify(ticket)));
            res.status(200).json(ticket);
            console.log(exampleJSON);
            return [2 /*return*/];
        }
        res.status(400).json({ message: "" });
        return [2 /*return*/];
    });
}); }));
router.get("/", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json(exampleJSON);
        return [2 /*return*/];
    });
}); }));
router.get("/:id", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json(exampleJSON.tickets.find(function (ticket) {
            return Object(ticket)["id_ticket"] === Number(req.params.id);
        }));
        return [2 /*return*/];
    });
}); }));
router.put("/:id", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        result = exampleJSON.tickets.find(function (ticket) {
            if (Object(ticket)["id_ticket"] === Number(req.params.id)) {
                Object(ticket)["isChecked"] = true;
                return true;
            }
            return false;
        });
        if (result) {
            return [2 /*return*/, res.json(result)];
        }
        return [2 /*return*/, res.status(404).json({ message: "Ticket not found" })];
    });
}); }));
router.delete("/:id", (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = exampleJSON.tickets.find(function (ticket) {
                    if (Object(ticket)["id_ticket"] === Number(req.params.id)) {
                        var index = exampleJSON.tickets.indexOf(ticket);
                        exampleJSON.tickets.splice(index, 1);
                        return true;
                    }
                    return false;
                });
                if (!result) return [3 /*break*/, 2];
                return [4 /*yield*/, res.json(result)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, res.status(404).json({ message: "Ticket not found" })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); }));
module.exports = router;
