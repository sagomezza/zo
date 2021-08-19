import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '60%',
        flexDirection: 'column',
    },
    topContainer: {
        height: '37%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    officialNameContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        height: '24%',
        width: '80%',
    },
    officialNameText: {
        fontSize: width * 0.04,
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF'
    },
    officialNameText2: {
        fontFamily: 'Montserrat-Regular',
        fontSize: width * 0.03,
        color: '#FFFFFF'
    },
    timePlatesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        height: '35%',
        width: '85%',
        justifyContent: 'space-between',
    },
    timePlate: {
        width: '49%',
        height: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timePlateTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#6F6F7B',
        alignSelf: 'flex-start',
        marginLeft: '7%'
    },
    timePlateDate: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#00A9A0'
    },
    timePlateHour: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#8F8F8F'
    },
    totalContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalText: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        fontSize: width * 0.032
    },
    cashContainer: {
        flexDirection: 'row',
        width: '80%',
        height: '22%',
        alignItems: 'center',
        alignContent: 'center',
        padding: '1%',
        justifyContent: 'center',
        borderWidth: 1
    },
    currencyInputContainer: {
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '70%',
        height: '80%',
    },
    textInput: {
        width: '100%',
        height: '64%',
        marginRight: '6%',
        marginLeft: '0%',
        fontSize: width * 0.043,
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        backgroundColor: '#E7E7EA',
        borderRadius: 10,
    },
    textInputDifTotal: {
        width: '82%',
        height: '74%',
        marginRight: '5%',
        marginLeft: '0%',
        fontSize: width * 0.045,
        fontFamily: 'Montserrat-Bold',
        color: '#FF4500',
        backgroundColor: '#FFF200',
        borderRadius: 20
    },
    bottomContainer: {
        height: '60%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        height: '66%',
        width: '85%',
        marginTop: '8%',
    },
    flatlist: {
        flexDirection: "row",
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        marginBottom: normalize(8),
        marginTop: normalize(8),
    },
    textPlaca: {
        fontSize: width * 0.03,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Bold'
    },
    textPago: {
        fontSize: width * 0.02,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Medium'
    },
    textMoney: {
        fontSize: width * 0.030,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Bold'
    },
    shiftButton: {
        width: '100%',
        height: '70%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#00A9A0"
    },
    shiftButtonDisabled: {
        width: '100%',
        height: '75%',
        borderRadius: 20,
        opacity: 0.5,
        borderWidth: 1,
        borderColor: "#00A9A0"
    },
    // modal
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: '#A9A9A9',
        fontSize: normalize(20)
    },
    modalTextBlue: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        fontSize: normalize(20)
    },
    modalTextTitle: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        fontSize: normalize(28)
    },
    modalTextAlert: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: 'red',
        fontSize: normalize(20)
    },
    modal2Button: {
        width: normalize(250),
        height: '85%'

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
        width: normalize(400),
        padding: normalize(20),
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
    logoutModalView: {
        height: normalize(500),
        width: normalize(400),
        padding: normalize(20),
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
    logoutModalReport:{
        height: '13%',
        width: '100%',
        backgroundColor: '#ECEDEF',
        borderRadius: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '3%',
        paddingBottom: '2%',
        paddingRight: '8%',
        paddingLeft: '8%'
      }

})
export default styles;