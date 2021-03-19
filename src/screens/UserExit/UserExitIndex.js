import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import styles from '../UserExit/UserExitStyles';
import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import Button from '../../components/Button';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
// api
import { FINISHPARKING, READ_HQ, READ_PARANOIC_USER, GET_RECIPS, CHECK_PARKING } from '../../config/api'
import { TIMEOUT } from '../../config/constants/constants';
import instance from "../../config/axios";
import store from '../../config/store';

const { width, height } = Dimensions.get('window');

const UserOut = (props) => {
  const { navigation, officialProps, qr } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  // const qrPlate = qr.plate !== undefined ? qr.plate : '';
  // const qrPhone = qr.phone !== undefined ? qr.phone : '';
  // const [qrCodePlate, setQrCodePlate] = useState(qrPlate);
  // const [qrCodePhone, setQrCodePhone] = useState(qrPhone);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [recip, setRecip] = useState({})
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [err, setErr] = useState("");
  const [isParanoicUser, setIsParanoicUser] = useState(false);

  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [plateOneCall, setPlateOneCall] = useState('');
  const [plateTwoCall, setPlateTwoCall] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateFinished, setDateFinished] = useState('');
  const [check, setCheck] = useState({})
  const [pendingValue, setPendingValue] = useState(0)
  let pendingValueNum = pendingValue !== undefined ? `$${numberWithPoints(pendingValue)}` : `$${numberWithPoints(0)}` 
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [verificationCodeCall, setVerificationCodeCall] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);

  const verification = check.verificationCode === undefined ? '' : check.verificationCode + ''
  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);

  const restart = () => {
    store.dispatch(actions.setQr(''));
    store.dispatch(actions.setPhone(''));
    setModalVisible(false);
    setModal2Visible(false);
    setModal3Visible(false);
    setModal4Visible(false);
    setTotalAmount(0);
    setTotalPay(0);
    setPlateOne("");
    setPlateTwo("");
    setRecip({})
    setLoading(false);
    setErr("")
    setDateStart('');
    setDateFinished('');
    setCheck({});
    setPendingValue(0);
    setInputVerificationCode('');
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
          setPlateOneCall(splitPlate[0] + splitPlate[1] + splitPlate[2])
          setPlateTwoCall(splitPlate[3] + splitPlate[4] + splitPlate[5])
          checkParkingPlate();
          setIsParanoicUser(true)
        }
      } catch (err) {
        console.log(err?.response)
        console.log(err)

      }
    }
    readParanoicUser()
  }, [qr.phone]);

  async function checkParkingPlate() {
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
            prepaidDay: true,
            verificationCode: inputVerificationCode
          },
          { timeout: TIMEOUT }
        )
        setDateFinished(new Date());
        setDateStart(response.data.data.dateStart);
        setTotalAmount(response.data.data.total);
        setIsDisabled(false)
        console.log(response.data.data.pendingValue)
        setPendingValue(response.data.data.pendingValue)
        setCheck(response.data.data)
        setInputVerificationCode(response.data.data.verificationCode + '')

      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
      setModal5Visible(true);
    }
  }

  async function checkParkingCode() {
    try {
      if (inputVerificationCode.length === 5) {
        let reserve = props.reservations.reservations.filter(reserve => reserve.verificationCode === Number(inputVerificationCode));
        const response = await instance.post(
          CHECK_PARKING,
          {
            hqId: reserve[0].hqId,
            phone: reserve[0].phone,
            officialEmail: officialProps.email,
            dateFinished: new Date(),
            prepaidDay: true,
            verificationCode: Number(inputVerificationCode)
          },
          { timeout: TIMEOUT }
        )
        setDateFinished(new Date());
        setDateStart(response.data.data.dateStart);
        setTotalAmount(response.data.data.total);
        setIsDisabled(false)
        setPendingValue(response.data.data.pendingValue)
        setCheck(response.data.data)
        setPlateOne(response.data.data.plate.substring(0, 3))
        setPlateTwo(response.data.data.plate.substring(3, 6))

      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
      setModal5Visible(true);
    }
  }

  useEffect(() => {
    checkParkingPlate()
  }, [plateOneCall, plateTwoCall]);

  useEffect(() => {
    checkParkingCode()
  }, [verificationCodeCall]);

  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      },
        { timeout: TIMEOUT }
      );
      if (response.data.response) {
        store.dispatch(actions.setReservations(response.data.data.reservations));
        store.dispatch(actions.setHq(response.data.data));
      }
    } catch (err) {
      console.log(err?.response)
      console.log(err)
    }
  };

  const getRecips = async () => {
    try {
      const response = await instance.post(GET_RECIPS, {
        hqId: officialHq,
        officialEmail: officialProps.email
      },
        { timeout: TIMEOUT }
      );
      if (response.data.response === 1) {
        store.dispatch(actions.setRecips(response.data.data));
      }
    } catch (err) {
      console.log(err?.response)
      console.log(err)
    }
  };

  const finishParking = async (paymentStatus, showModal) => {
    setLoading(true)
    try {
      const response = await instance.post(
        FINISHPARKING,
        {
          plate: check.plate,
          hqId: check.hqId,
          phone: check.phone,
          paymentType: "cash",
          total: totalAmount,
          cash: parseInt(totalPay),
          change: totalPay - totalAmount,
          status: paymentStatus,
          isParanoic: isParanoicUser,
          officialEmail: officialProps.email,
          dateFinished: new Date(),
          dateStart: dateStart
        },
        { timeout: TIMEOUT }
      );
      setLoading(false)
      if (showModal) {
        console.log(showModal)
        setModalVisible(true)
      }
      readHq()
      setRecip(response.data.data);
      getRecips()

      setIsDisabled(true);

    } catch (err) {
      console.log(err?.response)
      console.log(err)
      setLoading(false);
      setIsDisabled(true);
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
  let textinputMoney = (totalPay === 0 ? '' : '' + totalPay)
  let inputChange = (totalPay - totalAmount) <= 0 ? '' : '' + (totalPay - totalAmount)

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
          <View style={{ height: '42%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '18%', width: '80%' }}>
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
                  setPlateOneCall(text);
                  if (refPlateTwo && text.length === 3) {
                    refPlateTwo.current.focus();
                  };
                }}
                value={plateOne}
                onFocus={() => { setPlateOne(''); setPlateTwo(''); }}
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
                onFocus={() => { setPlateTwo(''); }}
                onChangeText={text => {
                  setPlateTwo(text);
                  setPlateTwoCall(text);
                  if (text.length === 3) {
                    if (plateOne.length === 3) Keyboard.dismiss()
                  };
                }}
              />
              <TouchableOpacity
                style={styles.buttonT}
                onPress={() => { navigation.navigate('QRscanner') }}>
                <Image
                  style={{ width: '65%', height: '65%', marginTop: '10%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/qr.png')}
                />
              </TouchableOpacity>

            </View>

            <View style={styles.codeContainer}>
              <TextInput
                style={styles.codeText}
                placeholder={'Ingrese código'}
                placeholderTextColor={'#D9D9D9'}
                value={inputVerificationCode}
                // style={styles.plateInput}
                textAlign='center'
                maxLength={5}
                autoCapitalize={'characters'}
                onFocus={() => { setInputVerificationCode(''); }}
                onChangeText={text => {
                  if (text.length === 5) { Keyboard.dismiss() }
                  setInputVerificationCode(text);
                  setVerificationCodeCall(text);
                }}
              />
            </View>
            <View style={styles.textPhoneCode}>
              <Text style={styles.infoUserText}> {phoneNumberLength > 13 ? '' : check.phone} </Text>
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
                <View style={{}} >
                  <Text style={styles.timePlateTitle}>Tiempo de inicio:</Text>
                  <Text style={styles.timePlateInfo}>{dateStartDate()}  {dateStartHour()}</Text>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '17%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Salida.png')} />
                <View style={{}}>
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
              height: '25%',
              width: '80%',
              justifyContent: 'space-between'
            }}>
              <Text style={styles.infoUserText}>{"TOTAL A PAGAR"}</Text>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.payplate}>
                  <Text style={styles.payText}>{`$${numberWithPoints(totalAmount)}`}</Text>
                </View>
                <View style={{ height: '30%', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: '2%' }}>
                  <Text style={{ fontSize: width * 0.035, color: '#FFFFFF', fontFamily: 'Montserrat-Bold' }}>{"Saldo pendiente: "}</Text>
                  <Text style={{ fontSize: width * 0.035, color: '#FFFFFF', fontFamily: 'Montserrat-Bold' }}>{pendingValueNum}</Text>

                </View>
              </View>


            </View>

          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{
            height: '45%',
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              flexDirection: 'row',
              marginTop: '0%',
              width: '80%',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              height: '20%'
            }}>
              <View style={{ width: '32%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: width * 0.034, color: '#8F8F8F' }} >{"Valor ingresado"}</Text>
              </View>
              <View style={{ alignContent: 'center', alignItems: 'center', width: '67%', height: '62%' }}>
                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$ 0'
                  value={textinputMoney}
                  onChangeText={(text) => {
                    setTotalPay(text);
                  }}
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

            <View style={{ flexDirection: 'row', width: '80%', height: '20%', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '33%', paddingRight: '2%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: width * 0.034, color: '#8F8F8F', textAlign: 'right' }}>{"A devolver"}</Text>
              </View>
              <View style={{ alignContent: 'center', alignItems: 'center', width: '67%', height: '62%' }}>
                <TextInput
                  style={styles.inputMoney}
                  keyboardType='numeric'
                  placeholder='$'
                  editable={false}
                  value={`$${numberWithPoints(inputChange)}`}
                />
              </View>

            </View>

            <View style={{ height: '24%', width: '80%', justifyContent: 'flex-end' }}>
              {err !== "" &&
                <Text style={{ color: "red", fontFamily: 'Montserrat-Regular', alignSelf: 'center' }}>{err}</Text>
              }
              {!loading &&
                <View style={{ width: '100%', height: ' 35%', marginTop: '2%' }}>
                  <Button
                    title="C O B R A R"
                    color='#00A9A0'
                    disabled={totalPay - totalAmount < 0 && (plateOne + plateTwo).length !== 0 || inputVerificationCode !== verification}
                    style={[totalPay - totalAmount < 0 && (plateOne + plateTwo).length !== 0 || inputVerificationCode !== verification ? styles.buttonStyleDisabled : styles.buttonStyle]}
                    textStyle={{
                      color: '#FFFFFF',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: width * 0.028
                    }}
                    onPress={() => {
                      finishParking("payed", true);
                    }} />
                </View>
              }
              {loading && <ActivityIndicator size={"large"} color={'#00A9A0'} />}
              {!loading &&
                <View style={{ width: '100%', height: ' 35%', marginTop: '2%' }}>
                  <Button
                    title="P A G O   P E N D I E N T E"
                    color='#FFFFFF'
                    disabled={isDisabled}
                    style={[isDisabled ? styles.buttonStylePPDisabled : styles.buttonStylePP]}
                    textStyle={{ color: '#8F8F8F', fontFamily: 'Montserrat-Bold', fontSize: width * 0.028 }}
                    onPress={() => {
                      setModal2Visible(true);
                      setTotalPay(0)
                      // finishParking("pending") 
                    }}
                  />
                </View>
              }
            </View>
            <View style={{ height: '25%', width: '100%', justifyContent: 'flex-end' }}>
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
                <Text style={styles.modalTextAlert}> El vehículo no se encuentra estacionado. </Text>
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
                {check.plate}
              </Text>

              <View style={{ height: '10%', width: '75%', backgroundColor: '#FFF200', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={styles.modalPhoneText}>{phoneNumberLength > 13 ? '' : check.phone} </Text>
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
                    finishParking("pending", true);
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
                    value={totalPay == 0 ? '' : totalPay + ''}
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
