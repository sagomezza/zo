import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

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
    plateInput: {
        width: '46%',
        height: '100%',
        margin: '2%',
        fontSize: normalize(38),
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
        fontSize: normalize(16),
        fontFamily: 'Montserrat-Bold'
    },
    buttonTextRenew: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        fontFamily: 'Montserrat-Bold',
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
    modalViewNewMensuality: {
        height: normalize(550),
        width: normalize(450),
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
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: '#B7B7B7',
        fontSize: normalize(20)
    },
    modalButton: {
        width: '100%',
        height: '75%',
    },
    modalButtonDisabled: {
        width: '100%',
        height: '90%',
        opacity: 0.5
    },
   
});

export default styles;