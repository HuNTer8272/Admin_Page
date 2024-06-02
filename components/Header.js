import React from 'react'
import { ModeToggle } from './ui/ToggleTheme'
import { eventLength } from '@/helper/EventData'

const Header = () => {

  return (
    <div className='flex items-center justify-between p-3 px-5 text-center bg-white rounded-lg drop-shadow-lg dark:bg-zinc-900'>

      <div className="flex">
        <h1 className='text-[1rem]   font-semibold'>Event</h1>
        <p className={`text-[1rem] grid place-item size-6  bg-[#0afa9b] rounded-full text-white font-semibold text-center  ml-3 `}>{eventLength ? eventLength : "0"}</p>

       <a href='/dashboard/create-event'>
        <button className={`bg-[#0afa9b]  ml-10 rounded-full text-[0.9rem] font-semibold px-3 outline-none p-1 relative after:content[''] z-20 after:transition-all after:ease-in hover:bg-transparent   after:duration-300 after:-z-10   hover:after:w-full  after:absolute after:w-0 after:h-full  after:inset-0 after:rounded-full after:bg-[#393939]  `}>
          + Add Event
        </button>
       </a>

      </div>
      <ModeToggle />
    </div>
  )
}

export default Header