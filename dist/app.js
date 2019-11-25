"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const companies_1 = __importDefault(require("./routes/companies"));
const app = express_1.default();
app.use("/tickets", tickets_1.default);
app.use("/companies", companies_1.default);
app.listen(5000, () => {
    console.log("SERVER RUNNING");
});
module.exports = app;
