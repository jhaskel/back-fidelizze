process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const promise = require('bluebird');

require('https').globalAgent.options.rejectUnauthorized = false

const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);

const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});



const databaseConfig = {
    'host': 'gepron.com.br',
    'port': 5432,
    'database': 'gepronco_saude',
    'user': 'gepronco_joao',
    'password': 'Haskel00*',
          
};


const db = pgp(databaseConfig);

module.exports = db;