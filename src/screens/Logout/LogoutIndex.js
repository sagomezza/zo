import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableHighlight, Dimensions, Image } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
import styles from '../Logout/LogoutStyles';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import { Keyboard } from 'react-native';
import { width } from '../../config/constants/screenDimensions';

const LogoutIndex = (props) => {
  const { navigation, officialProps, recips } = props;
  const startTime = officialProps.schedule.start
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
      // marginTop: 22,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
      height: normalize(350),
      width: normalize(400),
      padding: normalize(20),
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
      flexDirection: 'column'
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

  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [total, setTotal] = useState(0);
  const [shiftRecips, setShiftRecips] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [hqInfo, setHqInfo] = useState([]);

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
        console.log(response.data.data)
        console.log("--------------middle----------")

        console.log(response.data)
        console.log("--------------middle2----------")


      } catch (err) {
        console.log("err: ", err);
        console.log(err?.response)
      }
    }
    console.log(officialProps)
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
      setModal3Visible(false);

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

      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '60%',
          flexDirection: 'column'
        }}
        source={require('../../../assets/images/Stripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ height: '38%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }} >

            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', height: '25%', width: '60%', marginTop: '2%' }}>
              <Text style={{ fontSize: width * 0.045, fontFamily: 'Montserrat-Bold', color: '#FFFFFF' }}>{officialProps.name + ' ' + officialProps.lastName}</Text>
              <View style={{}}>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: width * 0.035, color: '#FFFFFF' }}>{hq.name}</Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              height: '25%',
              width: '80%',
              justifyContent: 'space-between'
            }}>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '18%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Inicio.png')} />
                <View style={{}} >
                  <Text style={styles.timePlateTitle}>Tiempo de inicio:</Text>
                  <Text style={styles.timePlateInfo}>{moment(startTime).format('L')} {moment(startTime).format('LT')} </Text>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '17%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Salida.png')} />
                <View style={{}} >
                  <Text style={styles.timePlateTitle}>Tiempo de salida:</Text>
                  <Text style={styles.timePlateInfo}>{moment().format('L')} {moment().format('LT')}</Text>
                </View>

              </View>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: width * 0.035 }}>{"TOTAL: "}{`$${numberWithPoints(total)}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '80%', height: '30%', alignItems: 'center', alignContent: 'center', padding: '2%', justifyContent: 'space-between' }}>
              <View style={{ width: '30%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: width * 0.034 }}>{"DINERO EN EFECTIVO: "} </Text>
              </View>
              <View style={{
                justifyContent: "center",
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '70%',
                height: '80%'
              }}>
                <TextInput
                  placeholder='$'
                  style={
                    styles.textInput
                  }
                  keyboardType='numeric'
                  textAlign='center'
                  editable={isDisabled}
                  onChangeText={text => setInputValue(text) + ''}
                  value={inputValue == 0 ? '' : inputValue + ''}

                />
                <TouchableOpacity style={[!inputValue.length === 0 ? styles.buttonTDisabled : styles.buttonT]}
                  onPress={() => {
                    setModal2Visible(true)
                  }}
                  disabled={inputValue.length === 0}>
                  <Icon name='save' color='#00A9A0' style={{ marginTop: '4%' }} />
                </TouchableOpacity>
              </View>
            </View>


          </View>

          <View style={{
            height: '58%',
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ height: '55%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '6%', borderRadius: 10 }}>
              <View style={{ paddingBottom: 10, height: "50%" }}>
                <FlatList
                  data={shiftRecips}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row", position: 'relative', borderBottomWidth: 1, borderColor: "#96A3A0", marginBottom: 10, marginLeft: 60, marginRight: 70, marginTop: 20 }} >
                        <View style={{ marginBottom: 10 }} >
                          <Text style={styles.textPlaca}>{item.plate}</Text>
                          <Text style={styles.textPago}>{`Pago por ${Math.round(item.hours)} horas`}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }} >
                          <Text style={styles.textMoney}>{`$${numberWithPoints(item.total)}`}</Text>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>


            </View>
            <View style={{
              width: '75%',
              height: '13%',
              justifyContent: 'flex-end'
            }}>
              <Button onPress={() => {
                setModalVisible(true)
              }}
                title="C E R R A R  T U R N O"
                disabled={!inputValue.length === 0}
                color="#00A9A0"
                style={[inputValue.length === 0 ? styles.shiftButtonDisabled : styles.shiftButton]}
                textStyle={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Bold'
                }
                } />
            </View>
            <View style={{ height: '22%', width: '100%', justifyContent: 'flex-end' }}>
              <FooterIndex navigation={navigation} />

            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>

      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> ¿Estás seguro de que quieres guardar el total?  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '75%', height: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setIsDisabled(false)
                  }}
                    title="S I"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }} />
                </View>
                <View style={{ width: '75%', height: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);

                  }}
                    title="N O"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }} />
                </View>
              </View>
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
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'
            }}
            >
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> ¿Quieres continuar con el cierre de sesión? </Text>
              </View>
              <View style={{
                height: '30%',
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50%',
                  alignItems: 'center'
                }}>
                  <Button onPress={() => {
                    setModalVisible(!modalVisible);
                    markEndOfShift();
                    navigation.navigate('Login')
                  }}
                    title="S I"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }}
                  />
                </View>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50%',
                  alignItems: 'center'
                }}>
                  <Button onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Logout');
                  }}
                    title="N O"
                    color="#00A9A0"
                    style={styles.modal2Button}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }}
                  />
                </View>
              </View>
            </View>

          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalTextAlert}> Algo malo pasó, inténtalo más tarde.  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '75%', height: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Button onPress={() => {
                    setModal3Visible(false);
                    setIsDisabled(false)
                  }}
                    title="E N T E N D I D O"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }} />
                </View>
              </View>
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
