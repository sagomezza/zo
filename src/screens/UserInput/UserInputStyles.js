import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const {width, height} = Dimensions.get('window');


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff',
    borderWidth: 1 
  },
  head: { 
    height: 40, 
    alignContent: 'center',
  },
  text: { 
    margin: 6,
    color: '#8F8F8F',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular' 
  },
  headText: { 
    margin: 6,
    color: '#00A9A0',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular' 

  },
  plateInput: {
    width: '46%',
    height: '70%',
    margin: '2%',
    fontSize: width * 0.05,
    fontFamily: 'Montserrat-Bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    color: '#00A9A0',
    alignContent: 'center',
    justifyContent: 'center'


  },
  textInput: {
    width: '100%',
    height: '20%',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
    color: '#8F8F8F',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
  },
  buttonI: {
    borderRadius: 30,
    height: '50%',
    width: '100%',
    marginLeft: '0%',
    paddingHorizontal: '24%',
  },
  buttonIDisabled: {
    borderRadius: 30,
    height: '50%',
    width: '100%',
    marginLeft: '0%',
    paddingHorizontal: '24%',
    opacity: 0.5
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
    height: '50%',
    width: '20%',
    backgroundColor: "#FFF200",
    marginLeft: '3%'
  },
  qrImage: {
    width: '65%',
    height: '65%',
    marginTop: '6%'
  },
  buttonTDisabled: {
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    height: '50%',
    width: '20%',
    backgroundColor: "#FFF200",
    marginLeft: '3%',
    opacity: 0.5
  },
  buttonText: {
    color: '#00A9A0',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Bold'
  },
  buttonTextNew: {
    color: '#FFFFFF',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Bold'
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
    height: '40%',
    width: '60%',
    padding: '5%',
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
  modalTextAlert: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: normalize(20),
    margin: '2%'
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