import {
  getMe,
  postLogin,
  postLogout,
  postToken,
} from "../controllers/authController.js";

import { authenticateAccessJWT } from "../middleware/authenticationMiddleware.js";
import express from "express";

// authentication : 인증

const router = express.Router();

// POST /api/auth/login
router.post("/login", postLogin);

// POST /api/auth/logout
// 로그아웃시 refresh token 을 null 로 업데이트 한다 (주요기능, 사실 logout 하지 않아도 됨.)
// 로그아웃을 하면서 access token 이 만료될 수도 있음에 유의 ( client )
// 이런경우는 refresh token 을 가지고 다시 access token 을 발급받은 이후 로그아웃을 해야함
router.post("/logout", authenticateAccessJWT, postLogout);

// POST /api/auth/token
// refresh token 을 가지고서 새로운 access token 을 발급한다
router.post("/token", postToken);

// POST /api/auth/me : 사용자 정보를 가져온다
router.get("/me", authenticateAccessJWT, getMe);

export default router;
