"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importStar(require("@databases/pg"));
exports.sql = pg_1.sql;
//by default databases uses the process.env.database_url 
//as the connection string
const db = pg_1.default();
exports.db = db;
const authenticate = () => {
    console.log('connecting to postgres ....');
    db.query(pg_1.sql `Select * from contacts`);
    console.log("connected to postgres :)");
};
exports.authenticate = authenticate;
//# sourceMappingURL=contact-postgres.js.map