export const UserRole = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
  ADMIN: 'ADMIN'
};

export const DoctorStatus = {
  AVAILABLE: 'AVAILABLE',
  ON_BREAK: 'ON_BREAK',
  OFF_DUTY: 'OFF_DUTY'
};

export const QueueStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

export const TokenType = {
  WALK_IN: 'WALK_IN',
  APPOINTMENT: 'APPOINTMENT',
  EMERGENCY: 'EMERGENCY',
  ELDERLY: 'ELDERLY'
};

export const TokenStatus = {
  WAITING: 'WAITING',
  IN_CONSULTATION: 'IN_CONSULTATION',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  CANCELLED: 'CANCELLED'
};

export const AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  CHECKED_IN: 'CHECKED_IN',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

export const NotificationChannel = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
  PUSH: 'PUSH'
};

export const NotificationType = {
  TOKEN_BOOKED: 'TOKEN_BOOKED',
  TOKEN_NEAR: 'TOKEN_NEAR',
  TOKEN_CALLED: 'TOKEN_CALLED',
  TOKEN_CANCELLED: 'TOKEN_CANCELLED'
};
