import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import { connect } from "react-redux";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { MARKEXIT, FINISHPARKING, READ_HQ, READ_PARANOIC_USER, GET_RECIPS } from '../../config/api'
import { TIMEOUT } from '../../config/constants/constants';
import store from '../../config/store';
import Button from '../../components/Button';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';




const UserOut = (props) => {
  const { navigation, officialProps, qr } = props;
  // const dateMonthIn = new Date('05/05/20');
  // const dateMonthOut = new Date('07/05/20');

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [totalPayModal, setTotalPayModal] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const [recip, setRecip] = useState({})
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isParanoicUser, setIsParanoicUser] = useState(false);

  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');

  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);

  const clearPlateOne = () => {
    setPlateOne('');
  }
  const clearPlateTwo = () => {
    setPlateTwo('');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: '13%',
      paddingRight: '13%',
      paddingTop: '5%',
      backgroundColor: '#ffffff',
      alignContent: 'center'
    },
    plateInput: {
      width: 140,
      height: 80,
      borderColor: 'gray',
      marginRight: '5%',
      borderWidth: 1,
      borderRadius: 20,
      fontSize: normalize(45),
      fontFamily: 'Montserrat-Regular'
    },
    numberInput: {
      width: '100%',
      height: 60,
      borderColor: 'gray',
      marginRight: '5%',
      marginBottom: '10%',
      borderWidth: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      fontSize: normalize(25),

    },
    inputMoney: {
      width: 300,
      height: 50,
      borderColor: 'gray',
      marginRight: '5%',
      marginBottom: '10%',
      borderWidth: 1,
      paddingLeft: 10,
      fontFamily: 'Montserrat-Regular',
      borderRadius: 10
    },
    miniButtonMoney: {
      width: 65,
      borderWidth: 1,
      borderColor: 'gray',
      marginRight: '5%',
      borderRadius: 10
    },
    miniButtonMoneyText: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular'
    },
    infoUserText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: normalize(15)
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    modalView: {
      height: 310,
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
    modalView: {
      height: normalize(250),
      padding: normalize(40),
      borderRadius: 10,
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
      flexDirection: 'column'
    },
    openButtonCobrar: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      // padding: 10,
      elevation: 2,
      borderColor: '#D9D9D9',
      borderWidth: 1,
      // margin: '5%',
      width: '23%',
      height: '30%',
      alignItems: 'center'
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
      height: '40%',
      alignItems: 'center'
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: 'Montserrat-Regular',
      marginTop: '15%'
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily: 'Montserrat-Regular'
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  function restart() {
    setTotalAmount(0);
    setTotalPay(0);
    setTotalPayModal(0);
    setPlateOne("");
    setPlateTwo("");
    setIsEditable(true);
    setRecip({})
    setLoading(false);
    setErr("")
    setModalVisible(false);
    setModal2Visible(false);
    setModal3Visible(false);
    setModal4Visible(false);
  }

  useEffect(() => {
    async function readParanoicUser() {
      try {
        if ((qr.plate).length === 0 && (qr.phone).length > 0) {
          const response = await instance.post(
            READ_PARANOIC_USER,
            {
              paranoicId: qr.phone,
            },
            { timeout: TIMEOUT }
          )
          const splitPlate = (response.data.data.plate)
          setPlateOne(splitPlate[0] + splitPlate[1] + splitPlate[2])
          setPlateTwo(splitPlate[3] + splitPlate[4] + splitPlate[5])
          markExit()
          store.dispatch(actions.setPhone(''))
          setIsParanoicUser(true)
        }
      } catch (err) {
        console.log(err?.response)

      }
    }
    readParanoicUser()
  }, [qr.phone]);

  async function markExit() {
    try {
      if ((plateOne + plateTwo).length === 6) {
        let reserve = props.reservations.reservations.filter(reserve => reserve.plate === plateOne + plateTwo);

        const response = await instance.post(
          MARKEXIT,
          {
            plate: plateOne + plateTwo,
            hqId: reserve[0].hqId,
            phone: reserve[0].phone,
            officialEmail: officialProps.email,
            dateFinished: new Date()
          },
          { timeout: TIMEOUT }
        )
        setRecip(response.data.data);
        setTotalAmount(response.data.data.total)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
      setLoading(true)

    }
  }

  useEffect(() => {
    markExit()
  }, [plateOne, plateTwo]);


  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if (response.data.response) {
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const getRecips = async () => {
    try {
      console.log(officialHq)
      const response = await instance.post(GET_RECIPS, {
        hqId: officialHq
      });

      console.log("--------entroooooo---------")
      console.log(response.data.data.finished)

      if (response.data.response === 1) {
        store.dispatch(actions.setRecips(response.data.data.finished));
      }
    } catch (err) {
      console.log("--------1---------")
      console.log(err)
      console.log(err?.response)
      console.log("--------1---------")
      //console.log("err: ", error);
    }
  };


  const finishParking = async (paymentStatus) => {
    try {
      const response = await instance.post(
        FINISHPARKING,
        {
          plate: recip.plate,
          hqId: recip.hqId,
          phone: recip.phone,
          recipId: recip.id,
          paymentType: "cash",
          cash: parseInt(totalPay),
          change: totalPay - totalAmount,
          status: paymentStatus,
          isParanoic: isParanoicUser
        },
        { timeout: TIMEOUT }
      )
      //props.navigation.navigate("home")
      // setLoading(false)
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.finished));
      // }
      readHq()
      getRecips()
      setModalVisible(true)

      if (isCharacterALetter(recip.plate[5])) {
        store.dispatch(actions.subtractBike());
      } else {
        store.dispatch(actions.subtractCar());
      }

    } catch (err) {
      console.log(err)
      console.log(err?.response)
      // setLoading(true)
      setErr("Algo malo pasó, vuelve a intentarlo más tarde")
    }
  }

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Button onPress={() => navigation.navigate("Logout")}
        title="Cerrar sesión"
        color="transparent"
        style={{
          borderWidth: 1,
          borderColor: "#008999",
          alignSelf: 'flex-end',
          width: '30%',
          heigth: '10%',
          marginRight: '4%',
          marginTop: '6%',
          paddingHorizontal: '2%'
        }}
        textStyle={{ color: "#008999" }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, marginTop: '4%', marginLeft: '13%', marginRight: '13%' }} >
          <TouchableOpacity style={
            {
              borderRadius: 20,
              alignItems: 'center',
              height: 50,
              width: 50,
              borderRadius: 5,
              backgroundColor: "#008999"
            }}
            onPress={() => { navigation.navigate('QRscanner') }}>
            {/* disabled={(plateOne + plateTwo).length === 6}> */}
            <Image style={{ width: 34, height: 34, marginTop: 8 }} source={require('../../../assets/images/GrupoQR.png')} />
          </TouchableOpacity>

          <View style={{ paddingLeft: '20%', flexDirection: "row", marginBottom: '5%' }}>

            <TextInput
              ref={refPlateOne}
              style={styles.plateInput}
              textAlign='center'
              maxLength={3}
              autoCapitalize={'characters'}
              onChangeText={(text) => {
                setPlateOne(text);
                if (refPlateTwo && text.length === 3) {
                  refPlateTwo.current.focus();
                };
              }}
              value={plateOne}
              onFocus={() => { clearPlateOne(); clearPlateTwo(); }}
            />

            <TextInput
              ref={refPlateTwo}
              value={plateTwo}
              style={styles.plateInput}
              textAlign='center'
              maxLength={3}
              autoCapitalize={'characters'}
              onFocus={() => { clearPlateTwo(); }}
              onChangeText={text => {
                setPlateTwo(text);
                if (text.length === 3) {
                  if (plateOne.length === 3) Keyboard.dismiss()
                };
              }}


            />
          </View>

          <View style={{ alignItems: 'center', marginBottom: '5%' }}>
            {<Text style={styles.infoUserText}>Celular/CódigoQR: {recip.phone} </Text>}
            {/* <Text style={styles.infoUSerText}>Tiempo de inicio: {recip.dateStart && new Date(recip.dateStart)}</Text> */}
            {/* <Text style={styles.infoUSerText}>Tiempo de salida: {recip.dateFinished && new Date(recip.dateFinished)}</Text> */}
            <Text style={styles.infoUserText}>CODIGO: {recip.verificationCode} </Text>
            <Text style={{ fontSize: normalize(20), fontFamily: 'Montserrat-Regular' }}>Total horas: {recip?.hours}</Text>
            <Text style={styles.infoUserText}>{"A pagar"}</Text>
            <Text style={{ fontSize: normalize(50), fontFamily: 'Montserrat-Regular' }}>{`$${numberWithPoints(totalAmount)}`}</Text>
          </View>

          <View style={{ alignItems: 'center' }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 10, marginTop: 15 }}>
                <Text style={{ fontFamily: 'Montserrat-Regular' }} >{"Valor ingresado"}</Text>
              </View>
              <View>

                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$'
                  value={totalPay == 0 ? '' : totalPay + ''}
                  onChangeText={text => setTotalPay(text)}
                />

              </View>

            </View>

            <View style={{ marginLeft: '25%', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', paddingBottom: '5%' }}>
                <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(5000)}>
                  <Text style={styles.miniButtonMoneyText}>$5.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(10000)}>
                  <Text style={styles.miniButtonMoneyText}>$10.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(20000)}>
                  <Text style={styles.miniButtonMoneyText}>$20.000</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(50000)}>
                  <Text style={styles.miniButtonMoneyText}>$50.000</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', paddingBottom: '5%', marginLeft: '5%' }}>
              <View style={{ marginLeft: 30, marginRight: 10, marginTop: 15 }}>
                <Text style={{ fontFamily: 'Montserrat-Regular' }}>{"A devolver"}</Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$'
                  editable={false}
                  value={(totalPay - totalAmount) <= 0 ? '$ 0' : '$ ' + (totalPay - totalAmount)}
                />
              </View>
            </View>
          </View>
          {err !== "" && <Text style={{ color: "red", fontFamily: 'Montserrat-Regular' }}>{err}</Text>}
          {!loading &&
            <View style={{ padding: '5%', alignItems: 'center' }}>
              <Button
                title="Cobrar"
                color='#008999'
                disabled={loading}
                onPress={() => {
                  finishParking("payed")
                }} />
            </View>
          }
          {loading && <ActivityIndicator />}
          {!loading &&
            <View style={{ padding: '5%', alignItems: 'center' }}>
              <Button
                title="Pago pendiente"
                color='gray'
                disabled={loading}
                onPress={() => {
                  setModal2Visible(true);
                  // finishParking("pending") 
                }}
              />
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
      <FooterIndex navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ margin: '6%', alignItems: 'center', paddingBottom: '4%' }}>
              <Text style={{ ...styles.modalText, fontSize: normalize(25) }}> {recip.plate} </Text>
              <Text style={styles.modalText}> ¡Cobro exitoso! </Text>
              <Text style={styles.modalText}> Celular: {recip.phone} </Text>
              <Text style={styles.modalText}> Hora: {moment().format('LT')}</Text>
            </View>
            <Button onPress={() => {
              setModalVisible(!modalVisible);
              restart();
            }}
              title="Entendido"
              color="#ffffff"
              style={{
                borderWidth: 1,
                borderColor: "#D9D9D9",
                alignSelf: 'flex-end',
                width: '30%',
                heigth: '10%',
                margin: '5%',
                paddingHorizontal: '4%',
                elevation: 2,
              }}
              textStyle={{
                color: "#008999",
                textStyle: {
                  textAlign: "center",
                  fontFamily: 'Montserrat-Regular'
                }
              }} />
          </View>
        </View>
      </Modal>
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
            <View style={{ margin: '6%', alignItems: 'center', paddingBottom: '4%' }}>
              <Text style={styles.modalText}> ¿Estás seguro de que hay un pago pendiente? </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Button onPress={() => {
                setModal2Visible(!modal2Visible);
                setModal3Visible(!modal3Visible);
              }}
                title="Si"
                color="#ffffff"
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  alignSelf: 'center',
                  width: '30%',
                  heigth: '10%',
                  margin: '5%',
                  paddingHorizontal: '4%',
                  elevation: 2,
                }}
                textStyle={{
                  color: "#008999",
                  textStyle: {
                    textAlign: "center",
                    fontFamily: 'Montserrat-Regular'
                  }
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
                  width: '30%',
                  heigth: '10%',
                  margin: '5%',
                  paddingHorizontal: '4%',
                  elevation: 2,
                }}
                textStyle={{
                  color: "#008999",
                  textStyle: {
                    textAlign: "center",
                    fontFamily: 'Montserrat-Regular'
                  }
                }} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: '7%', alignItems: 'center' }}>
              <Text style={styles.modalText}>Elija tipo de pago:</Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal3Visible(!modal3Visible);
                  finishParking("pending")
                }}

              >
                <Text style={styles.textStyle}>Total</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal3Visible(!modal3Visible);
                  setModal4Visible(!modal4Visible);
                }}
              >
                <Text style={styles.textStyle}>Parcial</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal4Visible}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView }}>
            <View style={{ marginBottom: '7%', alignItems: 'center' }}>
              <Text style={styles.modalText}>Ingresa el valor exacto de pago: </Text>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20 }}>Total a pagar: $ {totalAmount}</Text>
              <View style={{ flexDirection: "row", justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontFamily: 'Montserrat-Regular' }}>Pago parcial:  </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    color: '#008999',
                    width: '40%',
                    fontFamily: 'Montserrat-Regular',
                    borderRadius: 10
                  }}
                  keyboardType='numeric'
                  placeholder='$'
                  keyboardType={"numeric"}
                  textAlign='center'
                  value={totalPayModal == 0 ? '' : totalPayModal + ''}
                  onChangeText={text => setTotalPayModal(text)}
                />
              </View>
              <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                <Text style={{ fontFamily: 'Montserrat-Regular' }}> Deuda:  </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Regular',
                    width: '40%',
                    borderRadius: 10
                  }}
                  textAlign='center'
                  editable={false}
                  value={(totalAmount - totalPayModal) < 0 ? '0' : '$' + (totalAmount - totalPayModal)}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal4Visible(!modal4Visible);
                  setTotalPay(totalPayModal)
                  finishParking("parcial-pending")
                  setTotalPayModal(0);
                  restart();
                }}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </TouchableHighlight>
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
  qr: state.qr
});

export default connect(mapStateToProps, actions)(UserOut);
