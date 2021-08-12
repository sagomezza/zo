import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '65%',
    flexDirection: 'column'
  },
  topContainer: {
    height: '45.3%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  platesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '20%',
    width: '80%',
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
    width: '48%',
    height: '70%',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
    color: '#00A9A0',
    backgroundColor: '#04746E',
    borderRadius: 30,
    marginRight: '2%',
    marginTop: '1%',

  },
  codeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.032,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '2%'
  },
  textPhoneCode: {
    width: '48%',
    height: '70%',
    fontSize: width * 0.03,
    fontFamily: 'Montserrat-Regular',
    color: '#00A9A0',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: '1%'
  },
  infoUserText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.03,
    color: '#00A9A0',
    textAlign: 'center'
  },
  timePlateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '25%',
    width: '85%',
    justifyContent: 'space-between',
    backgroundColor: '#00A9A0',
    borderRadius: 10
  },
  timePlate: {
    width: '27%',
    height: '77%',
    flexDirection: 'column',
    margin: '3%'
  },
  timePlateTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.021,
    color: '#FFF200',
    textAlign: 'center'
  },
  timePlateInfo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.026,
    color: '#FFFFFF'
  },
  totalPayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '40%',
    width: '90%',
    marginTop: '1%'
  },
  payplate: {
    width: '95%',
    height: '40%',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#FFF200',
    borderRadius: 15,
    margin: '1%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  payText: {
    fontSize: width * 0.055,
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    textAlign: 'center'
  },
  pendingContainer: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%'
  },
  pendingText: {
    fontSize: width * 0.025,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },

  inputMoney: {
    width: '100%',
    height: 50,
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.055,
    borderRadius: 30,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  miniButtonMoney: {
    width: '23%',
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8F8F8F',
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
    height: '90%',
    borderWidth: 1,
    borderColor:'#00A9A0',
  },
  buttonStyleDisabled: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor:'#00A9A0',
    width: '100%',
    height: '90%',
    opacity: 0.5
  },
  buttonStylePP: {
    borderRadius: 25,
    width: '100%',
    height: '90%',
  },
  buttonStylePPDisabled: {
    borderRadius: 25,
    width: '100%',
    height: '90%',
    borderColor: '#00A9A0',
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
    height: normalize(450),
    width: '70%',
    padding: '3%',
    borderRadius: 30,
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
    color: '#ED8E20',
    fontSize: width * 0.04
  },
  modalPlateText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    fontSize: width * 0.05
  },
  modalText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: '#B7B7B7',
    fontSize: width * 0.034
  },
  modalTitle: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.045
  },
  modalSubTitle: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#68696C',
    fontSize: width * 0.045
  },
  modalButton: {
    width: '100%',
    height: '58%',
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
    color: '#68696C',
    fontSize: width * 0.034
  },

});

export default styles;