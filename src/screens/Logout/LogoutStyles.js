import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    textInput: {
        width: '82%',
        height: '74%',
        marginRight: '5%',
        marginLeft: '0%',
        fontSize: normalize(34),
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        backgroundColor: '#FFF200',
        borderRadius: 20
    },
    timePlate: {
        width: '48%',
        height: '77%',
        backgroundColor: 'rgba(22,22,21,0.25)',
        borderRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    timePlateTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: normalize(17),
        color: '#FFFFFF'
    },
    timePlateInfo: {
        fontFamily: 'Montserrat-Regular',
        fontSize: normalize(17),
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
        fontSize: normalize(18),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Bold'
    },
    textPago: {
        fontSize: normalize(13),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: normalize(20),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    shiftButton: {
        alignSelf: 'center',
        width: '86%',
        height: '43%',
        marginTop: '5%',
        paddingHorizontal: '3%',
        borderRadius: 20,

    },
    shiftButtonDisabled: {
        alignSelf: 'center',
        width: '86%',
        height: '43%',
        marginTop: '5%',
        paddingHorizontal: '3%',
        borderRadius: 20,
        opacity: 0.5
    },
    modalText: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: '#B7B7B7',
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