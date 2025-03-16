import { Router } from "express";
import { isLoggedIn } from "../middlewares/authmiddleware.js";
import { createAppointment, deleteAppointment, getMyAppointments } from "../controllers/appointment.controller.js";

const router = Router();

router.post("/create-appointment" , isLoggedIn , createAppointment);
router.get("/my-appointments" , isLoggedIn , getMyAppointments);
router.delete("/delete-appointment/:id" , isLoggedIn , deleteAppointment);

export default router;