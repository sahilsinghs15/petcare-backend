import { Router } from "express";
import { isLoggedIn } from "../middlewares/authmiddleware.js";
import { cancleAppointment, createAppointment, getMyAppointments } from "../controllers/appointment.controller.js";

const router = Router();

router.post("/create-appointment" , isLoggedIn , createAppointment);
router.get("/my-appointments" , isLoggedIn , getMyAppointments);
router.patch("/cancel-appointment/:appointmentId" ,isLoggedIn, cancleAppointment);

export default router;