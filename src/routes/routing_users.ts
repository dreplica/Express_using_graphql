import express,{ Response,Request} from 'express';
import { SignUp, SignIn, Profile, deleteProfile, updateProfile } from '../controllers/user-callback';
import { auth } from '../controllers/authenticate';
// import auth from '../middleware/authenticate';

const routing_users = express.Router();
routing_users.get('/profile', auth, async (req: any, res:Response) => {
    const person = await Profile(req, res);
    console.log(person)
    return person ? res.status(200).json(person)
        : res.status(404).json({ error: 'user not found' })
});
routing_users.post('/signup', async (req: Request, res: Response) => {
    console.log("entering signup")
    const person = await SignUp(req.body)
    console.log("signup person",person)
    return person.token?
        res.status(200).json(person)
        :res.status(404).send(person)
});

routing_users.post('/signin', async (req: Request, res: Response) => {
    const person:any = await SignIn(req.body);
    console.log("signin person",person)
    return person.token?
        res.status(200).json(person)
        :res.status(404).json(person)
})

routing_users.delete('/deleteProfile', auth, async (req: Request, res: Response) => {
    const person:any = deleteProfile(req.body.id)
    return person.error?
        res.status(404).send(person)
        :res.status(200).json(person)
});

routing_users.put('/updateProfile', auth, updateProfile);

export default routing_users;


