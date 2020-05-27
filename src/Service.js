import Scraper from './Scraper'

const testData = [
  {country: 'Anguilla', recovered: 3, percent: 100},
  {country: 'Saint Pierre Miquelon', recovered: 1, percent: 100},
  {country: 'Iceland', recovered: 1791, percent: 99},
  {country: 'World', recovered: 10000, percent: 97},
  {country: 'Hong Kong', recovered: 1030, percent: 96},
  {country: 'Gibraltar', recovered: 147, percent: 95},
]

function fetchData(testing) {

  if (testing) {
    return new Promise( (resolve) => {
      resolve(testData)
    })
  }

  return fetch('https://www.worldometers.info/coronavirus/')
    .then( res => {
      if (res.ok) {
        return res.text()
      } else {
        return ''
      }
    })
    .then( body => {
      const scraper = new Scraper(body)
      return scraper.parse()
    })
}

export {
  fetchData,
}
