import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
  plateContainer: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems:'center',
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    borderWidth: 1
  },
  plateInput: {
    width: '45%', 
    height: '60%',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1

  },
  plateInputTextBig: {
    fontSize: normalize(36),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmall: {
    fontSize: normalize(25),
    textAlign: 'center',
    marginTop: '4%',
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
    marginTop: '4%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  },
  textPlaca: {
    fontSize: normalize(25),
    fontFamily: 'Montserrat-Regular'
  },
  textPago: {
    fontSize: normalize(15),
    fontFamily: 'Montserrat-Regular'
  },
  textMoney: {
    fontSize: normalize(30),
    fontFamily: 'Montserrat-Regular'
  },
});

export default styles;
