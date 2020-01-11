"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const companies_1 = __importDefault(require("./routes/companies"));
const flights_1 = __importDefault(require("./routes/flights"));
const airports_1 = __importDefault(require("./routes/airports"));
const airplanes_1 = __importDefault(require("./routes/airplanes"));
const app = express_1.default();
const port = process.env.PORT || 3003;
const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority";
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
mongoose_1.default
    .connect(address, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log("🗄  Database connected");
})
    .catch((error) => {
    console.log("Error connection!");
});
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`🖥  Server running at port ${port}`);
    });
}
module.exports = app;
