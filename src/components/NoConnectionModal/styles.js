import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    modalView: {
        height: normalize(350),
        width: '60%',
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
        flexDirection: 'column',
        borderWidth: 1

    },
    modalTextAlert: {
        textAlign: "center",
        fontFamily: 'Montserrat-Bold',
        color: 'red',
        fontSize: normalize(23),
    },
    modalButton: {
        width: '100%',
        height: '90%',
    },
});

export default styles;