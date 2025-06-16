"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiEnglishInput } from "react-icons/ri";
import SingINModal from "./SingInModal";
import { useAppContext } from "@/app/contex/context";
import toast from "react-hot-toast";


const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {token, setToken} = useAppContext();
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

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

  const handleLogOut = () =>{
    localStorage.removeItem('Dtoken')
    setToken("")
    notify("Logged Out")
  }

  return (
    <><SingINModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    />
      <div className="flex items-center justify-between pt-5 pb-2 border-b border-white">
        {/* Logo  */}
        <div className="flex items-center text-white">
          <Link href={'/'}> <p className="flex items-end"><span className="text-xl font-bold ">DICTIONARY</span><span className="font-semibold">.div</span></p></Link>
          <p className="text-xs bg-black p-[2px] text-white rounded-sm ml-3"><RiEnglishInput size={16} /></p>
        </div>

        {/* Sing In  */}
        {token ? <button onClick={handleLogOut} className="px-2 py-1 rounded-sm text-lg bg-primary text-white hover:bg-secondary cursor-pointer">Log out</button> : <button onClick={handleOpenModal} className="px-2 py-1 rounded-sm text-lg bg-primary text-white hover:bg-secondary cursor-pointer">Sing In</button>}

      </div>

    </>
  )
}

export default Navbar