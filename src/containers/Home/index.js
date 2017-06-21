'use strict';

import React, {Component} from 'react';
import {View, Text,Image,TextInput,StyleSheet,TouchableOpacity,Alert,TouchableHighlight} from 'react-native';
import BackgroundImage from '@components/BackgroundImage'
import { Actions, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles'

export default class Home extends Component
{
  constructor(props) {
    super(props);
  }
 componentDidMount() {
  }

startRaffelButton(){
  alert('start Raffel');
}
broadCastRaffelButton(){
    alert('broadCastRaffelButton Raffel');
}
  render()
  {
    return (

      <BackgroundImage source={require("@resources/images/raffle_notification_bg_main.png")}>
        <View style={{flex: 1, alignItems: 'center',backgroundColor:'rgba(0, 0, 0, 0.36)'}}>

          <View style={styles.priceView}>
            <Text style={{fontSize:20, color:'#FFF',fontFamily:'Exo-Medium'}}>Participants: 2</Text>
            <Text style={{fontSize:20, color:'#FFF',fontFamily:'Exo-Medium', marginTop:'2%'}}>Price: 900</Text>
          </View>
          <TouchableOpacity style={styles.broadCastRaffelButton}  onPress={this.broadCastRaffelButton.bind(this)}>
            <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.textbutton}>BroadCast Raffel</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startRaffelButton}  onPress={this.startRaffelButton.bind(this)}>
            <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.textbutton}>Do Raffel</Text>
            </View>
          </TouchableOpacity>

        </View>
      </BackgroundImage>
    );
  }


}
