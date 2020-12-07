import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StockComp from './Stock'
import utils from './utils'

class TabsComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataToDislay: [],
      series: [],
      minOne: [],
      minFive: [],
      hour: [],
      week: [],
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
        },
        legend:
        {
          show: false
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    }
  }

  async componentDidMount() {
    let data = await utils.getXY()
    this.setState({ series: data, dataToDislay: data })
  }
  onWeekSelected(){
    this.setState({dataToDislay: this.state.series})
  }
  onDaySelected() {
    const { series } = this.state;
    let lastDate = new Date(this.state.dataToDislay[0].data[0].x).getDate();
    let sum = 0;
    let myData = [];
    series.forEach((item) => {
      let currentDate = new Date(item.data[0].x).getDate();
      if (currentDate !== lastDate) {
        sum++;
      }
      if (sum <= 7) {
        myData.push(item);
      }
      lastDate = currentDate;
    });
    console.log(myData);

    this.setState({ dataToDislay: myData })
  }
  onFiveMinutesSelected() {
    const { series } = this.state;
    let lastDate = new Date(this.state.dataToDislay[0].data[0].x).getDate();
    let lastHour = new Date(this.state.dataToDislay[0].data[0].x).getHours();
    let myData2 = [];
    series.forEach((item) => {
      let currentDate = new Date(item.data[0].x).getDate();
      let currentHour = new Date(item.data[0].x).getHours();
      if (currentDate === lastDate && currentHour === lastHour) {
        myData2.push(item);
      }
    });
    console.log(myData2);

    this.setState({ dataToDislay: myData2 })
  }
  onHourSelected() {
    const { series } = this.state;
    let lastDate = new Date(this.state.dataToDislay[0].data[0].x).getDate();
    let sum = 0;
    let myData1 = [];
    series.forEach((item) => {
      let currentDate = new Date(item.data[0].x).getDate();
      if (currentDate !== lastDate) {
        sum++;
      }
      if (sum === 0) {
        myData1.push(item);
      }
      lastDate = currentDate;
    });
    console.log(myData1);

    this.setState({ dataToDislay: myData1 })
  }
  render() {
    const { dataToDislay, options } = this.state;
    return (
      <div>
        <h2>Apple Inc. (AAPL)</h2>

        <Tabs>
          <TabList>
            <Tab onClick={this.onWeekSelected.bind(this)}>1 Week</Tab>
            <Tab onClick={this.onDaySelected.bind(this)}>1 Day</Tab>
            <Tab onClick={this.onHourSelected.bind(this)}>1 Hour</Tab>
            <Tab onClick={this.onFiveMinutesSelected.bind(this)}>5 Minutes</Tab>
          </TabList>

          <TabPanel>
            <StockComp options={options} series={dataToDislay} graphId="min1" graphData={this.state.min1} />
          </TabPanel>
          <TabPanel>
            <StockComp options={options} series={dataToDislay} graphId="min5" graphData={this.state.min5} />
          </TabPanel>
          <TabPanel>
            <StockComp options={options} series={dataToDislay} graphId="hour1" graphData={this.state.hour1} />
          </TabPanel>
          <TabPanel>
            <StockComp options={options} series={dataToDislay} graphId="week1" graphData={this.state.week1} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default TabsComp;
