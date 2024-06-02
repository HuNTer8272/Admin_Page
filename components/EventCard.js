"use client"
import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import codeclash from "../image/codeclash.jpg";
import ideathon from "../image/ideathon.jpg";
import techmela from "../image/techmela.jpg";
import neoncricket from "../image/neoncricket.jpg";
import Image from 'next/image';
import { store } from '@/database/Firebase';

const EventCard = ({ data }) => {
  // const data = []
  const cardImage = {
    codeclash: codeclash,
    ideathon: ideathon,
    techmela: techmela,
    neoncricket: neoncricket
  }

  const deleteDoc = async(id) =>{
    try{
      const docRef = store.collection('cards').doc(id);
      docRef.delete();
      console.log('document deleted successfully');
    }catch(e){
      console.error(e.message);
    }


  }

  return (
    <>
      {data.map(doc => (
        <div className={`dark:bg-zinc-900 cursor-pointer bg-white h-[25rem]  shadow-lg rounded-md`} key={doc.id}>
          {/* image div */}
          <div className="bg-[#0afa9b] h-[55%] rounded-md overflow-hidden ">
            <Image className='w-full h-full bg-cover' width={300} height={300} src={doc.Image in cardImage ? cardImage[doc.Image] : doc.Image} alt='eventImage' />
          </div>
          {/* content div */}
          <div className=" h-[45%] p-3">
            <div className={`dark:text-zinc-600 text-[0.8rem] bg-[#0afa9b] px-3 font-semibold mb-3 w-fit p-[1px] rounded-full`}>{doc.Committee}</div>
            <h2 className={`dark:text-white text-zinc-800 font-semibold  text-[1rem] ml-1 `}>{doc.Slogan}</h2>
            <p className={`dark:text-gray-100 text-zinc-700  ml-1 line-clamp-3 text-[0.9rem]  `}>{doc.description}</p>
            <div className="flex justify-between item-center">
              <p className={`dark:text-gray-300 text-zinc-700  ml-1  text-[0.9rem]  mt-2`}>{doc.date}</p>
              <div className='flex justify-center mt-2 space-x-3 text-[0.9rem] item-center'>
                <a href={`/dashboard/${doc.id}`}>
                  <div className="flex items-center justify-center text-center bg-[#0afa9b] rounded-full cursor-pointer text-gray-50 size-7">
                    <FaPencilAlt className="" />
                  </div>
                </a>
                <div onClick={() => deleteDoc(doc.id)} className="flex items-center justify-center text-center text-white bg-red-500 rounded-full cursor-pointer size-7">
                  <MdDelete />
                </div>
              </div>
            </div>
          </div>
        </div>
       ))}
      </>

    )
}

export default EventCard