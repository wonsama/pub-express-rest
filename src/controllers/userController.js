import { PrismaClient } from '@prisma/client';
import { SALT_ROUNDS } from '../config/config.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Retrieves a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved and sent as a response.
 */
export async function getUserById(req, res, next) {
  // 1. param
  const { id } = req.params;

  // 1. param - validation
  if (id == null) {
    return res.status(400).json({ error: 'user id required' }); // 400 Bad Request
  }

  // 2. db query : find user
  let cmnUser = null;
  try {
    cmnUser = await prisma.cmnUser.findUnique({
      where: { id },
      include: { cmnUserPrfl: true },
    });
  } catch (e) {
    return next(e);
  }

  if (cmnUser !== null) {
    delete cmnUser.hash;
  }

  // 3. response
  res.json(cmnUser);
}

/**
 * Creates a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is created and sent as a response.
 */
export async function createUser(req, res, next) {
  // 1. param
  const { mail, pswr } = req.body; // CmnUser
  const { name, nickName, celPhn } = req.body; // CmnUserPrfl, optional

  // 1. param : validation
  if (mail == null || pswr == null) {
    return res.status(400).json({ error: 'mail, pswr required' }); // 400 Bad Request
  }

  // 2. db query : find user
  let cmnFind = null;
  try {
    cmnFind = await prisma.cmnUser.findUnique({
      where: { mail },
    });
  } catch (e) {
    return next(e);
  }

  // user validation
  if (cmnFind !== null) {
    return res.status(400).json({ error: 'mail already exists' }); // 400 Bad Request
  }

  // 2. db query : create cmn_user
  const hash = await bcrypt.hash(pswr, SALT_ROUNDS); // 비밀번호 암호화
  let cmnUser;
  try {
    cmnUser = await prisma.cmnUser.create({
      data: {
        mail,
        hash,
      },
    });
  } catch (e) {
    return next(e);
  }

  // 2. db query : create cmn_user_prfl
  let cmnUserPrfl = null;
  try {
    cmnUserPrfl = await prisma.cmnUserPrfl.create({
      data: {
        userId: cmnUser.id,
        name,
        nickName,
        celPhn,
      },
    });
  } catch (e) {
    return next(e);
  }

  // 2. db query : cmnUser
  try {
    cmnFind = await prisma.cmnUser.findUnique({
      where: { mail },
      include: { cmnUserPrfl: true },
    });
  } catch (e) {
    return next(e);
  }

  delete cmnFind.hash;

  // 3. response
  res.json(cmnFind);
}
