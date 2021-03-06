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
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 3
  },
  inputsContainer: {
    width: "100%",
    height: "15%",
    alignContent: "center",
    alignItems: "center",
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
    fontFamily: "Montserrat-Medium",
    fontSize: width * 0.03,
    letterSpacing: 5
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
});

export default styles;
