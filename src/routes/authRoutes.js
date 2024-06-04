import {
  getLogin,
  getLogout,
  getToken,
} from '../controllers/authController.js';

import { authenticateRefreshJWT } from '../middleware/authenticationMiddleware.js';
import { checkPermission } from '../middleware/authorizationMiddleware.js';
import express from 'express';

// authentication : 인증

const router = express.Router();

// POST /api/auth/login
router.post('/login', getLogin);

// POST /api/auth/logout
// 로그아웃시 refresh token 을 null 로 업데이트 한다
router.post('/logout', authenticateRefreshJWT, getLogout);

// POST /api/auth/token (refresh token)
// bearer token 이 존재하지 않거나 유요하지 않은 경우 401 (unauthorized) 을 반환한다
// refresh token 을 가지고서 새로운 access token 을 발급한다
router.post('/token', authenticateRefreshJWT, getToken);

export default router;
