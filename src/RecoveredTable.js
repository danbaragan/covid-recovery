import React, { useEffect, useState } from 'react'
import Scraper from './Scraper'
import cheerio from 'cheerio'
window.cheerio = cheerio

function RecoveredTable() {
  const testData = [
    {country: 'Anguilla', recovered: 3, percent: 100},
    {country: 'Saint Pierre Miquelon', recovered: 1, percent: 100},
    {country: 'Iceland', recovered: 1791, percent: 99},
    {country: 'Hong Kong', recovered: 1030, percent: 96},
    {country: 'Gibraltar', recovered: 147, percent: 95},
  ]
  const [ dataInitial, setDataInitial ] = useState(testData)
  const [ data, setData] = useState(dataInitial)
  const [ country, setCountry ] = useState('')
  const [ recoveredTreshold, setRecoveredTreshold ] = useState(4000)
  const [ percentTreshold, setPercentTreshold ] = useState(15)

  useEffect( () => {
    fetch('https://www.worldometers.info/coronavirus/')
      .then( (res) => {
        if (res.ok) {
          return res.text()
        } else {
          return ''
        }
      })
      .then( body => {
        const scraper = new Scraper(body)
        const rows = scraper.parse()
        setDataInitial(rows)
      })
  }, [])

  useEffect( () => {
    let filteredData = dataInitial.filter( e => e.recovered >= recoveredTreshold && e.percent >= percentTreshold)
    if (country) {
      filteredData = filteredData.filter( e => e.country.toLowerCase().includes(country) )
    }
    setData(filteredData)
  }, [dataInitial, country, recoveredTreshold, percentTreshold])

  const setNumericField = (e) => {
    let val = parseInt(e.target.value, 10)
    if (isNaN(val) || val < 0) val = 0

    // todo - match state setter dynamically
    if (e.target.name === 'recovered') {
      setRecoveredTreshold(val)
    } else if (e.target.name === 'percent') {
      setPercentTreshold(val)
    }
  }

  return (
    <div>
      <div className="flex">
        <span className="text-flex">Country</span>
        <span className="numeric-flex">Recovered</span>
        <span className="numeric-flex">Percent</span>
      </div>
      <div className="flex">
        <input type="text" name="country" className="text-flex form-input"
               value={country} onChange={ e => setCountry(e.target.value)}/>
        <input type="text" name="recovered" className="numeric-flex form-input"
               value={recoveredTreshold} onChange={ setNumericField }/>
        <input type="text" name="percent" className="numeric-flex form-input"
               value={percentTreshold} onChange={ setNumericField }/>
      </div>
      <hr className="mb-2"/>
      {data.map( (e, i) => <RecoveredRow key={i} country={e.country} recovered={e.recovered} percent={e.percent}/>)}
    </div>
  )
}

function RecoveredRow( {country, recovered, percent} ) {
  return (
    <div className="flex">
      <span className="text-flex">{country}</span>
      <span className="numeric-flex">{recovered}</span>
      <span className="numeric-flex">{percent}</span>
    </div>
  )
}

export default RecoveredTable;
