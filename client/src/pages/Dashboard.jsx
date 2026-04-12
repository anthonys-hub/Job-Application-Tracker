import { useEffect } from "react"
import { useState } from "react"

export default function Dashboard() {
    const [jobs, setJobs] = useState([])


    useEffect(() => {
        fetch('http://localhost:5000/api/jobs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                console.log(data)
            })
    }, [])
    return (

        <div>
            <h1>dashboard</h1>
            {Array.isArray(jobs) && jobs.map(job => (

                <div key={job.id}>
                    <p>Company: {job.company}</p>
                    <p>Position: {job.position}</p>
                    <p>Status: {job.status}</p>

                </div>
            ))}

        </div>


    )
}



