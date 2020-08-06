import React, { useState, useMemo } from 'react'
import produce from 'immer'

import { loadLocalStore, saveLocalStore } from '../Service'


function RecoveredTable({ loading, dataInitial }) {
  // todo this does not do what I think it does. local store is hit hard even with this memo...
  const savedRecoveredTreshold = useMemo( () => loadLocalStore('recoveredTreshold', 0), [])
  const savedPercentTreshold = useMemo( () => loadLocalStore('percentTreshold', 0), [])
  const savedCountries = useMemo( () => loadLocalStore('countries', []), [])

  const [ country, setCountry ] = useState('')
  const [ countries, setCountries ] = useState(savedCountries)
  const [ recoveredTreshold, setRecoveredTreshold ] = useState(savedRecoveredTreshold)
  const [ percentTreshold, setPercentTreshold ] = useState(savedPercentTreshold)

  // We used to save on effect cleanup to local Store. This proved to be buggy when reusing this component for 2 data sources
  // and the behaviour did not belong to the effect anyway. The effect was not even needed as a matter of fact...
  // Just save to local store along with the state...
  const data = dataInitial.filter( e => {
    return (e.recovered >= recoveredTreshold
      && e.percent >= percentTreshold
      && (!country || e.country.toLowerCase().includes(country))
    )
  })

  const setNumericField = (e) => {
    let val = parseInt(e.target.value, 10)
    if (isNaN(val) || val < 0) val = 0

    // todo: match state setter dynamically
    if (e.target.name === 'recovered') {
      setRecoveredTreshold(val)
      saveLocalStore('recoveredTreshold', val)
    } else if (e.target.name === 'percent') {
      setPercentTreshold(val)
      saveLocalStore('percentTreshold', val)
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
    saveLocalStore('countries', newCountries)
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
        { loading ?
          <LoadingMsg/> :
          data.map( (e, i) => <RecoveredRow key={i} row={e} toggleRow={toggleRow(i)} countries={countries}/>)}
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

function LoadingMsg() {
  return (
    <h4 className="text-center text-2xl font-bold my-12">
      Loading...
    </h4>
  )
}
export default RecoveredTable;
