import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, TouchableWithoutFeedback, Alert, Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import { TIMEOUT } from '../../config/constants/constants';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from "../../config/axios";
import { START_PARKING, FIND_USER_BY_PLATE, CREATE_USER, READ_HQ } from "../../config/api";
import store from '../../config/store';
import moment from 'moment';
import Button from '../../components/Button';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Keyboard } from 'react-native';
// import Feather from "react-native-feather";


const UserInput = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  const [modal2Visible, setModal2Visible] =useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [findUserByPlate, setFindUserByPlate] = useState([]);
  const [startParking, setStartParking] = useState({});
  const [existingUser,setExistingUser] = useState(true)
  const [codeError, setErrorText] = useState(false);


  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [phone, setPhone] = useState('');

  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const refPhone = useRef(null);
  
  const clearPlateOne = () => {
    setPlateOne('');
  }
  const clearPlateTwo = () => {
    setPlateTwo('');
  }
  const clearPhone = () => {
    setPhone('');
  }

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

  useEffect(() => {
    async function findUserByPlate() {
      try {
        if ((plateOne + plateTwo).length === 6) {
          
          const response = await instance.post(
            FIND_USER_BY_PLATE,
            { plate: plateOne + plateTwo },
            { timeout: TIMEOUT }
          )
          setFindUserByPlate(response.data.data);
          setExistingUser(false)
          setPhone((response.data.data[0]).substring(3,13))
        } else {
          setPhone("")
        }
      } catch (err) {
        console.log(err?.response)
      }
      
    }
    findUserByPlate()
  }, [plateOne, plateTwo]);

  useEffect(() => {
    async function createUser() {
      try {
        if ((plateOne + plateTwo).length === 6 && phone.length === 10 && findUserByPlate.length === 0) {
            
            const response = await instance.post(
              CREATE_USER,
              {
                phone: '+57' + phone,
                plate: plateOne + plateTwo,
                type: "starter"
              },
              { timeout: TIMEOUT }
            )
            setExistingUser(false)
        }
      } catch (err) {
        console.log(err?.response)
      }
    }
    createUser()
  }, [phone]);

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
            phone: '+57' + phone,
            type
          },
          { timeout: TIMEOUT }
        )
        setModalVisible(true);
        setStartParking(response.data.data);
        readHq();
        
        if (isCharacterALetter(plateTwo[2])){
          store.dispatch(actions.addBike());
        } else {
          store.dispatch(actions.addCar());
        } 

      }
    } catch (err) {
      if(err?.response.data.response === -2) setModal2Visible(true)
      
      console.log(err?.response)
    }
  };


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

  
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{heigth: '14%'}} >
      <Button onPress={()=> navigation.navigate("Logout")} 
              title="Cerrar sesión" 
              color="transparent" 
              style={{ borderWidth:1, 
                       borderColor: "#008999", 
                       alignSelf: 'flex-end',
                       width: '30%',
                       heigth: '10%',
                       marginRight:'5%',
                       marginTop:'6%',
                       paddingHorizontal: '2%'
                      }} 
              textStyle={{color: "#008999"}} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      

        <View style={{ alignItems: 'center', height: '50%', flexDirection: 'column'}}>
          <View style={{ alignItems: 'center', flexDirection: 'column'}} >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', paddingBottom: '10%', height: '40%', width: '100%' }}>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                onChangeText={(text) => {setPlateOne(text);
                                        if(refPlateTwo && text.length === 3 ){
                                            refPlateTwo.current.focus();
                                        }
                                        ;
                }}
                value={plateOne}
                onFocus= {() => {clearPlateOne(); clearPlateTwo(); clearPhone();}}
              />
              <TextInput
                ref={refPlateTwo}
                placeholder={'123'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                keyboardType='default'
                onFocus={() => {clearPlateTwo(); clearPhone();}}
                onChangeText={text => 
                  {setPlateTwo(text);
                    if(refPhone && text.length === 3 ){
                      refPhone.current.focus();
                  };
                  }}
                value={plateTwo}
              />
            </View>
          {/* <View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', paddingBottom: '0%', height: '35%', width: '100%' }}>
            <TextInput
            ref={refPhone}
            placeholder={'Ingrese celular'}
            style={styles.textInput}
            keyboardType='numeric'
            textAlign='center'
            maxLength={10}
            onFocus={() => { clearPhone()}}
            onChangeText={text => {setPhone(text);
                                   if(text.length === 10){
                                     if (plateOne.length === 3 && plateTwo.length === 3)Keyboard.dismiss()
                                   }}}
            value={phone}
            />
          </View>
          </View>
            {/* <TouchableOpacity
              style={{ height: "100%", justifyContent: "center" }}
              onPress={() => {setText("")}}
            >
             <Feather style={styles.closeIconStyle} name="x" />
            </TouchableOpacity>

          </View> */}
          
        
        {codeError && <Text>{codeError}</Text>}

        <View style={{ flexDirection: 'row-reverse', paddingBottom: '10%', height:'50%' }}>
          <View style={{ marginRight: 20 }}>
                <TouchableOpacity
                  style={styles.buttonI}
                  disabled={existingUser}
                  onPress={() => {
                    startPark();
                    
                  }}
                >
                  <Text style={styles.buttonText} >Inicio</Text>
                </TouchableOpacity>
          </View>
          
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity style={styles.buttonT} 
                              onPress={() => { 
                                setPlateOne("");
                                setPlateTwo("");
                                setPhone("");
                                store.dispatch(actions.setQr(plateOne + plateTwo));
                                navigation.navigate('QRscanner') }}
                                disabled={(plateOne+plateTwo).length < 6}>
              <Image style={{width: 30, height: 30, marginTop: 8}} source={require('../../../assets/images/GrupoQR.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        </View>

        {/* <View style={{ alignItems: 'center' }}>
          {isBlackList ? <Text style={{ fontFamily: 'Montserrat-Regular' }}>Blacklist: </Text> : ''}


          <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12 }}>{"Mensualidad hasta " + dateMonth}</Text>
        </View> */}
        {/* <View>
          <Table >
            <Row data={state.Table} style={styles.HeadStyleTable} textStyle={styles.tableText} />
            <Rows data={state.DataTable} textStyle={styles.tableText} />
          </Table>
        </View> */}

      </View>
      </TouchableWithoutFeedback>
      <View>
      <FooterIndex navigation={navigation} />
      </View>
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
                        <View style={{ marginBottom: '7%', alignItems: 'center' }}>
                        <Text style={styles.modalText}> El vehículo con placas {plateOne + ' ' + plateTwo} ya se encuentra estacionado. </Text>
                        </View>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                        onPress={() => {
                            setModal2Visible(!modal2Visible);
                            setPlateOne("");
                            setPlateTwo("");
                            setPhone("");
                        }}
                        >
                        <Text style={styles.textStyle}>Entendido</Text>
                        </TouchableHighlight>
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
            <View style={{ marginBottom: '7%', alignItems: 'center' }}>
              <Text style={styles.modalText}> {plateOne + ' ' + plateTwo} </Text>
              <Text style={styles.modalText}>Ha iniciado el parqueo </Text>
              <Text style={styles.modalText}> Celular: {phone} </Text>
              <Text style={styles.modalText}> Hora: {moment().format('LT')}</Text>
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setPlateOne("");
                setPlateTwo("");
                setPhone("");
                
              }}
            >
              <Text style={styles.textStyle}>Entendido</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );

}
const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
});

export default connect(mapStateToProps, actions)(UserInput);

