import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '60%',
    flexDirection: 'column'
  },
  topContainer: {
    height: '42%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  platesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '18%',
    width: '80%'
  },
  plateInput: {
    width: '39%',
    height: '70%',
    margin: '1%',
    fontSize: width * 0.065,
    fontFamily: 'Montserrat-Bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    color: '#00A9A0'
  },
  buttonT: {
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    height: '70%',
    width: '15%',
    backgroundColor: "#FFFFFF",
    margin: '2%'

  },
  codeContainer: {
    width: '80%',
    height: '8%',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
    color: '#00A9A0',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    margin: '1%'
  },
  codeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.034,
    color: '#00A9A0',
    textAlign: 'center'
  },
  textPhoneCode: {
    width: '80%',
    height: '9%',
    fontSize: width * 0.05,
    fontFamily: 'Montserrat-Regular',
    color: '#00A9A0',
    backgroundColor: '#05877F',
    borderRadius: 30,
    margin: '1%',
    justifyContent: 'center'
  },
  infoUserText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.03,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  timePlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '17%',
    width: '80%',
    justifyContent: 'space-between'
  },
  timePlate: {
    width: '49%',
    height: '77%',
    backgroundColor: 'rgba(22,22,21,0.25)',
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timePlateTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.026,
    color: '#FFFFFF'
  },
  timePlateInfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.026,
    color: '#FFFFFF'
  },
  totalPayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '25%',
    width: '80%',
    justifyContent: 'space-between'
  },
  payplate: {
    width: '90%',
    height: '55%',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#FFF200',
    borderRadius: 20,
    margin: '1%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  payText: {
    fontSize: width * 0.06,
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    textAlign: 'center'
  },
  pendingContainer:{
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%'
  },
  pendingText:{
    fontSize: width * 0.035,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },

  inputMoney: {
    width: '100%',
    height: 50,
    marginBottom: '10%',
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.06,
    borderRadius: 30,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    color: '#8F8F8F'

  },
  miniButtonMoney: {
    width: '23%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  miniButtonMoneyText: {
    fontSize: width * 0.02,
    color: '#8F8F8F',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  buttonStyle: {
    borderRadius: 30,
    width: '100%',
    height: '90%'
  },
  buttonStyleDisabled: {
    borderRadius: 30,
    width: '100%',
    height: '90%',
    opacity: 0.5
  },
  buttonStylePP: {
    borderRadius: 25,
    width: '100%',
    height: '90%',
    borderColor: '#00A9A0',
    borderWidth: 1
  },
  buttonStylePPDisabled: {
    borderRadius: 25,
    width: '100%',
    height: '90%',
    borderColor: '#00A9A0',
    borderWidth: 1,
    opacity: 0.5
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    height: normalize(350),
    width: '65%',
    padding: '3%',
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
    flexDirection: 'column'
  },
  // modal
  modalPhoneText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.04
  },
  modalText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: '#B7B7B7',
    fontSize: width * 0.034
  },
  modalButton: {
    width: '100%',
    height: '70%',
    alignSelf: 'flex-end'
  },
  modalButtonDisabled: {
    width: '100%',
    height: '70%',
    opacity: 0.5
  },
  // modal2&3
  modal2Button: {
    height: '75%'
  },
  //  modal5
  modalTextAlert: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: width * 0.034
  },

});

export default styles;