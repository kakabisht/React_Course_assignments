import React from 'react';
import Menu from './components/MenuComponent';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';

function App() {
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
      <Menu />
    </div>
  );
}

export default App;
