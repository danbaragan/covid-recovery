import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './assets/main.css'

import Header from './layout/Header'
import Footer from './layout/Footer'
import RecoveredTable from './pages/RecoveredTable'
import About from './pages/About'


function App() {
  return (
    <>
      <Helmet>
        <title>Covid Recovery Tracker</title>
        <meta name="description" content="A call to optimism - tracking covid19 recovery percentages"/>
      </Helmet>

      <Router>
        <Header/>
        <Route exact path="/" component={RecoveredTable}/>
        <Route path="/about" component={About}/>
        <Footer/>
      </Router>
    </>
  )

}

export default App;
