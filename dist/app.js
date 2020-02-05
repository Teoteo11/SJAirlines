"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const companies_1 = __importDefault(require("./routes/companies"));
const flights_1 = __importDefault(require("./routes/flights"));
const airports_1 = __importDefault(require("./routes/airports"));
const airplanes_1 = __importDefault(require("./routes/airplanes"));
const login_1 = __importDefault(require("./routes/login"));
const app = express_1.default();
const port = process.env.APP_PORT || 3003;
exports.address = 'mongodb+srv://Matteo:simoneaiello@cluster0-tclhz.mongodb.net/SJAirlines?retryWrites=true&w=majority';
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/airplanes", airplanes_1.default);
app.use("/tickets", tickets_1.default);
app.use("/companies", companies_1.default);
app.use("/users", users_1.default);
app.use("/flights", flights_1.default);
app.use("/airports", airports_1.default);
app.use("/login", login_1.default);
app.listen(port, () => {
    console.log(`🖥  Server running at port ${port}`);
});
mongoose_1.default.connect(exports.address, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("🗄  Database connected"); })
    .catch(() => { console.log("❌  Error connection!"); });
module.exports = app;
