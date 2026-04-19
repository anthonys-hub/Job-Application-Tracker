import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

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
                const sorted = data.sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
                setJobs(sorted)
            })
    }


    useEffect(() => {
        fetchJobs()
    }, [])




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

    const statusStyles = {
        'Hired': 'bg-green-100 text-green-700',
        'Rejected': 'bg-red-100 text-red-700',
        'Applied': 'bg-blue-100 text-blue-700',
        'Interviewing': 'bg-yellow-100 text-yellow-700',
    }



    return (




        <div className="bg-[#f8fafc] pt-5 h-screen">
            <div className="w-full">
                <div className="bg-white shadow-sm px-6 py-2  rounded-sm w-full">
                    <h1 className="text-2xl font-extrabold tracking-widest text-black uppercase">Dossier</h1>
                </div>
            </div>



            <div className="mt-10 px-8 ">

                <div className="w-full">

                    <div className="flex flex-row gap-15 ">

                        <div className="bg-indigo-50 shadow-sm  rounded-2xl flex-1 h-50 px-6 py-2">
                            <h2 className="mt-8 text-[16px] font-semibold tracking-widest text-slate-800 uppercase">TOTAL APPLIED</h2>
                            <h1 className="font-bold text-6xl">{jobs.length}</h1>
                        </div>

                        <div className="bg-blue-300 shadow-sm  rounded-2xl flex-1 h-50 px-6 py-2">
                            <h2 className="mt-8 text-[16px] font-semibold tracking-widest text-slate-800 uppercase">INTERVIEWS</h2>
                            <h1 className="font-bold text-6xl">{jobs.filter(job => job.status === 'Interviewing').length}</h1>
                        </div>

                        <div className="bg-green-200 shadow-sm  rounded-2xl flex-1 h-50 px-6 py-2">
                            <h2 className="mt-8 text-[16px] font-semibold tracking-widest text-slate-800 uppercase">OFFERS</h2>
                            <h1 className="font-bold text-6xl">{jobs.filter(job => job.status === 'Hired').length}</h1>
                        </div>

                    </div>


                </div>


                <div className="mt-10">
                    <h2 className="font-bold text-3xl">Recent Activity</h2>
                    <div className="flex flex-row justify-between">
                        <span className="text-gray-500">Real-time status tracking</span>
                        <NavLink to='/applications' className="mr-5 text-[#0003aa] hover:underline cursor-pointer">View all entries</NavLink>
                    </div>
                </div>





                <div className="w-full">

                    <div className="bg-white shadow-sm mt-5 rounded-2xl overflow-hidden w-full  border-gray-600">
                        <div className="flex flex-row rounded-t-2xl px-6 py-3 justify-between text-gray-600 bg-gray-100">

                            <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Company</h3>
                            <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Role</h3>
                            <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Date Applied</h3>
                            <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Status</h3>

                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {jobs.slice(0, 3).map(job => (
                                <div key={job.id} className="flex flex-row items-center px-6 py-4 border-b justify-between border-gray-300">
                                    <div className="w-1/6 flex flex-row items-center gap-4">
                                        <p className={`w-8 h-8 shrink-0 rounded-md ${statusStyles[job.status] || 'bg-gray-100 text-gray-600'}  flex items-center text-sm font-bold justify-center`}>{job.company.charAt(0)}</p>
                                        <p className="font-bold">{job.company}</p>
                                    </div>
                                    <p className="w-1/6 font-bold">{job.position}</p>
                                    <p className="w-1/6 font-bold">
                                        {new Date(job.date_applied).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}

                                    </p>
                                    <div className="w-1/6">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusStyles[job.status]}`}>{job.status}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
