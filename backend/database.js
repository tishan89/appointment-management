const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.CHOREO_APPOINTMENTDB_DATABASENAME,
  process.env.CHOREO_APPOINTMENTDB_USERNAME,
  process.env.CHOREO_APPOINTMENTDB_PASSWORD,
  {
    host: process.env.CHOREO_APPOINTMENTDB_HOSTNAME,
    dialect: 'mysql',
    port: process.env.CHOREO_APPOINTMENTDB_PORT,
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
