import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='NavBar'>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/host'>Host</Link>
      </nav>
    </div>
  );
}

export default Navbar;
