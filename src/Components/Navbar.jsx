import React from 'react';
import logo from '../Images/logo.svg'
const Navbar = () => {
    return (
       <nav className='bg-[#E2B2DF] flex flex-row items-center'>
            <div className="mb-1"><img src={logo} className= ' w-24 h-14' /> </div>
            <div className=" font-lobster text-4xl text-white mt-2">Quote Generator App</div>
            <div className=""></div>
       </nav>
    );
};

export default Navbar;