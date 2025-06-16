"use client"

import Link from "next/link";
import { useState } from "react";
import { DotLoader, FadeLoader, PulseLoader } from "react-spinners";

const SearchBar = () => {
    const [dropdown, setDropDown] = useState([])
    const [loading, setLoading] = useState(false)
    const dropDownChange = async (e) => {
        const value = e.target.value
        try {
            if (value.length === 0) {
                setDropDown([])
            } else {
                setLoading(true)
                const response = await fetch('api/search?query=' + value);
                let responseJSON = await response.json()

                setDropDown(responseJSON.Words)
                console.log("DropdownMenu : ", dropdown)
            }

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <section className="bg-gray-50 flex items-center gap-5 drop-shadow-xl mt-5 rounded-md">
                <input onChange={dropDownChange} spellCheck="false"  type="text" name="word" placeholder="Search a word" className="px-2 py-2 border-2 border-gray-300 rounded-md  focus:ring-primary focus:border-blue-500 outline-none text-md h-fit w-full" />
            </section>
            {loading && (
                <div className="mt-2">
                <PulseLoader color="#f0f0f0" loading={loading} size={10}/>
              </div>
            )}
            <div className="flex flex-col" >
                {!loading &&
                    dropdown.map((item, index) => (
                        <section key={index}>
                            <div className="px-2 py-1 border-2 text-black border-gray-300 bg-white rounded-md  focus:ring-primary focus:border-blue-500 outline-none text-md h-fit w-full" >
                                <Link href={`/word/${item.word}`}  >{item.word}</Link>
                            </div>
                        </section>

                    )
                    )
                }
            </div>


        </>


    )
}
export default SearchBar;