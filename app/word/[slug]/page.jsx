"use client"

import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import FormModal from "@/components/EditWordModal";
import toast from "react-hot-toast";
import { useAppContext } from "@/app/contex/context";
import { useRouter } from 'next/navigation';

const DynamicWord = ({ params }) => {
    const router = useRouter();

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

    const { token } = useAppContext();
    const [wordData, setWordData] = useState({ word: '', meaning: '', sentences: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const handleOpenModal = () => {
        if (!token) {
            notify("Only Admin can edit")
        } else {
            setIsModalOpen(true)
        }
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data) => {
        console.log("Form submitted:", data);

        setSubmittedData(data);
        try {
            const response = await fetch('/api/editWord', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/Json'
                },
                body: JSON.stringify(data)
            });
            const ResponseJSON = await response.json();
            console.log("Response from page.jsx", ResponseJSON)
            if (ResponseJSON.ok) {
                console.log("Word updated successfully...")
                setIsModalOpen(false);
                notify(ResponseJSON.message)
            } else {
                console.log(ResponseJSON.message)
                notify(ResponseJSON.message)
            }
        } catch (error) {
            console.log(error)
        }

    };

    const fetchWordData = async () => {

        const { slug } = await params
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/wordData/${slug}`, {
                method: "GET",
                cache: "no-cache"
            })

            if (res.ok) {
                const responseJSON = await res.json()
                console.log("Normal Fetched word:", responseJSON.word)
                setWordData(responseJSON.word)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchNextword = async (word) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/nextWord/${word}`, {
                method: "GET",
                cache: "no-cache"
            })

            if (res.ok) {
                const responseJSON = await res.json()
                if (responseJSON.NextWord.length == 0) {
                    notify("This is the earliest word...")
                } else {
                    setWordData(responseJSON.NextWord[0])
                    console.log(responseJSON.NextWord)
                }

            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleMarkRead = async (word) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/markRead/${word}`, {
                method: "GET",
                cache: "no-cache"
            })

            if (res.ok) {
                const responseJSON = await res.json()
                notify(responseJSON.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteWord = async (word)=>{
        if(!token){
            notify("Only Admin can delete.")
        }else{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/delete/${word}`, {
                    method: "GET",
                    cache: "no-cache"
                })
    
                if (res.ok) {
                    const responseJSON = await res.json()
                    notify(responseJSON.message)
                    router.push('/')
                }if(!res.ok){
                    const responseJSON = await res.json()
                    notify(responseJSON.message)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        fetchWordData()
    }, [params]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="bg-blue-50 mt-5 p-5 h-[85vh] overflow-y-scroll relative scrollbar">
            <div className="flex flex-col mt-3">
                {/* word  */}
                <h1 className="text-4xl mb-2 text-dark-text">{wordData.word == "" ? (
                    <p>Loading</p>
                ) : (
                    <div className="flex items-end gap-3">
                        <p className="w-fit">{
                            capitalizeFirstLetter(wordData.word)
                        }</p>
                        <button
                        onClick={()=>handleMarkRead(wordData.word)}
                            className="bg-primary w-fit hover:bg-secondary text-white py-1 px-2 rounded-sm cursor-pointer flex items-center text-sm mb-1"
                        >
                            Mark as Read
                        </button>

                    </div>

                )}</h1>

                {/* Meaning  */}
                <p className="text-lg">{wordData.meaning}</p>

            </div>


            {/* Sentences  */}
            <div className="flex flex-col mt-5">
                {
                    wordData.sentences.length == 0 ? (
                        <p>Sentences are loading.</p>
                    ) : (
                        <div>
                            {
                                wordData.sentences.map((item, index) => (
                                    <div key={index} className="text-lg flex gap-2 items-center italic text-gray-600"><GoDotFill size={16} />{capitalizeFirstLetter(item)}</div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <button
                onClick={() => fetchNextword(wordData.word)}
                className="bg-primary w-fit hover:bg-secondary text-white py-1 px-2 rounded-sm mt-5 cursor-pointer flex items-center"
            >
                Next Word
            </button>
            <div className="w-fit flex gap-2">
                {/* Button  */}
                <button
                    onClick={handleOpenModal}
                    className="bg-primary w-fit hover:bg-secondary text-white py-1 px-2 rounded-sm mt-5 cursor-pointer flex items-center"
                >
                    Edit
                </button>

                <button
                 onClick={()=>handleDeleteWord(wordData.word)}
                    className="bg-primary w-fit hover:bg-secondary text-white py-1 px-2 rounded-sm mt-5 cursor-pointer flex items-center"
                >
                    Delete
                </button>
                {/* Home Button  */}
            </div>

            <FormModal
                word={wordData.word}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />
        </div >
    );
};

export default DynamicWord;