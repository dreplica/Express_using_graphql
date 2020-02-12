"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_callback_1 = require("../controllers/user-callback");
const authenticate_1 = require("../controllers/authenticate");
// import auth from '../middleware/authenticate';
const routing_users = express_1.default.Router();
routing_users.get('/profile', authenticate_1.auth, async (req, res) => {
    const person = await user_callback_1.Profile(req, res);
    console.log(person);
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' });
});
routing_users.post('/signup', async (req, res) => {
    console.log("entering signup");
    const person = await user_callback_1.SignUp(req.body);
    console.log("signup person", person);
    return person.token ?
        res.status(200).json(person)
        : res.status(404).send(person);
});
routing_users.post('/signin', async (req, res) => {
    const person = await user_callback_1.SignIn(req.body);
    console.log("signin person", person);
    return person.token ?
        res.status(200).json(person)
        : res.status(404).json(person);
});
routing_users.delete('/deleteProfile', authenticate_1.auth, async (req, res) => {
    const person = user_callback_1.deleteProfile(req.body.id);
    return person.error ?
        res.status(404).send(person)
        : res.status(200).json(person);
});
routing_users.put('/updateProfile', authenticate_1.auth, user_callback_1.updateProfile);
exports.default = routing_users;
//# sourceMappingURL=routing_users.js.map