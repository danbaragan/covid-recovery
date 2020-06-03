import Scraper from './engine/Scraper'
import Aggregator from "./engine/Aggregator"

const testData = [
  {country: 'Anguilla', recovered: 3, percent: 100},
  {country: 'Saint Pierre Miquelon', recovered: 1, percent: 100},
  {country: 'Iceland', recovered: 1791, percent: 99},
  {country: 'World', recovered: 10000, percent: 97},
  {country: 'Hong Kong', recovered: 1030, percent: 96},
  {country: 'Gibraltar', recovered: 147, percent: 95},
]

function fetchData(testing) {
  const cors_proxy = process.env.REACT_APP_CORS_PROXY || 'https://cors-anywhere.herokuapp.com'
  const data_path = process.env.REACT_APP_DATA_PATH || 'https://www.worldometers.info/coronavirus'
  const url = `${cors_proxy}/${data_path}`

  if (testing) {
    return new Promise( (resolve) => {
      resolve(testData)
    })
  }

  return fetch(url)
    .then( res => {
      if (res.ok) {
        return res.text()
      } else {
        return ''
      }
    })
    .then( body => {
      const scraper = new Scraper(body)
      const processor = new Aggregator()
      return processor.process(scraper.parse())
    })
}

function loadLocalStore(key, defaultValue) {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return defaultValue
    }
    return JSON.parse(serializedValue)
  } catch (err) {
    return defaultValue
  }
}

function saveLocalStore(key, value) {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (err) {
    console.warn( `Failed to save to localStorage ${key}: ${value}` )
  }
}

export {
  fetchData,
  loadLocalStore,
  saveLocalStore,
}
