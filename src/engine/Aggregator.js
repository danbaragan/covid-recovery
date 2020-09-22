

class Aggregator {
  process(parsedData) {
    const recoveredData = []
    const activeRatio = this.getActiveRatio(parsedData)
    for (let row of parsedData) {
      let { country, recovered } = row
      if (!recovered) {
        let active = row.active
        // if no active reported OR all not dead is considered active then apply heuristics
        if (!row.active || row.cases === row.deaths + row.active) {
          active = row.cases * activeRatio
          country = `${country}*`
        }
        recovered = Math.trunc(row.cases - row.deaths - active)
      }

      const percent = Math.trunc(recovered / (row.cases - row.deaths) * 100)
      recoveredData.push({country, recovered, percent})
    }
    return recoveredData.sort( (a, b) => b.percent - a.percent )
  }

  getActiveRatio(parsedData) {
    let totalActiveRatios = 0;
    let n = 0;
    for (let row of parsedData) {
      if (row.cases < 1000 && row.active < 100) continue
      if (row.cases === row.deaths + row.active) continue

      totalActiveRatios += row.active / row.cases
      n += 1
    }
    // active ratio of 0 if no relevant data (optimistic)
    return n ? totalActiveRatios / n : 0
  }
}

export default Aggregator
