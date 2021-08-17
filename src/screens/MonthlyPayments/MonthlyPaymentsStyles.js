import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: '71%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoButtonsContainer: {
        height: '97%',
        width: '87%',
        marginTop: '2%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    plateListContainer: {
        flexDirection: 'column',
        width: '60%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    imageStyle: {
        flex: 1,
        width: '100%',
        height: '40%',
        flexDirection: 'column'
    },
    topContainer: {
        height: '20%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    plateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        height: '30%',
        width: '60%',
        marginBottom: '1%'
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
    buttonContainer: {
        height: '30%',
        width: '45%',
        justifyContent: 'flex-end',
    },
    searchButton: {
        borderRadius: 30,
        height: '80%',
        width: '100%',
        marginTop: '2%',
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    buttonRe: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00A9A0',
        height: normalize(40),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
    },
    buttonReDisabled: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00A9A0',
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        opacity: 0.5
    },
    buttonCreate: {
        borderRadius: 30,
        height: normalize(40),
        width: '55%',
        margin: '1%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#00A9A0'
    },
    buttonEd: {
        height: normalize(30),
        width: '70%',
        margin: '1%',
        alignSelf: 'center',
    },
    buttonEdDisabled: {
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        opacity: 0.5
    },
    buttonTextSearch: {
        color: '#00A9A0',
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Medium'
    },
    buttonTextClear: {
        color: '#FFFFFF',
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Medium'
    },
    buttonTextRenew: {
        color: '#00A9A0',
        fontSize: width * 0.025,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 4
    },
    notFoundText: {
        fontSize: width * 0.034,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    searchButtonDisabled: {
        borderRadius: 30,
        height: '80%',
        width: '100%',
        opacity: 0.5,
        marginTop: '2%'
    },
    infoTextNameTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.03,
        color: '#00A9A0',
    },
    infoTextTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#00A9A0',
        margin: '2%'
    },
    infoText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.025,
        color: '#8F8F8F',
        margin: '3%'
    },
    // modals
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalView: {
        height: normalize(450),
        width: '70%',
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
        flexDirection: 'column'
    },
    modalViewNewMensuality: {
        height: normalize(650),
        width: '80%',
        padding: '4%',
        borderRadius: 30,
        borderColor: '#707070',
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
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: '#8F8F8F',
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
        height: '80%',
        borderWidth: 1,
        borderColor: '#00A9A0'
    },
    modalButtonDisabled: {
        width: '100%',
        height: '80%',
        opacity: 0.5
    },
    mensualityName: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '4%',
    },
    mensualityInfo: {
        flexDirection: 'row',
        width: '100%',
        height: '13%',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    mensualityInfoPlates: {
        flexDirection: 'row',
        width: '100%',
        height: '26%',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    mensualityInfoContainer: {
        height: '67%',
        width: '100%',
        marginTop: '5%',
        marginLeft: '4%',
        marginRight: '4%',
        alignContent: 'center',
        alignItems: 'center',
    },
    mensualityInfoButtonsContainer: {
        height: '16%',
        width: '80%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '5%'
    },
    createMensualityContainer: {
        justifyContent: 'space-between',
        height: '70%',
        width: '100%',
        flexDirection: 'column',
        paddingBottom: '8%',
    },
    createMensualityRowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: '1%'
    },
    createMensualityRowInput: {
        fontSize: normalize(25),
        fontFamily: 'Montserrat-Bold',
        width: '70%',
        borderRadius: 7,
        color: '#00A9A0',
        backgroundColor: '#ECEDEF',
        padding: '1%'
    },
    footer: {
        height: '10%',
        width: '100%',
        justifyContent: 'flex-end'
    }

});

export default styles;