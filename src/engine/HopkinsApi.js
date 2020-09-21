// todo: use proper test input data (json here, html for scaper)
const testData = [
  {country: 'Anguilla', recovered: 3, cases: 5, deaths: 1, active: 1},
  {country: 'Anguilla', recovered: 3, cases: 5, deaths: 1, active: 1},
  {country: 'Anguilla', recovered: 3, cases: 5, deaths: 1, active: 1},
  {country: 'Saint Pierre Miquelon', recovered: 0, cases: 5, deaths: 1, active: 1},
  {country: 'Iceland', recovered: 1791, cases: 5000, deaths: 100, active: 180},
  {country: 'World', recovered: 10000, cases: 90000, deaths: 5000, active: 15000},
  {country: 'Hong Kong', recovered: 1030, cases: 10555, deaths: 640, active: 1255},
  {country: 'Gibraltar', recovered: 0, cases: 1569, deaths: 15, active: 0},
]

class HopkinsData {
  constructor() {
    const data_path = process.env.REACT_APP_H_DATA_PATH || 'https://covid-api.com/api'
    this.url = data_path
  }

  async fetchData(testing) {
    if (testing) {
      return new Promise( (resolve) => {
        resolve(testData)
      })
    }

    const countries = await this._fetchCountries()
    // const countries = {'USA': "US"}

    let rows = []
    const countryIsos = Object.keys(countries)
    const calls = countryIsos.map( iso => this._fetchCountryData(iso))
    const countryDataAll = await Promise.all(calls)

    for (let i = 0; i < countryIsos.length; i += 1) {
      const countryData = countryDataAll[i]
      if (!countryData.length) continue
      const countryIso = countryIsos[i]

      let row = this._parseCountryData(countryData)
      row['country'] = countries[countryIso].replace(/\*$/, '')
      rows.push(row)
    }

    return rows
  }

  async _fetchCountries() {
    const url = `${this.url}/regions`
    const countriesResp = await fetch(url)
    if (!countriesResp.ok) {
      console.error(`Failed to get countries from ${url}`)
      return {}
    }

    const countriesData = await countriesResp.json()
    let countries = {}
    for (let countryPair of countriesData['data']) {
      countries[countryPair.iso] = countryPair.name
    }
    return countries
  }

  async _fetchCountryData(countryIso) {
    const url = `${this.url}/reports?iso=${countryIso}`
    const resp = await fetch(url)
    if (!resp.ok) {
      console.error(`Failed to get country report from ${url}`)
      return {}
    }

    const data = await resp.json()
    return data['data']
  }


  _parseCountryData(data) {
    let theData = {
      cases: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
    }
    for (let d of data) {
      theData.cases += d['confirmed']
      theData.recovered += d['recovered']
      theData.deaths += d['deaths']
      theData.active += d['active']
    }
    return theData
  }


}

export default HopkinsData
