"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = (req, res, next) => {
    var _a;
    const token = (_a = req) === null || _a === void 0 ? void 0 : _a.headers['x-auth-users'];
    if (!token) {
        return res.status(404).send({ val: "send token headers" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWTTOKEN);
        req.user = decode;
        return next();
    }
    catch (error) {
        return res.status(404).send({ val: "bad request, token doesnt exist" });
    }
};
//# sourceMappingURL=authenticate.js.map