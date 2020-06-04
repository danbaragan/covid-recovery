import React, { useEffect, useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
/* For the moment Helmet will issue "Using UNSAFE_componentWillMount in strict mode is not recommended" */
import { Helmet } from 'react-helmet'

import './assets/main.css'

import Header from './layout/Header'
import Footer from './layout/Footer'
import RecoveredTable from './pages/RecoveredTable'
import About from './pages/About'

import WorldometerScraper from './engine/WorldometerScraper'
import HopkinsData from './engine/HopkinsApi'
import Aggregator from "./engine/Aggregator"


function App() {
  const location = useLocation()
  const [ loading, setLoading ] = useState(true)
  const [ loadedH, setLoadedH ] = useState(false)
  const [ loadedW, setLoadedW ] = useState(false)
  const [ current, setCurrent ] = useState('')
  const [ dataInitialH, setDataInitialH ] = useState([])
  const [ dataInitialW, setDataInitialW ] = useState([])

  useEffect( () => {
    const path = location.pathname
    if (path === '/' || path === '/hopkins') {
      setCurrent('hopkins')
      setLoading(true)
    } else if (path === '/worldometer') {
      setCurrent('worldometer')
      setLoading(true)
    } else {
      setCurrent('')
    }
  }, [location, current])

  useEffect( () => {
    if (current && ((current === 'worldometer' && !loadedW) || (current === 'hopkins' && !loadedH))) {
      const dataSource = current === 'worldometer' ? new WorldometerScraper() : new HopkinsData()

      dataSource.fetchData()
        .then(rows => {
          const aggregator = new Aggregator()
          const aggregatedRows = aggregator.process(rows)
          if (current === 'worldometer') {
            setDataInitialW(aggregatedRows)
            setLoadedW(true)
          } else {
            setDataInitialH(aggregatedRows)
            setLoadedH(true)
          }
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [loading, current, loadedW, loadedH])

  return (
    <>
      <Helmet>
        <title>Covid Recovery Tracker</title>
        <meta name="description" content="A call to optimism - tracking covid19 recovery percentages"/>
      </Helmet>

      <Header/>
      <Route path="(/|/hopkins)"
             render={ () => <RecoveredTable
               loading={loading} dataInitial={dataInitialH}/>}/>
      <Route path="/worldometer"
             render={ () => <RecoveredTable
               loading={loading} dataInitial={dataInitialW}/>}/>
      <Route path="/about" component={About}/>
      <Footer/>
    </>
  )

}

export default App;
