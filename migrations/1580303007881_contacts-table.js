/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('contacts', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        fname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        lname: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        email: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        phone: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        created: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        updated: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('contacts')
};
