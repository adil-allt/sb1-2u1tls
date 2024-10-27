import React from 'react';
import { X, Edit, Save } from 'lucide-react';
import type { Patient } from '../types';

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
}

export default function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedPatient, setEditedPatient] = React.useState(patient);

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Details</h2>
        <div className="flex space-x-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
          {isEditing && (
            <button
              onClick={handleSave}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <Save className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={editedPatient.firstName}
                  onChange={(e) => setEditedPatient({ ...editedPatient, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={editedPatient.lastName}
                  onChange={(e) => setEditedPatient({ ...editedPatient, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={editedPatient.age}
                  onChange={(e) => setEditedPatient({ ...editedPatient, age: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance</label>
                <input
                  type="text"
                  value={editedPatient.insurance}
                  onChange={(e) => setEditedPatient({ ...editedPatient, insurance: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1">{patient.firstName} {patient.lastName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Age</h3>
              <p className="mt-1">{patient.age}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1">{patient.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">City</h3>
              <p className="mt-1">{patient.city}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Insurance</h3>
              <p className="mt-1">{patient.insurance}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Source</h3>
              <p className="mt-1">{patient.source}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}