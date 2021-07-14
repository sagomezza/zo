import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { ImageBackground } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
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
  const [modal4Visible, setModal4Visible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [maxCapMensuality, setMaxCapMensuality] = useState(false);

  const [findUserByPlateInfo, setFindUserByPlateInfo] = useState([]);

  const userData = findUserByPlateInfo.fullData !== undefined ? findUserByPlateInfo.fullData[0] : "";
  const [blacklist, setBlacklist] = useState([]);
  let blacklistValue = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].value : 0;
  let blacklistDate = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].date : '';
  const [blacklistExists, setBlacklistExists] = useState(false);

  const [startParking, setStartParking] = useState({});
  const [existingUser, setExistingUser] = useState(false)
  const [debtBlacklist, setDebtBlacklist] = useState(0)

  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [codeError, setErrorText] = useState(false);

  const [phone, setPhone] = useState(null);
  const [phones, setPhones] = useState([{ label: 'Selecciona un número', value: 1 }]);
  const [showDropdown, setShowDropdown] = useState(false)
  const [newPhone, setNewPhone] = useState('');

  const refPhone = useRef(null);

  const [tableHead, setTableHead] = useState(['Vehículos', 'Fecha', 'Últimos pagos']);
  const [tableData, setTableData] = useState();

  const [historyInfo, setHistoryInfo] = useState([]);
  const [prepayDayDateFinished, setPrepayDayDateFinished] = useState('');
  const [prepayDayRecip, setPrepayDayRecip] = useState(false);
  const [historyExists, setHistoryExists] = useState(false);

  const [prepayDayValue, setPrepayDayValue] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mensuality, setMensuality] = useState({});
  const [mensualityExists, setMensualityExists] = useState(false);
  const mensualityInfo = mensuality.data !== undefined ? mensuality.data[0] : "";
  const mensualityUserName = mensualityInfo.userName !== undefined ? mensualityInfo.userName : ' ';
  const mensualityCapacity = mensualityInfo.capacity !== undefined ? mensualityInfo.capacity : ' ';
  const mensualityParkedPlates = mensualityInfo.parkedPlatesList !== undefined ? mensualityInfo.parkedPlatesList.length : ' ';

  const priceVehicleType = () => {
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

  // const findUserByPlate = async () => {
  //   if (plateOne.length === 3 && plateTwo.length >= 2) {
  //     firestore
  //       .collection("users")
  //       .where("plates", "array-contains", plateOne + plateTwo)
  //       .get()
  //       .then(snapshot => {
  //         if (snapshot.empty) {
  //           setFindUserByPlateInfo([]);
  //           setExistingUser(false);
  //           setShowDropdown(false);
  //           setShowPhoneInput(true);
  //         }
  //         firestore
  //           .collection("blacklist")
  //           .where("plate", "==", plateOne + plateTwo)
  //           .where('status', '==', 'active')
  //           .get()
  //           .then(snapshot => {
  //             if (snapshot.empty) {
  //               // No BL found: does nothing?
  //             }
  //             let bl = []
  //             snapshot.forEach(doc => {
  //               let data = doc.data()
  //               data.date = data.date.nanoseconds ? data.date.toDate() : data.date
  //               data.id = doc.id
  //               bl.push(data)
  //             })
  //             console.log("BLACKLIST FS", bl)
  //               .then(blRes => {
  //                 let users = []
  //                 let fullData = []
  //                 snapshot.forEach(doc => {
  //                   let data = doc.data()
  //                   users.push(data.phone)
  //                   data.id = doc.id
  //                   fullData.push(data)
  //                 });
  //                 console.log("USERS FS", users)
  //                 console.log("FULLDATA FS", fullData)
  //               })
  //               .catch(err => {
  //                 if (err.response && err.response === -1) {
  //                   let users = []
  //                   let fullData = []
  //                   snapshot.forEach(doc => {
  //                     let data = doc.data()
  //                     users.push(data.phone)
  //                     data.id = doc.id
  //                     fullData.push(data)
  //                   });
  //                 } else {
  //                   // how to treat 
  //                 }
  //               })
  //           })

  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }

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
        setFindUserByPlateInfo(response.data);
        setExistingUser(true)
        setPhone(null);
        setShowPhoneInput(false);
        setShowDropdown(true);
        setBlacklist(response.data.blackList);
        const auxPhones = []
        response.data.data.forEach(phone => {
          auxPhones.push({ label: phone, value: phone })
        });
        auxPhones.push({ label: '+ agregar', value: 0 })
        setPhones(auxPhones);

        if (response.data.blackList && response.data.blackList.length > 0) {
          setModal3Visible(true)
        }
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
      setFindUserByPlateInfo([]);
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
        setHistoryInfo(response.data.data)
        if (response.data.data[0].prepayFullDay) {
          setPrepayDayDateFinished(response.data.data[0].dateFinished)
          setPrepayDayRecip(true);
        } else {
          setPrepayDayDateFinished('');
          setPrepayDayRecip(false);
        }
        const auxTable = []
        response.data.data.forEach(element => {
          const auxElement = []
          auxElement.push(element.plate)
          auxElement.push(moment(element.dateFinished).format('L'))
          auxElement.push(`$${numberWithPoints(element.total)}`)
          auxTable.push(auxElement)
        });
        setTableData(auxTable);
      }
    } catch (err) {
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
        if (err?.response.data.response === -1) {
          // User already exists 
          setExistingUser(true);
        }
        console.log(err)
        console.log(err?.response)
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
        setStartParking(response?.data?.data);
        setPhones([{ label: 'Selecciona un número', value: 1 }]);
        setBlacklistExists(false);
        setLoadingStart(false);
        setPrepayDay(false);
        setPrepayDayValue(0);
        setTotalPay(0);
        setModalVisible(true);
        readHq();
      }
    } catch (err) {
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
      console.log(err)
      console.log(err?.response)
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
      console.log(err)
      console.log(err?.response)
    }
  };

  let inputChange = (totalPay - prepayDayValue) <= 0 ? '' : '' + (totalPay - prepayDayValue)

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/Stripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.containerOne}>
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
                onEndEditing={() => {
                  getRecipsByPlate();
                  findUserByPlate();
                  findMensualityPlate();
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{
                fontFamily: 'Montserrat-Bold',
                color: '#FFFFFF',
                fontSize: width * 0.03
              }}>
                I  N  G  R  E  S  E     C  E  L  U  L  A  R
              </Text>
            </View>
            <View style={styles.dropdownContainer}>
              {!showPhoneInput ?
                <DropDownPicker
                  items={phones}
                  zIndex={80}
                  disabled={!showDropdown}
                  defaultValue={phone === null ? 1 : phone}
                  placeholder={"Selecciona un número"}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedLabelStyle={styles.dropdownPlaceholder}
                  containerStyle={{ height: '23%', width: '100%' }}
                  style={styles.phoneDropdown}
                  labelStyle={styles.dropdownLabel}
                  dropDownMaxHeight={100}
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
                /> :
                <TextInput
                  placeholder={''}
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
              {codeError && <Text>{codeError}</Text>}
              <View style={styles.checkPrepayContainer}>
                <CheckBox
                  value={prepayDay}
                  onValueChange={() => setPrepayDay(!prepayDay)}
                  style={{ alignSelf: 'center' }}
                  tintColors={{
                    true: '#FFF200',
                    false: '#FFF200'
                  }}
                />
                <Text style={styles.prepayDayText}>
                  PASE DIA
                </Text>
              </View>


              <View style={styles.startButtonContainer}>
                {!loadingStart &&
                  <Button onPress={() => {
                    priceVehicleType();
                  }}
                    title="I N I C I A R"
                    color='#FFF200'
                    style={[!existingUser || plateOne === "" || plateTwo === "" ?
                      styles.buttonIDisabled
                      :
                      styles.buttonI
                    ]}
                    textStyle={styles.buttonText}
                    disabled={!existingUser || plateOne === "" || plateTwo === ""}
                  />
                }
                {loadingStart && <ActivityIndicator size={"large"} color={'#FFF200'} />}
                {!loadingStart &&
                  <TouchableOpacity
                    style={[styles.buttonT, (plateOne + plateTwo).length < 5 ? styles.buttonTDisabled : styles.buttonT]}
                    onPress={() => {
                      restartSearch();
                      clearPlateOne();
                      clearPlateTwo();
                      store.dispatch(actions.setQr(plateOne + plateTwo));
                      navigation.navigate('QRscanner');
                    }}
                    disabled={(plateOne + plateTwo).length < 5}
                  >
                    <Image
                      style={styles.qrImage}
                      resizeMode={"contain"}
                      source={require('../../../assets/images/qr.png')}
                    />
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.containerTwo}>
            <View style={styles.infoContainer}>
              <View style={{ height: "90%", width: '90%' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  {mensualityExists ?
                    <View style={{
                      width: '100%',
                      justifyContent: 'center'
                    }}>
                      <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: '#00A9A0',
                        fontSize: width * 0.027,
                        textAlign: 'center'
                      }}>{mensualityUserName}</Text>
                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>
                        <Text style={styles.infoText}>
                          Capacidad:
                        </Text>

                        <Text style={styles.infoText}>
                          {' ' + mensualityCapacity}
                        </Text>
                      </View>
                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>
                        <Text style={styles.infoText}>
                          Placas parqueadas:
                        </Text>

                        <Text style={styles.infoText}>
                          {' ' + mensualityParkedPlates}
                        </Text>
                      </View>
                    </View>
                    :
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    </View>
                  }
                  {prepayDayRecip ?
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                      <Text style={styles.infoText}> Vigencia pase día:   </Text>
                      <Text style={styles.infoText}>
                        {prepayDayDateFinished != '' ? moment(prepayDayDateFinished).format('L') : ''} {prepayDayDateFinished != '' ? moment(prepayDayDateFinished).format('LT') : ''}
                      </Text>
                    </View>
                    :
                    <View style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center'
                    }}>
                    </View>
                  }
                </View>
                {historyExists ?
                  <Table borderStyle={{ borderColor: '#00A9A0' }}>
                    <Row
                      data={tableHead}
                      style={styles.head}
                      textStyle={styles.headText}
                    />
                    <Rows
                      data={tableData}
                      textStyle={styles.text}
                    />
                  </Table>
                  :
                  <Table borderStyle={{ borderColor: '#00A9A0' }}>
                    <Row
                      data={tableHead}
                      style={styles.head}
                      textStyle={styles.headText}
                    />

                  </Table>
                }
              </View>
            </View>
            <View style={{ height: '20%', width: '100%', justifyContent: 'flex-end' }}>
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
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        {prepayDay ?
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
                padding: '2%'

              }}>
                <View style={{ margin: '4%', justifyContent: 'center', height: ' 30%' }}>
                  <Text style={styles.modalTextAlert}>
                    Cobrar pase día
                  </Text>
                  <Text style={styles.modalTextAlert}>
                    {`$${numberWithPoints(prepayDayValue)}`}
                  </Text>
                </View>
                <View style={{
                  justifyContent: 'space-between',
                  height: '40%',
                  flexDirection: 'column',
                  paddingBottom: '6%'
                }}>
                  <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                    <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Pago:  </Text>
                    <CurrencyInput
                      placeholder='$'
                      textAlign='center'
                      keyboardType='numeric'
                      style={styles.currencyInput}
                      value={totalPay}
                      onChangeValue={text => setTotalPay(text)}
                      prefix="$"
                      delimiter="."
                      separator="."
                      precision={0}
                      onChangeText={(formattedValue) => {
                        // console.log(formattedValue);
                        // $2,310.46
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                    <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}> A devolver:  </Text>
                    <TextInput
                      style={styles.currencyInput}
                      keyboardType='numeric'
                      placeholder='$'
                      textAlign='center'
                      editable={false}
                      value={`$${numberWithPoints(inputChange)}`}
                    />
                  </View>
                </View>
                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    startPark();
                  }}
                    title="G U A R D A R"
                    color="#00A9A0"
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }}
                    style={[totalPay - prepayDayValue < 0 ? styles.modalButtonDisabled : styles.modalButton]}
                    disabled={totalPay - prepayDayValue < 0}
                    activityIndicatorStatus={loadingStart} />
                </View>
              </View>
            </View>
          </View>
          :
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                padding: '2%'
              }}>
                <Text style={{
                  fontSize: normalize(51),
                  textAlign: 'center',
                  color: '#00A9A0',
                  fontFamily: 'Montserrat-Bold'
                }}>
                  {plateOne + ' ' + plateTwo}
                </Text>

                <View style={{ height: '10%', width: '75%', backgroundColor: '#FFF200', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={styles.modalPhoneText}> {newPhone ? '+' + newPhone : phone} </Text>
                </View>
                <View style={{ height: '35%', width: '75%', justifyContent: 'center' }}>
                  <Image
                    style={{ alignSelf: 'center', width: '50%', height: '50%' }}
                    resizeMode={'contain'}
                    source={require('../../../assets/images/Clock.png')} />
                </View>
                <View style={{ height: '15%', width: '76%', justifyContent: 'center' }}>
                  <Text style={styles.modalText}>Ha iniciado el parqueo </Text>
                  <Text style={styles.modalText}> Hora: {moment().format('LT')}</Text>
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
        }
      </Modal>
      <Modal
        animationType="fade"
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
                <Text style={styles.modalTextAlert}> Este usuario se encuentra en lista negra:  </Text>
                <Text style={styles.modalTextAlert}>Deuda: {`$${numberWithPoints(blacklistValue)}`}</Text>
                <Text style={styles.modalTextAlert}>Fecha: {moment(blacklistDate).format('L')} {moment(blacklistDate).format('LT')}</Text>

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
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={errorModalVisible}
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
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={maxCapMensuality}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'space-between', height: ' 65%' }}>
                <Text style={{ ...styles.modalTextAlert, fontFamily: 'Montserrat-Bold' }}> Alerta </Text>
                <Text style={{ ...styles.modalText, fontFamily: 'Montserrat-Bold', color: '#8F8F8F' }}> Las celdas disponibles para esta mensualidad ya están ocupadas. Al hacer el ingreso del vehículo se hará el cobro por horas. </Text>
                <Text style={{ ...styles.modalText, fontFamily: 'Montserrat-Bold', color: '#8F8F8F' }}> ¿ Desea continuar ? </Text>
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

