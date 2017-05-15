import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import { HashRouter, Route } from 'react-router-dom';
import Reducers from '../reducers'
import AppContainer from './AppContainer'
import Login from './Login';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <HashRouter>
          <div>
            <AppContainer />
            <Route exact path="/" component={Map} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/login" component={Login} />
          </div>
        </HashRouter >
      </Provider>
    )
  }
}

export default App;
