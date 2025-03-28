import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import appError from "../utils/appError.js";

export const createAppointment = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new appError('User not found', 404));
    }
    const {petCategory , petName , appointmentDate , appointmentTime} = req.body;
    if(!petCategory || !petName || !appointmentDate || !appointmentTime){
        return next(new appError('All fields are required', 400));
    }


    const appointment = await Appointment.create({
        petOwner: user.fullName,
        petCategory,
        petName,
        appointmentDate,
        appointmentTime,
    });
    
    res.status(201).json({
        success: true,
        message: 'Appointment created successfully',
        appointment,
    }); 
});

export const getAppointments = asyncHandler(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        message : 'All appointments',
        appointments,
    });
});

export const getMyAppointments = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new appError('User not found', 404));
    }
    const appointments = await Appointment.find({petOwner : user.name});
    res.status(200).json({
        success: true,
        message : 'My appointments',
        appointments,
    });
});

export const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
        return next(new appError('Appointment not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Appointment deleted successfully',
    });
}
);