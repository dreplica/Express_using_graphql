/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('contacts', {
        users_id: {
            type: `uuid`,
        }
    })
};
