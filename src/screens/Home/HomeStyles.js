import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  plateInput: {
    width: 180, 
    height: 83,
    borderColor: '#008999', 
    marginRight: '7%', 
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row"
  },
  plateInputText: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: '15%',
    marginLeft: '8%',
    color: '#008999',
    fontFamily: 'Montserrat-Bold'
  },
  textPlaca: {
    fontSize: 25,
    fontFamily: 'Montserrat-Regular'
  },
  textPago: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular'
  },
  textMoney: {
    fontSize: 30,
    fontFamily: 'Montserrat-Regular'
  },
});

export default styles;
