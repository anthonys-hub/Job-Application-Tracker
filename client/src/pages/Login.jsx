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
                if (!data.token) {
                    alert(data.message)
                    return
                }
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                navigate('/dashboard')
            })
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex w-3/5 h-4/5 rounded-2xl overflow-hidden shadow-xl m-auto">

                <div className="w-2/5 bg-blue-600 flex flex-col p-10">
                    <h1 className="text-white font-bold text-3xl font-[Inter]">Dossier</h1>
                    <p className="text-blue-100 mt-4 leading-relaxed">
                        The executive workspace for your big career moves. Curated, organized, and focused.
                    </p>
                </div>

                <div className="w-3/5 bg-white flex flex-col justify-center px-16">
                    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-10">
                            <h1 className="font-bold text-3xl font-[Inter] text-gray-900">Welcome back</h1>
                            <p className="text-gray-500 text-sm mt-2">Please enter your credentials to access your dossier</p>
                        </div>

                        <div className="flex flex-col gap-8 mb-10">
                            <input
                                className="border-b border-gray-300 outline-none w-full pb-2 text-gray-700 focus:border-blue-600 transition-colors"
                                placeholder="henry.booker@dossier.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                className="border-b border-gray-300 outline-none w-full pb-2 text-gray-700 focus:border-blue-600 transition-colors"
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="w-full bg-blue-600 shadow-lg hover:shadow-blue-200 transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] text-white py-4 rounded-xl cursor-pointer font-semibold text-lg">
                            Login!
                        </button>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-500">Don't have an account? </span>
                            <span
                                onClick={() => navigate('/register')}
                                className="text-blue-600 font-medium cursor-pointer hover:underline"
                            >
                                Register here
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}