import { shuffle, sampleSize } from 'lodash';
import { scryptSync, randomBytes } from 'crypto';

export const generatePassword = () => {
  const lower = 'qwertyuioplkjhgfdsazxcvbnm';
  const digits = '1234567890';
  const upper = 'QWERTYUIOPLKJHGFDSAZXCVBNM';

  return shuffle(
    sampleSize(lower, 3).join('') +
      sampleSize(digits, 2).join('') +
      sampleSize(upper, 3).join(''),
  ).join('');
};

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 32).toString('hex')}`;
};

export const checkPassword = (password: string, hash: string) => {
  const [salt, key] = hash.split(':');
  const hashed = scryptSync(password, salt, 32).toString('hex');
  return key == hashed;
};
