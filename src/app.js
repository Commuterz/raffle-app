
import React, {Component} from 'react';
import { Provider,connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import {View, Platform,AsyncStorage} from 'react-native';
import configureStore from '@lib/configureStore'
import Home from '@containers/Home';

const ConnectedRouter = connect()(Router)
const store = configureStore();

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={Home} title='Home'/>
  </Scene>
)

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter hideNavBar={ true } scenes={Scenes}/>
      </Provider>
    )
  }
}
