import { create } from 'zustand';

export const useQueueStore = create((set) => ({
  activeQueue: null,
  waitingTokens: [],
  inConsultationTokens: [],
  activeCount: 0,
  lastEvent: null,

  setLiveQueueData: (data) => set({
    activeQueue: data.queue,
    waitingTokens: data.waitingTokens || [],
    inConsultationTokens: data.inConsultationTokens || [],
    activeCount: data.activeCount || 0
  }),

  handleSocketUpdate: (eventData) => set((state) => {
    return {
      lastEvent: eventData,
      activeCount: eventData.activeTokensCount ?? state.activeCount
    };
  })
}));
