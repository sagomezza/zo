import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: '76%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listContainer: {
        height: '75%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    plateInput: {
        width: '46%',
        height: '100%',
        margin: '2%',
        fontSize: width * 0.06,
        fontFamily: 'Montserrat-Bold',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        color: '#00A9A0'
    },
    buttonI: {
        borderRadius: 30,
        height: width * 0.06,
        width: '100%',
    },
    buttonRe: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '24%',
    },
    buttonReDisabled: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '24%',
        opacity: 0.5
    },
    buttonEd: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '28%',
    },
    buttonEdDisabled: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '28%',
        opacity: 0.5
    },
    buttonTextSearch: {
        color: '#00A9A0',
        fontSize: normalize(20),
        fontFamily: 'Montserrat-Medium',
        letterSpacing: 5
    },
    buttonTextRenew: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        fontFamily: 'Montserrat-Bold',
    },
    buttonIDisabled: {
        borderRadius: 30,
        height: width * 0.06,
        width: '70%',
        alignSelf: 'center',
        opacity: 0.5
    },
    infoTextTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: normalize(20),
        color: '#00A9A0'

    },
    infoText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: normalize(20),
        color: '#00A9A0'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    modalTextAlert: {
        textAlign: "center",
        fontFamily: 'Montserrat-Medium',
        color: '#6F6F7B',
        fontSize: normalize(20),
        margin: '2%'
    },
    modalView: {
        height: normalize(400),
        width: normalize(350),
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
        flexDirection: 'column',
        borderWidth: 1

    },
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: '#B7B7B7',
        fontSize: normalize(20)
    },
    modalButton: {
        width: '100%',
        height: '80%',
        alignSelf: 'flex-end',
    },
    modalButtonDisabled: {
        width: '100%',
        height: '80%',
        opacity: 0.5
    },
    modalButtonBack: {
        width: '100%',
        height: '80%',
        alignSelf: 'flex-end',
        borderColor: '#00A9A0',
        borderWidth: 1
    },
    textPlaca: {
        fontSize: width * 0.025,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold',
        width: '15%'
    },
    textPago: {
        fontSize: width * 0.02,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: normalize(20),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textListTitle: {
        fontSize: width * 0.035,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    titleText: {
        fontSize: width * 0.023,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Bold',
    },
    modalTitleText: {
        fontSize: width * 0.037,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center'
    },
    modalTitleTextGray: {
        fontSize: width * 0.035,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center'
    },
    list: {
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        marginTop: '3%',
        borderRadius: 7,
        justifyContent: 'space-around',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    dateDaysText: {
        fontSize: width * 0.025,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Medium',
    },
    currencyInput: {
        fontSize: normalize(20),
        fontFamily: 'Montserrat-Bold',
        backgroundColor: '#E7E7EA',
        width: '60%',
        padding:'5%',
        borderRadius: 10,
        color: '#8F8F8F'
      },
});

export default styles;