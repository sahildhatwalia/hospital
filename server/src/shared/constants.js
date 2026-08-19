const UserRole = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
  ADMIN: 'ADMIN'
};

const DoctorStatus = {
  AVAILABLE: 'AVAILABLE',
  ON_BREAK: 'ON_BREAK',
  OFF_DUTY: 'OFF_DUTY'
};

const QueueStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

const TokenType = {
  WALK_IN: 'WALK_IN',
  APPOINTMENT: 'APPOINTMENT',
  EMERGENCY: 'EMERGENCY',
  ELDERLY: 'ELDERLY'
};

const TokenStatus = {
  WAITING: 'WAITING',
  IN_CONSULTATION: 'IN_CONSULTATION',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED',
  CANCELLED: 'CANCELLED'
};

const AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  CHECKED_IN: 'CHECKED_IN',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

const NotificationChannel = {
  SMS: 'SMS',
  EMAIL: 'EMAIL',
  PUSH: 'PUSH'
};

const NotificationType = {
  TOKEN_BOOKED: 'TOKEN_BOOKED',
  TOKEN_NEAR: 'TOKEN_NEAR',
  TOKEN_CALLED: 'TOKEN_CALLED',
  TOKEN_CANCELLED: 'TOKEN_CANCELLED'
};

module.exports = {
  UserRole,
  DoctorStatus,
  QueueStatus,
  TokenType,
  TokenStatus,
  AppointmentStatus,
  NotificationChannel,
  NotificationType
};
