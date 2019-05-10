import crypto from 'crypto';

export function hashPass(pass: string) {
    return crypto.createHash("sha256").update(pass).digest("hex");
}
