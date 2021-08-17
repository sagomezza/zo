import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native';
import { ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CurrencyInput from 'react-native-currency-input';
import styles from './UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import { Table, Row, Rows } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../components/Header/HeaderIndex';
import normalize from '../../config/services/normalizeFontSize';
import { Keyboard } from 'react-native';
import moment from 'moment';
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';
import numberWithPoints from '../../config/services/numberWithPoints';

// api
import { START_PARKING, FIND_USER_BY_PLATE, CREATE_USER, READ_HQ, GET_RECIPS_BY_PLATE, FIND_MENSUALITY_PLATE } from "../../config/api";
import { TIMEOUT } from '../../config/constants/constants';
import instance from "../../config/axios";
import store from '../../config/store';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import { createIdempotency } from '../../utils/idempotency'
import { StyleProvider } from 'native-base';
import { firestore } from '../../config/firebase';
import * as Sentry from "@sentry/browser";


const { width, height } = Dimensions.get('window');

const UserInput = (props) => {
  const { navigation, officialProps, hq, uid } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const officialEmail = officialProps.email;
  const [loadingStart, setLoadingStart] = useState(false);
  // plates
  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const [prepayDay, setPrepayDay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [carParksFull, setCarParksFull] = useState(false);
  const [bikeParksFull, setBikeParksFull] = useState(false);
  const [alreadyParked, setAlreadyParked] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [maxCapMensuality, setMaxCapMensuality] = useState(false);
  const [blacklist, setBlacklist] = useState([]);
  let blacklistValue = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].value : 0;
  let blacklistDate = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].date : '';
  const [existingUser, setExistingUser] = useState(false)
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [phone, setPhone] = useState(null);
  const [phones, setPhones] = useState([{ label: 'Selecciona un número', value: 1 }]);
  const [showDropdown, setShowDropdown] = useState(false)
  const [newPhone, setNewPhone] = useState('');
  const [tableData, setTableData] = useState();
  const [prepayDayDateFinished, setPrepayDayDateFinished] = useState('');
  const [prepayDayRecip, setPrepayDayRecip] = useState(false);
  const [historyExists, setHistoryExists] = useState(false);
  const [prepayDayValue, setPrepayDayValue] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [mensuality, setMensuality] = useState({});
  const [mensualityExists, setMensualityExists] = useState(false);
  const mensualityInfo = mensuality.data !== undefined ? mensuality.data[0] : "";
  const mensualityUserName = mensualityInfo.userName !== undefined ? mensualityInfo.userName : ' ';
  const mensualityCapacity = mensualityInfo.capacity !== undefined ? mensualityInfo.capacity : ' ';
  const mensualityParkedPlates = mensualityInfo.parkedPlatesList !== undefined ? mensualityInfo.parkedPlatesList.length : ' ';

  const priceVehicleType = async () => {
    // if (isCharacterALetter(plateTwo[2]) || plateTwo.length === 2) {
    //   let type = "bike"
    //   let parkingType = 'hours'
    //   const total =  await getTotal(phone, type, officialHq, parkingType);
    //   console.log('getTOTAL FN',total)
    // } else {
    //   let parkingType = 'hours'
    //   let type = "car"
    //   const total = await getTotal(phone, type, officialHq, parkingType);
    //   console.log('getTOTAL FN',total)

    // }
    if (isCharacterALetter(plateTwo[2]) || plateTwo.length === 2) {
      setPrepayDayValue(hq.dailyBikePrice)
    } else {
      setPrepayDayValue(hq.dailyCarPrice)
    }
    if (prepayDay) {
      setModalVisible(true);
    } else {
      startPark();
    }
  }

  const restart = () => {
    setModalVisible(false);
    setModal2Visible(false);
    setErrorModalVisible(false);
    setMaxCapMensuality(false);
    setCarParksFull(false);
    setBikeParksFull(false);
    setAlreadyParked(false);
    setPhones([{ label: 'Selecciona un número', value: 1 }]);
    setPhone(null);
    setShowDropdown(false);
    setNewPhone("");
    setPrepayDay(false);
    setShowPhoneInput(false);
    setHistoryExists(false);
    setMensualityExists(false);
    setPrepayDayRecip(false);
    setPlateOne("");
    setPlateTwo("");
    setPrepayDay(false);
    setShowPhoneInput(false);
    setMensuality({});
    setLoadingStart(false);
  }

  const restartSearch = () => {
    setPhones([{ label: 'Selecciona un número', value: 1 }]);
    setPhone(null);
    setShowDropdown(false);
    setNewPhone("");
    setPrepayDay(false);
    setShowPhoneInput(false);
    setPrepayDay(false);
    setShowPhoneInput(false);
    setHistoryExists(false);
    setMensualityExists(false);
    setPrepayDayRecip(false);
  }

  const clearPlateOne = () => {
    setPlateOne('');

  }
  const clearPlateTwo = () => {
    setPlateTwo('');
  }

  const isCharacterALetter = (char) => {
    return (/[a-zA-Z]/).test(char)
  }

  async function findUserByPlate() {
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        const response = await instance.post(
          FIND_USER_BY_PLATE,
          {
            plate: plateOne + plateTwo,
            type: "full"
          },
          { timeout: TIMEOUT }
        )
        setExistingUser(true)

        setShowPhoneInput(false);
        setShowDropdown(true);
        setBlacklist(response.data.blackList);
        const auxPhones = []
        response.data.data.forEach(phone => {
          auxPhones.push({ label: phone.slice(3, 13), value: phone.slice(3, 13) })
        });
        auxPhones.push({ label: '+ agregar', value: 0 })
        setPhones(auxPhones);
        if (auxPhones.length === 2) {
          setPhone(auxPhones[0].label)
        } else {
          setPhone(null);

        }

        if (response.data.blackList && response.data.blackList.length > 0) {
          setModal3Visible(true)
        }
      }
    } catch (err) {
      Sentry.captureException(err)
      // console.log(err)
      // console.log(err?.response)
      setExistingUser(false);
      setShowDropdown(false);
      setShowPhoneInput(true);
    }
  }

  async function findMensualityPlate() {
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        const response = await instance.post(
          FIND_MENSUALITY_PLATE,
          {
            plate: plateOne + plateTwo,
            type: "full"
          },
          { timeout: TIMEOUT }
        )
        setMensualityExists(true);
        setMensuality(response.data)
        if (response.data.data[0].capacity === response.data.data[0].parkedPlatesList.length) {
          setMaxCapMensuality(true);
        }
      }
    } catch (err) {
      Sentry.captureException(err)
      setMensualityExists(false);
      // console.log(err)
      // console.log(err?.response)
    }
  }

  async function getRecipsByPlate() {
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        const response = await instance.post(
          GET_RECIPS_BY_PLATE,
          {
            plate: plateOne + plateTwo,
            limit: 5
          },
          { timeout: TIMEOUT }
        )
        setHistoryExists(true)
        if (response.data.data[0].prepayFullDay) {
          setPrepayDayDateFinished(response.data.data[0].dateFinished)
          setPrepayDayRecip(true);
        } else {
          setPrepayDayDateFinished('');
          setPrepayDayRecip(false);
        }
        setTableData(response.data.data);
      }
    } catch (err) {
      Sentry.captureException(err)
      // console.log(err)
      // console.log(err?.response)
      setHistoryExists(false);
      setPrepayDayRecip(false);
    }
  }

  useEffect(() => {
    async function createUser() {
      try {
        if ((plateOne + plateTwo).length >= 5 && newPhone.length === 10) {
          const response = await instance.post(
            CREATE_USER,
            {
              phone: '+57' + newPhone,
              plate: plateOne + plateTwo,
              type: "starter"
            },
            { timeout: TIMEOUT }
          )
          setExistingUser(true);
        }
      } catch (err) {
        Sentry.captureException(err);
        if (err?.response.data.response === -1) {
          // User already exists 
          setExistingUser(true);
        }
        // console.log(err)
        // console.log(err?.response)
      }
    }
    createUser();
  }, [newPhone]);

  async function startPark() {
    setLoadingStart(true);
    try {
      if ((plateOne + plateTwo).length >= 5) {
        let idempotencyKey = createIdempotency(uid.uid)
        let type
        if (isCharacterALetter(plateTwo[2]) || plateTwo.length === 2) {
          type = "bike"
        } else {
          type = "car"
        }
        let change
        if ((totalPay - prepayDayValue) < 0) {
          change = 0
        } else {
          change = totalPay - prepayDayValue
        }
        const response = await instance.post(
          START_PARKING,
          {
            plate: plateOne + plateTwo,
            hqId: officialHq,
            dateStart: new Date(),
            phone: !showPhoneInput ? phone : '+57' + newPhone,
            prepayFullDay: prepayDay,
            officialEmail: officialEmail,
            type,
            cash: Number(totalPay),
            change: change
          },
          {
            headers: {
              "x-idempotence-key": idempotencyKey
            }, timeout: TIMEOUT
          }
        )
        setPhones([{ label: 'Selecciona un número', value: 1 }]);
        setLoadingStart(false);
        setPrepayDay(false);
        setPrepayDayValue(0);
        setTotalPay(0);
        setModalVisible(true);
        readHq();
      }
    } catch (err) {
      Sentry.captureException(err);
      setLoadingStart(false)
      // response -2 -> already parked
      // response -3 -> car parks full
      // response -4 -> bike parks full
      if (err?.response.data.response === -2) {
        setAlreadyParked(true);
        setModal2Visible(true);
      } else if (err?.response.data.response === -3) {
        setCarParksFull(true);
        setModal2Visible(true);
      } else if (err?.response.data.response === -4) {
        setBikeParksFull(true);
        setModal2Visible(true);
      } else {
        setErrorModalVisible(true)
      }
      // console.log(err)
      // console.log(err?.response)
    }
  };

  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      store.dispatch(actions.setReservations(response.data.data.reservations));
      store.dispatch(actions.setHq(response.data.data));
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err)
      // console.log(err?.response)
    }
  };

  const qrHandler = () => {
    restartSearch();
    clearPlateOne();
    clearPlateTwo();
    store.dispatch(actions.setQr(plateOne + plateTwo));
    navigation.navigate('QRscanner');
  }

  const plateHandler = () => {
    getRecipsByPlate();
    findUserByPlate();
    findMensualityPlate();
  }

  let inputChange = (totalPay - prepayDayValue) <= 0 ? '' : '' + (totalPay - prepayDayValue)

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/logoutStripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: "column" }} >
            <View style={styles.plateContainer}>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                placeholderTextColor={'#D9D9D9'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                onChangeText={(text) => {
                  setPlateOne(text.trim());
                  if (refPlateTwo && text.length === 3) {
                    refPlateTwo.current.focus();
                  };
                }}
                value={plateOne}
                onFocus={() => { clearPlateOne(); clearPlateTwo(); restartSearch(); }}
              />
              <TextInput
                ref={refPlateTwo}
                placeholder={'123'}
                placeholderTextColor={'#D9D9D9'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                keyboardType='default'
                onFocus={() => { clearPlateTwo(); restartSearch(); }}
                onChangeText={text => {
                  setPlateTwo(text.trim());
                  if (text.length === 3) {
                    if (plateOne.length === 3) Keyboard.dismiss()
                  };
                }}
                value={plateTwo}
                onEndEditing={plateHandler}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: width * 0.03, letterSpacing: 5 }}>
                INGRESE CELULAR
              </Text>
            </View>
            <View style={styles.dropdownContainer}>
              {!showPhoneInput ?
                <DropDownPicker
                  items={phones}
                  zIndex={150}
                  disabled={!showDropdown}
                  defaultValue={phone === null ? 1 : phone}
                  placeholder={phones.length >= 0 ? phones[0].phone : "Selecciona un número"}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedLabelStyle={styles.dropdownPlaceholder}
                  containerStyle={{ height: '6%', width: '100%' }}
                  style={styles.phoneDropdown}
                  labelStyle={styles.dropdownLabel}
                  dropDownMaxHeight={300}
                  dropDownStyle={styles.dropdown}
                  arrowColor={'#00A9A0'}
                  arrowStyle={styles.dropdownArrow}
                  arrowSize={24}
                  onChangeItem={item => {
                    if (item.value === 0) {
                      setShowPhoneInput(true)
                    } else {
                      setPhone(item.value)
                    }
                  }}
                  dropDownContainerStyle={{ position: "relative", top: 0 }}
                />
                :
                <TextInput
                  placeholder={'Ingrese celular'}
                  style={styles.textInput}
                  keyboardType='numeric'
                  textAlign='center'
                  maxLength={10}
                  onChangeText={text => {
                    setNewPhone(text);
                    if (text.length === 10) {
                      if (plateOne.length === 3 && plateTwo.length === 3)
                        Keyboard.dismiss()
                    }
                  }}
                  value={newPhone}
                />}
              <View style={styles.checkPrepayContainer}>
                <CheckBox
                  value={prepayDay}
                  onValueChange={() => setPrepayDay(!prepayDay)}
                  style={{ alignSelf: 'center' }}
                  tintColors={{ true: '#FFF200', false: '#FFF200' }}
                />
                <Text style={styles.prepayDayText}>PASE DIA</Text>
              </View>
              <View style={styles.startButtonContainer}>
                {!loadingStart &&
                  <Button onPress={() => { priceVehicleType(); }}
                    title="INICIAR"
                    color='#FFF200'
                    style={[!existingUser || plateOne === "" || plateTwo === "" ? styles.buttonIDisabled : styles.buttonI]}
                    textStyle={styles.buttonText}
                    disabled={!existingUser || plateOne === "" || plateTwo === ""}
                  />
                }
                {loadingStart && <ActivityIndicator size={"large"} color={'#FFF200'} />}
                {!loadingStart &&
                  <TouchableOpacity
                    style={[styles.buttonT, (plateOne + plateTwo).length < 5 ? styles.buttonTDisabled : styles.buttonT]}
                    onPress={qrHandler}
                    disabled={(plateOne + plateTwo).length < 5}
                  >
                    <Image style={styles.qrImage} resizeMode={"contain"} source={require('../../../assets/images/qr.png')} />
                  </TouchableOpacity>
                }

              </View>
              <View style={styles.containerTwo}>
                <View style={{ height: "90%", width: '90%', marginTop: '9%' }}>
                  <View style={{ width: '100%', alignItems: 'center' }}>
                    {mensualityExists ?
                      <View style={{ width: '100%', justifyContent: 'center' }}>
                        <Text style={{
                          fontFamily: 'Montserrat-Bold',
                          color: '#00A9A0',
                          fontSize: width * 0.027,
                          textAlign: 'center'
                        }}>{mensualityUserName}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                          <Text style={styles.menText}>Capacidad:</Text>
                          <Text style={styles.menText}>{' ' + mensualityCapacity}</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                          <Text style={styles.menText}>Placas parqueadas:</Text>
                          <Text style={styles.menText}>{' ' + mensualityParkedPlates}</Text>
                        </View>
                      </View>
                      :
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                      </View>
                    }
                    {prepayDayRecip ?
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.menText}> Vigencia pase día:   </Text>
                        <Text style={styles.menText}>
                          {prepayDayDateFinished != '' ? moment(prepayDayDateFinished).format('L') : ''} {prepayDayDateFinished != '' ? moment(prepayDayDateFinished).format('LT') : ''}
                        </Text>
                      </View>
                      :
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                      </View>
                    }
                  </View>
                  {historyExists ?
                    <View >
                      <View style={{ width: '96%', height: '10%', flexDirection: 'row', alignSelf: 'center', marginTop: '5%' }}>
                        <Text style={{ ...styles.titleText, marginLeft: '7%' }}>VEHÍCULOS</Text>
                        <Text style={{ ...styles.titleText, marginLeft: '20%' }}>FECHA</Text>
                        <Text style={{ ...styles.titleText, marginLeft: '20%' }}>ÚLTIMOS PAGOS</Text>
                      </View>
                      <FlatList
                        style={{ height: "70%" }}
                        data={tableData}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => {
                          if (index % 2 == 0) {
                            return (
                              // <TouchableOpacity
                              //   key={index.toString()}
                              //   onPress={() => {
                              //     setShowRecipModal(true);
                              //   }}
                              // >
                              <View style={{ ...styles.list, paddingTop: '3%', paddingBottom: '2%' }} >
                                <Text style={{ ...styles.infoText }}>{item.plate}</Text>
                                <Text style={{ ...styles.infoText }}>{moment(item.dateFinished).format('L')}</Text>
                                <Text style={{ ...styles.infoText }}>
                                  {item.cash === 0 && item.change === 0 ? '$0' : ''}
                                  {item.cash >= 0 && item.change < 0 ? `$${numberWithPoints(item.cash)}` : ''}
                                  {item.cash > 0 && item.change >= 0 ? `$${numberWithPoints(item.total)}` : ''}
                                  {!item.cash && !item.change ? `$${numberWithPoints(item.total)}` : ''}

                                </Text>
                              </View>
                              // </TouchableOpacity>

                            )
                          } else if (index % 2 !== 0) {
                            return (
                              // <TouchableOpacity
                              //   key={index.toString()}
                              //   onPress={() => {
                              //     setShowRecipModal(true);
                              //   }}
                              // >
                              <View style={{ ...styles.list, paddingTop: '3%', paddingBottom: '2%', backgroundColor: 'transparent' }} >
                                <Text style={{ ...styles.infoText }}>{item.plate}</Text>
                                <Text style={{ ...styles.infoText }}>{moment(item.dateFinished).format('L')}</Text>
                                <Text style={{ ...styles.infoText }}>
                                  {item.cash === 0 && item.change === 0 ? '$0' : ''}
                                  {item.cash >= 0 && item.change < 0 ? `$${numberWithPoints(item.cash)}` : ''}
                                  {item.cash > 0 && item.change >= 0 ? `$${numberWithPoints(item.total)}` : ''}
                                </Text>
                              </View>
                              // </TouchableOpacity>

                            )
                          }
                        }}
                      />
                    </View>
                    :
                    <View >
                    </View>
                  }
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <View style={{ height: '12%', width: '100%', justifyContent: 'flex-end' }}>
        <FooterIndex navigation={navigation} />
      </View>
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
              padding: '2%'
            }}>
              <View style={{
                margin: '4%',
                justifyContent: 'flex-end',
                height: ' 40%'
              }}>
                {carParksFull && <Text style={styles.modalTextAlert}> Las celdas para carros llegaron a su máxima capacidad. </Text>}
                {bikeParksFull && <Text style={styles.modalTextAlert}> Las celdas para motos llegaron a su máxima capacidad. </Text>}
                {alreadyParked && <Text style={styles.modalTextAlert}> Este vehículo ya se encuentra parqueado. </Text>}
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
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
      <CustomModal
        type='prepayAndStart'
        visible={modalVisible}
        prepayValue={`$${numberWithPoints(prepayDayValue)}`}
        prepayDay={prepayDay}
        plateOne={plateOne}
        plateTwo={plateTwo}
        phone={newPhone ? newPhone : phone}
        onClose={() => { restart(); }}
        onChangeTotalPay={text => setTotalPay(text)}
        totalPay={totalPay}
        prepayDayValue={prepayDayValue}
        change={`$${numberWithPoints(inputChange)}`}
        onStartPark={() => { startPark(); }}
        activityStatus={loadingStart}
      />
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
              padding: '2%'
            }}>
              <View style={{ margin: '4%', justifyContent: 'center', height: ' 60%' }}>
                <Text style={styles.modalText}> Este usuario se encuentra en lista negra:  </Text>
                <Text style={styles.modalText}>Deuda: {`$${numberWithPoints(blacklistValue)}`}</Text>
                <Text style={styles.modalText}>Fecha: {moment(blacklistDate).format('L')} {moment(blacklistDate).format('LT')}</Text>

              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModal3Visible(false);
                }}
                  title="E N T E N D I D O"
                  color="#00A9A0"
                  activityIndicatorStatus={loadingStart}
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
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={errorModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalText}> Algo malo pasó, inténtalo más tarde.  </Text>
              </View>
              <View style={{ height: '20%', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
                <Button onPress={() => {
                  restart();
                }}
                  title="E N T E N D I D O"
                  color="#00A9A0"
                  style={{
                    width: normalize(250),
                    height: '85%'
                  }}
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
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={maxCapMensuality}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'space-between', height: ' 65%' }}>
                <Text style={{ ...styles.modalText, fontFamily: 'Montserrat-Bold', color: '#00A9A0' }}> Alerta </Text>
                <Text style={{ ...styles.modalText, fontFamily: 'Montserrat-Medium', color: '#8F8F8F' }}> Las celdas disponibles para esta mensualidad ya están ocupadas. Al hacer el ingreso del vehículo se hará el cobro por horas. </Text>
                <Text style={{ ...styles.modalText, fontFamily: 'Montserrat-Medium', color: '#8F8F8F' }}> ¿ Desea continuar ? </Text>
              </View>
              <View style={{ height: '25%', width: '100%', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <Button onPress={() => {
                  setMaxCapMensuality(false);
                }}
                  title="S I"
                  color="#00A9A0"
                  style={{
                    width: '100%',
                    height: '60%'
                  }}
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Bold'
                  }} />
                <Button onPress={() => {
                  restart();
                }}
                  title="N O"
                  color="gray"
                  style={{
                    width: '100%',
                    height: '60%'
                  }}
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
    </View >
  );

}
const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  hq: state.hq,
  uid: state.uid
});

export default connect(mapStateToProps, actions)(UserInput);

