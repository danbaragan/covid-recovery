import cheerio from 'cheerio'

class Scraper {
  constructor(htmlData) {
    this.htmlData = htmlData
    this.$ = cheerio.load(this.htmlData)
    this.recovered = []
    this.lookFor = {
      Country: -1,
      TotalCases: -1,
      TotalDeaths: -1,
      TotalRecovered: -1,
      ActiveCases: -1,
    }
  }

  parse() {
    let rows = this.$('tr', '#main_table_countries_today').get()
    let ths = this.$('th', rows[0])
    let header = ths.get().map( e => this.$(e).text() )
    const max = this.getColumnIndexes(header)

    for (let row of rows) {
      row = this.$(row)
      if (row.attr('class') && row.attr('class').includes('row_continent')) continue

      let cols = row.find('td')
      if (cols.length <= max) continue

      const country = this.$(cols[this.lookFor.Country]).text()
      if (country.includes('Total')) continue;

      const cases = this.getNumber('TotalCases', cols, 1)
      const recovered = this.getNumber('TotalRecovered', cols)
      const deaths = this.getNumber('TotalDeaths', cols)
      const active = this.getNumber('ActiveCases', cols)

      this.recovered.push({country, recovered, cases, deaths, active})
    }
    return this.recovered
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

  getNumber(field, columns, dflt=0) {
    let res = this.$(columns[this.lookFor[field]]).text()
    res = res ? parseInt(res.replace(/,/g, ""), 10) : dflt
    if (isNaN(res)) res = dflt

    return res
  }
}


export default Scraper
