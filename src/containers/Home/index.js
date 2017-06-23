'use strict';

import React, {Component} from 'react';
import {View, Text,Image,TextInput,StyleSheet,TouchableOpacity,Alert,TouchableHighlight,NetInfo} from 'react-native';
import BackgroundImage from '@components/BackgroundImage'
import { Actions, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import styles from './styles';
import api  from '@API/api';
import raffleAPI from '@API/raffleAPI';
import webAPICall from '@API/webAPICall';
import Spinner from 'react-native-loading-spinner-overlay';

const riderURL = "http://52.170.217.85:3000/riderequest";
var privateKey;

export default class Home extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userPrivateKey:'',
      seedValue:'0',
      prizeValue:'1000',
      participantsValue:'200',
      winners:[],
      prizeWinner : ['1000','500','300','200','100'],
      loaderVisible:false,
      deviceToken:'',
    };
}
componentDidMount() {
}

/*pushHandler(){
  FCM.requestPermissions(); // for iOS
  FCM.getFCMToken().then(token => {
      console.log(token)
      this.setState({deviceToken:token})
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
           // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
           if(notif.local_notification){
             //this is a local notification
           }
           if(notif.opened_from_tray){
             //app is open/resumed because user clicked banner
           }

          if(Platform.OS ==='ios'){
             //optional
             //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
             //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
             //notif._notificationType is available for iOS platfrom
             switch(notif._notificationType){
               case NotificationType.Remote:
                 notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                 break;
               case NotificationType.NotificationResponse:
                 notif.finish();
                 break;
               case NotificationType.WillPresent:
                 notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                 break;
             }
           }
       });
      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
           console.log(token)
           // fcm token may not be available on first load, catch it here
           this.setState({deviceToken:token})
    });
}*/
componentWillUnmount() {
        // stop listening for events
  // this.notificationListener.remove();
  // this.refreshTokenListener.remove();
  // //these clears notification from notification center/tray
  // FCM.removeAllDeliveredNotifications()
}
componentWillMount(){
  this.setState({loaderVisible:true});
  this.getTotalParticipants();
  this.getPrivateKey();
  this.winnerArray();

}

getPrivateKey(){
  privateKey = api.getPrivateKey("commuterz", "");
  //alert('userPrivateKey' +privateKey);
  this.setState({userPrivateKey:privateKey})
}

getTotalParticipants(){

  var self = this;
 raffleAPI.totalParticipants(function(err,result){
   if(result){
     var value = result;
     self.setState({participantsValue:value.toString()});
     self.setState({loaderVisible:false});
   }else{
     Alert.alert('Alert','Something went wrong, getting value of Participants.'+err);
     self.setState({loaderVisible:false});
   }
 });
}

startRaffelButton(){
  this.setState({loaderVisible:true});
  var seedValue = this.state.seedValue;
  var participantsValue = this.state.participantsValue;
  var prizeValue = this.state.prizeValue;
  privateKey = this.state.userPrivateKey;
  var self = this;
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      raffleAPI.startRaffleGamePrize(privateKey,seedValue,prizeValue,function(err,result){
            if(result){
                Alert.alert('Alert','Raffle Done Successfully.');
                self.setState({loaderVisible:false});
             }else{
                Alert.alert('Alert','Something went wrong. ' + err);
                self.setState({loaderVisible:false});
            }
        });
    }else{
      Alert.alert('Alert','No Internet Connection Found.');
    }
  });
}


broadCastRaffelButton(){
var self = this;
self.setState({loaderVisible:true});
  this.winnerArray().then(function(val) {
     // you access the value from the promise here
    self.setState({winners:[...val]})
     var jsonData = JSON.stringify(
     {
         type:'raffleNotifications',
         totalParticipants:self.state.participantsValue,
         totalPrize:self.state.prizeValue,
         poolSize:self.state.prizeValue,
         timeToRaffle:'300000', // 5 minute in milliseconds
         winners: self.state.winners,
     });
     //console.warn('jsonData' +JSON.stringify(jsonData));
     webAPICall.postApiWithJosnDataInMainThread(riderURL,jsonData,'POST').then((responseJson) =>
      {
       if(responseJson)
         {
             Alert.alert('Alert','Raffle Broadcast Successfully');
             self.setState({loaderVisible:false});
          }
       }).done();
  });
}

winnerArray(){
  var self = this;
  return new Promise(function(resolve) {
    var win = [];
    for(var i =0; i<self.state.prizeWinner.length ;i++){
      var value =  self.state.prizeWinner;
      var item={};
      var id = i;
      item['index'] = id;
      if(i === 0){
        item['prize'] = self.state.prizeValue;
      }else{
        item['prize'] = value[i]
      }
      win.push(item);
    }
    resolve(win);
 });
}

onChangePrizeText(value){
   this.setState({prizeValue:value})
}

render()
  {
    return (
        <View style={{flex: 1, alignItems: 'center',backgroundColor:'rgba(69, 149, 250, 0.9)'}}>

          <View style={{flexDirection:'row', marginTop:'15%'}}>
           <Image source={require('@resources/images/rabit-white.png')}/>
            <Text style={styles.textLogo}>ommuterz</Text>
           </View>

           <View style ={{marginTop:'5%',width:'90%', justifyContent:'center',alignItems:'center'}}>
            <View style={{width:'85%',}}>
            <Text style={styles.textTitle}>Seed</Text></View>
            <View style={{width:'85%', justifyContent:'center',height:44,borderRadius:6,borderWidth:1,borderColor:'#FFFF',}}>

              <TextInput ref='0' style={styles.textInput} underlineColorAndroid='transparent'
              returnKeyType="next" keyboardType="numeric"
              onSubmitEditing={() => this.refs[1].focus()}
              onChangeText={(seedValue) => this.setState({seedValue})}
              value={this.state.seedValue} />

              </View>

              <View style={{width:'85%', marginTop:8}}>
              <Text style={styles.textTitle}>Prize</Text></View>
              <View style={{width:'85%',justifyContent:'center', height:44,borderRadius:6,borderWidth:1,borderColor:'#FFFF',}}>
                <TextInput ref='1' style={styles.textInput} underlineColorAndroid='transparent'
                returnKeyType="next" keyboardType="numeric"
                onSubmitEditing={() => this.refs[2].focus()}
                onChangeText={this.onChangePrizeText.bind(this)}
                value={this.state.prizeValue} />
                </View>

                <View style={{width:'85%',marginTop:8}}>
                <Text style={styles.textTitle}>Participants</Text></View>

                <View style={{width:'85%',justifyContent:'center', height:44,borderRadius:6,borderWidth:1,borderColor:'#FFFF',}}>
                  <TextInput ref='2' style={styles.textInput} underlineColorAndroid='transparent'
                  returnKeyType="done" keyboardType="numeric"
                  onSubmitEditing={() => this.refs[2].focus()}
                  onChangeText={(participantsValue) => this.setState({participantsValue})}
                  value={this.state.participantsValue}/>
                 </View>
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

          <Spinner overlayColor={ "rgba(0, 0, 0, 0.50)" } visible={this.state.loaderVisible}
           textContent={"Please wait.."} textStyle={{color: '#FFF',fontFamily:"Exo-Regular"}} ></Spinner>
        </View>

    );
  }

}
