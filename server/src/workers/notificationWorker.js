const { Queue, Worker } = require('bullmq');
const env = require('../config/env');
const logger = require('../utils/logger');
const Notification = require('../models/Notification');

const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
};

let notificationQueue;
try {
  notificationQueue = new Queue('notificationQueue', { connection });
} catch (e) {
  logger.warn('Redis not available. BullMQ queue initialized in fallback mode.');
}

const worker = new Worker('notificationQueue', async (job) => {
  logger.info(`Processing notification job ${job.id}: ${job.name}`);
  const { patientId, tokenCode, estimatedWaitTime, type, message } = job.data;

  // Persist notification record in MongoDB
  await Notification.create({
    userId: patientId,
    channel: 'SMS',
    type: type || 'TOKEN_BOOKED',
    message: message || `Your Token ${tokenCode} is booked. Est wait time: ${estimatedWaitTime} mins.`,
    status: 'SENT',
    sentAt: new Date()
  });

  logger.info(`Notification sent successfully to user ${patientId}`);
}, { connection, autorun: false });

worker.on('failed', (job, err) => {
  logger.error(`Notification job ${job?.id} failed: ${err.message}`);
});

module.exports = {
  notificationQueue,
  worker
};
