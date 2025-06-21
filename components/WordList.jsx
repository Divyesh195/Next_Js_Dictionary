"use client"

import Link from "next/link";
import { useState, useEffect } from "react";


const WordsList = () => {

    const [words, setWords] = useState([])
    const getWords = async () => {
        try {
            const response = await fetch('api/words');
            let responseJSON = await response.json()

            if (responseJSON.ok) {
                console.log("Words are fetched successfully...")
                setWords(responseJSON['myWords'])
                // console.log(responseJSON['myWords'])
            } else {
                console.log("Error in fetching word.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWords()
    }, [])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <section className= "mt-5">
            {words.length == 0 ? (
                <p className="text-lg font-semibold p-3 text-white min-w-[15vw] max-w-fit rounded-md text-center">Loading words</p>
            ) : (
                <div className="flex flex-wrap gap-5 xl:justify-between items-start text-primary">
                    {
                        words.map((item, index) => (
                            <div key={index}>
                                <Link href={`/word/${item.word}/`}><p className="text-xl p-3 bg-gray-100 min-w-[15vw] max-w-fit rounded-md text-center">{capitalizeFirstLetter(words[index].word)}</p>
                                </Link>
                                
                            </div>

                        ))
                    }
                </div>
            )
            }
        </section>
    )
}

export default WordsList;