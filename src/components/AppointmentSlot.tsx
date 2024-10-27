import React from 'react';
import type { Appointment } from '../types';

interface AppointmentSlotProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

export default function AppointmentSlot({ appointment, onClick }: AppointmentSlotProps) {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      onClick={() => onClick(appointment)}
      className={`p-2 rounded border ${getStatusColor(appointment.status)} cursor-pointer`}
    >
      <div className="text-sm font-medium">Session #{appointment.sessionNumber}</div>
      {appointment.treatment && (
        <div className="text-xs mt-1">{appointment.treatment}</div>
      )}
    </div>
  );
}