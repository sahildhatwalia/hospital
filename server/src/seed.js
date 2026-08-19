const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('./config/env');
const connectDB = require('./config/db');
const User = require('./models/User');
const Department = require('./models/Department');
const Doctor = require('./models/Doctor');
const Queue = require('./models/Queue');
const Token = require('./models/Token');
const { UserRole, DoctorStatus } = require('./shared');

async function seedData() {
  try {
    await connectDB();
    console.log('🌱 Starting Database Seeding...');

    // Hash default password
    const defaultPasswordHash = await bcrypt.hash('password123', 10);

    // 1. Seed Departments
    const departmentData = [
      { name: 'Cardiology', code: 'CARD', description: 'Heart & Cardiovascular Care', avgConsultationTimeMinutes: 15 },
      { name: 'Neurology', code: 'NEUR', description: 'Brain & Nervous System Care', avgConsultationTimeMinutes: 20 },
      { name: 'Orthopedics', code: 'ORTH', description: 'Bones, Joints & Musculoskeletal', avgConsultationTimeMinutes: 15 },
      { name: 'Pediatrics', code: 'PEDI', description: 'Child & Adolescent Care', avgConsultationTimeMinutes: 10 },
      { name: 'General Medicine', code: 'GENM', description: 'Primary Care & Internal Medicine', avgConsultationTimeMinutes: 12 },
    ];

    const departments = [];
    for (const d of departmentData) {
      const dept = await Department.findOneAndUpdate(
        { code: d.code },
        d,
        { upsert: true, new: true }
      );
      departments.push(dept);
    }
    console.log(`✅ Seeded ${departments.length} Departments`);

    // 2. Seed Users
    const userData = [
      { name: 'System Admin', email: 'admin@hqms.com', passwordHash: defaultPasswordHash, phone: '1112223333', role: UserRole.ADMIN },
      { name: 'Front Desk Receptionist', email: 'receptionist@hqms.com', passwordHash: defaultPasswordHash, phone: '2223334444', role: UserRole.RECEPTIONIST },
      { name: 'Dr. Sarah Smith', email: 'dr.smith@hqms.com', passwordHash: defaultPasswordHash, phone: '3334445555', role: UserRole.DOCTOR },
      { name: 'Dr. Robert Johnson', email: 'dr.johnson@hqms.com', passwordHash: defaultPasswordHash, phone: '4445556666', role: UserRole.DOCTOR },
      { name: 'John Doe', email: 'patient.doe@hqms.com', passwordHash: defaultPasswordHash, phone: '5556667777', role: UserRole.PATIENT },
      { name: 'Jane Smith', email: 'patient.jane@hqms.com', passwordHash: defaultPasswordHash, phone: '6667778888', role: UserRole.PATIENT },
    ];

    const users = {};
    for (const u of userData) {
      const user = await User.findOneAndUpdate(
        { email: u.email },
        u,
        { upsert: true, new: true }
      );
      users[u.email] = user;
    }
    console.log(`✅ Seeded Users (Admin, Receptionist, Doctors, Patients)`);

    // 3. Seed Doctors
    const cardDept = departments.find(d => d.code === 'CARD');
    const genmDept = departments.find(d => d.code === 'GENM');

    const doctorData = [
      { userId: users['dr.smith@hqms.com']._id, departmentId: cardDept._id, roomNumber: '101-A', status: DoctorStatus.AVAILABLE },
      { userId: users['dr.johnson@hqms.com']._id, departmentId: genmDept._id, roomNumber: '102-B', status: DoctorStatus.AVAILABLE },
    ];

    for (const doc of doctorData) {
      await Doctor.findOneAndUpdate(
        { userId: doc.userId },
        doc,
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded Doctor Profiles`);

    console.log('\n🎉 Seeding complete successfully!');
    console.log('-----------------------------------');
    console.log('Default Password for all seeded users: password123');
    console.log('Admin Email: admin@hqms.com');
    console.log('Doctor Email: dr.smith@hqms.com');
    console.log('Receptionist Email: receptionist@hqms.com');
    console.log('Patient Email: patient.doe@hqms.com');
    console.log('-----------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

seedData();
