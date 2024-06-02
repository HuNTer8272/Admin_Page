import EventCard from '@/components/EventCard'
import Header from '@/components/Header'
import { fetchEventData } from '@/helper/EventData'
import React from 'react'
import notfound from '../../image/notfound.png'
import Image from 'next/image'


const Dashboard = async() => {
  const data = await fetchEventData();
  
  // const data = []
  return (
    <div className='h-screen p-4 bg-gray-100 dark:bg-zinc-950'>
        <Header/>
        {data.length === 0?(
        <div className="mt-5">
            <div className="flex flex-col items-center justify-center ">
               <Image  src={notfound}  className='w-[50rem] bg-cover' alt='not found'/>
               <div className="-mt-20 text-center ">
                <h1 className="text-2xl font-semibold">No Event Found</h1>
                <p className='text-lg'>Please create an event first </p>
               </div>
            </div>
        </div>
      ):(
        <div className={` mt-5 grid grid-cols-6 gap-4 `}>        
          <EventCard data={data}/>
       </div>
      )}
    </div>
    
  )
}

export default Dashboard