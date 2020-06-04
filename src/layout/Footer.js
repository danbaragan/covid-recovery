import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="md:sticky bottom-0 container layout-shell rounded-b-lg px-4 lg:px-12">
      <div className="md:flex">
        <table className="w-5/6 mx-auto text-center text-xs lg:text-sm font-mono" >
          <tbody>
            <tr>
              <td className="text-right">SegWit:</td>
              <td className="lg:text-left">3BgsbUzdYVgB4oLyiyFDwY1oyhxUVj3iub</td>
            </tr>
            <tr>
              <td className="text-right">Bech32:</td>
              <td className="lg:text-left">bc1q7djensd4msyslpg8glp4nx8u4nlyeh655qhxte</td>
            </tr>
          </tbody>
        </table>
        <div className="flex my-4 md:my-0">
          <Link className="flex-1 link text-center text-lg font-bold" to="/">Hopkins</Link>
          <Link className="flex-1 link text-center text-lg font-bold" to="/worldometer">Worldometer</Link>
          <Link className="flex-1 link text-center text-lg font-bold" to="/about">About</Link>
        </div>
      </div>
    </div>
  )
}


export default Footer
