import React, { useEffect, useState, useMemo } from 'react'
import produce from 'immer'

import { loadLocalStore, saveLocalStore } from '../Service'


function RecoveredTable({ loading, dataInitial, current }) {
  const savedRecoveredTreshold = useMemo( () => loadLocalStore('recoveredTreshold', 0), [current])
  const savedPercentTreshold = useMemo( () => loadLocalStore('percentTreshold', 0), [current])
  const savedCountries = useMemo( () => loadLocalStore('countries', []), [current])

  const [ data, setData] = useState(dataInitial)
  const [ country, setCountry ] = useState('')
  const [ countries, setCountries ] = useState(savedCountries)
  const [ recoveredTreshold, setRecoveredTreshold ] = useState(savedRecoveredTreshold)
  const [ percentTreshold, setPercentTreshold ] = useState(savedPercentTreshold)

  useEffect( () => {
    setCountries(savedCountries)
    setRecoveredTreshold(savedRecoveredTreshold)
    setPercentTreshold(savedPercentTreshold)
  }, [savedCountries, savedRecoveredTreshold, savedPercentTreshold])

  useEffect( () => {
    const filteredData = dataInitial.filter( e => {
      return (e.recovered >= recoveredTreshold
        && e.percent >= percentTreshold
        && (!country || e.country.toLowerCase().includes(country))
      )
    })
    setData(filteredData)

    return () => {
      saveLocalStore('recoveredTreshold', recoveredTreshold)
      saveLocalStore('percentTreshold', percentTreshold)
      saveLocalStore('countries', countries)
    }
  }, [dataInitial, country, countries, recoveredTreshold, percentTreshold])

  const setNumericField = (e) => {
    let val = parseInt(e.target.value, 10)
    if (isNaN(val) || val < 0) val = 0

    // todo: match state setter dynamically
    if (e.target.name === 'recovered') {
      setRecoveredTreshold(val)
    } else if (e.target.name === 'percent') {
      setPercentTreshold(val)
    }
  }

  const toggleRow = (idx) => () => {
    const country = data[idx].country
    let newCountries = []
    if (countries.includes(country)) {
      newCountries = produce(countries, draft => {
        draft.splice(countries.indexOf(country), 1)
      })
    } else {
      newCountries = produce(countries, draft => {
        draft.push(country)
      })
    }
    setCountries(newCountries)
  }

  return (
    <div className="container layout-mid">
      <div className={`${loading ? 'loading' : ''}`}>
        <div className="flex pt-4 font-semibold">
          <span className="text-flex">Country</span>
          <span className="numeric-flex">Recovered</span>
          <span className="numeric-flex">Percent</span>
        </div>
        <div className="flex pb-2">
          <input type="text" name="country" className={`text-flex form-input ${loading ? 'loading' : ''}`}
                 value={country} onChange={ e => setCountry(e.target.value.toLowerCase())}/>
          <input type="text" name="recovered" className={`numeric-flex form-input ${loading ? 'loading' : ''}`}
                 value={recoveredTreshold} onChange={ setNumericField }/>
          <input type="text" name="percent" className={`numeric-flex form-input ${loading ? 'loading' : ''}`}
                 value={percentTreshold} onChange={ setNumericField }/>
        </div>
        <hr className="mb-2"/>
        {data.map( (e, i) => <RecoveredRow key={i} row={e} toggleRow={toggleRow(i)} countries={countries}/>)}
      </div>
    </div>
  )
}

function RecoveredRow( {row, toggleRow, countries} ) {
  const {country, recovered, percent } = row
  const selected = countries.includes(country)
  return (
    <div className={`flex selectable-row ${ selected ? 'text-yellow-500 font-semibold' : ''} ${country === 'World' ? 'text-blue-300 font-semibold' : ''}`}
         onClick={ toggleRow }>
      <span className="text-flex">{country}</span>
      <span className="numeric-flex">{recovered}</span>
      <span className="numeric-flex">{percent}</span>
    </div>
  )
}

export default RecoveredTable;
