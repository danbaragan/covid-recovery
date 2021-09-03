import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="md:sticky bottom-0 container layout-shell rounded-b-lg px-4 lg:px-12">
      <div className="lg:flex">
        <table className="w-2/3 mx-auto text-center text-xs sm:text-sm font-mono" >
          <tbody>
            <tr>
              <td className="text-right">Bech32:</td>
              <td className="lg:text-left">bc1qs969454yssygv58treu0thv3cqu2lmccpvsx8n</td>
            </tr>
          </tbody>
        </table>
        <div className="flex my-4 lg:my-0">
          <Link className="flex-1 link text-center text-lg font-bold" to={{
            pathname: "/hopkins",
            search: "?exclude-small=1"
          }}>Hopkins</Link>
          <Link className="flex-1 link text-center text-lg font-bold" to="/worldometer">Worldometer</Link>
          <Link className="flex-1 link text-center text-lg font-bold" to="/about">About</Link>
        </div>
      </div>
    </div>
  )
}


export default Footer
