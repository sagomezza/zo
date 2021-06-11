import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    textInput: {
        width: '82%',
        height: '74%',
        marginRight: '5%',
        marginLeft: '0%',
        fontSize: width * 0.045,
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        backgroundColor: '#FFF200',
        borderRadius: 20
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
    timePlate: {
        width: '49%',
        height: '77%',
        backgroundColor: 'rgba(22,22,21,0.25)',
        borderRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timePlateTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#FFFFFF'
    },
    timePlateInfo: {
        fontFamily: 'Montserrat-Regular',
        fontSize: width * 0.027,
        color: '#FFFFFF'
    },
    buttonT: {
        borderRadius: 4,
        alignItems: 'center',
        alignContent: 'center',
        height: normalize(30),
        width: normalize(30),
        backgroundColor: "#FFF200",
        padding: '1%',
        marginLeft: '2%'
    },
    buttonTDisabled: {
        borderRadius: 4,
        alignItems: 'center',
        alignContent: 'center',
        height: normalize(30),
        width: normalize(30),
        backgroundColor: "#FFF200",
        padding: '1%',
        marginLeft: '2%',
        opacity: 0.5
    },
    textPlaca: {
        fontSize: width * 0.03,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Bold'
    },
    textPago: {
        fontSize: width * 0.02,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: width * 0.034,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    shiftButton: {
        width: '100%',
        height: '70%',
        borderRadius: 20,
    },
    shiftButtonDisabled: {
        width: '100%',
        height: '70%',
        borderRadius: 20,
        opacity: 0.5
    },
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: '#A9A9A9',
        fontSize: normalize(20)
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
})
export default styles;