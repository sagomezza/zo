import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Alert, Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import Logout from '../Menu/MenuStyles';
import { TIMEOUT } from '../../config/constants/constants';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from "../../config/axios";
import { START_PARKING, FIND_USER_BY_PLATE, CREATE_USER, READ_HQ } from "../../config/api";
import store from '../../config/store';
import moment from 'moment';

const UserInput = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [modal2Visible, setModal2Visible] =useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [findUserByPlate, setFindUserByPlate] = useState([]);
  const [startParking, setStartParking] = useState({});
  const [phone, setPhone] = useState("");
  const [existingUser,setExistingUser] = useState(true)

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
          setPhone((response.data.data[0]).substring(3,12))
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

        if ((plateOne + plateTwo).length === 6 && phone.length === 10) {
          let type
          let body = {
            phone: '+57' + phone
          }
          if(findUserByPlate.length > 0){
            body = {
              ...body,
              type: "full",
              email: officialProps.email,
              name: officialProps.name,
              lastName: officialProps.lastName,
              expoToken: 'ExpoToken[fefe]'
            }
          } else {
            body = {
              ...body,
              plate: plateOne + plateTwo,
              type: "starter"
            }
          } 
          const response = await instance.post(
            CREATE_USER,
            body,
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
    <View style={{ flex: 1 }}>
      <Logout navigation={navigation} />
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: '10%' }}>
            <TextInput
              style={styles.plateInput}
              textAlign='center'
              maxLength={3}
              autoCapitalize={"characters"}
              onChangeText={text => setPlateOne(text)}
              value={plateOne}
            />
            <TextInput
              style={styles.plateInput}
              textAlign='center'
              maxLength={3}
              autoCapitalize={"characters"}
              keyboardType='default'
              onChangeText={text => 
                setPlateTwo(text)
              
              }
              value={plateTwo}
            />
          </View>

          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            textAlign='center'
            maxLength={10}
            onChangeText={text => setPhone(text)}
            value={phone}
          />
        </View>

        <View style={{ flexDirection: 'row-reverse', paddingBottom: '10%' }}>
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
      <FooterIndex navigation={navigation} />
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
              <Text> {findUserByPlate} </Text>
              <Text>Ha iniciado tiempo de parqueo</Text>
              <Text></Text>
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
  reservations: state.reservations
});

export default connect(mapStateToProps, actions)(UserInput);

