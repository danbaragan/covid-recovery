import React, { useEffect, useState } from 'react'


function RecoveredTable({ loading, dataInitial, setDataInitial }) {
  const [ data, setData] = useState(dataInitial)
  const [ country, setCountry ] = useState('')
  const [ recoveredTreshold, setRecoveredTreshold ] = useState(4000)
  const [ percentTreshold, setPercentTreshold ] = useState(15)

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

    // todo: match state setter dynamically
    if (e.target.name === 'recovered') {
      setRecoveredTreshold(val)
    } else if (e.target.name === 'percent') {
      setPercentTreshold(val)
    }
  }

  const toggleRow = (idx) => () => {
    const country = data[idx].country
    const newData = dataInitial.map( row => {
      if (row.country === country) {
        let newRow = {...row}
        newRow.selected = !row.selected
        return newRow
      }
      return row
    })
    setDataInitial(newData)
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
                 value={country} onChange={ e => setCountry(e.target.value)}/>
          <input type="text" name="recovered" className={`numeric-flex form-input ${loading ? 'loading' : ''}`}
                 value={recoveredTreshold} onChange={ setNumericField }/>
          <input type="text" name="percent" className={`numeric-flex form-input ${loading ? 'loading' : ''}`}
                 value={percentTreshold} onChange={ setNumericField }/>
        </div>
        <hr className="mb-2"/>
        {data.map( (e, i) => <RecoveredRow key={i} row={e} toggleRow={toggleRow(i)}/>)}
      </div>
    </div>
  )
}

function RecoveredRow( {row, toggleRow} ) {
  const {country, recovered, percent, selected} = row
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
