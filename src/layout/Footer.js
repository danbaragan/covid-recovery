import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="sm:sticky bottom-0 container layout-shell rounded-b-lg">
      <div className="sm:flex">
        <p className="w-5/6 text-center mb-4" >3BgsbUzdYVgB4oLyiyFDwY1oyhxUVj3iub</p>
        <div className="flex">
          <Link className="flex-1 link text-center text-lg font-bold" to="/">Recovery</Link>
          <Link className="flex-1 link text-center text-lg font-bold" to="/about">About</Link>
        </div>
      </div>
    </div>
  )
}


export default Footer