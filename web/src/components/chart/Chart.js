import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Bar from './Bar';
import { months } from '../../shared/constants';
import { formatTime } from '../../shared/helper';
import './Chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.getMaxTime = this.getMaxTime.bind(this);
    this.getTotalTime = this.getTotalTime.bind(this);
  }

  getMaxTime() {
    const data = this.props.data;
    if (data.length > 0) {
      return data[0].value.time > data[data.length -1].value.time ? 
        data[0].value.time : data[data.length - 1].value.time;
    }
  }

  getTotalTime() {
    let totalTime = 0;
    this.props.data.forEach((value) => {
      totalTime += value.value.time;
    });

    return totalTime;
  }

  render() {
    return (
      <Card className="card">
        <h3>Usage on {months[this.props.date.month]} {this.props.date.day}, {this.props.date.year}</h3>
        <div>Total time spent: {formatTime(this.getTotalTime())}</div>
        <CardContent>
          {this.props.data.map((item, i) => {
             return <Bar key={i} title={item.key} time={item.value.time} max={this.getMaxTime()} />
          })}
        </CardContent>
      </Card>
    );
  }
}

export default Chart;
