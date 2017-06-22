import { StyleSheet, Platform } from 'react-native'
/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.36)',
  },
  priceView:{
    width: '80%',
    height: 100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop:'25%'
  },

broadCastRaffelButton:{
  width: '80%',
  height: 48,
  backgroundColor: '#5fdf71',
  marginTop:'8%'
},
textTitle:{
  color:'#FFF',
  fontSize:18,
  padding:6,
  fontFamily:'Exo-Medium'
},
textInput:{
  height: 50,
  color:'#FFF',
  fontSize:18,
  paddingLeft:10,
  alignItems:'center',
  fontFamily:'Exo-Medium'
},
textLogo:{
  fontSize:35,
  color:'#FFFF',
  marginTop:20,
  marginBottom:8,
  marginLeft:-18,
  fontFamily:'Exo-Medium'
},
  startRaffelButton:{
    width: '80%',
    height: 48,
    backgroundColor: '#5fdf71',
    marginTop:'5%'
  },

  textbutton:{
    fontSize:22,
    color:'#FFF',
    fontFamily:'Exo-Medium',
    textAlign :'center',
  },

});

export default styles;
