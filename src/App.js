import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Icons from '@material-ui/icons';
import {render} from 'react-dom';

import Trainingslist from './components/Trainingslist';
import {Router, Route, BrowserRouter, IndexRouter} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6">
            Personal Trainer programm
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
      <div>
        <Route exact path="/" component={Customerlist} />
        <Route path="/trainings" component={Trainingslist} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
