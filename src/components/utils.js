import axios from 'axios'

const getXY = async function () {
  let fullData = []
  let aaplData = await axios.get("https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=5&Precision=Minutes&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume")
  //take out first in array because it is not in the same order as he others
  let withoutFirst = aaplData.data.slice(1)

  fullData = withoutFirst.map((item) => {
    let currentItem = {
      data: [{
        x: item.Date,
        y: [item.Open, item.High, item.Low, item.Close]
      }]
    }
    return currentItem;
  })
  return fullData
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getXY}

