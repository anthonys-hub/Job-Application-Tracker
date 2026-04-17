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
                setShowModal(false)
                setCompany('')
                setPosition('')
                setStatus('')
                setDateApplied('')
                setNotes('')


            })
    }




    return (



        <div className="bg-[#f8fafc] relative h-screen">
            <div>
                <button onClick={() => setShowModal(true)} className="bg-blue-400">New Entry</button>
                {showModal &&

                    <div className="flex flex-row justify-center absolute inset-0 bg-[#f8fafc] bg-opacity-50">
                        <div className=" flex flex-col items-center rounded-4xl bg-blue-500 mt-24 h-3/4 w-2/4">
                            <h1 className="font-bold mt-2 text-3xl">New Application Entry</h1>

                            <div>

                                <form onSubmit={handleAddJob}>
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


                                    <div className="flex row mt-auto mb-10 justify-center gap-100 ml-5 w-full">
                                        <button onClick={() => setShowModal(false)} className="bg-yellow-300">Discard Entry</button>
                                        <button type="submit" className="bg-green-300">Save Application</button>
                                    </div>



                                </form>



                            </div>







                        </div>
                    </div>


                    // Modal ends
                } </div>


            <div>
                <h1 className="text-3xl font-bold">Applications</h1>
            </div>

            <div className="w-full">

                <div className="bg-white shadow-sm mt-5 rounded-2xl w-full h-140 border-gray-600">
                    <div className="flex flex-row gap-20 rounded-t-2xl py-3 px-6 text-gray-600 bg-gray-100">

                        <h3>Company</h3>
                        <h3>Role</h3>
                        <h3>Date Applied</h3>
                        <h3>Status</h3>
                        <div className="ml-50">
                            <h3>Notes</h3>
                        </div>
                        <h3 className="ml-50">Actions</h3>
                    </div>

                    <div>
                        {jobs.map(job => (
                            <div key={job.id} className="flex flex-row justify-between px-6 py-4 border-b">
                                <p>{job.company}</p>
                                <p>{job.position}</p>
                                <p>
                                    {new Date(job.date_applied).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p>{job.status}</p>
                                <p>{job.notes}</p>



                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </div >





    )
}