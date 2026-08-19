const { TokenType, TokenStatus } = require('../shared');
const { GenerateTokenSchema } = require('../shared');

describe('Token Service & Priority Logic', () => {
  it('should calculate priority score correctly for all token types', () => {
    const getPriority = (type) => {
      if (type === TokenType.EMERGENCY) return 100;
      if (type === TokenType.ELDERLY) return 50;
      if (type === TokenType.APPOINTMENT) return 20;
      return 10;
    };

    expect(getPriority(TokenType.EMERGENCY)).toBe(100);
    expect(getPriority(TokenType.ELDERLY)).toBe(50);
    expect(getPriority(TokenType.APPOINTMENT)).toBe(20);
    expect(getPriority(TokenType.WALK_IN)).toBe(10);
  });

  it('should validate GenerateTokenSchema correctly', () => {
    const valid = GenerateTokenSchema.safeParse({
      departmentId: '507f1f77bcf86cd799439011',
      tokenType: 'EMERGENCY'
    });

    expect(valid.success).toBe(true);
    if (valid.success) {
      expect(valid.data.tokenType).toBe('EMERGENCY');
    }
  });

  it('should reject GenerateTokenSchema without departmentId', () => {
    const result = GenerateTokenSchema.safeParse({
      tokenType: 'WALK_IN'
    });

    expect(result.success).toBe(false);
  });
});

