/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react'
 import {
   AppRegistry
 } from 'react-native'

 import App from './src/app'
 global.Buffer = global.Buffer || require('buffer').Buffer;


AppRegistry.registerComponent('RaffleApp', () => App);
