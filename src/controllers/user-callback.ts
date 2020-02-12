// import contact, { contactSchema } from '../routes/contact';
import joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { db, sql } from '../Models/contact-postgres';

export const SignUp = async (args: { [key: string]: any }) => {
	console.log("entering")
	const { error } = schemaSignUp.validate(args)
    if (error) {
        return error.message
    }
	const details = {...args};
	let person = await db.query(sql`Select email From users Where email =${details.email}`);
	if (person.length >= 1) {
		return ('this email address is taken');
	}
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(details.password, salt);
		const person = await db.query(sql`Insert into users Values (uuid_generate_v4(),
			${details.username},${details.email},${hash},${details.fname},
			${details.lname}) Returning *`);
		const sat = process.env.JWTTOKEN;
		const token = jwt.sign({ id: person[0].id }, <string>sat);
		console.log(token)
		return {token:token};
	} catch (error) {
		return error.message;
	}
};

export const SignIn = async (args: { [key: string]: any }) => {
	const { error } = schemaSignUp.validate(args)
    if (error) {
        return error.message
    }
	const details = {...args};
	try {
		const person = await db.query(
			sql`Select fname,lname,id,password From users where email=${details.email}`);
		const checkPassword = await bcrypt.compare(details.password, person[0].password);
		if (person.length <= 0 || !checkPassword) {
			return 'username or password mismatch' ;
		}
		const sat = process.env.JWTTOKEN;
		const token = jwt.sign({ id: person[0].id }, <string>sat);
		return {token:token};
	} catch (error) {
		return 'user not found';
	}
};

export const Profile = async (req: any, res: Response) => {
	const decode = req.user.id
	try {
		const person = await db.query(sql`Select fname,username,id,lname,email From users where id=${decode}`);
		console.log("abdul fatir")
		return person;
	} catch (error) {
		return error.message;
	}
};

export const updateProfile = async (req: any, res: Response) => {
	const decode = req.user.id
	// const keys = Object.keys(req.body).filter(x => req.body[x] != "")
	try {
		const person = await db.query(sql`Update users Set 
					fname = ${req.body['phone']}, 
					email = ${req.body['email']}, 
					lname = ${req.body['lname']}
					where id = ${decode} Returning *`)
		return res.status(200).json(person)
	} catch (error) {
		return res.status(404).json(error.message)
	}
};

export const deleteProfile = async (args:any) => {
	const decode = args
	try {
		const person = db.query(sql`Delete from users Where id = ${decode}`);
		db.query(sql`Delete from contacts Where users_id = ${decode}`);
		return person;
	} catch (error) {
		return error.message;
	}
};



const schemaSignUp = joi.object({
	fname: joi.string().trim(),//.required(),
	lname: joi.string().trim(),//.required(),
	email: joi.string().email().trim(),//.required(),
	username: joi.string().trim(),//.required()
	password: joi.string().alphanum().trim(),//.required()
});

const schemaSignIn = joi.object({
	email: joi.string().email().trim(),//.required(),
	password: joi.string().alphanum().trim(),//.required()
});