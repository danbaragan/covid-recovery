import cheerio from 'cheerio'


const testData = [
  {country: 'Anguilla', recovered: 3, cases: 5, deaths: 1, active: 1},
  {country: 'Saint Pierre Miquelon', recovered: 0, cases: 5, deaths: 1, active: 1},
  {country: 'Iceland', recovered: 1791, cases: 5000, deaths: 100, active: 180},
  {country: 'World', recovered: 10000, cases: 90000, deaths: 5000, active: 15000},
  {country: 'Hong Kong', recovered: 1030, cases: 10555, deaths: 640, active: 1255},
  {country: 'Gibraltar', recovered: 0, cases: 1569, deaths: 15, active: 0},
]


class WorldometerScraper {
  constructor() {
    const cors_proxy = process.env.REACT_APP_CORS_PROXY || 'https://cors-anywhere.herokuapp.com'
    const data_path = process.env.REACT_APP_W_DATA_PATH || 'https://www.worldometers.info/coronavirus'
    this.url = `${cors_proxy}/${data_path}`

    this.lookFor = {
      Country: -1,
      TotalCases: -1,
      TotalDeaths: -1,
      TotalRecovered: -1,
      ActiveCases: -1,
    }
  }


  fetchData(testing) {

    if (testing) {
      return new Promise( (resolve) => {
        resolve(testData)
      })
    }

    return fetch(this.url)
      .then( res => {
        if (res.ok) {
          return res.text()
        } else {
          return ''
        }
      })
      .then( body => {
        return this.parse(body)
      })
  }

  parse(htmlData) {
    const $ = cheerio.load(htmlData)
    let rows = $('tr', '#main_table_countries_today').get()
    let ths = $('th', rows[0])
    let header = ths.get().map( e => $(e).text() )
    const max = this.getColumnIndexes(header)
    let recoveredData = []

    for (let row of rows) {
      row = $(row)
      if (row.attr('class') && row.attr('class').includes('row_continent')) continue

      let cols = row.find('td')
      if (cols.length <= max) continue

      const country = $(cols[this.lookFor.Country]).text()
      if (country.includes('Total')) continue;

      const cases = this.getNumber('TotalCases', cols, $, 1)
      const recovered = this.getNumber('TotalRecovered', cols, $)
      const deaths = this.getNumber('TotalDeaths', cols, $)
      const active = this.getNumber('ActiveCases', cols, $)

      recoveredData.push({country, recovered, cases, deaths, active})
    }
    return recoveredData
  }

  getColumnIndexes(header) {
    for (let key of Object.keys(this.lookFor)) {
      let idx = header.indexOf('Country')

      // try fuzzy
      if (idx === -1) {
        for (let i = 0; i < header.length; i += 1) {
          if (header[i].toLowerCase().includes(key.toLowerCase())) {
            this.lookFor[key] = i
            break;
          }
        }
      }
    }
    const min = Math.min(...Object.values(this.lookFor))
    if (min < 0) {
      console.error(`Page layout to be scraped changed: ${this.lookFor}`)
    }

    return Math.max(...Object.values(this.lookFor))
  }

  getNumber(field, columns, $, dflt=0) {
    let res = $(columns[this.lookFor[field]]).text()
    res = res ? parseInt(res.replace(/,/g, ""), 10) : dflt
    if (isNaN(res)) res = dflt

    return res
  }
}


export default WorldometerScraper

export {
  testData,
}
