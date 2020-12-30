import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableHighlight, Dimensions, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import FooterIndex from '../../../src/components/Footer/index';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from '../../config/axios';
import { GET_SHIFT_RECIPS, MARK_END_OF_SHIFT, READ_HQ } from '../../config/api';
import numberWithPoints from '../../config/services/numberWithPoints';
import Button from '../../components/Button/index';
import normalize from '../../config/services/normalizeFontSize';
import { Icon } from 'react-native-elements';

const LogoutIndex = (props) => {
  const { navigation, officialProps, recips } = props;
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
      borderRadius: 20,
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
      borderColor: '#D9D9D9',
      borderWidth: 1,
      margin: '5%',
      width: '20%',
      height: '40%',
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
    },
    buttonT: {
      borderRadius: 4,
      alignItems: 'center',
      alignContent: 'center',
      height:  normalize(30),
      width: normalize(30) ,
      backgroundColor: "#00A9A0",
      padding: '1%',
      marginLeft: '2%'
    }
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [total, setTotal] = useState(0);
  const [shiftRecips, setShiftRecips] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const hq = props.hq;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getShiftRecips = async () => {
      try {
        const response = await instance.post(GET_SHIFT_RECIPS, {
          email: officialProps.email,
          hqId: officialProps.hq[0],
          date: new Date()
        });
        if (response.data.response === 1) {
          setTotal(response.data.data.total);
          setShiftRecips(response.data.data.recips);
        }
      } catch (error) {
        //console.log("err: ", error);
      }
    }
    getShiftRecips();
  }, []);

  const markEndOfShift = async () => {
    try {
      const response = await instance.post(MARK_END_OF_SHIFT, {
        email: officialProps.email,
        id: officialProps.id,
        date: new Date(),
        total: total,
        input: inputValue
      });
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    } catch (err) {
      console.log(err)
      console.log(err?.response)
    }
  }

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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

      <View style={{ alignItems: 'center', marginTop: '20%' }}>
        {<Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold' }}>{officialProps.name + ' ' + officialProps.lastName}</Text>}
        {<Text style={{ fontFamily: 'Montserrat-Regular' }}>{hq.name}</Text>}

        {/* <Text>{"Hora de inicio: " + moment(dateMonthIn).format('hh:MM A ') + " Hora de salida: " + moment(dateMonthOut).format('hh:MM A')}</Text> */}
        <View style={{ flexDirection: 'row', paddingBottom: '5%', marginTop: '10%' }}>
          <View >
            <Text style={{ fontFamily: 'Montserrat-Regular' }}>{" Dinero en efectivo: "} </Text>
          </View>
          <View style={{
            justifyContent: "space-around",
            flexDirection: 'row',
            width: '50%',
          }}>
            <TextInput
              placeholder='$'
              style={{
                width: '75%',
                height: normalize(30),
                marginRight: '5%',
                marginLeft: '5%',
                borderColor: 'gray',
                marginBottom: '10%',
                fontSize: normalize(25),
                fontFamily: 'Montserrat-Regular',
                color: '#00A9A0',
                backgroundColor: 'rgba(0,0,0,0.04)'
              }}
              keyboardType='numeric'
              textAlign='center'
              editable={isDisabled}
              onChangeText={text => setInputValue(text) + ''}
              value={inputValue == 0 ? '' : inputValue + ''}

            />
            <TouchableOpacity style={HomeStyles.buttonT}
              onPress={() => {
                setModal2Visible(true)
              }}
              disabled={inputValue.length === 0}>
              <Icon name='save' color='#FFFFFF'style={{marginTop: '4%' }} /> 
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ paddingBottom: 10, height: "50%" }}>
        <FlatList
          data={shiftRecips}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row", position: 'relative', borderBottomWidth: 1, borderColor: "#96A3A0", marginBottom: 10, marginLeft: 60, marginRight: 70, marginTop: 20 }} >
                <View style={{ marginBottom: 10 }} >
                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>{item.plate}</Text>
                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>{`Pago por ${item.hours} horas`}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }} >
                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>{`$${numberWithPoints(item.total)}`}</Text>
                </View>
              </View>
            )
          }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button onPress={() => {
          setModalVisible(true)
        }}
          title="Cerrar turno"
          color="#ffffff"
          style={{
            borderWidth: 1,
            borderColor: "#D9D9D9",
            alignSelf: 'flex-end',
            width: '30%',
            heigth: '10%',
            margin: '5%',
            paddingHorizontal: '4%',
            borderRadius: 9
          }}
          textStyle={{
            color: "#00A9A0",
            textAlign: "center",
            fontFamily: 'Montserrat-Regular'
          }
          } />
      </View>
      <FooterIndex navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={HomeStyles.centeredView}>
          <View style={HomeStyles.modalView}>
            <View style={{ margin: '3%', alignItems: 'center' }}>
              <Text style={HomeStyles.modalText}> ¿Estás seguro de que quieres guardar el total? </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Button onPress={() => {
                setModal2Visible(!modal2Visible);
                setIsDisabled(false)
              }}
                title="Si"
                color="#ffffff"
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  alignSelf: 'center',
                  width: '90%',
                  heigth: '10%',
                  margin: '8%',
                  paddingHorizontal: '4%',
                }}
                textStyle={{
                  color: "#00A9A0",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Regular'
                }} />
              <Button onPress={() => {
                setModal2Visible(!modal2Visible);
              }}
                title="No"
                color="#ffffff"
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  alignSelf: 'center',
                  width: '90%',
                  heigth: '10%',
                  margin: '8%',
                  paddingHorizontal: '4%',
                }}
                textStyle={{
                  color: "#00A9A0",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Regular'
                }} />
            </View>
          </View>
        </View>
      </Modal>
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
            <View style={{ margin: '3%', alignItems: 'center' }}>
              <Text style={HomeStyles.modalText}> ¿Quieres continuar con el cierre de sesión? </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Button onPress={() => {
                setModalVisible(!modalVisible);
                
                markEndOfShift();
                navigation.navigate('Login')
              }}
                title="Si"
                color="#ffffff"
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  alignSelf: 'center',
                  width: '90%',
                  heigth: '10%',
                  margin: '8%',
                  paddingHorizontal: '4%',
                }}
                textStyle={{
                  color: "#00A9A0",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Regular'
                }} />
              <Button onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('Logout');
              }}
                title="No"
                color="#ffffff"
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  alignSelf: 'center',
                  width: '90%',
                  heigth: '10%',
                  margin: '8%',
                  paddingHorizontal: '4%',
                }}
                textStyle={{
                  color: "#00A9A0",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Regular'
                }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq
});

export default connect(mapStateToProps, actions)(LogoutIndex);
