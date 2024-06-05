import {
  authenticateAccessJWT,
  authenticateRefreshJWT,
} from "../middleware/authenticationMiddleware.js";
import {
  getMe,
  postLogin,
  postLogout,
  postToken,
} from "../controllers/authController.js";

import { checkPermission } from "../middleware/authorizationMiddleware.js";
import express from "express";

// authentication : 인증

const router = express.Router();

// POST /api/auth/login
router.post("/login", postLogin);

// POST /api/auth/logout
// 로그아웃시 refresh token 을 null 로 업데이트 한다
router.post("/logout", authenticateRefreshJWT, postLogout);

// POST /api/auth/token
// refresh token 을 가지고서 새로운 access token 을 발급한다
router.post("/token", postToken);

// POST /api/auth/me : 사용자 정보를 가져온다
router.get("/me", authenticateAccessJWT, getMe);

export default router;
