import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '52%',
    flexDirection: 'column',
    zIndex: -5
  },
  head: {
    height: normalize(50),
    alignContent: 'center',
  },
  containerOne: {
    position: "relative",
    height: '30%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', borderWidth: 1, zIndex: 100000
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '8%',
    width: '60%',
    marginTop: '2%'
  },
  textContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '5%',
    width: '100%',
  },
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    height: '78%',
    width: '100%',
    zIndex: 10000,
  },
  dropdownPlaceholder: {
    color: '#8F8F8F',
    fontSize: width * 0.04,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  dropdownSelectedLabel: {
    color: '#8F8F8F',
    fontSize: normalize(30),
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    elevation: 999
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "60%",
    alignSelf: 'center'
  },
  dropdownArrow: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'flex-start'
  },
  phoneDropdown: {
    // backgroundColor: '#fafafa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "visible", position: "relative", top: 0,
    width: "60%",
    alignSelf: 'center'

  },
  dropdownLabel: {
    justifyContent: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#8F8F8F',
    fontSize: width * 0.035,

  },
  checkPrepayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '8%',
    width: '60%',
    justifyContent: 'center',
    paddingTop: '3%'
  },
  prepayDayText: {
    color: '#FFF200',
    fontFamily: 'Montserrat-Bold',
    fontSize: width * 0.03,
    textAlign: 'center'
  },
  startButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '12%',
    width: '60%',
    justifyContent: 'center',
  },
  containerTwo: {
    height: '75%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: -100000,
    backgroundColor: '#F8F8F8'
  },
  infoContainer: {
    height: '90%',
    width: '80%',
    backgroundColor: '#FFFFFF',
    marginTop: '6%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  infoText: {
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.027
  },
  text: {
    margin: 6,
    color: '#6F6F7B',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium'
  },
  headText: {
    margin: 6,
    color: '#00A9A0',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    
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
    width: '60%',
    height: '6%',
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
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 5
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
    width: '60%',
    padding: '5%',
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
    flexDirection: 'column',
    borderWidth: 1
  },
  modalViewPrepay: {
    height: normalize(550),
    width: '70%',
    padding: '5%',
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
    flexDirection: 'column',
    borderWidth: 1
  },
  // modal2
  modalTextAlert: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    fontSize: normalize(22),
    margin: '2%'
  },
  modalButton: {
    width: '100%',
    height: '75%',
  },
  // modal
  currencyInput: {
    fontSize: normalize(20),
    fontFamily: 'Montserrat-Bold',
    backgroundColor: '#E7E7EA',
    width: '60%',
    padding:'5%',
    borderRadius: 10,
    color: '#8F8F8F'
  },
  modalButtonDisabled: {
    width: '100%',
    height: '70%',
    opacity: 0.5
  },
  modalPhoneText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    fontSize: normalize(30)
  },
  modalText: {
    textAlign: "center",
    fontFamily: 'Montserrat-Medium',
    color: '#8F8F8F',
    fontSize: normalize(20)
  },
});

export default styles;