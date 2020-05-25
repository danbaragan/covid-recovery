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
  const [ data, setData ] = useState(testData)

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
        setData(rows)
      })
  }, [])

  return (
    <div>
      <div className="flex">
        <span className="flex-1">Country</span>
        <span className="flex-1">Recovered</span>
        <span className="flex-1">Percent</span>
      </div>
      <hr/>
      {data.map( (e, i) => <RecoveredRow key={i} country={e.country} recovered={e.recovered} percent={e.percent}/>)}
    </div>
  )
}

function RecoveredRow( {country, recovered, percent} ) {
  return (
    <div className="flex">
      <span className="flex-1">{country}</span>
      <span className="flex-1">{recovered}</span>
      <span className="flex-1">{percent}</span>
    </div>
  )
}

export default RecoveredTable;
