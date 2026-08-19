const logger = require('../utils/logger');

function initQueueSockets(io) {
  io.on('connection', (socket) => {
    logger.info(`Socket Connected: ${socket.id}`);

    // Join Queue Room for live status updates
    socket.on('join:queue', ({ queueId }) => {
      if (queueId) {
        socket.join(`queue_${queueId}`);
        logger.info(`Socket ${socket.id} joined room queue_${queueId}`);
      }
    });

    // Leave Queue Room
    socket.on('leave:queue', ({ queueId }) => {
      if (queueId) {
        socket.leave(`queue_${queueId}`);
        logger.info(`Socket ${socket.id} left room queue_${queueId}`);
      }
    });

    // Join Patient Private Room for direct alert calls
    socket.on('join:patient', ({ patientId }) => {
      if (patientId) {
        socket.join(`patient_${patientId}`);
        logger.info(`Socket ${socket.id} joined patient room patient_${patientId}`);
      }
    });

    socket.on('disconnect', () => {
      logger.info(`Socket Disconnected: ${socket.id}`);
    });
  });
}

module.exports = initQueueSockets;
