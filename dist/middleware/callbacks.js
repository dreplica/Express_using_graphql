"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import contact, { contactSchema } from '../routes/contact';
const joi_1 = __importDefault(require("@hapi/joi"));
const contact_postgres_1 = require("../mongoModel/contact-postgres");
exports.getAllContacts = async (_req, res) => {
    // const person = (await Contact.find({}).sort({ Fname: 1 })) || { error: 'no data' };
    const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id,fname, lname, email, phone From contacts `);
    console.log(person);
    res.status(200).send(JSON.stringify(person));
};
exports.getOneContact = async (req, res) => {
    const id = req.params.id;
    try {
        // const person = await Contact.findById(id);
        const person = await contact_postgres_1.db.query(contact_postgres_1.sql `Select id, fname, lname, email, phone from contacts where id=${id}`);
        return res.status(200).send(person);
    }
    catch (error) {
        return res.status(404).send('user not found');
    }
};
exports.addContact = async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    const { fname, lname, email, phone } = req.body;
    const created = new Date().toISOString();
    const updated = new Date().toISOString();
    //here you specify when its a specific user , to check for that user and add him/her specifically;
    contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO contacts VALUES (uuid_generate_v4(),${fname},${lname},${email},${phone},${created},${updated}) `);
    // const person = await new Contact({
    // 	...req.body,
    // 	created: new Date().toISOString();
    // 	updated: new Date().toISOString()
    // // });
    // person.save();
    return res.status(200);
};
exports.updateContact = async (req, res) => {
    const id = req.params.id;
    // const { error } = schema.validate(req.body);
    // if (error) {
    // 	console.log('joi fuckd up')
    // 	console.log(error.details[0].message)
    // 	res.status(404).send(error.details[0].message);
    // 	return;
    // }
    try {
        const keys = Object.keys(req.body).map((key, ind, arr) => arr.find(key => req.body.value.length > 0));
        console.log("this is keys", keys);
        const person = await keys.map(async (key) => await contact_postgres_1.db.query(contact_postgres_1.sql `Update contacts Set ${key} = ${req.body['key']}, updated = ${new Date().toISOString()}where id = ${id}`));
        console.log("this is person", person);
        return res.status(200);
    }
    catch (error) {
        return res.status(400);
    }
    // const person = await Contact.findByIdAndUpdate(id, { ...req.body, Updated: new Date().toISOString() });
};
exports.deleteContact = async (req, res) => {
    try {
        // const id = await Contact.findById(req.params.id);
        // const person = await Contact.findByIdAndDelete(id);
        const { id } = req.params;
        const { error } = schemaID.validate({ id });
        if (error) {
            console.log(error.details[0].message);
            return res.status(404).send('Cant access user');
        }
        contact_postgres_1.db.query(contact_postgres_1.sql `Delete from contacts Where id = ${id}`);
        res.status(200).send("user deleted");
    }
    catch (e) {
        return res.status(404).send('contact not found');
    }
};
const schema = joi_1.default.object({
    fname: joi_1.default.string().trim(),
    lname: joi_1.default.string().trim(),
    email: joi_1.default.string().email().trim(),
    phone: joi_1.default.string().trim(),
});
const schemaID = joi_1.default.object({
    id: joi_1.default.string().min(16).max(40).trim().required()
});
//# sourceMappingURL=callbacks.js.map