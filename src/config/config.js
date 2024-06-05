import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { parseN } from "../utils/NumberUtil.js";
import path from "path";

dotenv.config();

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * dotenv-cli 를 통해 다중 환경변수 로드를(.env.local, .env.dev, .env.prod) 수행한다
 * 공통처리를 위한 설정 정보는 config.js 에서 관리한다
 */
export const ROOT_DIR = path.resolve(__dirname, "..");
export const NODE_ENV = process.env.NODE_ENV || "NODE_ENV not set!";
export const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL || "http";
export const SERVER_HOST = process.env.SERVER_HOST || "localhost";
export const SERVER_PORT = parseN(process.env.SERVER_PORT, 3000);
export const SALT_ROUNDS = parseN(process.env.SALT_ROUNDS, 10);
