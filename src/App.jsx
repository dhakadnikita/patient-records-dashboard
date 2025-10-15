import React, { useEffect, useState } from 'react'
import PatientCard from './components/PatientCard'
import PatientModal from './components/PatientModal'

function Header({setPage, page}) {
  return (
    <header className="header">
      <div className="brand">Jarurat Care</div>
      <nav>
        <button className={page==='home'?'active':''} onClick={()=>setPage('home')}>Home</button>
        <button className={page==='patients'?'active':''} onClick={()=>setPage('patients')}>Patients</button>
        <button className={page==='about'?'active':''} onClick={()=>setPage('about')}>About</button>
      </nav>
    </header>
  )
}

export default function App(){
  const [page, setPage] = useState('patients')
  const [patients, setPatients] = useState([])
  const [filtered, setFiltered] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(()=>{
    // fetch mock data
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res=>{
        if(!res.ok) throw new Error('Network response not ok')
        return res.json()
      })
      .then(data=>{
        // map to patient shape and add random age & contact
        const mapped = data.map(u=>({
          id: 'p-'+u.id,
          name: u.name,
          age: Math.floor(Math.random()*50)+18,
          contact: u.phone,
          email: u.email,
          address: u.address?.street + ', ' + u.address?.city,
          notes: 'Notes for ' + u.name
        }))
        setPatients(mapped)
        setFiltered(mapped)
        setLoading(false)
      })
      .catch(err=>{
        setError(err.message)
        setLoading(false)
      })
  },[])

  useEffect(()=>{
    const ql = q.trim().toLowerCase()
    if(!ql) setFiltered(patients)
    else setFiltered(patients.filter(p=>p.name.toLowerCase().includes(ql)))
  },[q, patients])

  function openDetails(p){
    setSelected(p)
    setShowModal(true)
  }

  function addPatient(newP){
    // prepend
    setPatients(prev => [newP, ...prev])
    setQ('')
    setFormOpen(false)
  }

  return (
    <div className="app">
      <Header setPage={setPage} page={page} />
      <main className="container">
        {page==='home' && (
          <section className="hero">
            <h1>Welcome to Jarurat Care</h1>
            <p>Simple patient records dashboard demo.</p>
            <button onClick={()=>setPage('patients')}>Go to Patients</button>
          </section>
        )}

        {page==='about' && (
          <section>
            <h2>About</h2>
            <p>This is a demo project to showcase React, state management, and API integration.</p>
          </section>
        )}

        {page==='patients' && (
          <section>
            <div className="toolbar">
              <input placeholder="Search patients by name..." value={q} onChange={e=>setQ(e.target.value)} />
              <div>
                <button onClick={()=>setFormOpen(s=>!s)}>{formOpen ? 'Close' : 'Add New Patient'}</button>
              </div>
            </div>

            {formOpen && <AddPatientForm onAdd={addPatient} />}

            {loading && <div className="state">Loading patients...</div>}
            {error && <div className="state error">Error: {error}</div>}

            {!loading && !error && (
              <div className="grid">
                {filtered.length===0 && <div className="state">No patients found.</div>}
                {filtered.map(p=>(
                  <PatientCard key={p.id} patient={p} onView={()=>openDetails(p)} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {showModal && selected && (
        <PatientModal patient={selected} onClose={()=>setShowModal(false)} />
      )}

      <footer className="footer">
        <small>Jarurat Care — Demo App</small>
      </footer>
    </div>
  )
}

function AddPatientForm({onAdd}){
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [contact,setContact]=useState('')
  function submit(e){
    e.preventDefault()
    if(!name) return
    const newP = {
      id: 'p-local-'+Date.now(),
      name, age: age?Number(age):null, contact, email:'', address:'', notes:'Added locally'
    }
    onAdd(newP)
    setName(''); setAge(''); setContact('')
  }
  return (
    <form className="add-form" onSubmit={submit}>
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} />
      <input placeholder="Contact" value={contact} onChange={e=>setContact(e.target.value)} />
      <div><button type="submit">Add Patient</button></div>
    </form>
  )
}
