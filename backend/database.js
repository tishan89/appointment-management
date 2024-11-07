const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.CHOREO_APPOINTMENTDBCONNECTION_DATABASENAME,
  process.env.CHOREO_APPOINTMENTDBCONNECTION_USERNAME,
  process.env.CHOREO_APPOINTMENTDBCONNECTION_PASSWORD,
  {
    host: process.env.CHOREO_APPOINTMENTDBCONNECTION_HOSTNAME,
    dialect: 'mysql',
    port: process.env.CHOREO_APPOINTMENTDBCONNECTION_PORT,
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
