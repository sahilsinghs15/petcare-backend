import { Router } from 'express';
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cart.controller.js';
import { isLoggedIn } from '../middlewares/authmiddleware.js';

const router = Router();

// {{URL}}/api/v1/cart
router.get('/',isLoggedIn,getCart);
router.post('/add/:productId',isLoggedIn,addToCart);
router.put('/update/:productId',isLoggedIn,updateCartItem);
router.delete('/delete/:productId',isLoggedIn,removeFromCart);

export default router;
