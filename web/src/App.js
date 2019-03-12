import React, { Component } from 'react';
import './App.css';
import db from './firebase';
import Nav from './components/Nav';
import Chart from './components/chart/Chart';
import Filter from './components/Filter';

class App extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      day: date.getDate().toString(),
      month: date.getMonth().toString(),
      year: date.getFullYear().toString(),
      data: [],
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.subscribeData();
  }

  orderData() {
    let temp = this.state.data;
    temp = temp.sort((a, b) => {
      return b.value.time - a.value.time;
    });

    this.setState({data: temp});
  }

  addedData(change) {
    this.setState({data: [...this.state.data, {
        key: change.doc.id,
        value: change.doc.data()
      }]
    });
  }

  modifiedData(change) {
    let tempData = this.state.data;
    tempData.forEach((value, index) => {
      if (value.key === change.doc.id) {
        tempData[index] = {
          key: change.doc.id,
          value: change.doc.data(),
        }
      }
    });

    this.setState({data: tempData});
  }

  subscribeData() {
    this.setState({data: []});
    this.docRef = db.collection(this.state.year).doc(this.state.month).collection(this.state.day);
    this.docRef.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") this.addedData(change);
        if (change.type === "modified") this.modifiedData(change);
      });

      this.orderData();
    });
  }

  unsubscribeData() {
    this.docRef.onSnapshot(() => {});
  }

  handleFilterChange(event, key) {
    this.setState({
      [key]: event.target.value.toString()
    }, () => {
      this.unsubscribeData();
      this.subscribeData();
    }) 
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <main>
          <Filter 
            handleFilterChange={this.handleFilterChange}
            date={this.state.day} 
            month={this.state.month}/>
          <Chart date={{
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
          }} data={this.state.data}/>
        </main>
      </div>
    );
  }
}

export default App;
