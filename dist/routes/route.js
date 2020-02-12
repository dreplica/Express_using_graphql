"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_callbacks_1 = require("../middleware/Contact-callbacks");
const user_callback_1 = require("../middleware/user-callback");
const router = express_1.default.Router();
router.get('/contact/signup', user_callback_1.SignUp);
router.get('/contact/signin', user_callback_1.SignIn);
router.get('/contact/profile', user_callback_1.Profile);
router.get('/contact/deleteProfile', user_callback_1.deleteProfile);
router.get('/contact/updateProfile', user_callback_1.updateProfile);
router.get('/contact', Contact_callbacks_1.getAllContacts);
router.get('/contact/:id', Contact_callbacks_1.getOneContact);
router.post('/contact', Contact_callbacks_1.addContact);
router.put('/contact/:id', Contact_callbacks_1.updateContact);
router.delete('/contact/:id', Contact_callbacks_1.deleteContact);
exports.default = router;
//# sourceMappingURL=route.js.map