/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users',{
        id: {
            type: `uuid`,
            notNull: true,
            primarykey:true,
            default:pgm.func(`uuid_generate_v4()`)
        },
        username: {
            type: `VARCHAR(100)`,
            notNull: true,
        },
        email: {
            type: `VARCHAR(200)`,
            notNull: true,
        },
        password: {
            type: `VARCHAR(200)`,
            notNull: true,
        },
        fname: {
            type: `VARCHAR(100)`,
            notNull: true,
        },
        lname: {
            type: `VARCHAR(100)`,
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('users')
};
