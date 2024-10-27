export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  city: string;
  insurance: string;
  source: 'CLINIC' | 'OFFICE';
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  sessionNumber: number;
  treatment?: string;
  notes?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'DOCTOR' | 'SECRETARY';
  email: string;
}