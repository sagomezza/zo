import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: '91%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textListTitle: {
        fontSize: width * 0.04,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    textListSubTitle: {
        fontSize: width * 0.025,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Bold'
    },
    buttonTextRenew: {
        color: '#00A9A0',
        fontSize: normalize(15),
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 5
    },
    buttonEd: {
        borderRadius: 30,
        height: width * 0.06,
        width: '100%',
    },
    buttonEdDisabled: {
        borderRadius: 30,
        height: width * 0.06,
        width: '100%',
        borderWidth: 1,
        borderColor: '#00A9A0',
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
        height: '40%',
        width: '60%',
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
    footer: {
        height: '10%',
        width: '100%',
        justifyContent: 'flex-end'
    },
    option: {
        backgroundColor: '#ECEDEF',
        height: '25%',
        width: '100%',
        borderRadius: 7,
        flexDirection: 'row',
        margin: '2%'
    },
});


export default styles;