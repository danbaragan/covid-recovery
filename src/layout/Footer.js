import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="sticky bottom-0 container layout-shell rounded-b-lg pb-10">
      <div className="flex">
        <p className="w-5/6" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur?</p>
        <Link className="flex-1 link text-xl font-bold" to="/">Recovery</Link>
        <Link className="flex-1 link text-xl font-bold" to="/about">About</Link>
      </div>
    </div>
  )
}


export default Footer
