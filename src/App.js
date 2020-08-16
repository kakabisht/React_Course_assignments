import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store = ConfigureStore();
class App extends Component {

  render() {
    return (
      // FLux architecture implementation
    <Provider store={store}>
      {/*  provider component allows me to configure my React application so that the Redux Store becomes available to all components in my application. */}
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    </Provider> 
    );
  }
}

export default App
