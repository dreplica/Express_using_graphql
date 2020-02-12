"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.get('/', cors_1.default(), function (_req, res) {
    fs_1.default.readFile(path_1.default.join(__dirname, '', 'contact.json'), 'utf8', (err, data) => {
        if (err)
            throw err;
        console.log("contacts");
        let Json = JSON.parse(data);
        res.send(new Promise(resolve => resolve(Json)));
    });
});
exports.default = router;
//# sourceMappingURL=contacts.js.map