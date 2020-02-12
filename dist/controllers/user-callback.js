"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import contact, { contactSchema } from '../routes/contact';
const joi_1 = __importDefault(require("@hapi/joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const contact_postgres_1 = require("../Models/contact-postgres");
exports.SignUp = async (args) => {
    console.log("entering");
    const { error } = schemaSignUp.validate(args);
    if (error) {
        return error.message;
    }
    const details = { ...args };
    let person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select email From users Where email =${details.email}`);
    if (person.length >= 1) {
        return ('this email address is taken');
    }
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(details.password, salt);
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Insert into users Values (uuid_generate_v4(),
			${details.username},${details.email},${hash},${details.fname},
			${details.lname}) Returning *`);
        const sat = process.env.JWTTOKEN;
        const token = jsonwebtoken_1.default.sign({ id: person[0].id }, sat);
        console.log(token);
        return { token: token };
    }
    catch (error) {
        return error.message;
    }
};
exports.SignIn = async (args) => {
    const { error } = schemaSignUp.validate(args);
    if (error) {
        return error.message;
    }
    const details = { ...args };
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select fname,lname,id,password From users where email=${details.email}`);
        const checkPassword = await bcryptjs_1.default.compare(details.password, person[0].password);
        if (person.length <= 0 || !checkPassword) {
            return 'username or password mismatch';
        }
        const sat = process.env.JWTTOKEN;
        const token = jsonwebtoken_1.default.sign({ id: person[0].id }, sat);
        return { token: token };
    }
    catch (error) {
        return 'user not found';
    }
};
exports.Profile = async (req, res) => {
    const decode = req.user.id;
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select fname,username,id,lname,email From users where id=${decode}`);
        console.log("abdul fatir");
        return person;
    }
    catch (error) {
        return error.message;
    }
};
exports.updateProfile = async (req, res) => {
    const decode = req.user.id;
    // const keys = Object.keys(req.body).filter(x => req.body[x] != "")
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Update users Set 
					fname = ${req.body['phone']}, 
					email = ${req.body['email']}, 
					lname = ${req.body['lname']}
					where id = ${decode} Returning *`);
        return res.status(200).json(person);
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
};
exports.deleteProfile = async (args) => {
    const decode = args;
    try {
        const person = contact_postgres_1.db.query(contact_postgres_1.sql `Delete from users Where id = ${decode}`);
        contact_postgres_1.db.query(contact_postgres_1.sql `Delete from contacts Where users_id = ${decode}`);
        return person;
    }
    catch (error) {
        return error.message;
    }
};
const schemaSignUp = joi_1.default.object({
    fname: joi_1.default.string().trim(),
    lname: joi_1.default.string().trim(),
    email: joi_1.default.string().email().trim(),
    username: joi_1.default.string().trim(),
    password: joi_1.default.string().alphanum().trim(),
});
const schemaSignIn = joi_1.default.object({
    email: joi_1.default.string().email().trim(),
    password: joi_1.default.string().alphanum().trim(),
});
//# sourceMappingURL=user-callback.js.map