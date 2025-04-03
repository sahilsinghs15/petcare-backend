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
        userId : user._id,
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
    const appointments = await Appointment.find({userId: user._id , status: 'Pending'});
    if (!appointments) {
        return next(new appError('No appointments found', 404));
    }
    res.status(200).json({
        success: true,
        message : 'My appointments',
        appointments,
    });
});

export const cancleAppointment = asyncHandler(async (req, res, next) => {
    const { appointmentId } = req.params;

    // Validate appointmentId
    if (!appointmentId) {
        return next(new appError('Appointment ID is required', 400));
    }

    // Check if the user exists
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new appError('User not found', 404));
    }

    // Find the appointment and update its status
    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status: 'Cancelled' },
        { new: true, runValidators: true } // Ensure validators are run
    );

    // Debugging: Log the appointmentId and the result
    console.log('Appointment ID:', appointmentId);
    console.log('Updated Appointment:', appointment);

    if (!appointment) {
        return next(new appError('Appointment not found or status update failed', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Appointment status updated to Cancelled successfully',
        data: appointment,
    });
});