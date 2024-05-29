require('dotenv').config();

const { Sequelize } = require('sequelize');
const Appointment = require('./appointmentModel'); // Import the model

// Sync Sequelize models
Appointment.sequelize.sync().then(() => {
    console.log(`Database & tables created!`);
});

async function fetchAppointments(upcoming, email) {
    try {
        let whereCondition = {};

        if (upcoming === 'true') {
            const now = new Date();
            //const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            whereCondition.appointmentDate = {
                [Sequelize.Op.gte]: now
            };
        }

        // Filter by email address if provided
        if (email) {
            whereCondition.email = email;
        }

        const appointments = await Appointment.findAll({
            where: whereCondition,
            order: [['appointmentDate', 'ASC']], // Optionally, order by date
        });

        return appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

async function getAppointmentById(id) {
    try {
        const appointment = await Appointment.findOne({ where: { id } });

        if (!appointment) {
            return null;
        }

        return appointment;
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error;
    }
}

async function createAppointment(appointmentDetails) {
    try {
        const { name, service, phoneNumber, email, appointmentDate } = appointmentDetails;
        const newAppointment = await Appointment.create({ name, service, phoneNumber, email, appointmentDate });
        return newAppointment;
    } catch (error) {
        console.error('Error booking appointment:', error);
        throw error;
    }
}

async function updateAppointment(id, appointmentDetails) {
    try {
        const appointment = await Appointment.findOne({ where: { id } });

        if (!appointment) {
            return null;
        }

        const { name, service, phoneNumber, email, appointmentDate } = appointmentDetails;
        appointment.name = name;
        appointment.service = service;
        appointment.phoneNumber = phoneNumber;
        appointment.email = email;
        appointment.appointmentDate = appointmentDate;

        await appointment.save();
        return appointment;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}

async function deleteAppointment(id) {
    try {
        const result = await Appointment.destroy({ where: { id } });

        if (result === 0) {
            return null;
        }

        return { message: 'Appointment deleted successfully' };
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

function getAppointmentTypes() {
    const services = [
        { value: 'general-consultation', label: 'General Consultation' },
        { value: 'health-screening', label: 'Health Screenings' },
        { value: 'flu-shots', label: 'Flu Shots' }
    ];

    return services;
}

module.exports = { getAppointmentById, fetchAppointments, createAppointment, updateAppointment, deleteAppointment, getAppointmentTypes };
