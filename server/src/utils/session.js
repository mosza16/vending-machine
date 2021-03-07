import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const secretKey = process.env.SESSION_ENCRYPT_SECRET;
const iv = process.env.SESSION_ENCRYPT_IV

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(text, 'hex')),
    decipher.final(),
  ]);
  return decrpyted.toString();
};
