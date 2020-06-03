

class Aggregator {
  process(parsedData) {
    const recoveredData = []
    const activeRatio = this.getActiveRatio(parsedData)
    for (let row of parsedData) {
      let { country, recovered } = row
      if (!recovered) {
        let active = row.active || row.cases * activeRatio
        recovered = Math.trunc(row.cases - row.deaths - active)
      }

      const percent = Math.trunc(recovered / row.cases * 100)
      recoveredData.push({country, recovered, percent})
    }
    return recoveredData.sort( (a, b) => b.percent - a.percent )
  }

  getActiveRatio(parsedData) {
    let totalActiveRatios = 0;
    let n = 0;
    for (let row of parsedData) {
      if (row.cases < 1000 && row.active < 100) continue
      totalActiveRatios += row.active / row.cases
      n += 1
    }
    return totalActiveRatios / n
  }
}

export default Aggregator
