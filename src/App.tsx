import React from 'react';
import Layout from './components/Layout';
import AppointmentCalendar from './components/AppointmentCalendar';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import Queue from './components/Queue';
import AppointmentForm from './components/AppointmentForm';
import type { Patient, Appointment } from './types';

const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 45,
    address: '123 Main St',
    city: 'Boston',
    insurance: 'Blue Cross',
    source: 'CLINIC'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 32,
    address: '456 Oak Ave',
    city: 'Chicago',
    insurance: 'Aetna',
    source: 'OFFICE'
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-03-20T09:00:00',
    status: 'SCHEDULED',
    sessionNumber: 1,
    treatment: 'Initial Consultation'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-03-20T10:00:00',
    status: 'IN_PROGRESS',
    sessionNumber: 3,
    treatment: 'Follow-up'
  }
];

function App() {
  const [appointments, setAppointments] = React.useState(mockAppointments);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = React.useState(false);

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleStatusChange = (appointmentId: string, status: Appointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    ));
  };

  const handleAppointmentSubmit = (data: {
    date: string;
    time: string;
    treatment: string;
    notes?: string;
  }) => {
    if (!selectedPatient) return;

    const newAppointment: Appointment = {
      id: String(Date.now()),
      patientId: selectedPatient.id,
      date: new Date(`${data.date}T${data.time}`).toISOString(),
      status: 'SCHEDULED',
      sessionNumber: appointments.filter(apt => apt.patientId === selectedPatient.id).length + 1,
      treatment: data.treatment,
      notes: data.notes
    };

    setAppointments([...appointments, newAppointment]);
    setShowAppointmentForm(false);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentCalendar
            appointments={appointments}
            onDateSelect={handleDateSelect}
          />
        </div>
        <div className="space-y-6">
          {showAppointmentForm && selectedPatient ? (
            <AppointmentForm
              patient={selectedPatient}
              onClose={() => setShowAppointmentForm(false)}
              onSubmit={handleAppointmentSubmit}
            />
          ) : selectedPatient ? (
            <>
              <PatientDetails
                patient={selectedPatient}
                onClose={() => setSelectedPatient(null)}
              />
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Schedule Appointment
              </button>
            </>
          ) : (
            <PatientList
              patients={mockPatients}
              onPatientSelect={handlePatientSelect}
            />
          )}
          <Queue
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;