import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    container: {
        height: '88%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listContainer: {
        height: '77%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    textListTitle: {
        fontSize: normalize(20),
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    buttonTextRenew: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        fontFamily: 'Montserrat-Bold',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    modalView: {
        height: normalize(350),
        width: normalize(350),
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
        flexDirection: 'column',
        borderWidth: 1

    },
    modalTextAlert: {
        textAlign: "center",
        fontFamily: 'Montserrat-Regular',
        color: 'gray',
        fontSize: normalize(20),
        margin: '2%'
    },
    modalButton: {
        width: '100%',
        height: '70%',
    },
});


export default styles;