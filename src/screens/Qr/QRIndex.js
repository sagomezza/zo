import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import FooterIndex from '../../components/Footer';


const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width ,
      height: Dimensions.get('screen').height ,
      
      
    },
    plateInput: {
      width: 140, 
      height: 80,
      borderColor: 'gray', 
      margin: 10, 
      borderWidth: 1,
      borderRadius: 20,
      fontSize: 50
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      
    },
    modalView: {
      height: 200,
      padding: 35,
      borderRadius:20,
      borderColor: '#707070',
      borderWidth: 1,
      justifyContent: 'space-around',
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
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      borderColor: '#D9D9D9',
      borderWidth:1
    },
    textStyle: {
      color: "gray",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });


export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    modalVisible: false,
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
        <View style={{flex: 1}}>
            <View style={{flexDirection: "row", marginTop: '15%', marginBottom: '10%', justifyContent: 'center'}}>
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
            <View style = {styles.container}>
                <BarCodeScanner 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
{/* 
                {scanned && ( <TouchableOpacity title = {'Tocar para escanear de nuevo'} onPress = {() => this.setState({scanned: false})}>
                    <Text>Tocar para escanear de</Text>
                </TouchableOpacity>)}  */}
            </View>
            
            <FooterIndex navigation={this.props.navigation}/>
            <Modal
              animationType="fade"
              transparent={true}
              backdropOpacity={0.3}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{marginBottom: '7%', alignItems: 'center'}}>
                    <Text style={styles.modalText}>EZV 123</Text>
                    <Text>+3004678602</Text>
                    <Text>Ha iniciado tiempo de parqueo</Text>
                    <Text>11/11/2020 4:20 PM</Text>
                  </View>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                    onPress={() => {
                      this.setState({
                        modalVisible: false
                      });
                      this.props.navigation.navigate('UserInput');
                    }}
                  >
                    <Text style={styles.textStyle}>Entendido</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
        </View>
    );
  }

  handleBarCodeScanned = () => {
    this.setState({
      scanned: true,
      modalVisible: true
    });
  };
}