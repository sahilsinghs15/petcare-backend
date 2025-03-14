import {Schema , model} from 'mongoose';

const appointmentSchema = new Schema({
    petOwner : {
        type : String,
        required : true
    },
    petCategory :{
        type : String,
        required : true
    },
    petName : {
        type : String,
        required : true
    },
    appointmentDate : {
        type : Date,
        required : true
    },
    appointmentTime : {
        type : String,
        required : true
    },
},{timestamps : true});

const Appointment = model('Appointment' , appointmentSchema);
export default Appointment;