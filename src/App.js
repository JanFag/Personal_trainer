import React from 'react';

import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Addtraining from './components/Addtraining';
import Trainingslist from './components/Trainingslist';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Calendar from './components/Calendar';



function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6">
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter >
         <div>
                <Switch>
                    <Route exact path="/" component={Customerlist} />
                    <Route path="/trainings" component={Trainingslist} />
                    <Route path="/calendar" component={Calendar} />
                </Switch>
          </div>
            </BrowserRouter>
    </div>
  );
}

export default App;
