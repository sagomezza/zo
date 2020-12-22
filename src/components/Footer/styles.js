import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const FooterStyles = StyleSheet.create({ 
    footerText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: normalize(32),
      fontFamily: 'Montserrat-Regular'
    },
    buttonH: {
      backgroundColor: '#008999',
      borderWidth: 1,
      borderColor:'#FFFFFF',
      flex:1,
      height: normalize(48)
        
    },
    buttonI: {
      backgroundColor: '#008999',
      borderWidth:1,
      borderColor:'#FFFFFF',
      flex:3.5,
      height: normalize(48)
        
    },
    buttonS: {
      backgroundColor: '#008999',
      borderWidth:1,
      borderColor:'#FFFFFF', 
      flex:3.5,
      height: normalize(48)
       
    },
});

export default FooterStyles;