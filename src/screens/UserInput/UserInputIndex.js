import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Alert, Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import Logout from '../Menu/MenuStyles';
import Axios from 'axios';
import { API } from '../../config/constants/api';
import { TIMEOUT } from '../../config/constants/constants';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from "../../config/axios";
import { START_PARKING, FIND_USER_BY_PLATE } from "../../config/api";

const UserInput = (props) => {
  const { navigation, officialProps } = props;
  //console.log("officialProps: ", officialProps);
  const officialHq = officialProps.official.hq !== undefined ? officialProps.official.hq[0] : "";

  const isBlackList = true;
  const dateMonth = '--';
  const state = {
    HeadTable: ['Vehículos', 'Últimos pagos'],
    DataTable: [
      ['EVT 123', '09/11/2020 $9600'],

    ]
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [findUserByPlate, setFindUserByPlate] = useState([]);
  const [startParking, setStartParking] = useState({});
  const [iniciar, setIniciar] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)

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
        }
      } catch (err) {
        console.log(err?.response)
      }
    }
    findUserByPlate()
  }, [plateOne, plateTwo]);

  async function startPark() {
    setLoading(true)
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
        setIniciar(1);
        setStartParking(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err?.response)
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
            style={styles.numberInput}
            keyboardType='numeric'
            textAlign='center'
            maxLength={10}
            onChangeText={text => setPhone(text)}
            value={phone}
          />
        </View>

        <View style={{ flexDirection: 'row-reverse', paddingBottom: '10%' }}>
          <View style={{ marginRight: 20 }}>
            {
              loading ?
                <ActivityIndicator />
                : <TouchableOpacity
                  style={styles.buttonI}
                  onPress={() => {
                    startPark();
                  }}
                >
                  <Text style={styles.buttonText} >Inicio</Text>
                </TouchableOpacity>
            }
          </View>
          
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity style={styles.buttonT} onPress={() => { navigation.navigate('QRscanner') }}>
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
              <Text>{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
              onPress={({navigation}) => {
                setModalVisible(!modalVisible);
                setPlateOne("");
                setPlateTwo("");
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
  officialProps: state.official
});

export default connect(mapStateToProps, actions)(UserInput);

