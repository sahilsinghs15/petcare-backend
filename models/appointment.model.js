import {Schema , model} from 'mongoose';

const appointmentSchema = new Schema({
    userId :{
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
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
    status : {
        type : String,
        enum : ['Pending','Approved','Cancelled'],
        default : 'Pending'
    }
},{timestamps : true});

const Appointment = model('Appointment' , appointmentSchema);
export default Appointment;