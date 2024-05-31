import { createUser, getUserById } from '../controllers/userController.js';

import express from 'express';

const router = express.Router();

// GET /api/user
// router.get('/', userController.getAllUsers);

// GET /api/user/:id
router.get('/:id', getUserById);

// POST /api/user
router.post('/', createUser);

// PUT /api/user/:id
// router.put('/:id', userController.updateUser);

// DELETE /api/user/:id
// router.delete('/:id', userController.deleteUser);

export default router;
