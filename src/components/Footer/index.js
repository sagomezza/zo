import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FooterStyles from './styles';
import { Icon } from 'react-native-elements';
import Button from '../Button/index'
import normalize from '../../config/services/normalizeFontSize';

const FooterIndex = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' }}>
      <View style={{ width: '50%', height: '80%', justifyContent: 'center'}}>
        <Button
          title="I N G R E S O S"
          color="#FFF200"
          style={FooterStyles.buttonI}
          onPress={() => navigation.replace('UserInput')}
          textStyle={FooterStyles.footerTextI} />
      </View>
      <View style={{ width: '50%', height: '80%', justifyContent: 'center'}}>
        <Button
          title="S A L I D A S"
          color="#00A9A0"
          style={FooterStyles.buttonS}
          onPress={() => navigation.replace('UserOut')}
          textStyle={FooterStyles.footerText} />
      </View>

    </View>
  );
}

export default FooterIndex;