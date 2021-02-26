import React, { useEffect, useState } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
/* For the moment Helmet will issue "Using UNSAFE_componentWillMount in strict mode is not recommended" */
import { Helmet } from 'react-helmet'

import './index.css'

import Header from './layout/Header'
import Footer from './layout/Footer'
import RecoveredTable from './pages/RecoveredTable'
import About from './pages/About'

import WorldometerScraper from './engine/WorldometerScraper'
import HopkinsData from './engine/HopkinsApi'
import Aggregator from "./engine/Aggregator"


function App() {
  const location = useLocation()
  const [ loadingH, setLoadingH ] = useState(false)
  const [ loadingW, setLoadingW ] = useState(false)
  const [ loadedH, setLoadedH ] = useState(false)
  const [ loadedW, setLoadedW ] = useState(false)
  const [ current, setCurrent ] = useState('')
  const [ excludeSmall, setExcludeSmall ] = useState(null)
  const [ dataInitialH, setDataInitialH ] = useState([])
  const [ dataInitialW, setDataInitialW ] = useState([])

  useEffect( () => {
    const path = location.pathname
    const searchParms = new URLSearchParams(location.search)
    const excludeSmall = searchParms.get('exclude-small') === "1"
    setExcludeSmall(excludeSmall)

    if (path === '/hopkins') {
      setCurrent('hopkins')
    } else if (path === '/worldometer') {
      setCurrent('worldometer')
    } else {
      setCurrent('')
    }
  }, [location, current, excludeSmall])

  useEffect( () => {
    if ((current === 'worldometer' && !loadedW && !loadingW) || (current === 'hopkins' && !loadedH && !loadingH)) {
      let dataSource = null
      if (current === 'worldometer') {
        dataSource =  new WorldometerScraper()
        setLoadingW(true)
      } else if (current === 'hopkins') {
        dataSource =  new HopkinsData(excludeSmall)
        setLoadingH(true)
      }

      dataSource.fetchData()
        .then(rows => {
          const aggregator = new Aggregator()
          const aggregatedRows = aggregator.process(rows)
          if (current === 'worldometer') {
            setDataInitialW(aggregatedRows)
            setLoadedW(true)
            setLoadingW(false)
          } else if (current === 'hopkins') {
            setDataInitialH(aggregatedRows)
            setLoadedH(true)
            setLoadingH(false)
          }
        })
    }
  }, [current, excludeSmall, loadingW, loadingH, loadedW, loadedH])

  return (
    <>
      <Helmet>
        <title>Covid Recovery Tracker</title>
        <meta name="description" content="A call to optimism - tracking covid19 recovery percentages"/>
      </Helmet>

      <Header/>
      <Route exact path="/">
        <Redirect to={{
          pathname: "/hopkins",
          search: "?exclude-small=1"
        }}/>
      </Route>
      <Route path="/hopkins"
             render={ () => <RecoveredTable
               loading={loadingH} dataInitial={dataInitialH} />}/>
      <Route path="/worldometer"
             render={ () => <RecoveredTable
               loading={loadingW} dataInitial={dataInitialW} />}/>
      <Route path="/about" component={About}/>
      <Footer/>
    </>
  )

}

export default App;
