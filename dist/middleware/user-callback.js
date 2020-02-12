"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import contact, { contactSchema } from '../routes/contact';
const joi_1 = __importDefault(require("@hapi/joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const contact_postgres_1 = require("../mongoModel/contact-postgres");
exports.SignUp = async (req, res) => {
    const details = req.body;
    const { error } = schemaSignUp.validate(details);
    if (error) {
        return res.status(400).json({ val: error.message });
    }
    const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select email From users Where email =${details.email} returning *`);
    if (person.length >= 1) {
        return res.status(400).json('this email address is taken');
    }
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(details.password, salt);
        await contact_postgres_1.db.query(contact_postgres_1.sql `Insert into users Values (uuid_generate_v4(),
			${details.username},${details.email},${hash},${details.fname},${details.lname})`);
        return res.status(200).json("registered successfully");
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
exports.SignIn = async (req, res) => {
    const details = req.body;
    const { error } = schemaSignIn.validate(details);
    if (error) {
        return res.status(400).json({ val: error.message });
    }
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id, fname, lname, email, password From users where email=${details.email}`);
        const checkPassword = await bcryptjs_1.default.compare(details.password, person[0].password);
        if (person.length <= 0 || checkPassword == false) {
            return res.status(404).json('username or password mismatch');
        }
        const sat = process.env.JWTTOKEN;
        const token = jsonwebtoken_1.default.sign({ id: person[0].id }, sat);
        return res.header('x-auth-users', token).status(200).json({ val: token });
    }
    catch (error) {
        return res.status(404).json('user not found');
    }
};
exports.Profile = async (req, res) => {
    const decode = req.user.id;
    console.log(decode);
    try {
        console.log("entering");
        const details = await contact_postgres_1.db.query(contact_postgres_1.sql `Select fname,lname,email From users where id=${decode}`);
        console.log(details);
        console.log("what happened");
        return res.status(200).json(details);
    }
    catch (error) {
        console.log();
        return res.status(404).json(error.message);
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
exports.deleteProfile = async (req, res) => {
    const decode = req.user.id;
    try {
        contact_postgres_1.db.query(contact_postgres_1.sql `Delete from users Where id = ${decode}`);
        res.status(200).json('owner deleted');
    }
    catch (e) {
        return res.status(404).json('contact not found');
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