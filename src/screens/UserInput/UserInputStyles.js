import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '50%',
    flexDirection: 'column'
  },
  head: {
    height: 40,
    alignContent: 'center',
  },
  containerOne: {
    height: '30%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  plateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: '20%',
    width: '60%',
    marginTop: '2%'
  },
  textContainer: {
    alignItems: 'center',
    alignContent: 'center',
    height: '10%',
    width: '100%',
  },
  dropdownContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 10, height: '62%',
    width: '60%'
  },
  dropdownPlaceholder:{
    color: '#8F8F8F',
    fontSize: width * 0.04,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  phoneDropdown: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  dropdownLabel: {
    justifyContent: 'center',
    fontFamily: 'Montserrat-Bold',
    color: '#D9D9D9',
    fontSize: width * 0.035
  },
  containerTwo: {
    height: '57%',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    height: '70%',
    width: '73%',
    backgroundColor: '#FFFFFF',
    marginTop: '6%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.027
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
    height: normalize(400),
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
    fontSize: normalize(22),
    margin: '2%'
  },
  modalButton: {
    width: '100%',
    height: '70%',
  },
  modalButtonDisabled: {
    width: '100%',
    height: '70%',
    opacity: 0.5
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