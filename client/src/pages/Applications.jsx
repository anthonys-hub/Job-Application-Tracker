import { useState } from "react";
import { useEffect } from "react";

export default function Applications() {
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [notes, setNotes] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null)
    const [editingJob, setEditingJob] = useState(null)
    const [activeFilter, setActiveFilter] = useState('All')

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
        })
            .then(res => res.json())
            .then(data => {
                fetchJobs()
                setShowModal(false)
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

    function handleAddJob(e) {
        e.preventDefault()
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
                fetchJobs()
                setShowModal(false)
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
                fetchJobs()
                setOpenMenuId(null)
            })
    }

    const filteredJobs = jobs.filter(job => {
        if (activeFilter === 'All') return true
        if (activeFilter === 'Closed') return job.status === 'Hired' || job.status === 'Rejected'
        if (activeFilter === 'Active') return job.status === 'Applied' || job.status === 'Interviewing'
    })

    return (
        <div className="bg-[#f8fafc] relative h-screen flex flex-col overflow-hidden">
            <div className="flex flex-row justify-between mt-7 px-4">
                <h1 className="text-3xl font-bold tracking-widest text-black uppercase">Applications</h1>
                <div className="flex flex-row gap-6 mr-15">
                    <p onClick={() => setActiveFilter('All')} className={`cursor-pointer ${activeFilter === 'All' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>All</p>
                    <p onClick={() => setActiveFilter('Active')} className={`cursor-pointer ${activeFilter === 'Active' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`} >Active</p>
                    <p onClick={() => setActiveFilter('Closed')} className={`cursor-pointer ${activeFilter === 'Closed' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}>Closed</p>
                    <p>Filter</p>
                </div>
            </div>

            <div className="w-full flex-1 flex flex-col min-h-0 px-4">
                <div className="bg-white shadow-sm mt-5 rounded-2xl overflow-hidden w-full border-gray-600 flex flex-col min-h-0">
                    <div className="flex flex-row rounded-t-2xl px-6 py-3 text-gray-600 bg-gray-100 sticky top-0 z-10">
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase pl-10">Company</h3>
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase ">Role</h3>
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Date Applied</h3>
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Status</h3>
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Notes</h3>
                        <h3 className="w-1/6 text-[16px] font-semibold tracking-widest text-slate-500 uppercase">Actions</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="flex flex-row items-center px-6 py-4 border-b border-gray-300">
                                <div className="w-1/6 flex flex-row items-center gap-4">
                                    <p className={`w-8 h-8 shrink-0 rounded-md ${statusStyles[job.status] || 'bg-gray-100 text-gray-600'} flex items-center text-sm font-bold justify-center`}>{job.company.charAt(0)}</p>
                                    <p className="font-bold">{job.company}</p>
                                </div>
                                <p className="w-1/6 font-bold ">{job.position}</p>
                                <p className="w-1/6 font-bold">
                                    {new Date(job.date_applied).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                                <div className="w-1/6 ">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusStyles[job.status]}`}>{job.status}
                                    </span>
                                </div>
                                <p className="w-1/6 truncate overflow-hidden font-semibold whitespace-nowrap">{job.notes}</p>
                                <div className="w-1/6 relative ">
                                    <button onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)} className="hover: cursor-pointer ml-8 text-3xl">⋮</button>
                                    {openMenuId === job.id &&
                                        <div className="flex flex-col absolute ml-10 bg-white shadow-md rounded-lg py-1 z-10 w-24">
                                            <button onClick={() => { handleEditClick(job); setShowModal(true); setOpenMenuId(null) }} className="hover:bg-blue-300 font-semibold rounded-lg cursor-pointer">Edit</button>
                                            <button onClick={() => handleDeleteJob(job.id)} className="hover:bg-blue-300 font-semibold text-red-500 rounded-lg cursor-pointer">Delete</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-row justify-end mr-10 mt-5 mb-5">
                    <button onClick={() => setShowModal(true)} className="bg-blue-600 px-10 py-3 rounded-2xl text-[16px] font-semibold tracking-widest text-white uppercase shadow-lg shadow-blue-500/20">New Entry</button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-[#f8fafc] bg-opacity-50 flex flex-row justify-center z-50">
                    <div className="h-3/4 flex flex-col items-center rounded-2xl bg-white mt-12 w-full max-w-3xl p-12 shadow-sm border border-slate-100 font-sans antialiased overflow-y-auto">
                        <div className="w-full mb-10 text-left">
                            <h1 className="font-bold text-3xl text-slate-950 tracking-tight">New Application Entry</h1>
                            <p className="text-lg text-slate-600 mt-1">Log a new opportunity!.</p>
                        </div>
                        <div className="w-full">
                            <form onSubmit={editingJob ? handleSaveChanges : handleAddJob} className="space-y-12">
                                <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[14px] font-semibold tracking-[0.15em] text-slate-600 uppercase">Company Name</label>
                                        <input
                                            placeholder="ex. Amazon"
                                            type="text"
                                            className="w-full appearance-none bg-transparent border-b-2 border-slate-200 py-2.5 text-lg font-medium text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[14px] font-semibold tracking-[0.15em] text-slate-600 uppercase">Job Title</label>
                                        <input
                                            placeholder="ex. Software Engineer"
                                            type="text"
                                            className="w-full appearance-none bg-transparent border-b-2 border-slate-200 py-2.5 text-lg font-medium text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[14px] font-semibold tracking-[0.15em] text-slate-600 uppercase">Date Applied</label>
                                        <input
                                            type="date"
                                            className="w-full appearance-none bg-transparent border-b-2 border-slate-200 py-2.5 text-lg font-medium text-black focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                                            value={dateApplied}
                                            onChange={(e) => setDateApplied(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 relative">
                                        <label className="text-[14px] font-semibold tracking-[0.15em] text-slate-800 uppercase">Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full appearance-none bg-transparent border-b-2 border-slate-200 py-2.5 pr-8 text-lg font-medium text-black focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Applied">Applied</option>
                                            <option value="Interviewing">Interviewing</option>
                                            <option value="Hired">Hired</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[14px] font-semibold tracking-[0.15em] text-slate-800 uppercase">Application Notes</label>
                                    <textarea
                                        placeholder="Mention recruiters, referrals, or key platform links..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full rounded-2xl bg-[#eff3fa] p-5 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none transition-all h-32"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="text-sm font-semibold text-slate-800 hover:text-slate-950 transition-colors"
                                    >
                                        Discard Draft
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 px-8 py-3 rounded-2xl text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                                    >
                                        Save Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}