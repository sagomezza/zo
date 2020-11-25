import React, {useState} from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

const UserOut = () => {

  const dateMonthIn = new Date('05/05/20');
  const dateMonthOut = new Date('07/05/20');
  const phoneNumber = 3134578950;
  const totalAmount = 3900;
  const hour = 1;
  const plateOne = 'EVZ';
  const plateTwo = '124';
  const [totalPay, setTotalPay] = useState(0);
  
  
  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      paddingLeft: '15%',
      paddingRight: '15%',
      paddingTop: '30%',
      backgroundColor: '#ffffff' 
    },
    plateInput: {
      width: 120, 
      height: 80,
      borderColor: 'gray', 
      marginRight: '5%', 
      borderWidth: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      fontSize: 35
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
      fontSize: 25
    },
    inputMoney: {
      width: 150, 
      height: 50,
      borderColor: 'gray', 
      marginRight: '5%', 
      marginBottom: '10%',
      borderWidth: 1,
      paddingLeft: 10
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
      textAlign: 'center'
    }
  });

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row', paddingBottom: '5%'}}>

        <TextInput
          style={styles.plateInput}
          textAlign='center'
          value={plateOne}
          editable={false}
          />
        
        <TextInput
          style={styles.plateInput}
          textAlign='center'
          value={plateTwo}
          editable={false}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        {<Text>{phoneNumber}</Text>}
        <Text>{"Tiempo de inicio: " + moment(dateMonthIn).format('hh:MM A DD/MM/YY')}</Text>
        <Text>{"Tiempo de salida " + moment(dateMonthOut).format('hh:MM A DD/MM/YY')}</Text>
        <Text style={{fontSize: 20}}>{"Total horas:" + hour + (hour > 1 ? " Horas" : " Hora")}</Text>
        <Text>{"A pagar"}</Text>
        <Text style={{fontSize: 50}}>{"$" + totalAmount }</Text>
      </View>

      <View style={{flexDirection: 'row', paddingBottom: '5%'}}>
        <View style={{marginRight: 10, marginTop: 15}}>
          <Text>{"Valor ingresado"}</Text>
        </View>
        <View style={{marginRight: 20}}>
          <TextInput
            style={styles.inputMoney}
            keyboardType='numeric'
            placeholder='$'
            value={totalPay == 0 ? '' : totalPay + ''}
            onChangeText={text => setTotalPay(text)}
          />
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(5000)}>
              <Text style={styles.miniButtonMoneyText}>$5000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(10000)}>
              <Text style={styles.miniButtonMoneyText}>$10000</Text>
          </TouchableOpacity>
          </View>
        </View>
        
      </View>

      <View style={{marginLeft: 90, marginBottom: 10}}>
        <View style={{flexDirection: 'row-reverse'}}>
          <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(50000)}>
              <Text style={styles.miniButtonMoneyText}>$50000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniButtonMoney} onPress={() => setTotalPay(20000)}>
              <Text style={styles.miniButtonMoneyText}>$20000</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', paddingBottom: '10%'}}>
        <View style={{marginLeft: 30, marginRight: 10, marginTop: 15}}>
          <Text>{"A devolver"}</Text>
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

      <View style={{marginBottom: 10}}>
        <Button
          title="Cobrar"
          color='gray'
        />
      </View>

      <View style={{marginBottom: 10}}>
        <Button
          title="Pago pendiente"
          color='gray'
        />
      </View>
    </View>
  );
}

export default UserOut;