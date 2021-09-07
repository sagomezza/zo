import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Text, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import styles from '../UserExit/UserExitStyles';
import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import Button from '../../components/Button';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';
import { createIdempotency } from '../../utils/idempotency'
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
// api
import { FINISHPARKING, READ_HQ, READ_PARANOIC_USER, GET_RECIPS, CHECK_PARKING } from '../../config/api'
import { TIMEOUT } from '../../config/constants/constants';
import instance from "../../config/axios";
import store from '../../config/store';
import * as Sentry from "@sentry/browser";
import secondsToString from '../../config/services/secondsToString';


const { width, height } = Dimensions.get('window');

const UserOut = (props) => {
  const { navigation, officialProps, qr, uid, reservations } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  // const qrPlate = qr.plate !== undefined ? qr.plate : '';
  // const qrPhone = qr.phone !== undefined ? qr.phone : '';
  // const [qrCodePlate, setQrCodePlate] = useState(qrPlate);
  // const [qrCodePhone, setQrCodePhone] = useState(qrPhone);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPay, setTotalPay] = useState('');
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
  const [loadingCheckParking, setLoadingCheckParking] = useState(false);
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

  // const hoursToDHMS = (seconds) => {
  //   var numdays = "" + Math.floor(seconds / 86400);
  //   var numhours = "" + Math.floor((seconds % 86400) / 3600);
  //   var numminutes = "" + Math.floor(((seconds % 86400) % 3600) / 60);
  //   var numseconds = "" + ((seconds % 86400) % 3600) % 60;

  //   if (numdays.length < 2) numdays = "0" + numdays;
  //   if (numhours.length < 2) numhours = "0" + numhours;
  //   if (numminutes.length < 2) numminutes = "0" + numminutes;
  //   if (numseconds.length < 2) numseconds = "0" + numseconds;

  //   return [numdays, numhours, numminutes, numseconds].join(":") ;
  // }


  const restart = () => {
    store.dispatch(actions.setQr(''));
    store.dispatch(actions.setPhone(''));
    setModalVisible(false);
    setModal2Visible(false);
    setModal3Visible(false);
    setModal4Visible(false);
    setModal5Visible(false);
    setTotalAmount(0);
    setTotalPay('');
    setPlateOne('');
    setPlateTwo('');
    setPlateOneCall('');
    setPlateTwoCall('');
    setIsParanoicUser(false);
    setRecip({})
    setLoading(false);
    setErr("")
    setDateStart('');
    setDateFinished('');
    setCheck({});
    setPendingValue(0);
    setInputVerificationCode('');
    setVerificationCodeCall('');
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
          const splitPlateFive = splitPlate[5] !== undefined ? splitPlate[5] : '';
          setPlateOne(splitPlate[0] + splitPlate[1] + splitPlate[2])
          setPlateTwo(splitPlate[3] + splitPlate[4] + splitPlateFive)

          setPlateOneCall(splitPlate[0] + splitPlate[1] + splitPlate[2])
          setPlateTwoCall(splitPlate[3] + splitPlate[4] + splitPlateFive)
          setIsParanoicUser(true)
        }
      } catch (err) {
        Sentry.captureException(err);
        // console.log(err?.response)
        // console.log(err)
      }
    }
    readParanoicUser()
  }, [qr.phone]);

  useEffect(() => {
    if ((plateOneCall + plateTwoCall).length >= 5) {
      checkParkingPlate();
    }
  }, [plateOneCall, plateTwoCall])

  async function checkParkingPlate() {
    try {
      setLoadingCheckParking(true);
      if ((plateOne + plateTwo).length >= 5 || (plateOneCall + plateTwoCall).length >= 5) {
        let reserve = reservations.reservations.filter(reserve => reserve.plate === plateOne + plateTwo);
        if (reserve) {
          let idempotencyKey = createIdempotency(uid.uid)
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
            { timeout: TIMEOUT },
            {
              headers: {
                "x-idempotence-key": idempotencyKey
              }, timeout: TIMEOUT
            }
          )
          setDateFinished(new Date());
          if (response.data.data.dateStart) setDateStart(response.data.data.dateStart);
          if (response.data.data.total) setTotalAmount(response.data.data.total);
          setIsDisabled(false)
          if (response.data.data.pendingValue) setPendingValue(response.data.data.pendingValue)
          if (response.data.data) setCheck(response.data.data)
          if (response.data.data.verificationCode) setInputVerificationCode(response.data.data.verificationCode + '')
          setLoadingCheckParking(false);
        }
      } else if ((plateOneCall + plateTwoCall).length === 0) {
        // console.log('no plate')
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log("ERR", err)
      // console.log("ERR2", err?.response)
      if (modal5Visible === false) {
        setModal5Visible(true);
      }

      setLoadingCheckParking(false);
    }
  }

  async function checkParkingCode() {
    try {
      setLoadingCheckParking(true);
      if (inputVerificationCode.length >= 5) {
        let reserve = reservations.reservations.filter(reserve => reserve.verificationCode === Number(inputVerificationCode));
        let idempotencyKey = createIdempotency(uid.uid)
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
          { timeout: TIMEOUT },
          {
            headers: {
              "x-idempotence-key": idempotencyKey
            }, timeout: TIMEOUT
          }
        )
        setDateFinished(new Date());
        if (response.data.data.dateStart) setDateStart(response.data.data.dateStart);
        if (response.data.data.total) setTotalAmount(response.data.data.total);
        setIsDisabled(false)
        if (response.data.data.pendingValue) setPendingValue(response.data.data.pendingValue)
        if (response.data.data) setCheck(response.data.data)
        if (response.data.data.plate) {
          setPlateOne(response.data.data.plate.substring(0, 3))
          setPlateTwo(response.data.data.plate.substring(3, 6))
        }
        setLoadingCheckParking(false);

      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err)
      // console.log(err?.response)
      setModal5Visible(true);
      setLoadingCheckParking(false);

    }
  }

  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      },
        { timeout: TIMEOUT }
      );
      getRecips();
      store.dispatch(actions.setReservations(response.data.data.reservations));
      store.dispatch(actions.setHq(response.data.data));
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err?.response)
      // console.log(err)
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
      store.dispatch(actions.setRecips(response.data.data));
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err?.response)
      // console.log(err)
    }
  };

  const finishParking = async (paymentStatus, showModal) => {
    setLoading(true)
    try {
      let idempotencyKey = createIdempotency(uid.uid)
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
        {
          headers: {
            "x-idempotence-key": idempotencyKey
          }, timeout: TIMEOUT
        }
      );
      setLoading(false)
      setModal4Visible(false);
      if (showModal) {
        setModalVisible(true)
      } else {
        restart();
      }
      store.dispatch(actions.setPhone(''))
      store.dispatch(actions.setQr(''))
      readHq();
      setRecip(response.data.data);
      setIsDisabled(true);
    } catch (err) {
      Sentry.captureException(err);
      console.log(err?.response)
      console.log(err)
      setLoading(false);
      setIsDisabled(true);
      setModal4Visible(false);
      setErr("Algo malo pasó, vuelve a intentarlo más tarde")
    }
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

  let phoneNumber = check.phone ? check.phone + '' : ''
  let phoneNumberLength = phoneNumber.length
  let inputChange = (totalPay - totalAmount) <= 0 ? '' : '' + (totalPay - totalAmount)

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/logoutStripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.topContainer} >
            <View style={styles.platesContainer}>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                placeholderTextColor={'#D9D9D9'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={'characters'}
                onChangeText={(text) => {
                  setPlateOne(text.trim());
                  // setPlateOneCall(text.trim());
                  if (refPlateTwo && text.length === 3) {
                    refPlateTwo.current.focus();
                  };
                }}
                value={plateOne}
                onFocus={() => { restart(); }}
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
                  setPlateTwo(text.trim());
                  // setPlateTwoCall(text.trim());
                  if (text.length === 3) {
                    if (plateOne.length === 3) Keyboard.dismiss()
                  };
                }}
                onEndEditing={() => {
                  checkParkingPlate();
                }}
              />
              <TouchableOpacity
                style={styles.buttonT}
                onPress={() => { restart(); navigation.navigate('QRscanner'); }}>
                <Image
                  style={{ width: '65%', height: '65%', marginTop: '10%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/qr.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: '79%', height: '13%', flexDirection: 'row' }}>
              <View style={styles.codeContainer}>
                <TextInput
                  style={styles.codeText}
                  placeholder={'Ingrese código'}
                  placeholderTextColor={'#FFFFFF'}
                  value={inputVerificationCode}
                  // style={styles.plateInput}
                  textAlign='center'
                  maxLength={6}
                  autoCapitalize={'characters'}
                  onFocus={() => { restart(); }}
                  onChangeText={text => {
                    if (text.length === 6) { Keyboard.dismiss() }
                    setInputVerificationCode(text.trim());
                    setVerificationCodeCall(text.trim());
                  }}
                  onEndEditing={() => {
                    checkParkingCode();
                  }}
                />
              </View>
              <View style={styles.textPhoneCode}>
                <Text style={styles.infoUserText}>
                  {phoneNumberLength > 13 ? '' : phoneNumber.slice(3, 13)}
                </Text>
              </View>
            </View>
            <View style={styles.timePlateContainer}>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>TIEMPO DE INICIO</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Image
                    style={{ width: '25%' }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/startTime.png')} />
                  <View style={{ flexDirection: 'column', marginLeft: '5%', marginTop: '5%', width: '65%' }}>
                    <Text style={styles.timePlateInfo}>{dateStartDate()}</Text>
                    <Text style={styles.timePlateInfo}>{dateStartHour()}</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: '80%', borderWidth: 0.4, borderColor: '#FFFFFF' }}></View>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>TIEMPO DE SALIDA</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Image
                    style={{ width: '25%', marginTop: '5%' }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/endTime.png')} />
                  <View style={{ flexDirection: 'column', marginLeft: '5%', marginTop: '5%', width: '65%' }}>
                    <Text style={styles.timePlateInfo}>{dateFinishedDate()}</Text>
                    <Text style={styles.timePlateInfo}>{dateFinishedHour()}</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: '80%', borderWidth: 0.4, borderColor: '#FFFFFF' }}></View>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>TOTAL HORAS</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Image
                    style={{ width: '25%' }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/totalHours.png')} />
                  <View style={{ flexDirection: 'column', margin: '5%', width: '68%' }}>
                    <Text style={styles.timePlateInfo}>{Object.keys(check).length === 0 ? '' : secondsToString((check.hours)*3600)} </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.totalPayContainer}>
              <Text style={styles.pendingText}>Total a pagar</Text>
              <View style={styles.payplate}>
                {loadingCheckParking ?
                  <ActivityIndicator size={"large"} color={'#00A9A0'} />
                  :
                  <Text style={styles.payText}>
                    {`$${numberWithPoints(totalAmount)}`}
                  </Text>
                }
              </View>
              <Text style={styles.pendingText}>
                {"Saldo pendiente: "} {pendingValueNum}</Text>
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
              marginTop: '5%',
              width: '80%',
              justifyContent: 'space-around',
              height: '8%',
            }}>
              <View style={{ width: '32%' }}>
                <Text style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: width * 0.03,
                  color: '#8F8F8F'
                }} >
                  Valor ingresado
                </Text>
              </View>
              <View style={{ width: '33%', paddingRight: '2%' }}>
                <Text style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: width * 0.03,
                  color: '#8F8F8F',
                  textAlign: 'right'
                }}>
                  A devolver
                </Text>
              </View>
              {/*  */}
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: '2%',
              width: '90%',
              justifyContent: 'space-around',
              height: '18%',
              borderRadius: 10,
              backgroundColor: '#00A9A0',
              padding: '1%',
            }}>
              <View style={{
                width: '45%',
                height: '100%',
              }}>
                <CurrencyInput
                  placeholder='$'
                  textAlign='center'
                  keyboardType='numeric'
                  style={styles.inputMoney}
                  value={totalPay}
                  onChangeValue={text => setTotalPay(text)}
                  prefix="$"
                  delimiter="."
                  separator="."
                  precision={0}
                // onChangeText={(formattedValue) => {
                // }}
                />
              </View>
              <View style={{ height: '100%', borderWidth: 0.4, borderColor: '#FFFFFF' }}></View>
              <View style={{
                width: '45%',
                height: '100%',
              }}>
                <TextInput
                  style={{...styles.inputMoney, color: '#04746E'}}
                  keyboardType='numeric'
                  placeholder='$'
                  editable={false}
                  value={`$${numberWithPoints(inputChange)}`}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              height: '12%',
              marginTop: '3%'
            }}>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(5000)} >
                <Text style={styles.miniButtonMoneyText}>$5.000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(10000)}>
                <Text style={styles.miniButtonMoneyText}>$10.000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(20000)}>
                <Text style={styles.miniButtonMoneyText}>$20.000</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniButtonMoney} underlayColor={'#00A9A0'} onPress={() => setTotalPay(50000)}>
                <Text style={styles.miniButtonMoneyText}>$50.000</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: '30%', width: '80%', justifyContent: 'flex-end', marginTop: '3%' }}>
              {err !== "" &&
                <Text style={{
                  color: "red",
                  fontFamily: 'Montserrat-Regular',
                  alignSelf: 'center'
                }}>
                  {err}
                </Text>
              }
              {!loading &&
                <View style={{ width: '60%', height: ' 36%', marginTop: '2%', alignSelf: 'center' }}>
                  <Button
                    title="C O B R A R"
                    color='transparent'
                    disabled={totalPay - totalAmount < 0 && (plateOne + plateTwo).length !== 0 || inputVerificationCode !== verification}
                    style={[totalPay - totalAmount < 0 && (plateOne + plateTwo).length !== 0 || inputVerificationCode !== verification ? styles.buttonStyleDisabled : styles.buttonStyle]}
                    textStyle={{
                      color: '#00A9A0',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: width * 0.028
                    }}
                    onPress={() => {
                      setLoading(true);
                      finishParking("payed", true);
                    }} />
                </View>
              }
              {loading && <ActivityIndicator size={"large"} color={'#00A9A0'} />}
              {!loading &&
                <View style={{ width: '100%', height: ' 35%', marginTop: '2%' }}>
                  <Button
                    title="P A G O   P E N D I E N T E"
                    color='transparent'
                    disabled={isDisabled}
                    style={[isDisabled ? styles.buttonStylePPDisabled : styles.buttonStylePP]}
                    textStyle={{ color: '#00A9A0', fontFamily: 'Montserrat-Bold', fontSize: width * 0.028 }}
                    onPress={() => {
                      setModal2Visible(true);
                      setTotalPay(0)
                    }}
                  />
                </View>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <View style={{ height: '10%', width: '100%', justifyContent: 'flex-end' }}>
        <FooterIndex navigation={navigation} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal5Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%',
            }}>
              <Image
                style={{ width: '30%', alignSelf: 'center', marginTop: '5%' }}
                resizeMode={"contain"}
                source={require("../../../assets/images/alert.png")}
              />
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 30%' }}>
                <Text style={styles.modalText}> El vehículo no esta estacionado o el código QR no se encuentra asociado a un vehículo estacionado. </Text>
              </View>
              <View style={{ height: '25%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModal5Visible(false);
                  restart();
                }}
                  title="ENTENDIDO"
                  color="#00A9A0"
                  style={
                    styles.modalButton
                  }
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 5,
                    fontSize: normalize(20)
                  }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{ height: '25%', width: '65%', justifyContent: 'center', marginTop: '5%' }}>
                <Image
                  style={{ alignSelf: 'center', width: '60%', height: '80%' }}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/paySuccess.png')} />
              </View>
              <View style={{ justifyContent: 'space-between', height: '45%', width: '100%' }}>
                <Text style={styles.modalTitle}>COBRO EXITOSO</Text>
                <Text style={styles.modalSubTitle}>{moment().format('LT')}</Text>
                <View style={{ height: '30%', width: '50%', backgroundColor: '#00A9A0', borderRadius: 25, justifyContent: 'center', marginTop: '2%', alignSelf: 'center' }}>
                  <Text style={styles.modalPlateText}>{check.plate}</Text>
                </View>
                <Text style={styles.modalPhoneText}>{phoneNumberLength > 13 ? '' : phoneNumber.slice(3, 13)}</Text>
              </View>

              <View style={{ height: '30%', width: '80%', justifyContent: 'flex-end', flexDirection: 'column', alignContent: 'flex-end' }}>
                <Button onPress={() => {
                  restart();
                }}
                  title="ENTENDIDO"
                  color="#00A9A0"
                  style={
                    styles.modalButton
                  }
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 5,
                    fontSize: normalize(20)
                  }} />
              </View>

            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '3%'
            }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}>
                  ¿Estás seguro de que hay un pago pendiente?
                </Text>
              </View>
              <View style={{
                height: '30%',
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setModal3Visible(!modal3Visible);
                  }}
                    title="SI"
                    color="#00A9A0"
                    style={
                      styles.modalYesButton
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);

                  }}
                    title="NO"
                    color="transparent"
                    style={
                      styles.modalNoButton
                    }
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '3%'
            }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> Elija el tipo de pago  </Text>
              </View>
              <View style={{
                height: '30%',
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal3Visible(!modal3Visible);
                    finishParking("pending", true);
                  }}
                    title="TOTAL"
                    color="#00A9A0"
                    style={
                      styles.modalYesButton
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)

                    }} />
                </View>
                <View style={{ width: '60%', height: '50%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal3Visible(false);
                    setModal4Visible(true);

                  }}
                    title="PARCIAL"
                    color="transparent"
                    style={
                      styles.modalNoButton
                    }
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal4Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '3%',
              alignContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{ height: '25%', width: '65%', justifyContent: 'center', marginTop: '5%' }}>
                <Image
                  style={{ alignSelf: 'center', width: '60%', height: '80%' }}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/pending.png')} />
              </View>
              <View style={{ margin: '4%', justifyContent: 'center', height: ' 20%'}}>
                <Text style={{ ...styles.modalText, fontSize: normalize(20) }}>
                  Ingresa el valor exacto de pago
                </Text>
                <Text style={{
                  ...styles.modalText,
                  fontSize: normalize(30),
                  fontFamily: 'Montserrat-Bold',
                  color: '#00A9A0'
                }}>
                  TOTAL A PAGAR
                </Text>
              </View>
              <View style={{
                justifyContent: 'space-between',
                height: '25%',
                width:'100%',
                flexDirection: 'column',
                paddingBottom: '6%',
              }}>
                  <CurrencyInput
                    placeholder='$'
                    textAlign='center'
                    keyboardType='numeric'
                    style={{
                      fontSize: normalize(30),
                      fontFamily: 'Montserrat-Bold',
                      backgroundColor: '#00A9A0',
                      width: '70%',
                      borderRadius: 30,
                      color: '#FFF200',
                      height: '70%',
                      alignSelf: 'center'
                    }}
                    value={totalPay}
                    onChangeValue={text => setTotalPay(text)}
                    prefix="$"
                    delimiter="."
                    separator="."
                    precision={0}
                  />
                <View style={{ flexDirection: "row", justifyContent: 'center', width: '70%', alignItems: 'center', alignSelf: 'center'}}>
                  <Text style={{color: '#ED8E20', fontSize: normalize(20), fontFamily: 'Montserrat-Bold'}}>Deuda  </Text>
                  <TextInput
                    style={{
                      fontSize: normalize(20),
                      fontFamily: 'Montserrat-Bold',
                      color: '#ED8E20',
                      alignSelf: 'center',
                      width: '50%'
                    }}
                    textAlign='center'
                    editable={false}
                    value={(totalAmount - totalPay) < 0 ? '$0' : `$${numberWithPoints(totalAmount - totalPay)}`}
                  />
                </View>
              </View>
              <View style={{ height: '20%', width: '80%', justifyContent: 'center'}}>
                <Button onPress={() => {

                  finishParking("parcial-pending", false)
                }}
                  title="GUARDAR"
                  color="#00A9A0"
                  style={
                    styles.modalYesButton
                  }
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 5,
                    fontSize: normalize(20)
                  }}
                  activityIndicatorStatus={loading} />
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
  qr: state.qr,
  uid: state.uid
});

export default connect(mapStateToProps, actions)(UserOut);
