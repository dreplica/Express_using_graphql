"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Contact_callbacks_1 = require("../controllers/Contact-callbacks");
const user_callback_1 = require("../controllers/user-callback");
const authenticate_1 = require("../controllers/authenticate");
const contact = new graphql_1.GraphQLObjectType({
    name: 'contact',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        fname: { type: graphql_1.GraphQLString },
        lname: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString }
    })
});
const token = new graphql_1.GraphQLObjectType({
    name: 'Token',
    fields: () => ({
        token: { type: graphql_1.GraphQLString },
    })
});
const user = new graphql_1.GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        fname: { type: graphql_1.GraphQLString },
        lname: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        Contacts: {
            type: graphql_1.GraphQLList(contact),
            args: {
                id: { type: graphql_1.GraphQLString }
            },
            resolve: (par, args, { req, res }) => {
                return Contact_callbacks_1.getAllContacts(req, res);
            }
        }
    })
});
const Root = new graphql_1.GraphQLObjectType({
    name: 'root',
    fields: {
        Contacts: {
            type: graphql_1.GraphQLList(contact),
            resolve: async (_p, _a, { req, res, id }) => {
                return Contact_callbacks_1.getAllContacts(req, res);
            }
        },
        Contact: {
            type: contact,
            args: {
                id: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve(par, args, { req, res }) {
                return Contact_callbacks_1.getOneContact(req, res, args.id);
            }
        },
        Profile: {
            type: graphql_1.GraphQLList(user),
            resolve: async (par, args, { req, res }) => {
                const person = await user_callback_1.Profile(req, res);
                return person;
            }
        },
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: () => ({
        SignIn: {
            type: token,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args) {
                return user_callback_1.SignIn(args);
            }
        },
        SignUp: {
            type: token,
            args: {
                id: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
                fname: { type: graphql_1.GraphQLString },
                lname: { type: graphql_1.GraphQLString },
                username: { type: graphql_1.GraphQLString }
            },
            resolve: (parent, args, { req, res, next }) => {
                authenticate_1.auth(req, res, next);
                return user_callback_1.SignUp(args);
            }
        },
        AddContact: {
            type: graphql_1.GraphQLList(contact),
            args: {
                fname: { type: graphql_1.GraphQLString },
                phone: { type: graphql_1.GraphQLString },
                lname: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            },
            resolve(par, args, { req, res }) {
                return Contact_callbacks_1.addContact(req, res, { ...args });
            }
        },
        updateContact: {
            type: graphql_1.GraphQLList(contact),
            args: {
                id: { type: graphql_1.GraphQLString },
                fname: { type: graphql_1.GraphQLString },
                phone: { type: graphql_1.GraphQLString },
                lname: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            },
            resolve(par, args, { req, res }) {
                return Contact_callbacks_1.updateContact(req, res, { ...args });
            }
        },
        DeleteProfile: {
            type: graphql_1.GraphQLList(user),
            args: {
                id: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve(par, args, { req, res }) {
                return user_callback_1.deleteProfile(args.id);
            }
        },
        DeleteContact: {
            type: graphql_1.GraphQLList(contact),
            args: {
                id: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve(par, args, { req, res }) {
                return Contact_callbacks_1.deleteContact(req, res, args.id);
            }
        },
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: Root,
    mutation: Mutation
});
//# sourceMappingURL=schema.js.map