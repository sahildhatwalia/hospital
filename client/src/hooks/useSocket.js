import { useEffect } from 'react';
import { socket } from '../lib/socket';
import { useQueueStore } from '../store/useQueueStore';

export function useSocket(queueId, patientId, onTokenCalledCallback) {
  const handleSocketUpdate = useQueueStore((state) => state.handleSocketUpdate);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    if (queueId) {
      socket.emit('join:queue', { queueId });
    }

    if (patientId) {
      socket.emit('join:patient', { patientId });
    }

    const onQueueUpdate = (data) => {
      handleSocketUpdate(data);
    };

    const onTokenCalled = (data) => {
      handleSocketUpdate({ event: 'TOKEN_CALLED', ...data });
      if (onTokenCalledCallback) {
        onTokenCalledCallback(data);
      }
    };

    socket.on('queue:updated', onQueueUpdate);
    socket.on('token:called', onTokenCalled);

    return () => {
      if (queueId) {
        socket.emit('leave:queue', { queueId });
      }
      socket.off('queue:updated', onQueueUpdate);
      socket.off('token:called', onTokenCalled);
    };
  }, [queueId, patientId, handleSocketUpdate, onTokenCalledCallback]);

  return socket;
}
