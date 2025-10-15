import React from 'react'

export default function PatientCard({patient, onView}){
  return (
    <div className="card">
      <div className="card-body">
        <h3>{patient.name}</h3>
        <p><strong>Age:</strong> {patient.age ?? '—'}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
      </div>
      <div className="card-footer">
        <button onClick={onView}>View Details</button>
      </div>
    </div>
  )
}
