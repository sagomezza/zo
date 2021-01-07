import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({

  HeadStyleTable: {
    height: 40,
    alignContent: "center",
  },
  plateInput: {
    width: '46%',
    height: '70%',
    margin: '2%',
    fontSize: normalize(38),
    fontFamily: 'Montserrat-Bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    color: '#00A9A0'

  },
  textInput: {
    width: '100%',
    height: normalize(39),
    fontSize: normalize(27),
    fontFamily: 'Montserrat-Regular',
    color: '#00A9A0',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  buttonI: {
    borderRadius: 30,
    height: normalize(35),
    width: '100%',
    marginLeft: '0%',
    paddingHorizontal: '24%',
  },
  buttonNew: {
    borderRadius: 30,
    height: '75%',
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: '29%',
  },
  buttonT: {
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    height: normalize(35),
    width: '20%',
    backgroundColor: "#FFF200",

  },
  buttonText: {
    color: '#00A9A0',
    fontSize: normalize(20),
    fontFamily: 'Montserrat-Bold'
  },
  buttonTextNew: {
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontFamily: 'Montserrat-Bold'
  },
  textListTitle: {
    fontSize: normalize(28),
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold',
    marginTop: '1%'
  },
  textList: {
    fontSize: normalize(13),
    color: '#616161',
    fontFamily: 'Montserrat-Regular',
    marginTop: '1%'
  },
  textListDate: {
    fontSize: normalize(15),
    color: '#616161',
    fontFamily: 'Montserrat-Bold',
    marginTop: '4%'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',

  },
  modalView: {
    height: normalize(350),
    width: normalize(350),
    padding: normalize(20),
    borderRadius: 50,
    borderColor: '#707070',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#FFF',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0,
    shadowRadius: 50,
    elevation: 5,
    flexDirection: 'column',
    borderWidth: 1

  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1
  },
  textStyle: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'Montserrat-Regular'
  },
  modalPhoneText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: normalize(25)
  },
  modalText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: '#B7B7B7',
    fontSize: normalize(20)
  },
  modalButton: {
    width: '100%',
    height: '70%',
  },
  tableText: {
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    color: '#FFF200'
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default styles;