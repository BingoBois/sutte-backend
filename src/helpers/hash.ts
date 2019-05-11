import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../app';

export function hashPass(pass: string) {
    return crypto.createHash("sha256").update(pass).digest("hex");
}

export function signToken(payload: string | object | Buffer, expiresIn: string | number = "1m") {
    return jwt.sign(payload, JWT_KEY, {
        expiresIn
    });
}
