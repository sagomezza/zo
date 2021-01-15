import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import { connect } from "react-redux";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { FINISHPARKING, READ_HQ, READ_PARANOIC_USER, GET_RECIPS, CHECK_PARKING } from '../../config/api'
import { TIMEOUT } from '../../config/constants/constants';
import store from '../../config/store';
import Button from '../../components/Button';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';


const UserOut = (props) => {
  const { navigation, officialProps, qr } = props;
  // const dateMonthIn = new Date('05/05/20');
  // const dateMonthOut = new Date('07/05/20');

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPay, setTotalPay] = useState(-1);
  const [recip, setRecip] = useState({})
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledValue, setIsDisabledValue] = useState(true);
  const [err, setErr] = useState("");
  const [isParanoicUser, setIsParanoicUser] = useState(false);

  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateFinished, setDateFinished] = useState('');
  const [check, setCheck] = useState({})

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
      width: '39%',
      height: '60%',
      margin: '1%',
      fontSize: normalize(38),
      fontFamily: 'Montserrat-Bold',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      color: '#00A9A0'
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
    buttonT: {
      borderRadius: 30,
      alignItems: 'center',
      alignContent: 'center',
      height: '60%',
      width: '15%',
      backgroundColor: "#FFFFFF",
      margin: '2%'

    },
    textPhoneCode: {
      width: '80%',
      height: normalize(39),
      fontSize: normalize(27),
      fontFamily: 'Montserrat-Regular',
      color: '#00A9A0',
      backgroundColor: '#05877F',
      borderRadius: 30,
      margin: '1%'
    },
    codeContainer: {
      width: '80%',
      height: normalize(31),
      fontSize: normalize(20),
      fontFamily: 'Montserrat-Regular',
      color: '#00A9A0',
      backgroundColor: '#05877F',
      borderRadius: 30,
      margin: '1%'
    },
    timePlate: {
      width: '48%',
      height: '77%',
      backgroundColor: 'rgba(22,22,21,0.25)',
      borderRadius: 30,
      flexDirection: 'row',
      paddingHorizontal: 25,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    timePlateTitle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: normalize(17),
      color: '#FFFFFF'
    },
    timePlateInfo: {
      fontFamily: 'Montserrat-Regular',
      fontSize: normalize(17),
      color: '#FFFFFF'
    },
    payplate: {
      width: '60%',
      height: normalize(70),
      fontFamily: 'Montserrat-Regular',
      backgroundColor: '#FFF200',
      borderRadius: 20,
      margin: '1%'
    },
    payText: {
      fontSize: normalize(50),
      fontFamily: 'Montserrat-Bold',
      color: '#00A9A0',
      textAlign: 'center'
    },
    inputMoney: {
      width: '100%',
      height: 50,
      marginBottom: '10%',
      fontFamily: 'Montserrat-Bold',
      fontSize: normalize(33),
      borderRadius: 30,
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      color: '#8F8F8F'

    },
    miniButtonMoney: {
      width: '23%',
      borderRadius: 20,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center'

    },
    miniButtonMoneyText: {
      fontSize: 12,
      color: '#8F8F8F',
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold'
    },
    infoUserText: {
      fontFamily: 'Montserrat-Bold',
      fontSize: normalize(23),
      color: '#FFFFFF',
      textAlign: 'center'
    },
    codeText: {
      fontFamily: 'Montserrat-Bold',
      fontSize: normalize(20),
      color: '#FFFFFF',
      textAlign: 'center'
    },
    buttonStyle: {
      borderRadius: 30,
      width: '100%',
      paddingHorizontal: '40%',
      height: '90%'
    },
    buttonStyleDisabled: {
      borderRadius: 30,
      width: '100%',
      paddingHorizontal: '40%',
      height: '90%',
      opacity: 0.5
    },
    buttonStylePP: {
      borderRadius: 25,
      width: '100%',
      paddingHorizontal: '30%',
      height: '90%',
      borderColor: '#00A9A0',
      borderWidth: 1
    },
    buttonStylePPDisabled: {
      borderRadius: 25,
      width: '100%',
      paddingHorizontal: '30%',
      height: '90%',
      borderColor: '#00A9A0',
      borderWidth: 1,
      opacity: 0.5
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
    modalPhoneText: {
      textAlign: "center",
      fontFamily: 'Montserrat-Bold',
      color: '#00A9A0',
      fontSize: normalize(25)
    },
    modalButton: {
      width: '100%',
      height: '70%',
      alignSelf: 'flex-end'
    },
    openButtonCobrar: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      // padding: 10,
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
      textAlign: "center",
      fontFamily: 'Montserrat-Regular',
      color: '#B7B7B7',
      fontSize: normalize(20)
    },
    modalTextAlert: {
      textAlign: "center",
      fontFamily: 'Montserrat-Regular',
      color: 'red',
      fontSize: normalize(20)
    },
    modal2Button: {
      height: '80%'
    }
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);

  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  function restart() {
    setTotalAmount(0);
    setTotalPay(-1);
    setPlateOne("");
    setPlateTwo("");
    setRecip({})
    setLoading(false);
    setErr("")
    setModalVisible(false);
    setModal2Visible(false);
    setModal3Visible(false);
    setModal4Visible(false);
    setDateStart('');
    setDateFinished('');
    setCheck({});
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
          checkParking()
          store.dispatch(actions.setPhone(''))
          setIsParanoicUser(true)
        }
      } catch (err) {
        console.log(err?.response)
        console.log(err)

      }
    }
    readParanoicUser()
  }, [qr.phone]);

  async function checkParking() {
    try {
      if ((plateOne + plateTwo).length === 6) {
        let reserve = props.reservations.reservations.filter(reserve => reserve.plate === plateOne + plateTwo);
        const response = await instance.post(
          CHECK_PARKING,
          {
            plate: plateOne + plateTwo,
            hqId: reserve[0].hqId,
            phone: reserve[0].phone,
            officialEmail: officialProps.email,
            dateFinished: new Date(),
            prepaidDay: true
          },
          { timeout: TIMEOUT }
        )
        setDateFinished(new Date());
        setDateStart(response.data.data.dateStart);
        setTotalAmount(response.data.data.total);
        setIsDisabled(false)
        setCheck(response.data.data)
        console.log('-----1-----')

        console.log(response.data)
        console.log('-----1-----')
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
      setModal5Visible(true);
    }
  }

  useEffect(() => {
    checkParking()
  }, [plateOne, plateTwo]);


  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if (response.data.response) {
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (err) {
      console.log(err?.response)
      console.log(err)
    }
  };

  const getRecips = async () => {
    try {
      const response = await instance.post(GET_RECIPS, {
        hqId: officialHq
      });
      if (response.data.response === 1) {
        store.dispatch(actions.setRecips(response.data.data.finished));
      }
    } catch (err) {
      console.log(err?.response)
      console.log(err)
    }
  };




  const finishParking = async (paymentStatus, showModal) => {
    setLoading(true)
    console.log({
      plate: check.plate,
      hqId: check.hqId,
      phone: check.phone,
      paymentType: "cash",
      cash: parseInt(totalPay),
      change: totalPay - totalAmount,
      status: paymentStatus,
      isParanoic: isParanoicUser,
      officialEmail: officialProps.email,
      dateFinished: new Date()
    })
    try {
      const response = await instance.post(
        FINISHPARKING,
        {
          plate: check.plate,
          hqId: check.hqId,
          phone: check.phone,
          paymentType: "cash",
          cash: parseInt(totalPay),
          change: totalPay - totalAmount,
          status: paymentStatus,
          isParanoic: isParanoicUser,
          officialEmail: officialProps.email,
          dateFinished: new Date()
        },
        { timeout: TIMEOUT }
      );
      console.log('-----2-----')

      if (isCharacterALetter(check.plate[5])) {
        store.dispatch(actions.subtractBike());
      } else {
        store.dispatch(actions.subtractCar());
      }
      readHq()
      console.log(response.data)
      console.log('-----2-----')

      setRecip(response.data.data);
      getRecips()
      setLoading(false)
      setIsDisabled(true);
      setIsDisabledValue(true);
      restart();
      if (showModal) {
        setModalVisible(true)
      }
    } catch (err) {
      console.log('-----1-----')
      console.log(err?.response)
      console.log('-----2-----')
      console.log(err)
      // setLoading(true)
      setLoading(false);
      setIsDisabled(true);
      setIsDisabledValue(true);
      setErr("Algo malo pasó, vuelve a intentarlo más tarde")
    }
  }

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

  function dateStartDate() {
    if (dateStart) {
      return (moment(dateStart).format('L'))
    }
  }
  function dateStartHour() {
    if (dateStart) {
      return (moment(dateStart).format('LT'))
    }
  }
  function dateFinishedDate() {
    if (dateFinished) {
      return (moment(dateFinished).format('L'))
    }
  }
  function dateFinishedHour() {
    if (dateFinished) {
      return (moment(dateFinished).format('LT'))
    }
  }

  let phoneNumber = check.phone + ''
  let phoneNumberLength = phoneNumber.length
  // console.log(phoneNumberLength)

  let textinputMoney = totalPay === -1 ? '' : totalPay + ''

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: normalize(525),
          flexDirection: 'column'
        }}
        source={require('../../../assets/images/Stripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ height: normalize(390), alignContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '20%', width: '80%', marginTop: '2%' }}>
              <TouchableOpacity
                style={styles.buttonT}
                onPress={() => { navigation.navigate('QRscanner') }}>
                <Image
                  style={{ width: '65%', height: '65%', marginTop: '10%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/qr.png')}
                />
              </TouchableOpacity>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                placeholderTextColor={'#D9D9D9'}
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
                placeholder={'123'}
                placeholderTextColor={'#D9D9D9'}
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
            <View style={styles.textPhoneCode}>
              <Text style={styles.infoUserText}> {phoneNumberLength > 13 ? '' : check.phone} </Text>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>CODIGO: {check.verificationCode} </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              height: '17%',
              width: '80%',
              justifyContent: 'space-between'
            }}>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '18%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Inicio.png')} />
                <View >
                  <Text style={styles.timePlateTitle}>Tiempo de inicio:</Text>
                  <Text style={styles.timePlateInfo}>{dateStartDate()}  {dateStartHour()}</Text>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '17%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Salida.png')} />
                <View>
                  <Text style={styles.timePlateTitle}>Tiempo de salida:</Text>
                  <Text style={styles.timePlateInfo}>{dateFinishedDate()}  {dateFinishedHour()}</Text>
                </View>

              </View>
            </View>
            <View style={styles.textPhoneCode}>
              <Text style={styles.infoUserText}> TOTAL HORAS:  {Object.keys(check).length === 0 ? '' : Math.round(check.hours)}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              height: '20%',
              width: '80%',
              justifyContent: 'space-between'
            }}>
              <Text style={styles.infoUserText}>{"TOTAL A PAGAR"}</Text>
              <View style={styles.payplate}>
                <Text style={styles.payText}>{`$${numberWithPoints(totalAmount)}`}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{
            height: normalize(414),
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              marginTop: '2%',
              width: '80%',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{ width: '33%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: normalize(20), color: '#8F8F8F' }} >{"Valor ingresado"}</Text>
              </View>
              <View style={{ alignContent: 'center', alignItems: 'center', width: '67%', height: '62%' }}>
                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$ 0'
                  value={textinputMoney}
                  onChangeText={text => setTotalPay(text)}
                />
              </View>
            </View>

            <View style={{ width: '80%', height: '10%', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', width: '67%', justifyContent: 'space-between', height: '70%' }}>
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

            <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '33%', paddingRight: '2%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: normalize(20), color: '#8F8F8F', textAlign: 'right' }}>{"A devolver"}</Text>
              </View>
              <View style={{ alignContent: 'center', alignItems: 'center', width: '67%', height: '62%' }}>
                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$'
                  editable={false}
                  value={(totalPay - totalAmount) <= 0 ? '$ 0' : '$ ' + (totalPay - totalAmount)}
                />
              </View>
            </View>

            {err !== "" && <Text style={{ color: "red", fontFamily: 'Montserrat-Regular', alignSelf: 'center' }}>{err}</Text>}
            <View style={{ height: '25%', justifyContent: 'flex-end' }}>
              {!loading &&
                <View style={{ alignItems: 'center', width: '80%', height: ' 35%', marginTop: '2%' }}>
                  <Button
                    title="C O B R A R"
                    color='#00A9A0'
                    disabled={isDisabled && isDisabledValue}
                    style={[isDisabled && isDisabledValue ? styles.buttonStyleDisabled : styles.buttonStyle]}
                    textStyle={{
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: normalize(17)
                    }}
                    onPress={() => {
                      if (textinputMoney === '') {
                        setIsDisabledValue(true)
                      }
                      finishParking("payed", true);
                    }} />
                </View>
              }
              {loading && <ActivityIndicator size={"large"} color={'#00A9A0'} />}
              {!loading &&
                <View style={{ alignItems: 'center', width: '80%', height: ' 35%', marginTop: '2%' }}>
                  <Button
                    title="P A G O   P E N D I E N T E"
                    color='#FFFFFF'
                    disabled={isDisabled}
                    style={[isDisabled ? styles.buttonStylePPDisabled : styles.buttonStylePP]}
                    textStyle={{ color: '#8F8F8F', fontFamily: 'Montserrat-Bold', fontSize: normalize(16) }}
                    onPress={() => {
                      setModal2Visible(true);
                      // finishParking("pending") 
                    }}
                  />
                </View>
              }
            </View>
            <View style={{ height: '24%', width: '100%', justifyContent: 'flex-end' }}>
              <FooterIndex navigation={navigation} />

            </View>

          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal5Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'

            }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalTextAlert}> El vehículo con placas {plateOne + ' ' + plateTwo} no se encuentra estacionado. </Text>
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModal5Visible(!modal5Visible);
                  restart();
                }}
                  title="E N T E N D I D O"
                  color="#00A9A0"
                  style={
                    styles.modalButton
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
              padding: '3%'
            }}>
              <Text style={{
                fontSize: normalize(51),
                textAlign: 'center',
                color: '#00A9A0',
                fontFamily: 'Montserrat-Bold'
              }}>
                {recip.plate}
              </Text>

              <View style={{ height: '10%', width: '75%', backgroundColor: '#FFF200', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={styles.modalPhoneText}>{phoneNumberLength > 13 ? '' : recip.phone} </Text>
              </View>
              <View style={{ height: '35%', width: '75%', justifyContent: 'center' }}>
                <Image
                  style={{ alignSelf: 'center', width: '50%', height: '50%' }}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/Clock.png')} />
              </View>
              <View style={{ height: '15%', width: '76%', justifyContent: 'center' }}>
                <Text style={styles.modalText}>¡Cobro exitoso! </Text>
                <Text style={styles.modalText}> Hora: {moment().format('LT')}</Text>
              </View>
              <View style={{ height: '20%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModalVisible(!modalVisible);
                  restart();
                }}
                  title="E N T E N D I D O"
                  color="#00A9A0"
                  style={
                    styles.modalButton
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
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> ¿Estás seguro de que hay un pago pendiente?  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'space-between', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setModal3Visible(!modal3Visible);
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
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
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
        visible={modal3Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> Elija el tipo de pago  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'space-between', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal3Visible(!modal3Visible);
                    finishParking("pending", false);
                  }}
                    title="T O T A L"
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
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal3Visible(!modal3Visible);
                    setModal4Visible(!modal4Visible);

                  }}
                    title="P A R C I A L"
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
        visible={modal4Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'center', height: ' 30%' }}>
                <Text style={{ ...styles.modalText, fontSize: normalize(20) }}>Ingresa el valor exacto de pago: </Text>
                <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Total a pagar: {`$${numberWithPoints(totalAmount)}`}</Text>
              </View>
              <View style={{ justifyContent: 'space-between', height: '40%', flexDirection: 'column', paddingBottom: '6%' }}>
                <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20) }}>Pago parcial:  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#F8F8F8',
                      fontSize: normalize(20),
                      fontFamily: 'Montserrat-Bold',
                      backgroundColor: '#FFF200',
                      width: '60%',
                      borderRadius: 10,
                      color: '#00A9A0'
                    }}
                    keyboardType='numeric'
                    placeholder='$'
                    textAlign='center'
                    keyboardType={"numeric"}
                    value={totalPay == -1 ? '' : totalPay + ''}
                    onChangeText={text => setTotalPay(text)}
                  />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20) }}> Deuda:  </Text>
                  <TextInput
                    style={{
                      fontSize: normalize(20),
                      fontFamily: 'Montserrat-Bold',
                      width: '60%',
                      borderRadius: 10,
                      backgroundColor: '#FFF200',
                      color: '#00A9A0'
                    }}
                    textAlign='center'
                    editable={false}
                    value={(totalAmount - totalPay) < 0 ? '0' : '$' + (totalAmount - totalPay)}
                  />
                </View>
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModal4Visible(!modal4Visible);
                  finishParking("parcial-pending", false)


                }}
                  title="G U A R D A R"
                  color="#00A9A0"
                  style={
                    styles.modalButton
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
