"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import contact, { contactSchema } from '../routes/contact';
const joi_1 = __importDefault(require("@hapi/joi"));
const contact_postgres_1 = require("../Models/contact-postgres");
exports.getAllContacts = async (req, res) => {
    const decode = req.user.id;
    const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id,fname, lname, email, phone From contacts  where users_id = ${decode}`);
    return person;
};
exports.getOneContact = async (req, res, arg) => {
    const id = arg;
    console.log("id from inside", id);
    const decode = req.user.id;
    console.log(decode);
    try {
        console.log("person");
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id, fname, lname, email, 
			phone From contacts Where id=${id} 
			and users_id=${decode}`);
        return { person };
        // return res.status(200).send(person);
    }
    catch (error) {
        return error.message;
    }
};
exports.addContact = async (req, res, args) => {
    const decode = req.user.id;
    const { error } = schema.validate(args);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    const { fname, lname, email, phone } = args;
    const created = new Date().toISOString();
    const updated = new Date().toISOString();
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO contacts VALUES (uuid_generate_v4(),${fname},${lname},${email},${phone},${created},${updated},${decode}) Returning * `);
        return person;
    }
    catch (error) {
        return error.message;
    }
};
exports.updateContact = async (req, res, args) => {
    const { id: _id } = args;
    const { error } = schemaID.validate({ _id });
    if (error) {
        return res.status(404).send(error.message);
    }
    const decode = req.user.id;
    const keys = await Object.keys(req.body).map((key, ind, arr) => arr.find((value) => req.body[value].length > 0 && value == key));
    const updateTime = new Date().toISOString();
    try {
        // const person = keys.map((key: string|undefined) => {
        // 	db.query(sql`UPDATE contacts SET ${key} = ${req.body.key}
        // 		updated = ${updateTime} where id =${_id}
        // 		And users_id = ${decode} Returning *`)
        // })
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `UPDATE contacts SET 
					fname = ${args.fname}, 
					phone = ${args.phone}, 
					email = ${args.email}, 
					lname = ${args.lname}, 
					updated = ${updateTime} 
					WHERE id =${_id} AND users_id=${decode}`);
        return person;
    }
    catch (error) {
        return error.message;
    }
};
exports.deleteContact = async (req, res, args) => {
    const _id = args;
    const decode = req.user.id;
    console.log("starting");
    try {
        console.log("sql side");
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Delete from contacts Where id = ${_id}  and users_id = ${decode} Returning *`);
        console.log(person);
        return person;
    }
    catch (error) {
        return error.message;
    }
};
const schema = joi_1.default.object({
    fname: joi_1.default.string().trim(),
    lname: joi_1.default.string().trim(),
    email: joi_1.default.string().email().trim(),
    phone: joi_1.default.string().trim() //.required()
});
const schemaID = joi_1.default.object({
    _id: joi_1.default.string().min(15).trim().required()
});
//# sourceMappingURL=Contact-callbacks.js.map