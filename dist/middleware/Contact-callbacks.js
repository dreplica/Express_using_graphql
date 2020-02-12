"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import contact, { contactSchema } from '../routes/contact';
const joi_1 = __importDefault(require("@hapi/joi"));
const contact_postgres_1 = require("../mongoModel/contact-postgres");
exports.getAllContacts = async (req, res) => {
    const decode = req.user.id;
    const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id,fname, lname, email, phone From contacts  where users_id = ${decode}`);
    res.status(200).json((person));
};
exports.getOneContact = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const decode = req.user.id;
    console.log("hello", decode);
    try {
        console.log("entering");
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id, fname, lname, email, phone From contacts Where id=${id} and users_id=${decode}`);
        console.log("here is person", person);
        return res.status(200).send(person);
    }
    catch (error) {
        return res.status(404).send('user not found');
    }
};
exports.addContact = async (req, res) => {
    const decode = req.user.id;
    console.log(req);
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    const { fname, lname, email, phone } = req.body;
    console.log("this is fname", fname);
    const created = new Date().toISOString();
    const updated = new Date().toISOString();
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO contacts VALUES (uuid_generate_v4(),${fname},${lname},${email},${phone},${created},${updated},${decode}) Returning * `);
        return res.status(200).json(person);
    }
    catch (error) {
        return res.status(400).send('couldnt add contact');
    }
};
exports.updateContact = async (req, res) => {
    const _id = req.params.id;
    const { error } = schemaID.validate({ _id });
    if (error) {
        return res.status(404).send(error.message);
    }
    const decode = req.user.id;
    const keys = await Object.keys(req.body).map((key, ind, arr) => arr.find((value) => req.body[value].length > 0 && value == key));
    const updateTime = new Date().toISOString();
    try {
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `UPDATE contacts SET 
					fname = ${req.body['fname']}, 
					phone = ${req.body['phone']}, 
					email = ${req.body['email']}, 
					lname = ${req.body['lname']}, 
					updated = ${updateTime} 
					WHERE id =${_id} AND users_id=${decode} Returning *`);
        return res.status(200).send(person);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.deleteContact = async (req, res) => {
    const _id = req.params.id;
    const decode = req.user.id;
    console.log("starting");
    // const { error } = schemaID.validate({ _id });
    // if (error) {
    // 	console.log("error side")
    // 	return res.status(404).send('Cant access user');
    // }
    try {
        console.log("sql side");
        contact_postgres_1.db.query(contact_postgres_1.sql `Delete from contacts Where id = ${_id}  and users_id = ${decode}`);
        res.status(200).send('user deleted');
    }
    catch (e) {
        return res.status(404).send('contact not found');
    }
};
const schema = joi_1.default.object({
    fname: joi_1.default.string().trim(),
    lname: joi_1.default.string().trim(),
    email: joi_1.default.string().email().trim(),
    phone: joi_1.default.string().trim() //.required()
});
const schemaID = joi_1.default.object({
    _id: joi_1.default.string().min(36).max(36).trim().required()
});
//# sourceMappingURL=Contact-callbacks.js.map