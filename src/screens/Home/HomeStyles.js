import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  plateContainer: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems:'center',
    width: '100%',
    height: '23%',
    justifyContent: 'center'
  },
  plateInput: {
    width: '45%', 
    height: '90%',

  },
  plateInputTextBig: {
    fontSize: width * 0.055,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmall: {
    fontSize: width * 0.045,
    textAlign: 'center',
    marginTop: '6%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  },
  textPlaca: {
    fontSize: width * 0.03,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Bold'
  },
  textListTitle: {
    fontSize: width * 0.025 ,
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold'
  },
  textPago: {
    fontSize: width * 0.02,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
  },
  textMoney: {
    fontSize: width * 0.034,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
  },
});

export default styles;
