require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const oauth = require('axios-oauth-client')

const { getAppointmentById, fetchAppointments, createAppointment, updateAppointment, getAppointmentTypes } = require('./dao');  // Adjust the path as necessary

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Endpoint to get appointments, filtering by email
app.get('/appointments', async (req, res) => {
    try {
        const { upcoming, email } = req.query;
        if (!email) {
            return res.status(400).send('Email query parameter is required');
        }

        const appointments = await fetchAppointments(upcoming, email);
        const serviceURL = process.env.svcurl;
        const cs = process.env.cs;
        const ck = process.env.ck;
        const tu = process.env.token;
        // consumerKey, consumerSecret and tokenUrl represent variables to which respective environment variables were read
        const getClientCredentials = oauth.clientCredentials(
        axios.create(),
        tu,
        ck,
        cs
        );
        const auth = await getClientCredentials();
        const accessToken = auth.access_token;
        const resourcePath = `${serviceURL}/booking`;

        const response = await axios.post(resourcePath, 
            {
                "empId": 1,
                "from": "string",
                "destination": "string"
              },
         {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log("response", response.data);
        
        res.status(200).send(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).send(error.message);
    }
});

app.get('/appointments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await getAppointmentById(id);
        if (appointment === null) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.status(200).send(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.put('/appointments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedAppointment = await updateAppointment(id, req.body);

        if (updatedAppointment === null) {
            return res.status(404).send({ message: 'Appointment not found' });
        }

        res.status(200).send(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.post('/create-appointment', async (req, res) => {
    try {
        const newAppointment = await createAppointment(req.body);
        res.status(201).send(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.get('/appointment-types', (req, res) => {
    try {
        const services = getAppointmentTypes();
        res.status(200).send(services);
    } catch (error) {
        console.error('Error fetching appointment types:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
