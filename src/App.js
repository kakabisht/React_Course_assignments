import React, { Component } from 'react';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render(){
    return (
      <div >
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">
              Hridyesh Singh Bisht
            </NavbarBrand>
          </div>
        </Navbar>
        <h2>Hello World</h2>
        <Menu dishes={this.state.dishes} />
      </div>
    )

  }

}
export default App
