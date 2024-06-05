import { createRole, getRoles } from '../controllers/roleController.js';

import express from 'express';

const router = express.Router();

router.post('/', createRole);

router.get('/', getRoles);

// router.post("/group", createGroup);
// router.post("/relation", createRelation);

export default router;
