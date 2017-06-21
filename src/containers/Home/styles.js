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
  marginTop:'25%'
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
