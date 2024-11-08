const axios = require('axios');
const configs = require('./config');
const { userManagerServiceUrl, userManagerAPIkey } = configs;

const api = axios.create({
    baseURL: userManagerServiceUrl,
    headers: {
      'Content-Type': 'application/json',
      'Choreo-API-Key': userManagerAPIkey,
    }
  });

const getUserDetails = async (email) => {
    try {
        const response = await api.get(`/users/${email}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

module.exports = getUserDetails;
