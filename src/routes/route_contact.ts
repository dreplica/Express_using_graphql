import express from 'express';
import { getAllContacts, getOneContact, addContact, updateContact, deleteContact } from '../controllers/Contact-callbacks';
import { auth } from '../controllers/authenticate';
// import {auth} from '../middleware/authenticate'

const router = express.Router();
router.get('/contact', auth, async (req, res) => {
    const person =  await getAllContacts(req,res)
    res.status(200).json(person);
});

router.get('/contact/:id', auth, async (req:any, res) => {
    const person = await getOneContact(req,res,req.params.id)
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' })
});

router.post('/contact', auth, async (req: any, res) => {
    const person = addContact(req,res,req.body)
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' })
});


router.put('/contact/:id', auth, async (req: any, res) => {
    const person = updateContact(req, res, req.body)
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' })
});
router.delete('/contact/:id', auth, async (req: any, res) => {
     let person = deleteContact(req,res,req.params.id);
    return person ?res.status(200).json(person)
                    :res.status(400).json({msg:"Couldnt delete, try later"})
});

export default router;
