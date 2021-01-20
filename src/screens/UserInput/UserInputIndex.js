import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  Image,
  ActivityIndicator,
  CheckBox
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import { TIMEOUT } from '../../config/constants/constants';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from "../../config/axios";
import { START_PARKING, FIND_USER_BY_PLATE, CREATE_USER, READ_HQ, GET_RECIPS_BY_PLATE } from "../../config/api";
import store from '../../config/store';
import moment from 'moment';
import Button from '../../components/Button';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Keyboard } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import MainDrawer from '../../navigators/MainDrawer/MainDrawer';
// import Feather from "react-native-feather";
import DropDownPicker from 'react-native-dropdown-picker';
import numberWithPoints from '../../config/services/numberWithPoints';
import { Table, Row, Rows } from 'react-native-table-component';



const UserInput = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const officialEmail = officialProps.email;
  const [loadingStart, setLoadingStart] = useState(false);
  const [prepayDay, setPrepayDay] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [findUserByPlateInfo, setFindUserByPlateInfo] = useState([]);
  const userData = findUserByPlateInfo.fullData !== undefined ? findUserByPlateInfo.fullData[0] : "";
  const [blacklist, setBlacklist] = useState([]);
  const [blacklistExists, setBlacklistExists] = useState(false);
  const [startParking, setStartParking] = useState({});
  const [existingUser, setExistingUser] = useState(false)
  const [findMensualityPlate, setFindMensualityPlate] = useState([])
  const [debtBlacklist, setDebtBlacklist] = useState(0)
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [codeError, setErrorText] = useState(false);

  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');

  const [phone, setPhone] = useState(1);
  const [phones, setPhones] = useState([{ label: 'Selecciona un número', value: 1 }]);
  const [showDropdown, setShowDropdown] = useState(false)
  const [newPhone, setNewPhone] = useState('');
  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const refPhone = useRef(null);

  const [tableHead, setTableHead] = useState(['Vehículos', 'Fecha', 'Últimos pagos'])
  const [tableData, setTableData] = useState(
  //   [
  //   ['EVT 123', '9/11/2020', '$9.600'],
  //   ['EVT 123', '9/11/2020', '$9.600'],
  //   ['EVT 123', '9/11/2020', '$9.600'],
  //   ['EVT 123', '9/11/2020', '$9.600'],
  //   ['EVT 123', '9/11/2020', '$9.600']
  // ]
  )
  const [historyInfo, setHistoryInfo] = useState([])

  const clearPlateOne = () => {
    setPlateOne('');
  }
  const clearPlateTwo = () => {
    setPlateTwo('');
  }

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }



  useEffect(() => {
    async function findUserByPlate() {
      try {
        if (plateOne.length === 3 && plateTwo.length === 3) {
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
          // {label: 'UK', value: 'uk'},
          setPhone(1);
          setShowPhoneInput(false);
          setShowDropdown(true);
          setBlacklist(response.data.fullData[0].blackList);

          const auxPhones = []
          response.data.data.forEach(phone => {
            auxPhones.push({ label: phone, value: phone })
          });
          auxPhones.push({ label: '+ agregar', value: 0 })
          setPhones(auxPhones);
          // if (response.data.blackList.length > 0) {
          //   setModal3Visible()
          // } 
        }

      } catch (err) {
        console.log(err?.response)
        console.log('dentro')
        setFindUserByPlateInfo([]);
        setExistingUser(false);
        setShowDropdown(false);
        setShowPhoneInput(true);
      }
    }

    async function getRecipsByPlate() {
      try {
        if (plateOne.length === 3 && plateTwo.length === 3) {
          const response = await instance.post(
            GET_RECIPS_BY_PLATE,
            {
              plate: plateOne + plateTwo,
              limit: 5
            },
            { timeout: TIMEOUT }
          )
          setHistoryInfo(response.data.data)
          console.log(response.data.data)
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
        console.log(err)
        console.log(err?.response)
        console.log('dentro')
      }
    }
    getRecipsByPlate()
    findUserByPlate()
  }, [plateOne, plateTwo]);

  useEffect(() => {
    async function createUser() {
      try {
        if ((plateOne + plateTwo).length === 6 && newPhone.length === 10) {

          const response = await instance.post(
            CREATE_USER,
            {
              phone: '+57' + newPhone,
              plate: plateOne + plateTwo,
              type: "starter"
            },
            { timeout: TIMEOUT }
          )
        }
        setExistingUser(true);
      } catch (err) {
        console.log(err)
        console.log(err?.response)
      }
    }
    createUser();
  }, [newPhone]);

  async function startPark() {
    try {
      if ((plateOne + plateTwo).length === 6) {
        let type
        if (isCharacterALetter(plateTwo[2])) type = "bike"
        else type = "car"

        const response = await instance.post(
          START_PARKING,
          {
            plate: plateOne + plateTwo,
            hqId: officialHq,
            dateStart: new Date(),
            phone: !showPhoneInput ? phone : '+57' + newPhone,
            prepayFullDay: prepayDay,
            officialEmail: officialEmail,
            type
          },
          { timeout: TIMEOUT }
        )
        setModalVisible(true);
        setStartParking(response.data.data);
        setBlacklistExists(false);
        readHq();
        setLoadingStart(false)
        setPhones([{ label: 'Selecciona un número', value: 1 }]);
        if (isCharacterALetter(plateTwo[2])) {
          store.dispatch(actions.addBike());
        } else {
          store.dispatch(actions.addCar());
        }

      }
    } catch (err) {
      setLoadingStart(false)
      if (err?.response.data.response === -2) setModal2Visible(true)
      console.log(err)
      console.log(err?.response)

    }
  };
  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if (response.data.response) {
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
    }
  };



  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: normalize(450),
          flexDirection: 'column'
        }}
        source={require('../../../assets/images/Stripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ height: normalize(315), alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '20%', width: '60%', marginTop: '2%' }}>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                placeholderTextColor={'#D9D9D9'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                onChangeText={(text) => {
                  setPlateOne(text);
                  if (refPlateTwo && text.length === 3) {
                    refPlateTwo.current.focus();
                  }
                  ;
                }}
                value={plateOne}
                onFocus={() => { clearPlateOne(); clearPlateTwo(); }}
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
                onFocus={() => { clearPlateTwo(); }}
                onChangeText={text => {
                  setPlateTwo(text);
                  if (text.length === 3) {
                    if (plateOne.length === 3) Keyboard.dismiss()
                  };
                }}
                value={plateTwo}
              />
            </View>
            <View style={{ alignItems: 'center', alignContent: 'center', height: '10%', width: '100%' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: normalize(21) }}>I  N  G  R  E  S  E     C  E  L  U  L  A  R</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', zIndex: 10, height: '62%', width: '60%' }}>
              {!showPhoneInput ?
                <DropDownPicker
                  items={phones}
                  zIndex={30}
                  disabled={!showDropdown}
                  placeholder={"Selecciona un numero"}
                  placeholderStyle={{ color: '#8F8F8F', fontSize: normalize(25), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}
                  selectedLabelStyle={{ color: '#8F8F8F', fontSize: normalize(25), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}
                  containerStyle={{
                    height: '23%', width: '100%'
                  }}
                  style={{
                    backgroundColor: '#fafafa',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20

                  }}
                  labelStyle={{
                    justifyContent: 'center', fontFamily: 'Montserrat-Bold', fontSize: normalize(20), color: '#D9D9D9'
                  }}
                  dropDownMaxHeight={100}
                  dropDownStyle={{
                    backgroundColor: '#fafafa', borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                  }}
                  arrowColor={'#00A9A0'}
                  arrowStyle={{ alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' }}
                  arrowSize={24}
                  onChangeItem={item => {
                    if (item.value === 0) {
                      setShowPhoneInput(true)
                    } else {
                      setPhone(item.value)
                    }
                  }
                  }
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
                      if (plateOne.length === 3 && plateTwo.length === 3) Keyboard.dismiss()
                    }
                  }}
                  value={newPhone}
                />}
              {codeError && <Text>{codeError}</Text>}
              <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '30%', width: '60%', justifyContent: 'center', paddingTop: '10%' }}>
                <CheckBox
                  value={prepayDay}
                  onValueChange={() => setPrepayDay(!prepayDay)}
                  style={styles.checkbox}
                  tintColors={{ true: '#FFF200', false: 'transparent' }}
                />
                <Text style={{ color: '#FFF200', fontFamily: 'Montserrat-Bold', fontSize: normalize(19), textAlign: 'center' }}>PASE DIA</Text>
              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '40%', width: '100%', justifyContent: 'center' }}>
                {!loadingStart &&
                  <Button onPress={() => {
                    setLoadingStart(true); startPark();

                  }}
                    title="I N I C I A R"
                    color='#FFF200'
                    style={[!existingUser || plateOne === "" || plateTwo === "" ? styles.buttonIDisabled : styles.buttonI]}
                    textStyle={styles.buttonText}
                    disabled={!existingUser || plateOne === "" || plateTwo === ""}

                  />
                }
                {loadingStart && <ActivityIndicator size={"large"} color={'#FFF200'} />}
                {!loadingStart &&
                  <TouchableOpacity
                    style={[styles.buttonT, (plateOne + plateTwo).length < 6 ? styles.buttonTDisabled : styles.buttonT]}
                    onPress={() => {
                      setLoadingStart(true);
                      setPlateOne("");
                      setPlateTwo("");
                      setPhone("");
                      setShowPhoneInput(false);
                      setLoadingStart(false);
                      store.dispatch(actions.setQr(plateOne + plateTwo));
                      navigation.navigate('QRscanner');

                    }}
                    disabled={(plateOne + plateTwo).length < 6}
                  >
                    <Image style={styles.qrImage} resizeMode={"contain"} source={require('../../../assets/images/qr.png')} />
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{
            height: normalize(492),
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ height: '70%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '6%', borderRadius: 10, alignItems: 'center' }}>
              <View style={{ marginTop: '3%', height: '26%', width: '90%', alignContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Text style={styles.textListTitle} >{userData.name}  {userData.lastName}</Text>
                <View style={{ flexDirection: 'row', height: '28%', marginTop: '1%' }}>
                  <Text style={styles.textList} >Mensualidad hasta </Text>
                  <View style={{ marginLeft: '1%', backgroundColor: '#FFF200', borderRadius: 30, width: '25%', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textListDate} >---</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: "60%", width: '95%' }}>
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
              </View>
            </View>
            <View style={{ height: '23%', width: '100%', justifyContent: 'flex-end'}}>
              <FooterIndex navigation={navigation} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <View>
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
              <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
                padding: '2%'

              }}>
                <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                  <Text style={styles.modalTextAlert}> Este vehículo ya se encuentra parqueado. </Text>
                </View>
                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setPlateOne("");
                    setPlateTwo("");
                    setNewPhone("");
                    setLoadingStart(false);
                    setPhone(1);
                    setShowDropdown(false);
                    setShowPhoneInput(false);
                    setPrepayDay();
                    setPhones([{ label: 'Selecciona un número', value: 1 }]);
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
      </View>
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
                  setModalVisible(!modalVisible);
                  setPlateOne("");
                  setPlateTwo("");
                  setNewPhone("");
                  setPhones([{ label: 'Selecciona un número', value: 1 }]);
                  setPhone(1);
                  setShowDropdown(false);
                  setShowPhoneInput(false);
                  setPrepayDay();
                  setShowPhoneInput(false);
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
        visible={modal3Visible}
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
                <Text style={styles.modalTextAlert}> Este usuario se encuentra en lista negra  </Text>
                {/* <Text style={styles.modalTextAlert}>{`$${numberWithPoints(debt)}`}</Text> */}

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
    </View >
  );

}
const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
});

export default connect(mapStateToProps, actions)(UserInput);

