import { useState } from "react";


export default function Applications() {
    const [showModal, setShowModal] = useState(false);



    return (



        <div className="bg-[#f8fafc]">
            <div>
                <button onClick={() => setShowModal(true)} className="bg-blue-400">New Entry</button>
                {showModal && <div className="fixed inset-0 bg-[#f8fafc] bg-opacity-50">
                    <h1 className="text-black">Yo</h1></div>}

            </div>






        </div>


    )
}