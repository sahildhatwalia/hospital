const { z } = require('zod');

const departmentQueueSchema = z.object({
  departmentId: z.string().min(1, 'Department ID is required'),
});

const emergencyBumpSchema = z.object({
  tokenId: z.string().min(1, 'Token ID is required'),
  reason: z.string().optional(),
});

module.exports = {
  departmentQueueSchema,
  emergencyBumpSchema,
};
