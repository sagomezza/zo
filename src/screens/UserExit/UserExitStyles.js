import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: '13%',
        paddingRight: '13%',
        paddingTop: '5%',
        backgroundColor: '#ffffff',
        alignContent: 'center'
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
      numberInput: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        marginRight: '5%',
        marginBottom: '10%',
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        fontSize: normalize(25),
  
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
      payplate: {
        width: '90%',
        height: '55%',
        fontFamily: 'Montserrat-Regular',
        backgroundColor: '#FFF200',
        borderRadius: 20,
        margin: '1%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center'
  
      },
      payText: {
        fontSize: width * 0.06,
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        textAlign: 'center'
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
        fontSize: 12,
        color: '#8F8F8F',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
      },
      infoUserText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.03,
        color: '#FFFFFF',
        textAlign: 'center'
      },
      codeText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.034,
        color: '#00A9A0',
        textAlign: 'center'
      },
      buttonStyle: {
        borderRadius: 30,
        width: '100%',
        // paddingHorizontal: '40%',
        height: '90%'
      },
      buttonStyleDisabled: {
        borderRadius: 30,
        width: '100%',
        // paddingHorizontal: '40%',
        height: '90%',
        opacity: 0.5
      },
      buttonStylePP: {
        borderRadius: 25,
        width: '100%',
        // paddingHorizontal: '30%',
        height: '90%',
        borderColor: '#00A9A0',
        borderWidth: 1
      },
      buttonStylePPDisabled: {
        borderRadius: 25,
        width: '100%',
        // paddingHorizontal: '30%',
        height: '90%',
        borderColor: '#00A9A0',
        borderWidth: 1,
        opacity: 0.5
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
      modalPhoneText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        fontSize: normalize(25)
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
      openButtonCobrar: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        // padding: 10,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        // margin: '5%',
        width: '23%',
        height: '30%',
        alignItems: 'center'
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        // padding: 10,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        margin: '5%',
        width: '20%',
        height: '40%',
        alignItems: 'center'
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        marginTop: '15%'
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
        fontSize: normalize(20)
      },
      modal2Button: {
        height: '75%'
      }
});

export default styles;