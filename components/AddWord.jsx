"use client"

import { MdFileDownloadDone } from "react-icons/md";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useAppContext } from "@/app/contex/context";

const AddWord = () => {
    const {token, setToken} = useAppContext();
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [sentences, setSentences] = useState(['']);

    // For toast notification 
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

    const handleSentenceChange = (index, value) => {
        const newSentences = [...sentences];
        newSentences[index] = value;
        setSentences(newSentences);
    };

    const addSentenceField = () => {
        setSentences([...sentences, '']);
    };

    const removeSentenceField = () => {
        setSentences(sentences.splice((sentences.length - 1), 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalSentences = sentences.filter(x => x != '')

        const wordData = {
            word: word.toLowerCase(),
            meaning: meaning,
            sentences: finalSentences,

        }
        console.log(wordData)

        if(token){
            try {
                const response = await fetch('/api/words', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/Json'
                    },
                    body: JSON.stringify(wordData)
                });
                const ResponseJSON = await response.json()
                if (ResponseJSON.ok) {
                    console.log("Word added successfully...")
                    setWord('')
                    setMeaning('')
                    setSentences([''])
                    notify(ResponseJSON.message)
                } else {
                    console.log(ResponseJSON.message)
                    notify(ResponseJSON.message)
    
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            notify("Only Admin can add words")
        }

    };
    return (
        <section className="bg-gray-50 py-10 px-5 drop-shadow-xl mt-5 rounded-md">

            <div className="flex flex-col items-start gap-3">
                <h1 className="text-2xl text-center text-primary">Add Word</h1>
                <input type="text" name="word" placeholder="Enter word" className="px-2 py-2 border-2 border-gray-300 rounded-md  focus:ring-primary focus:border-blue-500 outline-none text-md h-fit w-full" value={word} onChange={(e) => setWord(e.target.value)} />
            </div>

            <div className="flex flex-col items-start gap-3 mt-10">
                <h1 className="text-2xl text-center text-primary">Define Meaning</h1>
                <input type="text" name="word" placeholder="Enter meaning" className="px-2 py-2 border-2 border-gray-300 rounded-md  focus:ring-primary focus:border-blue-500 outline-none text-md h-fit w-full" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
            </div>

            <div className="flex flex-col items-start mt-10">
                <h2 className="text-2xl text-primary">Enter some example sentences</h2>
                <div className="flex flex-col gap-2 w-full mt-3">
                    {sentences.map((sentence, index) => (
                        <input
                            key={index}
                            type="text"
                            value={sentence}
                            onChange={(e) => handleSentenceChange(index, e.target.value)}
                            placeholder={`Sentence ${index + 1}`}
                            className="px-2 py-2 border-2 border-gray-300 rounded-md  focus:ring-primary focus:border-blue-500 outline-none text-md w-full"
                        />
                    ))}
                </div>

                <div className="flex gap-2 mt-3">
                    <button onClick={addSentenceField} className=" w-32 rounded-sm text-white p-2 bg-primary cursor-pointer hover:bg-secondary" >Add more</button>
                    <button onClick={removeSentenceField} className=" w-32 rounded-sm text-white p-2 bg-primary cursor-pointer hover:bg-secondary" >Remove Extra</button>
                </div>
            </div>

            <button className="relative p-2 bg-primary rounded-md text-white hover:bg-secondary cursor-pointer mt-5" onClick={handleSubmit}><MdFileDownloadDone size={20} /></button>
        </section>
    )
}
export default AddWord;