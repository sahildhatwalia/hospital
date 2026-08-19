const { z } = require('zod');
const { UserRole, TokenType, DoctorStatus, TokenStatus } = require('./constants');

const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum([UserRole.PATIENT, UserRole.DOCTOR, UserRole.RECEPTIONIST, UserRole.ADMIN]).default(UserRole.PATIENT),
});

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const CreateDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name required'),
  code: z.string().min(2, 'Code required e.g. CARD').max(5).transform(v => v.toUpperCase()),
  description: z.string().optional(),
  avgConsultationTimeMinutes: z.number().min(1).default(15),
});

const CreateDoctorSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  departmentId: z.string().min(1, 'Department ID is required'),
  roomNumber: z.string().min(1, 'Room number is required'),
  maxDailyTokens: z.number().min(1).default(50),
  shift: z.object({
    startTime: z.string().default('09:00'),
    endTime: z.string().default('17:00'),
  }).default({ startTime: '09:00', endTime: '17:00' }),
});

const GenerateTokenSchema = z.object({
  departmentId: z.string().min(1, 'Department ID is required'),
  doctorId: z.string().optional(),
  tokenType: z.enum([TokenType.WALK_IN, TokenType.APPOINTMENT, TokenType.EMERGENCY, TokenType.ELDERLY]).default(TokenType.WALK_IN),
  patientId: z.string().optional(),
});

const UpdateDoctorStatusSchema = z.object({
  status: z.enum([DoctorStatus.AVAILABLE, DoctorStatus.ON_BREAK, DoctorStatus.OFF_DUTY]),
});

const UpdateTokenStatusSchema = z.object({
  status: z.enum([TokenStatus.WAITING, TokenStatus.IN_CONSULTATION, TokenStatus.COMPLETED, TokenStatus.SKIPPED, TokenStatus.CANCELLED]),
});

module.exports = {
  RegisterSchema,
  LoginSchema,
  CreateDepartmentSchema,
  CreateDoctorSchema,
  GenerateTokenSchema,
  UpdateDoctorStatusSchema,
  UpdateTokenStatusSchema,
};
