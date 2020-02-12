"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_callbacks_1 = require("../controllers/Contact-callbacks");
const authenticate_1 = require("../controllers/authenticate");
// import {auth} from '../middleware/authenticate'
const router = express_1.default.Router();
router.get('/contact', authenticate_1.auth, async (req, res) => {
    const person = await Contact_callbacks_1.getAllContacts(req, res);
    res.status(200).json(person);
});
router.get('/contact/:id', authenticate_1.auth, async (req, res) => {
    const person = await Contact_callbacks_1.getOneContact(req, res, req.params.id);
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' });
});
router.post('/contact', authenticate_1.auth, async (req, res) => {
    const person = Contact_callbacks_1.addContact(req, res, req.body);
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' });
});
router.put('/contact/:id', authenticate_1.auth, async (req, res) => {
    const person = Contact_callbacks_1.updateContact(req, res, req.body);
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' });
});
router.delete('/contact/:id', authenticate_1.auth, async (req, res) => {
    let person = Contact_callbacks_1.deleteContact(req, res, req.params.id);
    return person ? res.status(200).json(person)
        : res.status(400).json({ msg: "Couldnt delete, try later" });
});
exports.default = router;
//# sourceMappingURL=route_contact.js.map