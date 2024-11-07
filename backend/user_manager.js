const axios = require('axios');

const api = axios.create({
    baseURL: process.env.CHOREO_USERMANAGERCONNECTION_SERVICEURL,
    headers: {
      'Content-Type': 'application/json',
      'Choreo-API-Key': process.env.CHOREO_USERMANAGERCONNECTION_CHOREOAPIKEY,
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
