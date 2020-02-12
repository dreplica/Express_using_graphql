import { GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID } from 'graphql';
import { getAllContacts, getOneContact, deleteContact, addContact, updateContact } from '../controllers/Contact-callbacks';
import {SignIn, SignUp, Profile, deleteProfile} from '../controllers/user-callback'
import { Response, Request } from 'express';
import { auth } from '../controllers/authenticate';

export interface contextRe {
	req: Request;
	res: Response;
}

const contact = new GraphQLObjectType({
	name: 'contact',
	fields:()=>({
		id: { type: GraphQLString },
		fname: { type: GraphQLString },
		lname: { type: GraphQLString },
		phone: { type: GraphQLString },
		email: { type: GraphQLString }
	})
});
const token = new GraphQLObjectType({
	name: 'Token',
	fields: () => ({
		token: { type: GraphQLString },
	})
})
const user = new GraphQLObjectType({
	name: 'Person',
	fields:()=> ({
		id: { type: GraphQLString },
		fname: { type: GraphQLString },
		lname: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
			Contacts: {
				type: GraphQLList(contact),
				args: {
					id:{type:GraphQLString}
				},
				resolve: (par, args, { req, res }) => {
					return getAllContacts(req, res)
				}
			}
	})
});

const Root = new GraphQLObjectType({
	name: 'root',
	fields: {
		Contacts: {
			type: GraphQLList(contact),
			resolve: async (_p, _a, { req, res,id }) => {
				return getAllContacts(req, res);
			}
		},
		Contact: {
			type: contact,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve (par, args, { req, res}) {
				return getOneContact(req,res,args.id)
			}
		},
		Profile: {
			type: GraphQLList(user),
			resolve:  async (par, args, { req, res }) => {
				const person:Promise<any> = await Profile(req, res);
				return  person
			}
		},
	}
});



const Mutation = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		SignIn: {
			type: token,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parent,args) {
				return SignIn(args);
			}
		},
		SignUp: {
			type: token,
			args: {
				id: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				fname: { type: GraphQLString },
				lname: { type: GraphQLString },
				username: { type: GraphQLString }
			},
			resolve: (parent,args,{req,res,next}) => {
				auth(req, res, next);
				return SignUp(args);
			}
		},
		
		AddContact: {
			type: GraphQLList(contact),
			args: {
				fname: {type: GraphQLString},
				phone: {type: GraphQLString},
				lname: {type: GraphQLString},
				email: {type: GraphQLString}
			},
			resolve(par,args,{ req, res }){
				return addContact(req, res,{...args})
			}
	},
		updateContact: {
			type: GraphQLList(contact),
			args: {
				id: { type: GraphQLString },
				fname: {type: GraphQLString},
				phone: {type: GraphQLString},
				lname: {type: GraphQLString},
				email: {type: GraphQLString}
			},
			resolve(par,args,{ req, res }){
				return updateContact(req,res,{...args})
			}
	},
		DeleteProfile: {
			type: GraphQLList(user),
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(par, args, { req, res }) {
				return deleteProfile(args.id)
			}
	},
		DeleteContact: {
			type: GraphQLList(contact),
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(par, args, { req, res }) {
				return deleteContact(req,res,args.id)
			}
	},
	})
})

export default new GraphQLSchema({
	query: Root,
	mutation:Mutation
});
