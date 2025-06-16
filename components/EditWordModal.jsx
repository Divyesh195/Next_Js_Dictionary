
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const FormModal = ({ isOpen, onClose, onSubmit, word }) => {

    const [Editword, setEditWord] = useState('');
    const [Editmeaning, setEditMeaning] = useState('');
    const [Editsentences, setEditSentences] = useState(['']);
    const fetchWordData = async () => {

        try {
            if (word == "") {
                console.log("word is loading")
            } else {
                const res = await fetch(`http://localhost:3000/api/wordData/${word}`, {
                    method: "GET",
                    cache: "no-cache"
                })
                if (res.ok) {
                    const responseJSON = await res.json()
                    // console.log("From Modal :", responseJSON.word)
                    setEditWord(responseJSON.word.word)
                    setEditMeaning(responseJSON.word.meaning)
                    setEditSentences(responseJSON.word.sentences)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchWordData()
    }, [word]);

    const handleSentenceChange = (index, value) => {
        const newSentences = [...Editsentences];
        newSentences[index] = value;
        setEditSentences(newSentences);
    };

    const addSentenceField = () => {
        setEditSentences([...Editsentences, '']);
    };

    const removeSentenceField = () => {
        setEditSentences(Editsentences.splice((Editsentences.length - 1), 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalSentences = Editsentences.filter(x => x != '')

        const wordData = {
            word: Editword.toLowerCase(),
            meaning: Editmeaning,
            sentences: finalSentences,
            createdAt: new Date()
        }
        onSubmit(wordData)
        console.log(wordData)
        // onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Word">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={Editword} onChange={(e) => setEditWord(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                          id="meaning"
                          name="meaning"
                          type="text"
                        value={Editmeaning} onChange={(e) => setEditMeaning(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="flex flex-col items-start">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Example Sentences
                    </label>
                    <div className="flex flex-col gap-2 w-full mt-3">
                        {Editsentences.map((sentence, index) => (
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
                        <button type="button" onClick={addSentenceField} className=" w-32 rounded-sm text-white p-2 bg-primary cursor-pointer hover:bg-secondary" >Add more</button>
                        <button type="button" onClick={removeSentenceField} className=" w-32 rounded-sm text-white p-2 bg-primary cursor-pointer hover:bg-secondary" >Remove Extra</button>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default FormModal;
