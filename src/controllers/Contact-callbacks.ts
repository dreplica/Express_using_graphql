// import contact, { contactSchema } from '../routes/contact';
import joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { db, sql } from '../Models/contact-postgres';

export const getAllContacts = async (req: any, res: Response) => {
	const decode = req.user.id;
	const person = await db.query(
		sql`Select id,fname, lname, email, phone From contacts  where users_id = ${decode}`
	);
	return person;
	
};

export const getOneContact = async (req: any, res: Response,arg:string) => {
	const id = arg;
	console.log("id from inside",id)
	const decode = <string>req.user.id
	console.log(decode)
	try {
		console.log("person")
		const person = await db.query(
			sql`Select id, fname, lname, email, 
			phone From contacts Where id=${id} 
			and users_id=${decode}`
		);
		return {person}
		// return res.status(200).send(person);
	} catch (error) {
		return error.message;
	}
};
export const addContact = async (req: any, res: Response,args:{[key:string]:any}) => {
	const decode = req.user.id
	const { error } = schema.validate(args);
	if (error) {
		res.status(404).send(error.details[0].message);
		return;
	}
	const { fname, lname, email, phone } = args;
	const created = new Date().toISOString();
	const updated = new Date().toISOString();
	try {
		const person = await db.query(
			sql`INSERT INTO contacts VALUES (uuid_generate_v4(),${fname},${lname},${email},${phone},${created},${updated},${decode}) Returning * `
		);
		return person;
	} catch (error) {
		return error.message;
	}
};

export const updateContact = async (req: any, res: Response, args: {[key:string]:string}) => {
	const {id:_id} = args;
	const {error} = schemaID.validate({ _id })
	if (error) {
		return res.status(404).send(error.message);
	}
	const decode = req.user.id
	const keys = await Object.keys(req.body).map((key, ind, arr) =>
		arr.find((value) => req.body[value].length > 0 && value == key)
	);
	const updateTime = new Date().toISOString();
	try {
		// const person = keys.map((key: string|undefined) => {
		// 	db.query(sql`UPDATE contacts SET ${key} = ${req.body.key}
		// 		updated = ${updateTime} where id =${_id}
		// 		And users_id = ${decode} Returning *`)
		// })
		const person = await db.query(sql`UPDATE contacts SET 
					fname = ${args.fname}, 
					phone = ${args.phone}, 
					email = ${args.email}, 
					lname = ${args.lname}, 
					updated = ${updateTime} 
					WHERE id =${_id} AND users_id=${decode}`)
		return person;
		} catch (error) {
			return error.message;
	}
};

export const deleteContact = async (req: any, res: Response,args:string) => {
	const  _id  = args
	const decode = req.user.id
	console.log("starting")
	try {
		console.log("sql side")
		const person = await db.query(sql`Delete from contacts Where id = ${_id}  and users_id = ${decode} Returning *`);
		console.log(person)
		return person
	} catch (error) {
		return error.message
	}
};

const schema = joi.object({
	fname: joi.string().trim(), //.required(),
	lname: joi.string().trim(), //.required(),
	email: joi.string().email().trim(), //.required(),
	phone: joi.string().trim() //.required()
});

const schemaID = joi.object({
	_id: joi.string().min(15).trim().required()
});


interface Contact{
	fname: string; //.required(),
	lname: string; //.required(),
	email: string;//.required(),
	phone: string;
}
