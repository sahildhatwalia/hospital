import { create } from 'zustand';
import {
  INITIAL_PATIENTS,
  INITIAL_QUEUE,
  INITIAL_PRESCRIPTIONS,
  INITIAL_INVENTORY,
  INITIAL_STAFF,
  INITIAL_NOTIFICATIONS,
} from '../lib/mockData';

export const useHospitalStore = create((set, get) => ({
  patients: INITIAL_PATIENTS,
  queue: INITIAL_QUEUE,
  prescriptions: INITIAL_PRESCRIPTIONS,
  inventory: INITIAL_INVENTORY,
  staff: INITIAL_STAFF,
  notifications: INITIAL_NOTIFICATIONS,
  feedbacks: [],

  // Patient Actions
  addPatient: (newPatient) => {
    const formatted = {
      id: `P-${1000 + get().patients.length + 1}`,
      name: newPatient.name,
      age: parseInt(newPatient.age) || 30,
      gender: newPatient.gender || 'Male',
      bloodGroup: newPatient.bloodGroup || 'O+',
      allergies: newPatient.allergies ? newPatient.allergies.split(',').map((s) => s.trim()) : ['None'],
      contact: newPatient.contact || '+1 (555) 000-0000',
      emergencyContact: newPatient.emergencyContact || 'N/A',
      lastVisit: new Date().toISOString().split('T')[0],
      status: newPatient.status || 'Waiting',
      condition: newPatient.condition || 'General Evaluation',
      doctor: newPatient.doctor || 'Dr. John Smith',
      roomNo: 'OPD Desk 1',
      vitals: {
        bp: '120/80',
        bpTrend: 'stable',
        heartRate: '72 bpm',
        hrTrend: 'stable',
        temp: '98.6 °F',
        tempTrend: 'stable',
        spO2: '98%',
        spO2Trend: 'stable',
      },
      visitHistory: [
        {
          id: `v_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          diagnosis: newPatient.condition || 'New Patient Intake',
          doctor: newPatient.doctor || 'Dr. John Smith',
          department: 'Outpatient Care',
          notes: 'Registered at receptionist desk.',
        },
      ],
      prescriptions: [],
    };

    set((state) => ({
      patients: [formatted, ...state.patients],
    }));

    return formatted;
  },

  // Queue Actions
  callNextQueue: (idOrToken) => {
    set((state) => ({
      queue: state.queue.map((item) => {
        if (item.id === idOrToken || item.tokenNumber === idOrToken) {
          return { ...item, status: 'In Progress' };
        }
        if (item.status === 'In Progress') {
          return { ...item, status: 'Completed' };
        }
        return item;
      }),
    }));
  },

  completeQueueItem: (id) => {
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, status: 'Completed' } : item
      ),
    }));
  },

  addQueueToken: (queueData) => {
    const nextNum = get().queue.length > 0 ? Math.max(...get().queue.map((q) => q.tokenNumber)) + 1 : 101;
    const newItem = {
      id: `Q-${nextNum}`,
      tokenNumber: nextNum,
      patientId: queueData.patientId || `P-${1000 + nextNum}`,
      patientName: queueData.patientName,
      age: queueData.age || 30,
      gender: queueData.gender || 'Other',
      waitTime: '5 mins',
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: queueData.reason || 'General Checkup',
      status: 'Waiting',
      doctorName: queueData.doctorName || 'Dr. John Smith',
    };

    set((state) => ({
      queue: [...state.queue, newItem],
    }));

    return newItem;
  },

  // Prescription Actions
  createPrescription: (rxData) => {
    const newRx = {
      id: `RX-${900 + get().prescriptions.length + 1}`,
      patientId: rxData.patientId,
      patientName: rxData.patientName,
      age: rxData.age || 35,
      doctorName: rxData.doctorName || 'Dr. John Smith',
      date: new Date().toISOString().split('T')[0],
      diagnosis: rxData.diagnosis,
      advice: rxData.advice || 'Follow medication schedule strictly.',
      medicines: rxData.medicines,
      status: 'Pending',
    };

    set((state) => ({
      prescriptions: [newRx, ...state.prescriptions],
      notifications: [
        {
          id: `n_${Date.now()}`,
          title: 'New Prescription Created',
          message: `Prescription ${newRx.id} for ${newRx.patientName} sent to Pharmacy.`,
          time: 'Just now',
          type: 'info',
          unread: true,
        },
        ...state.notifications,
      ],
    }));

    return newRx;
  },

  dispensePrescription: (rxId) => {
    set((state) => ({
      prescriptions: state.prescriptions.map((rx) =>
        rx.id === rxId ? { ...rx, status: 'Dispensed' } : rx
      ),
      notifications: [
        {
          id: `n_${Date.now()}`,
          title: 'Prescription Dispensed',
          message: `Prescription ${rxId} has been marked as Dispensed by Pharmacy.`,
          time: 'Just now',
          type: 'info',
          unread: true,
        },
        ...state.notifications,
      ],
    }));
  },

  // Staff Actions
  addStaff: (staffData) => {
    const newStaff = {
      id: `ST-0${get().staff.length + 1}`,
      name: staffData.name,
      role: staffData.role,
      department: staffData.department,
      email: staffData.email,
      phone: staffData.phone || '+1 (555) 000-1111',
      status: 'Active',
      shifts: staffData.shifts || 'Day Shift',
    };

    set((state) => ({
      staff: [...state.staff, newStaff],
    }));

    return newStaff;
  },

  // Inventory Stock Adjustment
  updateStock: (id, delta) => {
    set((state) => ({
      inventory: state.inventory.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          let newStatus = 'Optimal';
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (newStock <= item.minLevel) newStatus = 'Low Stock';

          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      }),
    }));
  },

  // Notifications
  markNotificationRead: (nId) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === nId ? { ...n, unread: false } : n
      ),
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },

  // Patient Feedback
  addFeedback: (feedback) => {
    const entry = {
      id: `fb_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...feedback,
    };
    set((state) => ({
      feedbacks: [entry, ...state.feedbacks],
    }));
  },
}));
