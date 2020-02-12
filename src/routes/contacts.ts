import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors'

const router = express.Router();

router.get('/',cors(),function(_req, res) {
	fs.readFile(path.join(__dirname, '', 'contact.json'), 'utf8', (err, data) => {
		if (err) throw err;
		console.log("contacts")
		let Json = JSON.parse(data);
		res.send(new Promise(resolve =>resolve(Json)));
	});
});

export default router;
