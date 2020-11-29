import React, {useState} from 'react';
import { StyleSheet, Button, View, Modal,TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
// import moment from 'moment';
import FooterIndex from '../../components/Footer/index';
import Logout from '../Menu/MenuStyles';
import { connect } from "react-redux";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { MARKEXIT, FINISHPARKING } from '../../config/api'

const UserOut = (props) => {
 const { navigation } = props;
  // const dateMonthIn = new Date('05/05/20');
  // const dateMonthOut = new Date('07/05/20');

  const [totalAmount, setTotalAmount] = useState(39000);
  const [totalPay, setTotalPay] = useState(0);
  const [totalPayModal, setTotalPayModal] = useState(0);
  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [isEditable, setIsEditable] = useState(true);

  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      paddingLeft: '15%',
      paddingRight: '15%',
      paddingTop: '2%',
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
    miniButtonMoney:{
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
      borderRadius:20,
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
      borderWidth:1
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
  return (
    <View style={{flex: 1}}>
      <Logout navigation={navigation}/> 
      <View style={styles.container}>
        <TouchableOpacity 
                style={
                  {borderRadius: 20,
                  alignItems: 'center',
                  height: 50,
                  width:50,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: 'gray'}}   
                onPress={() => {navigation.navigate('QRscanner')}}>
                {/* <Image source={require('./assets/Imagenes/Grupo34.png')}/> */}
        </TouchableOpacity>
        <View style={{paddingLeft: '20%', flexDirection: "row", marginBottom: '5%'}}>
            
          <TextInput
            style={styles.plateInput}
            textAlign='center'
            value={plateOne}
            maxLength={3}
            autoCapitalize={'characters'}
            editable={isEditable}
            onChange={text => {
              setPlateOne(text)
              // validate()
            }}
            />
          
          <TextInput
            style={styles.plateInput}
            textAlign='center'
            value={plateTwo}
            maxLength={3}
            autoCapitalize={'characters'}
            editable={isEditable}
            onChange={text => {
              setPlateTwo(text)
              //validate()
            }}
          />
        </View>

        <View style={{alignItems: 'center', marginBottom: '5%'}}>
          {<Text style={styles.infoUSerText}>Celular: </Text>}
          <Text style={styles.infoUSerText}>{"Tiempo de inicio: " }</Text>
          <Text style={styles.infoUSerText}>{"Tiempo de salida "  }</Text>
          <Text style={styles.infoUSerText}>CODIGO: </Text>
          <Text style={{fontSize: 20, fontFamily: 'Montserrat-Regular'}}>{"Total horas: "  }</Text>
          <Text style={styles.infoUSerText}>{"A pagar"}</Text>
          <Text style={{fontSize: 50, fontFamily: 'Montserrat-Regular'}}>{"$" }</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10, marginTop: 15}}>
              <Text style={{ fontFamily: 'Montserrat-Regular'}} >{"Valor ingresado"}</Text>
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

          <View style={{marginLeft: '25%', marginBottom: 10}}>
            <View style={{flexDirection: 'row', paddingBottom: '5%'}}>
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

          <View style={{flexDirection: 'row', paddingBottom: '10%', marginLeft: '5%'}}>
            <View style={{marginLeft: 30, marginRight: 10, marginTop: 15}}>
              <Text style={{ fontFamily: 'Montserrat-Regular'}}>{"A devolver"}</Text>
            </View>
            <View style={{marginRight: 20}}>
              <TextInput
                style={styles.inputMoney}
                keyboardType='numeric'
                placeholder='$'
                editable={false}
                value={(totalPay-totalAmount) <=0 ? '$ 0' : '$ ' + (totalPay-totalAmount)}
              />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <Button
            title="Cobrar"
            color='gray'
            onPress={() => {setModalVisible(true)}} />
        </View>

        <View style={{marginBottom: 10}}>
          <Button
            title="Pago pendiente"
            color='gray'
            onPress={() => {setModal2Visible(true)}} 
          />
        </View>
      </View>
      <FooterIndex navigation={navigation}/>
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
            <View style={{marginBottom: '7%', alignItems: 'center'}}>
              <Text style={styles.modalText}>EZV 123</Text>
              <Text>+3004678602</Text>
              <Text>Ha iniciado tiempo de parqueo</Text>
              <Text>11/11/2020 4:20 PM</Text>
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
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: '7%', alignItems: 'center'}}>
              <Text style={styles.modalText}>¿Estás seguro de que hay un pago pendiente?</Text>
              
            </View>
            <View style={{flexDirection: 'row'}}>
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
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: '7%', alignItems: 'center'}}>
              <Text style={styles.modalText}>Elija tipo de pago:</Text>
              
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                  onPress={() => {
                    setModal3Visible(!modal3Visible);}}
                
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
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      >
        <View style={styles.centeredView}>
          <View style={{...styles.modalView}}>
            <View style={{marginBottom: '7%', alignItems: 'center'}}>
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
                value={(totalAmount - totalPayModal) < 0 ? '0' : totalPay + (totalAmount - totalPayModal) +''}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                  onPress={() => {
                    setModal4Visible(!modal4Visible);
                    setTotalAmount(totalAmount - totalPayModal);
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
  officialProps: state.official
});

export default connect(mapStateToProps, actions)(UserOut);
