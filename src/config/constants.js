// src/config/constants.js
// School details and app-wide constants

export const SCHOOL = {
  name: 'UPG+2 High School',
  fullName: 'UPG+2 High School, Lawahikala',
  location: 'Dandai, Garhwa, Jharkhand - 822114',
  address: 'Village Lawahikala, Dandai Block, Garhwa District, Jharkhand - 822114',
  phone: '+91-XXXXXXXXXX',           // Replace with actual phone
  email: 'upghs.dandai@jharkhand.gov.in', // Replace with actual email
  established: '1985',
  affiliation: 'Jharkhand Academic Council (JAC)',
  medium: 'Hindi / English',
};

export const ADMISSION = {
  fee: 550,         // Admission fee in INR
  currency: 'INR',
  classes: Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `Class ${i + 1}`,
  })),
  sessionYear: '2024-25',
};

export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder';

export const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'school@2024',
};
