import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: '71%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        height: '75%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        flex: 1,
        width: '100%',
        height: '40%',
        flexDirection: 'column'
    },
    plateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        height: '30%',
        width: '60%',
        marginTop: '2%'
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
        height: normalize(35),
        width: '100%',
        marginLeft: '0%',
        paddingHorizontal: '24%',
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
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Bold'
    },
    buttonTextRenew: {
        color: '#FFFFFF',
        fontSize: width * 0.025,
        fontFamily: 'Montserrat-Bold',
    },
    notFoundText: {
        fontSize: width * 0.034,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    buttonIDisabled: {
        borderRadius: 30,
        height: normalize(35),
        width: '100%',
        marginLeft: '0%',
        paddingHorizontal: '24%',
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
        height: normalize(550),
        width: '70%',
        padding: '4%',
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
        height: '79%',
    },
    modalButtonDisabled: {
        width: '100%',
        height: '75%',
        opacity: 0.5
    },
    mensualityInfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#ffffff",
        marginBottom: '5%'
    },
    mensualityInfoContainer: {
        height: '60%',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    mensualityInfoButtonsContainer: {
        height: '18%',
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
        paddingBottom: '8%'
    },
    createMensualityRowContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: '1%'
    },
    createMensualityRowInput: {
        borderWidth: 1,
        borderColor: '#00A9A0',
        fontSize: normalize(20),
        fontFamily: 'Montserrat-Bold',
        width: '60%',
        borderRadius: 10,
        color: '#00A9A0'
    }

});

export default styles;