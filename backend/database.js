const { Sequelize } = require('sequelize');
import {dbHost, dbName, dbUser, dbPassword, dbPort} from './config';

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // This ensures the connection uses SSL without verifying the server's certificate
      }
    }
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
