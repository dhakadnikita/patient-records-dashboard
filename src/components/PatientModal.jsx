import React from 'react'

export default function PatientModal({patient, onClose}){
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <header>
          <h2>{patient.name}</h2>
          <button className="close" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Notes:</strong> {patient.notes}</p>
        </div>
        <footer>
          <button onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  )
}
