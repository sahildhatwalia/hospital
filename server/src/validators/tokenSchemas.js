const { z } = require('zod');

const generateTokenSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  departmentId: z.string().min(1, 'Department ID is required'),
  tokenType: z.enum(['WALK_IN', 'APPOINTMENT', 'EMERGENCY', 'ELDERLY', 'VIP']).optional(),
  doctorId: z.string().optional().nullable(),
  reason: z.string().optional(),
  patientName: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
});

const tokenActionSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
});

module.exports = {
  generateTokenSchema,
  tokenActionSchema,
};
