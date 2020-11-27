import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableHighlight, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import FooterIndex from '../../../src/components/Footer/index';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore";
import Screen from '../Menu/MenuStyles';


const LogoutIndex = (props) => {
  const {navigation} = props;
  const HomeStyles = StyleSheet.create({
    plateInput: {
      borderColor: 'gray', 
      borderWidth: 1,
      borderRadius: 20,
    },
    plateInputText: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: '8%'
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

  const [modalVisible, setModalVisible] = useState(false);

  const name = 'Santiago Gómez Barrero';
  const place = 'Hospital Manuel Uribe Ángel';
  const dateMonthIn = new Date('05/05/20');
  const dateMonthOut = new Date('07/05/20');
  const totalPay = 385000;

  const placas = [
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500' },
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},  
  ];
  
  return (
  <View style={{flex: 1}}>
    
    <View style={{alignItems: 'center', marginTop: '30%'}}>
        {<Text style={{fontSize: 20}}>{name}</Text>}
        {<Text>{place}</Text>}
        
        <Text>{"Hora de inicio: " + moment(dateMonthIn).format('hh:MM A ') + " Hora de salida: " + moment(dateMonthOut).format('hh:MM A')}</Text>
        <View style={{flexDirection: 'row', paddingBottom: '5%', marginTop: '10%'}}>
          <View style={{marginRight: 10, marginTop: 15}}>
            <Text>{"Valor ingresado"}</Text>
          </View>
          <View style={{marginRight: 20}}>
            <TextInput
              style={{fontSize: 25, width: '150%', ...HomeStyles.plateInput, textAlign: 'center'}}
              value={'$ ' + totalPay}
            />
          </View>
        </View>
      </View>
      
    <View style={{paddingBottom: 10}}>
      <FlatList
        data={placas}
        keyExtractor={({ id }) => id}
        renderItem={({item}) => {
        return (
        <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#96A3A0", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
          <View style={{marginBottom: 10}} >
            <Text>{item.placa}</Text>
            <Text>{item.pago}</Text>
          </View>
          <View style={{ flex: 1, alignItems:'flex-end'}} >
            <Text>{item.total}</Text>
          </View>
        </View>
        )}}
      />   
    </View>
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={HomeStyles.plateInput}>
        <Text style={{fontSize: 20, margin: '3%'}}  onPress={() => {setModalVisible(true)}}>  Cerrar turno</Text>
      </TouchableOpacity>
    </View>
    <FooterIndex navigation={navigation}/>
            <Modal
              animationType="fade"
              transparent={true}
              backdropOpacity={0.3}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={HomeStyles.centeredView}>
                <View style={HomeStyles.modalView}>
                  <View style={{marginBottom: '7%', alignItems: 'center'}}>
                    <Text>Has cerrado tu sesión</Text>
                  </View>
                  <TouchableHighlight
                    style={{ ...HomeStyles.openButton, backgroundColor: "#ffffff" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                      }).catch(function(error) {
                        // An error happened.
                      });
                      navigation.navigate('Login')
                    }}
                  >
                    <Text style={HomeStyles.textStyle}>Entendido</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
  </View>
  );
}

export default LogoutIndex;