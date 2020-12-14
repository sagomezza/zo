import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableHighlight, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import FooterIndex from '../../../src/components/Footer/index';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore";
import Screen from '../Menu/MenuStyles';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from '../../config/axios';
import { READ_HQ } from '../../config/api';


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
      borderRadius: 10,
      // padding: 10,
      elevation: 2,
      borderColor: '#D9D9D9',
      borderWidth: 1,
      margin: '5%',
      width: '20%',
      height:'40%',
      alignItems: 'center',
      alignContent: 'center'
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
  const recips = props.recips.recips;
  const official = props.official;
  
  const hq = props.hq;
  // const dateMonthIn = new Date('05/05/20');
  // const dateMonthOut = new Date('07/05/20');
  const [ inputValue, setInputValue] = useState(0);
  // useEffect(() => {
  //   const readHq = async () => {
  //     try {
  //       const response = await instance.post(READ_HQ, {
  //         id: officialHq
  //       });
  //       if(response.data.response){
  //         props.setReservations(response.data.data.reservations);
  //       }
  //     } catch (error) {
  //       console.log("err: ", error);
  //     }
  //   };
  //   readHq();
  // }, []);

  // function totalCalculate () {
  //   let totalValue = 0
  //   for (let index = 0; index < recips.length; index++) {
  //     const recip = recips[index];
  //     totalValue += recip.total  
  //   }
    
  // }

  return (
  <View style={{flex: 1}}>
    
    <View style={{alignItems: 'center', marginTop: '20%'}}>
        {<Text style={{fontSize: 20,fontFamily: 'Montserrat-Bold'}}>{official.name + ' '+ official.lastName}</Text>}
        {<Text style={{fontFamily: 'Montserrat-Regular'}}>{hq.name}</Text>}
        
        {/* <Text>{"Hora de inicio: " + moment(dateMonthIn).format('hh:MM A ') + " Hora de salida: " + moment(dateMonthOut).format('hh:MM A')}</Text> */}
        <View style={{flexDirection: 'row', paddingBottom: '5%', marginTop: '10%'}}>
          <View >
            <Text style={{fontFamily: 'Montserrat-Regular'}}>{" Dinero en efectivo: "}</Text>
          </View>
          <View style={{justifyContent: "space-around",
                        width: '50%',
                        borderColor: 'gray',
                        borderRadius: 20,
                        borderWidth: 1,
                    }}>
            <TextInput
              style={{
                      fontSize: 25,
                      fontFamily: 'Montserrat-Regular',
                      color: '#008999',
                    }}
              value={ inputValue }
              keyboardType= {"numeric"}
              textAlign='center'
              placeholder= '$'
              onChangeText = {text => setInputValue(text) + ''}
            />
          </View>
        </View>
      </View>
      
    <View style={{paddingBottom: 10, height: "54%"}}>
      <FlatList
        data={recips}
        keyExtractor={({ id }) => id}
        renderItem={({item}) => {
        return (
        <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#96A3A0", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
          <View style={{marginBottom: 10}} >
            <Text style={{fontFamily: 'Montserrat-Regular'}}>{item.plate}</Text>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>{`Pago por ${item.hours} horas`}</Text>
          </View>
          <View style={{ flex: 1, alignItems:'flex-end'}} >
            <Text style={{fontFamily: 'Montserrat-Regular'}}>$ {item.total}</Text>
          </View>
        </View>
        )}}
      />   
    </View>
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={HomeStyles.plateInput} onPress={() => {setModalVisible(true)}}>
        <Text style={{fontSize: 20, textAlign: 'center',fontFamily: 'Montserrat-Regular'}}>   Cerrar turno   </Text>
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
                    <Text>¿Quieres continuar con el cierre de sesión?</Text>
                  </View>
                  <View style={{flexDirection: 'row' }}>
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
                    <Text style={HomeStyles.textStyle}>SI</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...HomeStyles.openButton, backgroundColor: "#ffffff" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Logout');
                    }}
                  >
                    <Text style={HomeStyles.textStyle}>NO</Text>
                  </TouchableHighlight>
                  
                  </View>
                </View>
              </View>
            </Modal>
  </View>
  );
}

const mapStateToProps = (state) => ({
  official: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq
});

export default connect(mapStateToProps, actions)(LogoutIndex);
