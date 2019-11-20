"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tickets_1 = __importDefault(require("./tickets/tickets"));
var app = express_1.default();
app.use("/tickets", tickets_1.default);
app.listen(5000, function () {
    console.log("SERVER RUNNING");
});
