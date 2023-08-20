import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { getProducts, getProductById } from '../controllers/productController.js';

router.get('/', getProducts);

router.get('/:id', getProductById
);

export default router;