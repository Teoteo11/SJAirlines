"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const airplanes_1 = __importDefault(require("./routes/airplanes"));
const companies_1 = __importDefault(require("./routes/companies"));
const port = process.env.PORT || 3000;
const app = express_1.default();
const router = express_1.default.Router();
const address = "mongodb://Gabriele:helloworld@football-shard-00-00-9yxib.mongodb.net:27017,football-shard-00-01-9yxib.mongodb.net:27017,football-shard-00-02-9yxib.mongodb.net:27017/sj-airlines?ssl=true&replicaSet=football-shard-0&authSource=admin&retryWrites=true&w=majority";
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/airplane", airplanes_1.default);
app.use("/flight", airplanes_1.default);
app.use("/company", companies_1.default);
app.use("/user", airplanes_1.default);
app.listen(port, () => {
    mongoose_1.default.connect(address, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected successfully!");
    }).catch(error => {
        console.log("Error connection!");
    });
});
module.exports = app;
