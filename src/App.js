import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Hridyesh Singh Bisht
          </NavbarBrand>
        </div>
      </Navbar>
      <h2>Hello World</h2>
    </div>
  );
}

export default App;
