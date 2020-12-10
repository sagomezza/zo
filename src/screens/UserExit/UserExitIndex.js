import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Modal, TouchableHighlight, ActivityIndicator, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
// import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import Logout from '../Menu/MenuStyles';
import { connect } from "react-redux";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { MARKEXIT, FINISHPARKING, READ_HQ, READ_PARANOIC_USER } from '../../config/api'
import { TIMEOUT } from '../../config/constants/constants';
import store from '../../config/store';


const UserOut = (props) => {
  const { navigation, officialProps, qr } = props;
  // const dateMonthIn = new Date('05/05/20');
  // const dateMonthOut = new Date('07/05/20');

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [totalPayModal, setTotalPayModal] = useState(0);
  const [plateOne, setPlateOne] = useState("");
  const [plateTwo, setPlateTwo] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [recip, setRecip] = useState({})
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isParanoicUser, setIsParanoicUser] = useState(false);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: '15%',
      paddingRight: '15%',
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
      fontSize: 50,
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
      fontSize: 25,

    },
    inputMoney: {
      width: 300,
      height: 50,
      borderColor: 'gray',
      marginRight: '5%',
      marginBottom: '10%',
      borderWidth: 1,
      paddingLeft: 10,
      fontFamily: 'Montserrat-Regular'
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
    infoUSerText: {
      fontFamily: 'Montserrat-Regular',
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
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      borderColor: '#D9D9D9',
      borderWidth: 1
    },
    textStyle: {
      color: "gray",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: 'Montserrat-Regular'
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
  
  
  function restart(){
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
          setPlateOne(splitPlate[0]+splitPlate[1]+splitPlate[2])
          setPlateTwo(splitPlate[3]+splitPlate[4]+splitPlate[5])
          markExit()
          store.dispatch(actions.setPhone(''))
          setIsParanoicUser(true)
        }
      } catch (err) {
        console.log(err?.response)
  
      }
    }
    readParanoicUser()
  },[qr.phone]);

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
      }
    } catch (err) {
      console.log(err?.response)

    }
  }

  useEffect(() => {
    markExit()
  }, [plateOne, plateTwo]);

  
  async function readHq () {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if(response.data.response){
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const getRecips = async () => {
    try {
      const response = await instance.post(GET_RECIPS, {
        hqId: officialHq
      });
      if(response.data.response === 1){
        store.dispatch(actions.setRecips(response.data.data.finished));
      }
    } catch (error) {
      //console.log("err: ", error);
    }
  };

  const finishParking = async (paymentStatus) => {
    try {
      console.log({
        plate: recip.plate,
        hqId: recip.hqId,
        phone: recip.phone,
        recipId: recip.id,
        paymentType: "cash",
        cash: totalPay,
        change: totalPay - totalAmount,
        status: paymentStatus,
        isParanoic: isParanoicUser 
      })
      const response = await instance.post(
        FINISHPARKING,
        {
          plate: recip.plate,
          hqId: recip.hqId,
          phone: recip.phone,
          recipId: recip.id,
          paymentType: "cash",
          cash: totalPay,
          change: totalPay - totalAmount,
          status: paymentStatus,
          isParanoic: isParanoicUser 
        },
        { timeout: TIMEOUT }
      )
      //props.navigation.navigate("home")
      setLoading(true)
      readHq()
      getRecips()

    } catch (err) {
      console.log(err?.response)
      setLoading(false)
      setErr("Algo malo pasó, vuelve a intentarlo más tarde")
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Logout navigation={navigation} />
      <View style={styles.container}>
        <TouchableOpacity
          style={
            {
              borderRadius: 20,
              alignItems: 'center',
              height: 50,
              width: 50,
              borderRadius: 15,
              backgroundColor: "#008999"
            }}
          onPress={() => { navigation.navigate('QRscanner') }}>
          <Image style={{width: 30, height: 30, marginTop: 8}} source={require('../../../assets/images/GrupoQR.png')}/>
        </TouchableOpacity>
        <View style={{ paddingLeft: '20%', flexDirection: "row", marginBottom: '5%' }}>

          <TextInput
            style={styles.plateInput}
            textAlign='center'
            maxLength={3}
            autoCapitalize={'characters'}
            onChangeText={text => {
              setPlateOne(text)
              // validate()
            }}
            value={plateOne}
            
          />

          <TextInput
            style={styles.plateInput}
            textAlign='center'
            maxLength={3}
            autoCapitalize={'characters'}
            onChangeText={(text) => {
              setPlateTwo(text)
              //validate()
            }}
            value={plateTwo}
            
          />
        </View>

        <View style={{ alignItems: 'center', marginBottom: '5%' }}>
          {<Text style={styles.infoUSerText}>Celular/CódigoQR: {recip.phone} </Text>}
          {/* <Text style={styles.infoUSerText}>Tiempo de inicio: {recip.dateStart && new Date(recip.dateStart)}</Text> */}
          {/* <Text style={styles.infoUSerText}>Tiempo de salida: {recip.dateFinished && new Date(recip.dateFinished)}</Text> */}
          <Text style={styles.infoUSerText}>CODIGO: {recip.verificationCode} </Text>
          <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Regular' }}>Total horas: {recip?.hours}</Text>
          <Text style={styles.infoUSerText}>{"A pagar"}</Text>
          <Text style={{ fontSize: 50, fontFamily: 'Montserrat-Regular' }}>$ {recip.total} </Text>
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
                <Text style={styles.miniButtonMoneyText}>$5000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(10000)}>
                <Text style={styles.miniButtonMoneyText}>$10000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(20000)}>
                <Text style={styles.miniButtonMoneyText}>$20000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(50000)}>
                <Text style={styles.miniButtonMoneyText}>$50000</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingBottom: '10%', marginLeft: '5%' }}>
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
        {err !== "" && <Text style={{color: "red"}}>{err}</Text>}
        {/* {!loading &&  */}
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Cobrar"
            color='gray'
            disabled={loading}
            onPress={() => { setModalVisible(true); finishParking("payed");restart()
          }} />
        </View>
        {/* } */}
        {/* {loading && <ActivityIndicator />} */}
        {/* {!loading &&  */}
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Pago pendiente"
            color='gray'
            disabled={loading}
            onPress={() => { setModal2Visible(true); 
              // finishParking("pending") 
            }}
          />
        </View>
        {/* } */}
      </View>
      <FooterIndex navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: '7%', alignItems: 'center' }}>
              <Text style={styles.modalText}>{recip.plate}</Text>
              <Text>{recip.phone}</Text>
              <Text>¡Cobro exitoso!</Text>
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Entendido</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginBottom: '7%', alignItems: 'center' }}>
              <Text style={styles.modalText}>¿Estás seguro de que hay un pago pendiente?</Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal2Visible(!modal2Visible);
                  setModal3Visible(!modal3Visible);

                }}
              >
                <Text style={styles.textStyle}>SI</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal2Visible(!modal2Visible);
                }}
              >
                <Text style={styles.textStyle}>NO</Text>
              </TouchableHighlight>
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
              <Text>{totalAmount}</Text>
              <TextInput
                keyboardType='numeric'
                placeholder='$'
                value={totalPayModal == 0 ? '' : totalPayModal + ''}
                onChangeText={text => setTotalPayModal(text)}
              />
              <TextInput
                editable={false}
                value={(totalPayModal - totalAmount) < 0 ? '0' : (totalPayModal - totalAmount) + ''}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModal4Visible(!modal4Visible);
                  setTotalPay(totalPayModal)
                  finishParking("parcial-pending") 
                  setTotalPayModal(0);
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
