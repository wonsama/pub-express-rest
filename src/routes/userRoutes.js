import {
  authExceptionHandler,
  authenticateAccessJWT,
} from '../middleware/authenticationMiddleware.js';
import {
  createUser,
  getMe,
  getUserById,
  getUsers,
} from '../controllers/userController.js';

import express from 'express';

const router = express.Router();

// 라우팅 시 :id 와 같이 path parameter 를 사용하는 것을 상위에 배치하고, 그 외의 경우는 하위에 배치한다.

// GET /api/user
// router.get('/', userController.getAllUsers);

// GET /api/user/:id
router.get('/:id', getUserById);

// GET /api/user
router.get('/', getUsers);

// POST /api/user
router.post('/', createUser);
router.post('/me', authenticateAccessJWT, getMe);

// PUT /api/user/:id
// router.put('/:id', userController.updateUser);

// DELETE /api/user/:id
// router.delete('/:id', userController.deleteUser);

export default router;
