import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './Nav.css';

class Nav extends Component {

  render() {
    return (
      <AppBar className="nav-bar" position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className="app-title">
            TimeTracker
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Nav;
