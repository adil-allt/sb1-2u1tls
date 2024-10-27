import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppointmentSlot from './AppointmentSlot';
import type { Appointment } from '../types';

interface CalendarProps {
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
}

export default function AppointmentCalendar({ appointments, onDateSelect }: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [view, setView] = React.useState<'day' | 'week' | 'month'>('week');

  const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9AM to 5PM

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const getAppointmentsForHour = (hour: number) => {
    return appointments.filter(appointment => {
      const appointmentHour = new Date(appointment.date).getHours();
      return appointmentHour === hour;
    });
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    console.log('Appointment clicked:', appointment);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded ${
                  view === 'day' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded ${
                  view === 'week' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded ${
                  view === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <button 
              onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-16rem)]">
        <div className="min-w-full divide-y divide-gray-200">
          {hours.map((hour) => (
            <div key={hour} className="flex">
              <div className="w-20 py-3 px-4 text-right text-sm text-gray-500">
                {`${hour}:00`}
              </div>
              <div className="flex-1 border-l border-gray-200 bg-gray-50 p-2">
                {getAppointmentsForHour(hour).map((appointment) => (
                  <AppointmentSlot
                    key={appointment.id}
                    appointment={appointment}
                    onClick={handleAppointmentClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}