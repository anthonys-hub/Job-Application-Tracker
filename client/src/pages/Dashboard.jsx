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




        <div className="bg-[#f8fafc] pt-5 h-screen">

            <div className="bg-white shadow-sm px-6 py-2 rounded-sm">
                <h1 className="font-bold text-3xl">Job Application Tracker</h1>
            </div>



            <div className="mt-10 px-8 ">


                <div className="flex flex-row gap-15 ">

                    <div className="bg-white shadow-sm  rounded-2xl w-90 h-50 px-6 py-2">
                        <h2 className="mt-8 font-light text-gray-800">TOTAL APPLIED</h2>
                        <h1 className="font-bold text-6xl">{jobs.length}</h1>
                    </div>

                    <div className="bg-blue-300 shadow-sm  rounded-2xl w-90 px-6 py-2">
                        <h2 className="mt-8 font-light text-gray-800">INTERVIEWS</h2>
                        <h1 className="font-bold text-6xl">{jobs.filter(job => job.status === 'Interviewing').length}</h1>
                    </div>

                    <div className="bg-green-200 shadow-sm  rounded-2xl w-90 px-6 py-2">
                        <h2 className="mt-8 font-light text-gray-800">OFFERS</h2>
                        <h1 className="font-bold text-6xl">{jobs.filter(job => job.status === 'Offered').length}</h1>
                    </div>




                </div>


                <div className="mt-10 ">
                    <h2 className="font-bold text-3xl">Recent Activity</h2>
                    <span className="text-gray-500">Real-time status tracking</span>
                </div>





                <div className="bg-white shadow-sm mt-5 rounded-2xl max-w-7xl h-70 border-gray-600">
                    <div className="flex flex-row justify-between rounded-t-2xl py-3 px-6 text-gray-600 bg-gray-100">

                        <h3>Company & Role</h3>
                        <h3>Date Applied</h3>
                        <h3>Status</h3>
                        <h3>Actions</h3>
                    </div>

                    <div>
                        {jobs.slice(0, 3).map(job => (
                            <div key={job.id} className="flex flex-row justify-between px-6 py-4 border-b">
                                <p>{job.company}</p>
                                <p>{job.date_applied}</p>
                                <p>{job.status}</p>

                            </div>
                        ))}



                    </div>
                </div>
            </div>
        </div>
    )
}
