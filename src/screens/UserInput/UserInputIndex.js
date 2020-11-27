import React, {useState} from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Alert, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import Logout from '../Menu/MenuStyles';

const UserInput = (props) => {
  const { navigation } = props;

    const isBlackList = true;
    const dateMonth = new Date('05/05/20');
    const state = {
      HeadTable: ['Vehículos', 'Últimos pagos'],
      DataTable: [
        ['EVT 123', '09/11/2020 $9600'],
        ['EVT 124', '09/11/2020 $9600'],
        ['EVT 125', '09/11/2020 $9600']
      ]
    };
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={{flex: 1}}>  
      <Logout navigation={navigation}/>  
      <View style={styles.container}>
        <View style={{alignItems:'center'}}> 
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: '10%'}}>
                <TextInput
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                
                //onChangeText={text => onChangeText(text)}
                //value={value}
                />
                <TextInput
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                keyboardType='default'
                // onChangeText={text => onChangeText(text)}
                // value={value}
                />
            </View>
            
            <TextInput
            style={styles.numberInput}
            keyboardType='numeric'
            textAlign='center'
            maxLength={10}
            // onChangeText={text => onChangeText(text)}
            // value={value}
            />
        </View>
  
        <View style={{flexDirection: 'row-reverse', paddingBottom: '10%'}}>
          <View style={{marginRight: 20}}>
            <TouchableOpacity 
              style={styles.buttonI} 
              >
              <Text style={styles.buttonText} onPress={() => {setModalVisible(true)}}>Inicio</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginRight: 10}}>
            <TouchableOpacity style={styles.buttonT}   onPress={() => {navigation.navigate('QRscanner')}}>
              {/* <Image source={require('./assets/Imagenes/Grupo34.png')}/> */}
            </TouchableOpacity>
          </View>
        </View>
       
       <View style={{alignItems: 'center'}}>
          {isBlackList ? <Text style={{fontFamily: 'Montserrat-Regular'}}>{"Lista Negra"}</Text> : ''}
  
          <Text style={{fontSize: 20, fontFamily: 'Montserrat-Regular'}}>Gerardo Bedoya</Text>
          <Text  style={{fontFamily: 'Montserrat-Regular', fontSize: 12}}>{"Mensualidad hasta " + dateMonth}</Text>
        </View>
        <View>
            <Table >
            <Row data={state.HeadTable} style={styles.HeadStyleTable} textStyle={styles.tableText}/>
            <Rows data={state.DataTable} textStyle={styles.tableText}/>
            </Table>
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
    </View>
    );

}

  export default UserInput;