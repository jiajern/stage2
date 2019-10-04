import React, { Component } from 'react'
import Nav from './components/nav';
import Signin from './components/signin';
import Signup from './components/signup';
import Portfolio from './pages/portfolio';
import Transaction from './pages/transaction';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Signin />
          <Signup />
          <Portfolio />
          <Transaction />
        </div>
      </Router>
    )
  }
}
