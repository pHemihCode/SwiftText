import { bottomLinks } from '@/constants';
import React from 'react'
import { Link,useLocation } from 'react-router-dom';
const BottomBar = () => {
    const {pathname} = useLocation()
  return (
    <section className='lg:hidden fixed bottom-0 flex flex-row gap-6 w-full justify-evenly bg-slate-950'>
       {bottomLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
                <Link
                  to={link.route}
                  key={link.label}
                  className={`${isActive && "bg-blue-500 rounded-md"} group flex flex-col py-1 my-2 w-12 h-12 rounded-md items-center justify-center text-sm hover:bg-blue-500`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${
                      isActive && "invert-white"
                    } w-4 h-4 group-hover:invert-white mt-[3px]`}
                  />
                  <p className='text-[.6rem]'>{link.label}</p>
                </Link>
            );
          })}
    </section>
  )
}

export default BottomBar