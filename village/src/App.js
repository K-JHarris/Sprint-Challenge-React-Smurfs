import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import { Route, NavLink } from 'react-router-dom'

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      id: 3,
      url:'http://localhost:3333/smurfs'
    };
  }

  addSmurf = newSmurf => {
    let id = this.state.id + 1
    this.setState({id: id})
    newSmurf.id = id
    axios 
      .post(this.state.url, newSmurf)
      .then(res => this.setState({smurfs: res.data}))
      .catch(error => console.log(error))

  }

  componentDidMount(){
    axios 
      .get(this.state.url)
      .then(res => this.setState({
        smurfs: res.data
      }))
      .catch(err => console.log("No Smurfs here Gargamel, go away" + err))
  }

  render() {
    return (
      <div className="App">
        <div className="Navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/smurf-form/" exact addSmurf={this.addSmurf} newSmurf={this.newSmurf}>new smurf</NavLink>
        </div>

      <Route exact path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs}/>}/>
      <Route exact path="/smurf-form/" render={props => <SmurfForm {...props} addSmurf={this.addSmurf} newSmurf={this.newSmurf}/>}/>
      </div>
    );
  }
}

export default App;

// good morning 
// add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
// Notice what your map function is looping over and returning inside of Smurfs.
// You'll need to make sure you have the right properties on state and pass them down to props.