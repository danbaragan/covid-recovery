import cheerio from 'cheerio'

class Scraper {
  constructor(htmlData) {
    this.htmlData = htmlData
    this.$ = cheerio.load(this.htmlData)
    this.recovered = []
  }

  parse() {
    let rows = this.$('tr', '#main_table_countries_today').get()
    let ths = this.$('th', rows[0])
    let header = ths.get().map( e => this.$(e).text() )
    const lookFor = {
      Country: -1,
      TotalCases: -1,
      TotalRecovered: -1,
    }

    for (let key of Object.keys(lookFor)) {
      let idx = header.indexOf('Country')

      // try fuzzy
      if (idx === -1) {
        for (let i = 0; i < header.length; i += 1) {
          if (header[i].toLowerCase().includes(key.toLowerCase())) {
            lookFor[key] = i
            break;
          }
        }
      }
    }
    const min = Math.min(...Object.values(lookFor))
    if (min < 0) {
      // TODO If any of the keys are still -1 I should warn myself - the source page changed...
    }
    const max = Math.max(...Object.values(lookFor))

    this.recovered = []

    for (let row of rows) {
      row = this.$(row)
      if (row.attr('class') && row.attr('class').includes('row_continent')) continue

      let cols = row.find('td')
      if (cols.length <= max) continue

      let country = this.$(cols[lookFor.Country]).text()

      let cases = this.$(cols[lookFor.TotalCases]).text()
      cases = cases ? parseInt(cases.replace(/,/g, ""), 10) : 1
      if (isNaN(cases)) cases = 1

      let recovered = this.$(cols[lookFor.TotalRecovered]).text()
      recovered = recovered ? parseInt(recovered.replace(/,/g, ""), 10) : 0
      if (isNaN(recovered)) recovered = 0

      let percent = Math.trunc(recovered / cases * 100)

      this.recovered.push({country, recovered, percent})
    }
    // sort reversed
    return this.recovered.sort( (a, b) => b.percent - a.percent )
  }
}


export default Scraper
