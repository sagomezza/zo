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
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loginTextContainer: {
    height: "10%",
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: 'white',
    fontSize: width * 0.029,
    marginBottom: '20%',
    fontFamily: 'Montserrat-Bold'
  },
  inputsContainer: {
    width: "100%",
    height: "15%",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1
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
  buttonContainer: {
    width: "60%",
    height: "10%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "6%",
  },
  button: {
    borderWidth: normalize(1),
    borderColor: "#707070",
    alignSelf: "center",
    width: "90%",
    height: "65%",
    marginTop: '4%'
  },
  buttonText: {
    color: "#00A9A0",
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.03,
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
    fontFamily: 'Montserrat-Medium'
  },
  textInputContainer: {
    backgroundColor: "#F0EEEE",
    height: normalize(50),
    width: "55%",
    borderRadius: normalize(30),
    flexDirection: "row",
    paddingHorizontal: '3%',
    borderColor: "#707070",
    marginBottom: '7%',

  },
  // showInstructions MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    height: normalize(590),
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
  modalInfoContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    padding: "2%",
  },
  iconTitleContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalTextTitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.047,
  },
  stepContainer: {
    height: '24%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  modalNum: {
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.07,
  },

  modalText: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    color: '#8F8F8F',
    fontSize: width * 0.03,
  },
  modalButton: {
    width: '100%',
    height: '90%',
  },
  modalButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.03,

  }

});

export default styles;
