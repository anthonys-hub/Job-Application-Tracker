import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                navigate('/dashboard')

            })
    }


    return (
        <form onSubmit={handleSubmit}
        >

            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)

                    }}
                />

            </div>
            <button className="bg-black text-white">
                Login!
            </button>



        </form>
    )
}
