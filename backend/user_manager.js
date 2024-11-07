import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Choreo-API-Key': process.env.API_Key,
    }
  });

const getUserDetails = async (email) => {
    try {
        const response = await api.get(`/users/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

module.exports = getUserDetails;
