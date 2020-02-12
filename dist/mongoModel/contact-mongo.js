"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    Fname: String,
    Lname: String,
    Email: String,
    Phone: String,
    Created: Date,
    Updated: Date
});
exports.default = mongoose_1.default.model('contact_details', ContactSchema);
//# sourceMappingURL=contact-mongo.js.map