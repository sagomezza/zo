import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  plateContainer: {
    paddingTop: '4%', 
    flexDirection: "row",
    alignContent: 'center',
    marginLeft: '13%',
    marginRight: '13%',
    width: '77%',
    height: '65%'
  },
  plateInput: {
    width: '45%', 
    height: '90%',
    borderColor: '#008999', 
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    margin: '4%',
    alignContent: 'center',
    // alignItems: 'center'
  },
  plateInputText: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: '18%',
    // marginLeft: '0%',
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
