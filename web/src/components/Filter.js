import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { months } from '../shared/constants';
import './Filter.css';

class Filter extends Component {
  render() {
    return (
      <div>
        <FormControl className="filter-control" variant="filled">
          <InputLabel className="custom-label" htmlFor="month-label">Month</InputLabel>
          <Select
            className="custom-select"
            value={this.props.month}
            onChange={(e) => {this.props.handleFilterChange(e, "month")}}
            input={<FilledInput name="month" id="month-label" />}
          >
            {months.map((value, index) => {
              return <MenuItem key={index} value={index}>{value}</MenuItem>
            })}
          </Select>
        </FormControl>

        <FormControl className="filter-control" variant="filled">
          <InputLabel className="custom-label" htmlFor="date-label">Date</InputLabel>
          <Select
            className="custom-select"
            value={this.props.date}
            onChange={(e) => {this.props.handleFilterChange(e, "day")}}
            input={<FilledInput name="date" id="date-label" />}
          >
            {[...Array(31)].map((_, index) => {
              return <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default Filter;
