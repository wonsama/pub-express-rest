import { getPrismaError, isPrismaError } from '../utils/prismaUtil.js';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { errorPrismaHandler } from '../middleware/errorMiddleware.js';

const prisma = new PrismaClient();

/**
 * Retrieves a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved and sent as a response.
 */
export async function getUserById(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'user id required' }); // 400 Bad Request
  }

  let cmnUser;
  try {
    cmnUser = await prisma.cmnUser.findUnique({ where: { id } });
  } catch (e) {
    return next(e);
  }

  // 비공개 정보를 제거한 후 반환
  if (cmnUser) {
    delete cmnUser.pswr;
  }

  res.json(cmnUser);
}

export async function createUser(req, res, next) {
  const { name, mail, nckn, celPhn, pswr } = req.body;

  if (!name || !mail || !pswr) {
    return res.status(400).json({ error: 'name, mail, pswr required' }); // 400 Bad Request
  }

  let cmnFind;

  try {
    cmnFind = await prisma.cmnUser.findUnique({
      where: { mail },
    });
  } catch (e) {
    return next(e);
  }

  if (!cmnFind) {
    return res.status(400).json({ error: 'mail already exists' }); // 400 Bad Request
  }

  const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화
  let cmnUser;
  try {
    cmnUser = await prisma.cmnUser.create({
      data: {
        name,
        mail,
        nckn,
        celPhn,
        pswr: hash,
      },
    });
  } catch (e) {
    return next(e);
  }

  res.json(cmnUser);
}
