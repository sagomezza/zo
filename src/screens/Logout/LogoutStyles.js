import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '60%',
        flexDirection: 'column'
    },
    topContainer: {
        height: '38%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    officialNameContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        height: '20%',
        width: '60%',
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
        height: '25%',
        width: '80%',
        justifyContent: 'space-between',
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
    bottomContainer: {
        height: '58%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        height: '55%',
        width: '78%',
        backgroundColor: '#FFFFFF',
        marginTop: '6%',
        borderRadius: 10,
    },
    flatlist: {
        flexDirection: "row",
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: "#96A3A0",
        marginBottom: 10,
        marginLeft: '7%',
        marginRight: '7%',
        marginTop: 20
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
    // modal
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