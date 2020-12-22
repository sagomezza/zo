import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
  plateContainer: {
    paddingTop: '4%', 
    flexDirection: "row",
    alignContent: 'center',
    alignItems:'center',
    marginLeft: '13%',
    marginRight: '13%',
    width: '79%',
    height: '68%'
  },
  plateInput: {
    width: '45%', 
    height: '100%',
    borderColor: '#008999', 
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    margin: '4%',
    paddingRight:'15%'
    // alignItems: 'center'
  },
  plateInputTextBig: {
    fontSize: normalize(60),
    marginTop: '15%',
    marginLeft: '6%',
    // marginLeft: '0%',
    color: '#008999',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmall: {
    fontSize: normalize(28),
    textAlign: 'center',
    marginTop: '44%',
    // marginLeft: '0%',
    color: '#008999',
    fontFamily: 'Montserrat-Regular'
  },
  plateInputTextBigC: {
    fontSize: normalize(60),
    marginTop: '12%',
    marginLeft: '6%',
    // marginLeft: '0%',
    color: '#008999',
    fontFamily: 'Montserrat-Bold'
  },
  plateInputTextSmallC: {
    fontSize: normalize(28),
    textAlign: 'center',
    marginTop: '35%',
    // marginLeft: '0%',
    color: '#008999',
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
