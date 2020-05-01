// const Sequelize = require('sequelize');
// const database = require('./config');
// let sequelize;

// if (process.env.DATABASE_URL) {
//     /** @type {Sequelize} [database connection for heroku production] */
//     sequelize = new Sequelize(process.env.DATABASE_URL, {
//         dialect: 'postgres',
//         protocol: 'postgres',
//         port: 5432,
//         host: "<heroku host>",
//         logging: true //false
//     });

// }
// if (process.env.NODE_ENV === 'production') {
//     /** @type {Sequelize} [database connection for heroku production] */
//     sequelize = new Sequelize(
//         database.production.database,
//         database.production.username,
//         database.production.password, {
//             host: database.production.host,
//             dialect: database.production.dialect,

//             pool: {
//                 max: 5,
//                 min: 0,
//                 acquire: 30000,
//                 idle: 10000
//             }
//         }
//     );
// }
// else {
//     /** @type {Sequelize} [database connection for development env] */
//     sequelize = new Sequelize(
//         database.development.database,
//         database.development.username,
//         database.development.password,
//         {
//             host: database.development.host,
//             dialect: database.development.dialect,


//             pool: {
//                 max: 5,
//                 min: 0,
//                 acquire: 30000,
//                 idle: 10000
//             }
//         }
//     );
// }

// module.exports = sequelize;

// "development2": {
//     "username": "b312eb3baf49d9",
//     "password": "88b63192",
//     "database": "heroku_cf20b94ac37f390",
//     "host": "us-cdbr-iron-east-02.cleardb.net",
//     "dialect": "mysql"
//   },