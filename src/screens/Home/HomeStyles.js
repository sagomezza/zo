import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
  plateContainer: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems:'center',
    width: '100%',
    height: '25%',
    justifyContent: 'center',
  },
  plateInput: {
    width: '45%', 
    height: '90%',

  },
  plateInputTextBig: {
    fontSize: normalize(36),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmall: {
    fontSize: normalize(25),
    textAlign: 'center',
    marginTop: '6%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  },
  plateInputTextBigC: {
    fontSize: normalize(36),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmallC: {
    fontSize: normalize(25),
    textAlign: 'center',
    marginTop: '6%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  },
  textPlaca: {
    fontSize: normalize(18),
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Bold'
  },
  textListTitle: {
    fontSize: normalize(15),
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold'
  },
  textPago: {
    fontSize: normalize(13),
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
  },
  textMoney: {
    fontSize: normalize(19),
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
  },
});

export default styles;
