const { RegisterSchema, LoginSchema } = require('../shared');
const { UserRole } = require('../shared');

describe('Authentication Schema Validations', () => {
  it('should validate valid user registration payload', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '1234567890',
      role: UserRole.PATIENT
    };

    const result = RegisterSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email in registration', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      phone: '1234567890'
    };

    const result = RegisterSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate valid login payload', () => {
    const validLogin = {
      email: 'admin@hqms.com',
      password: 'password123'
    };

    const result = LoginSchema.safeParse(validLogin);
    expect(result.success).toBe(true);
  });
});
