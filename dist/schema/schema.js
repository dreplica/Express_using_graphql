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
const user = new graphql_1.GraphQLObjectType({
    name: 'Person',
    fields: {
        id: { type: graphql_1.GraphQLString },
        fname: { type: graphql_1.GraphQLString },
        lname: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        contacts: {
            type: contact,
            args: {
                id: { type: graphql_1.GraphQLString }
            },
            resolve: (par, args, { req, res }) => {
            }
        }
    }
});
const Root = new graphql_1.GraphQLObjectType({
    name: 'root',
    fields: {
        Contacts: {
            type: graphql_1.GraphQLList(contact),
            resolve: async (_p, _a, { req, res, id }) => {
                console.log(id);
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
                console.log("this is args", args.id);
                console.log("where", req.user.id);
                return Contact_callbacks_1.getOneContact(req, res, args.id);
            }
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: () => ({
        SignIn: {
            type: user,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve(parent, args, { req, res }) {
                req.body = args;
                user_callback_1.SignIn(req, res);
            }
        },
        SignUp: {
            type: user,
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
                return user_callback_1.SignUp(req, res);
            }
        },
        AddContact: {
            type: contact,
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
            type: contact,
            args: {
                id: { type: graphql_1.GraphQLString },
                fname: { type: graphql_1.GraphQLString },
                phone: { type: graphql_1.GraphQLString },
                lname: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString }
            },
            resolve(par, args, { req, res }) {
                return Contact_callbacks_1.deleteContact(req, res, { ...args });
            }
        },
        DeleteContact: {
            type: contact,
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