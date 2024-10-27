import React from 'react';
import { Clock, Check, X } from 'lucide-react';
import type { Appointment } from '../types';

interface QueueProps {
  appointments: Appointment[];
  onStatusChange: (appointmentId: string, status: Appointment['status']) => void;
}

export default function Queue({ appointments, onStatusChange }: QueueProps) {
  const todaysAppointments = appointments.filter(
    (apt) => new Date(apt.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Today's Queue</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {todaysAppointments.map((appointment) => (
          <div key={appointment.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Session #{appointment.sessionNumber}</div>
              <div className="text-xs text-gray-500">
                {new Date(appointment.date).toLocaleTimeString([], { 
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onStatusChange(appointment.id, 'IN_PROGRESS')}
                className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                title="Start Session"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                onClick={() => onStatusChange(appointment.id, 'COMPLETED')}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                title="Complete"
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => onStatusChange(appointment.id, 'CANCELLED')}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}