import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="sm:sticky bottom-0 container layout-shell rounded-b-lg pb-10">
      <div className="sm:flex">
        <p className="w-5/6 text-center mb-6" >3BgsbUzdYVgB4oLyiyFDwY1oyhxUVj3iub</p>
        <div className="flex">
          <Link className="flex-1 link text-center text-xl font-bold" to="/">Recovery</Link>
          <Link className="flex-1 link text-center text-xl font-bold" to="/about">About</Link>
        </div>
      </div>
    </div>
  )
}


export default Footer
