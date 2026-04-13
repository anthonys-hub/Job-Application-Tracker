import { useEffect } from "react"
import { useState } from "react"

export default function Dashboard() {
    const [jobs, setJobs] = useState([])
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('')
    const [dateApplied, setDateApplied] = useState('')
    const [notes, setNotes] = useState('')
    const [editingJob, setEditingJob] = useState(null)


    function fetchJobs() {
        fetch('http://localhost:5000/api/jobs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setJobs(data)
            })
    }


    useEffect(() => {
        fetchJobs()
    }, [])


    function handleAddJob(e) {
        e.preventDefault()
        console.log(JSON.stringify({ company, position, status, date_applied: dateApplied, notes }))
        fetch('http://localhost:5000/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({ company, position, status, date_applied: dateApplied, notes })

        })
            .then(res => res.json())
            .then(data => {
                (fetchJobs())
                setCompany('')
                setPosition('')
                setStatus('')
                setDateApplied('')
                setNotes('')

            })
    }


    function handleDeleteJob(id) {
        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },

        })
            .then(res => res.json())
            .then(data => {
                (fetchJobs())

            })
    }

    function handleEditClick(job) {
        setEditingJob(job)
        setCompany(job.company)
        setPosition(job.position)
        setStatus(job.status)
        setDateApplied(job.date_applied.slice(0, 10))
        setNotes(job.notes)
    }

    function handleSaveChanges(e) {
        e.preventDefault()
        fetch(`http://localhost:5000/api/jobs/${editingJob.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({ company, position, status, date_applied: dateApplied, notes })

        }).
            then(res => res.json())
            .then(data => {
                (fetchJobs())
                setEditingJob(null)
                setCompany('')
                setPosition('')
                setStatus('')
                setDateApplied('')
                setNotes('')
            })
    }




    return (

        <div className="bg-[#f8fafc]">
            <h1>dashboard</h1>
            {Array.isArray(jobs) && jobs.map(job => (

                <div key={job.id}>
                    <p>Company: {job.company}</p>
                    <p>Position: {job.position}</p>
                    <p>Status: {job.status}</p>
                    <p>Date Applied: {job.date_applied}</p>
                    <p>Notes: {job.notes}</p>


                    <button className="bg-black text-white" onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
                    <button className="bg-blue-100 text-white" onClick={() => handleEditClick(job)}>Edit Job</button>

                </div>

            ))}


            <form onSubmit={editingJob ? handleSaveChanges : handleAddJob}>
                <div>
                    <input
                        placeholder="company"
                        type="text"
                        value={company}
                        onChange={(e) => {
                            setCompany(e.target.value)
                        }}
                    />

                </div>
                <div>
                    <input
                        placeholder="position"
                        type="text"
                        value={position}
                        onChange={(e) => {
                            setPosition(e.target.value)
                        }}
                    />

                </div>
                <div>
                    <input
                        placeholder="status"
                        type="text"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                    />

                </div>
                <div>
                    <input
                        placeholder="date of application"
                        type="date"
                        value={dateApplied}
                        onChange={(e) => {
                            setDateApplied(e.target.value)
                        }}
                    />

                </div>
                <div>
                    <input
                        placeholder="notes"
                        type="text"
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value)
                        }}
                    />

                </div>





                {editingJob ? (
                    <button className="bg-blue-500 text-white">Save Changes</button>
                ) : (
                    <button className="bg-black text-white">Add Job</button>
                )}





            </form>

        </div>


    )
}



