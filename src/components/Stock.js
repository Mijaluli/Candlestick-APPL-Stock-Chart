import React, {Component} from 'react'
import Chart from 'react-apexcharts'

class StockComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
    }
  }
  
  render() {
    const {series, options}=this.props;
    return (
              <div id="chart">
              <Chart options={options} 
                     series={series} 
                     type="candlestick" height={350} />
              </div>
            )
}
}

export default StockComp;



