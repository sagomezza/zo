import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  plateContainer: {
    padding: '6%', 
    flexDirection: "row",
    alignContent: 'center'

  },
  plateInput: {
    width: '45%', 
    height: 103,
    borderColor: '#008999', 
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    margin: '4%',
    alignContent: 'center',
    alignItems: 'center'
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
