// Datbase configruation
const dbHost = process.env.CHOREO_APPOINTMENTDBCONNECTION_HOSTNAME;
const dbUser = process.env.CHOREO_APPOINTMENTDBCONNECTION_USERNAME;
const dbPassword = process.env.CHOREO_APPOINTMENTDBCONNECTION_PASSWORD;
const dbName = process.env.CHOREO_APPOINTMENTDBCONNECTION_DATABASENAME;
const dbPort = process.env.CHOREO_APPOINTMENTDBCONNECTION_PORT;

// Twilio configruation
const twilioAccountSid = process.env.CHOREO_TWILIOCONNECTION_ACCOUNTSID;
const twilioAuthToken = process.env.CHOREO_TWILIOCONNECTION_TOKEN;

// User Manager configruation
const userManagerServiceUrl = process.env.CHOREO_USERMANAGERCONNECTION_SERVICEURL;
const userManagerAPIkey = process.env.CHOREO_USERMANAGERCONNECTION_CHOREOAPIKEY;

module.exports = {
    dbHost,
    dbUser,
    dbPassword,
    dbName,
    dbPort,
    twilioAccountSid,
    twilioAuthToken,
    userManagerServiceUrl,
    userManagerAPIkey
};
