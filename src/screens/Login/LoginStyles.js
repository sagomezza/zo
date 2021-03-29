import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 1
  },
  loginText: {
    color: 'white',
    fontSize: width * 0.030,
    marginBottom: '20%',
    fontFamily: 'Montserrat-Bold'
  },
  titleInputText: {
    color: 'white',
    fontSize: width * 0.034,
    fontFamily: 'Montserrat-Bold',
    paddingHorizontal: '0%',
    paddingBottom: '1%'
  },
  alertText: {
    color: '#FFE828',
    fontSize: width * 0.02,
    fontFamily: 'Montserrat-Regular'
  },
  button: {
    height: normalize(30),
    width: "50%",
    borderRadius: 20,
    backgroundColor: '#FFE828',
    alignContent: 'center',
    alignItems: 'center'
  },
  restoreText: {
    color: 'white',
    fontSize: width * 0.025,
    fontFamily: 'Montserrat-Regular'
  },
  textInput: {
    fontSize: width * 0.03,
    color: 'black',
    flex: 1,
    fontFamily: 'Montserrat-Regular'
  },
  textInputContainer: {
    backgroundColor: "#F0EEEE",
    height: normalize(35),
    width: "55%",
    borderRadius: normalize(18),
    flexDirection: "row",
    paddingHorizontal: '3%',
    borderWidth: 1,
    borderColor: "#707070",
    marginBottom: '7%',

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',

  },
  modalView: {
    height: normalize(500),
    width: '75%',
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
  modalTextAlert: {
    textAlign: "center",
    fontFamily: 'Montserrat-Bold',
    color: 'red',
    fontSize: normalize(23),
  },
  modalButton: {
    width: '100%',
    height: '90%',
  },

});

export default styles;
