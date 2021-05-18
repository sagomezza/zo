import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
        
    },
    listContainer: {
        height: '80%',
        width: '90%',
        backgroundColor: '#F8F8F8',
        marginTop: '4%',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textListTitle: {
        fontSize: normalize(25),
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    collapseContainer: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#F0F0F0'
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    },
    bodyText: {
        fontSize: 15
    }
});

export default styles;