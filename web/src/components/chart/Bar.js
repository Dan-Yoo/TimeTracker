import React, { Component } from 'react';
import { formatTime, getColorFromName } from '../../shared/helper';
import './Bar.css';

class Bar extends Component {
  render() {
    let barScale = Math.log10(Math.ceil((this.props.time / this.props.max) * 100) + 10) - 1;
    let barWidth = Math.min(barScale * 100, 100);

    return (
      <div className="bar-item">
        <div className="bar-title">{this.props.title.substring(0, this.props.title.indexOf('.'))}</div>
        <div className="bar-data">
          <div 
            className="bar-content" 
            style={{
              width: `${barWidth}%`,
              backgroundColor: getColorFromName(this.props.title)
            }}>
            {formatTime(this.props.time)}
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
