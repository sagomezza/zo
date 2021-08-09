import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const {width, height} = Dimensions.get('window');

const FooterStyles = StyleSheet.create({ 
    footerText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: width * 0.03,
      fontFamily: 'Montserrat-Medium'
    },
    footerTextI: {
      textAlign: 'center',
      color: '#00A9A0',
      fontSize: width * 0.03,
      fontFamily: 'Montserrat-Medium'
    },
    
    buttonI: {
      borderRadius: 30,
      height: '80%',
      width: '90%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    },
    buttonS: {
      borderRadius: 30,
      height: '80%',
      width: '90%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    },
});

export default FooterStyles;