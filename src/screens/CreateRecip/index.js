import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import {
    View,
    TextInput,
    Text
} from 'react-native';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import styles from '../CreateRecip/styles';
import Button from '../../components/Button';
import FooterIndex from '../../components/Footer';

const CreateRecip = (props) => {
    const { navigation, officialProps, reservations } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

    const [plate, setPlate] = useState('')
    const [phone, setPhone] = useState('')
    const [totalPay, setTotalPay] = useState('')
    const [cash, setCash] = useState('')
    const [change, setChange] = useState('')
    const [hours, setHours] = useState('')
    const [recipState, setRecipState] = useState('')

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: '40%',
                    flexDirection: 'column',
                }}
                source={require('../../../assets/images/Home.png')}>
                <Header navigation={navigation} />
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <View style={{
                            height: '90%',
                            width: '95%',
                            marginTop: '5%',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1
                        }}>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>PLACA:</Text>
                                <TextInput
                                    placeholder={'Ingrese placa'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    maxLength={6}
                                    onChangeText={text => {
                                        setPlate(text)
                                    }}
                                    value={plate}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>CELULAR:</Text>
                                <TextInput
                                    placeholder={'Ingrese celular'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    maxLength={10}
                                    onChangeText={text => {
                                        setPhone(text)
                                    }}
                                    value={phone}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>TOTAL:</Text>
                                <TextInput
                                    placeholder={'Ingrese total a pagar'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    onChangeText={text => {
                                        setTotalPay(text)
                                    }}
                                    value={totalPay}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>EFECTIVO:</Text>
                                <TextInput
                                    placeholder={'Ingrese efectivo'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    onChangeText={text => {
                                        setCash(text)
                                    }}
                                    value={cash}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>CAMBIO:</Text>
                                <TextInput
                                    placeholder={'Cambio'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    onChangeText={text => {
                                        setChange(text)
                                    }}
                                    value={change}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>HORAS:</Text>
                                <TextInput
                                    placeholder={'Horas'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    maxLength={10}
                                    onChangeText={text => {
                                        setHours(text)
                                    }}
                                    value={hours}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>Fecha de inicio:</Text>
                                <TextInput
                                    placeholder={'Inicio'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    maxLength={10}
                                    // onChangeText={text => {
                                    //     setRecipState(text)
                                    // }}
                                    // value={recipState}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.titleText}>Fecha de salida:</Text>
                                <TextInput
                                    placeholder={'Salida'}
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    textAlign='center'
                                    maxLength={10}
                                    // onChangeText={text => {
                                    //     setRecipState(text)
                                    // }}
                                    // value={recipState}
                                />
                            </View>
                            <View style={{ width: '80%', height: '6%', marginTop: '8%' }}>
                                <Button
                                    title="Crear recibo"
                                    color='#00A9A0'
                                    // disabled={}
                                    style={{height: '100%'}}
                                    textStyle={{
                                        // color: '#FFFFFF',
                                        // fontFamily: 'Montserrat-Bold',
                                        // fontSize: width * 0.028
                                    }}
                                    onPress={() => {
                                        // setLoading(true);
                                        // finishParking("payed", true);
                                    }} />
                            </View>
                        </View>

                    </View>

                </View>

            </ImageBackground>
            <View style={{ height: '12%', width: '100%', justifyContent: 'flex-end' }}>
                <FooterIndex navigation={navigation} />
            </View>

        </View>
    )
};

const mapStateToProps = (state) => ({
    officialProps: state.official,
    reservations: state.reservations,
    recips: state.recips,
    hq: state.hq,
    expoToken: state.expoToken
});

export default connect(mapStateToProps, actions)(CreateRecip);
