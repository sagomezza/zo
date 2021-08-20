import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        height: '91%'
    },
    listContainer: {
        height: '76%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '2%',
        borderRadius: 10,
        justifyContent: 'space-between',
        borderWidth: 1
    },
    listOne: {
        height: '35%',
        width: '85%',
        marginTop: '4%',
    },
    listTwo: {
        height: '50%',
        borderWidth: 1
    },
    textPlaca: {
        fontSize: width * 0.03,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Bold'
    },
    textListTitle: {
        fontSize: width * 0.025,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    screenTitle: {
        fontSize: width * 0.034,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    textPago: {
        fontSize: width * 0.03,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: width * 0.035,
        color: '#8F8F8F',
        fontFamily: 'Montserrat-Bold'
    },
    openCashBalanceButton: {
        borderWidth: normalize(1),
        borderColor: "#707070",
        alignSelf: 'center',
        width: '80%',
        height: '20%',
        paddingHorizontal: '15%',
        paddingVertical: '1%'
    },
    cashBalanceListItem: {
        flexDirection: "row", 
        borderBottomWidth: 1, 
        borderColor: "#E9E9E9", 
        marginBottom: '2%', 
        marginLeft: '10%', 
        marginRight: '10%', 
        marginTop: '0%'
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
    modalViewSign: {
        height: '55%',
        width: '70%',
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
        height: '60%',
        alignSelf: 'flex-end'
    },
    modalButtonSign: {
        width: '100%',
        height: '60%',
        alignSelf: 'flex-end'
    },
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
    }
});

export default styles;