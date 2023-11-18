import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';


function Navbar() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLinkClick = () => {
    setClick(false);
  };

  return (
    <nav className='z-50 bg-black'>
      <div className='flex justify-between px-4 py-4 border-b sm:px-20 h-10vh lg:py-5'>
        <div className='flex items-center flex-1'>
          <h2 className='text-3xl font-bold text-pink-600'>
            <img src="../public/Image/Logo.jpeg" alt="" height={20} width={60} />
          </h2>
        </div>
        <div className='hidden sm:flex'>
          <ul className='flex gap-8 mr-16 text-[18px]'>
            <Link to='/' onClick={handleLinkClick}>
              <li className='text-pink-700 transition border-b-2 border-white hover:text-pink-300 hover:border-pink-400'>Home</li>
            </Link>
            <Link to='/Supplier' onClick={handleLinkClick}>
              <li className='text-pink-700 transition border-b-2 border-white hover:text-pink-300 hover:border-pink-400'>Supplier</li>
            </Link>
            <Link to='/Purchase' onClick={handleLinkClick}>
              <li className='text-pink-700 transition border-b-2 border-white hover:text-pink-300 hover:border-pink-400'>Purchase</li>
            </Link>
            <Link to='/Payment' onClick={handleLinkClick}>
              <li className='text-pink-700 transition border-b-2 border-white hover:text-pink-300 hover:border-pink-400'>Payment</li>
            </Link>
          </ul>
        </div>
        <div className='flex sm:hidden'>
          <button className='block text-pink-700 transition' onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {click && (
          <div className='absolute top-0 left-0 w-full h-screen bg-black sm:hidden border-4  border-pink-700 rounded-br-[80%]'>
            <ul className='flex flex-col items-center mt-16'>
              <Link to='/' onClick={handleLinkClick}>
                <li className='mb-4 text-pink-900'>Home</li>
              </Link>
              <Link to='/Supplier' onClick={handleLinkClick}>
                <li className='mb-4 text-pink-900'>Suplier</li>
              </Link>
              <Link to='/Purchase' onClick={handleLinkClick}>
                <li className='mb-4 text-pink-900'>Purchase</li>
              </Link>
              <Link to='/Payment' onClick={handleLinkClick}>
                <li className='mb-4 text-pink-900'>Payment</li>
              </Link>
            </ul>
            <div className='mt-4 text-center'>
              <button className='text-pink-900' onClick={handleClick}><FaTimes /></button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
