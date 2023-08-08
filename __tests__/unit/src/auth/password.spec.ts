import { isValid, generate } from '../../../../src/auth/password';

describe('Crypto module', () => {
  describe('isValid function', () => {
    it('should return true for valid password', () => {
      const password = 'securePassword';
      const { salt, hash } = generate(password);

      expect(isValid(password, hash, salt)).toBe(true);
    });

    it('should return false for invalid password', () => {
      const password = 'securePassword';
      const { salt, hash } = generate(password);
      const wrongPassword = 'wrongPassword';

      expect(isValid(wrongPassword, hash, salt)).toBe(false);
    });
  });

  describe('generate function', () => {
    it('should return valid salt and hash', () => {
      const password = 'testPassword';
      const { salt, hash } = generate(password);

      expect(typeof salt).toBe('string');
      expect(salt.length).toBe(64); // 32 bytes in hex form (2 characters per byte)
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(128); // 64 bytes in hex form (2 characters per byte)
    });
  });
});
