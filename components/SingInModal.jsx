
import React, { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { useAppContext } from "@/app/contex/context";

const SingINModal = ({ isOpen, onClose }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setToken} = useAppContext();

    const notify = (x) => toast(x, {
        duration: 4000,
        position: 'top-center',

        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },

        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },

        // Additional Configuration
        removeDelay: 1000,
    });

    const SingInHandler = async (data) => {
        try {
            {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/singIn`, {
                    method: "POST",
                    cache: "no-cache",
                    body: JSON.stringify(data)
                })
                const ResponseJSON = await res.json();
                if (ResponseJSON.ok) {
                    console.log("SingIn Successfully...")
                    localStorage.setItem("Dtoken", ResponseJSON.token)
                    setToken(ResponseJSON.token)
                    notify(ResponseJSON.message)
                    onClose()
                } else {
                    notify(ResponseJSON.message)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const SingInData = {
            user: username,
            pass: password
        }
        SingInHandler(SingInData)
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sing In">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter username"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="meaning"
                        name="meaning"
                        type="text"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter Password"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SingINModal;
