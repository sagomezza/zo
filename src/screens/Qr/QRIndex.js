import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
      //alignItems: 'center',
      width: '50%', 
      height: '80%',
    },
    plateInput: {
      width: 140, 
      height: 80,
      borderColor: 'gray', 
      marginRight: '5%', 
      borderWidth: 1,
      borderRadius: 20,
      fontSize: 50
    },
  });


export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return (<Text> Solicitando permiso de cámara </Text>);
    }
    if (hasCameraPermission === false) {
      return ( <Text> No existe acceso a la cámara </Text>);
    }
    return ( 
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flexDirection: "row", marginVertical: '5%'}}>
                <TextInput
                style={styles.plateInput}
                textAlign='center'
                value={'EVZ'}
                editable={false}
                />

                <TextInput
                style={styles.plateInput}
                textAlign='center'
                value={'123'}
                editable={false}
                />
            </View>
            <View style = {{
            flex: 1,
            flexDirection: 'column',
            }}>
                <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                style = {[StyleSheet.absoluteFillObject, styles.container]}
                />

                {scanned && ( <Button title = {'Tocar para escanear de nuevo'} onPress = {() => this.setState({scanned: false})}/>)} 
            </View>
            <View>
                <Button title="Cancelar"/>
            </View>
        </View>
    );
  }

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true
    });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}