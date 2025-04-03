import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getOrders,
  getUserOrders,
  cancelOrder,
} from '../controllers/order.controller.js';
import { isLoggedIn, authorizeRoles } from '../middlewares/authmiddleware.js';


const router = express.Router();

/**
 * @CREATE_ORDER
 * @ROUTE @POST {{URL}}/api/v1/orders
 * @ACCESS User
 */
router.route('/')
  .post(isLoggedIn, (req, res, next) => {
    req.body.paymentInfo = {
      method: req.body.paymentInfo.method || 'COD', // Default to COD if not provided
      status: 'Unpaid'
    };
    next();
  }, createOrder);

router.route('/orders').get(isLoggedIn,getUserOrders);
router.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), getOrders);
router.route('/:id')
  .get(isLoggedIn, getOrderById)
  .put(isLoggedIn, authorizeRoles('ADMIN'), updateOrderStatus)

router.put('/:id/cancel',isLoggedIn,cancelOrder);


export default router;
