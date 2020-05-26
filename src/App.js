import React from 'react';
import './assets/main.css'

import  RecoveredTable from './RecoveredTable'


function App() {
  return (
    <>
      <div className="container bg-lime-800 text-gray-200 rounded-t-lg py-8 pb-12">
        <h1 className="text-center text-2xl ">Covid Recovery</h1>
      </div>
      <div className="container bg-lime-400 text-gray-200 rounded-b-lg pb-6 mb-6">
        <RecoveredTable/>
      </div>
    </>
  )

}

export default App;
