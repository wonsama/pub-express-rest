import { getUsers, postUser } from "../controllers/userController.js";

import { authenticateAccessJWT } from "../middleware/authenticationMiddleware.js";
import express from "express";

const router = express.Router();

// 라우팅 시 :id 와 같이 path parameter 를 사용하는 것을 상위에 배치하고, 그 외의 경우는 하위에 배치한다.

// GET /api/user/:id, 사용자 id 에 해당하는 사용자 정보를 가져온다.
// router.get("/:id", getUserById);

// GET /api/user, 모든 사용자 정보를 가져온다.
router.get("/", authenticateAccessJWT, getUsers);

// POST /api/user, 사용자 정보를 생성한다.
router.post("/", authenticateAccessJWT, postUser);

// PUT /api/user/:id
// router.put('/:id', userController.updateUser);

// DELETE /api/user/:id
// router.delete('/:id', userController.deleteUser);

export default router;
