import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Keyboard } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../MonthlyPayments/MonthlyPaymentsStyles';

import { FIND_MENSUALITY_PLATE } from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from '../../config/constants/constants';



import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import normalize from '../../config/services/normalizeFontSize';



import Header from '../../components/Header/HeaderIndex';
import FooterIndex from '../../components/Footer';
import Button from '../../components/Button';


const MonthlyPayments = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    const [plateOne, setPlateOne] = useState('');
    const [plateTwo, setPlateTwo] = useState('');
    const refPlateOne = useRef(null);
    const refPlateTwo = useRef(null);
    const [loading, setLoading] = useState(false)
    const [mensualityExists, setMensualityExists] = useState(false)
    const [mensuality, setMensuality] = useState({})
    const mensualityInfo = mensuality.data !== undefined ? mensuality.data[0] : "";

    const clearPlateOne = () => {
        setPlateOne('');
    }
    const clearPlateTwo = () => {
        setPlateTwo('');
    }

    async function findMensualityPlate() {
        try {
            if (plateOne.length === 3 && plateTwo.length === 3) {
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
                console.log(response.data.data)
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            console.log('dentro')
            setMensualityExists(false);
        }
    }

    async function editMensuality() {
        try {
            if (plateOne.length === 3 && plateTwo.length === 3) {
                const response = await instance.post(
                    EDIT_MENSUALITY,
                    {
                        id: mensualityInfo.id,
                        plates: mensuality.plates 
                    },
                    { timeout: TIMEOUT }
                )
                console.log(response.data.data)
            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            console.log('dentro')
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: normalize(450),
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/Home.png')}>
                <Header navigation={navigation} />
                <View style={{ height: normalize(150), alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '35%', width: '60%', marginTop: '2%' }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '40%', width: '90%', justifyContent: 'center' }}>
                        <Button onPress={() => {
                            setLoading(true);
                            findMensualityPlate();

                        }}
                            title="B U S C A R"
                            color='#FFF200'
                            style={[plateOne === "" || plateTwo === "" ? styles.buttonIDisabled : styles.buttonI]}
                            textStyle={styles.buttonText}
                            disabled={plateOne === "" || plateTwo === ""}
                            activityIndicatorStatus={loading}

                        />
                    </View>


                </View>

                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        {mensualityExists ?
                            <View style={{ borderWidth: 1, height: '96%', width: '80%', marginTop: '2%', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between'  }}>
                                <View style={{ borderWidth: 1, height: '40%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.infoText}>
                                        Capacidad: {mensualityInfo.capacity}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        Placas: {mensualityInfo.plates + ' '}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        Placas parqueadas: {mensualityInfo.parkedPlates}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        Vigencia: {/* {mensualityInfo.validity} */}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        Valor: {mensualityInfo.value}
                                    </Text>
                                </View>
                                <View style={{ borderWidth: 1, height: '18%', width: '80%',alignContent: 'center',alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <Button onPress={() => {
                                    }}
                                        title="R E N O V A R"
                                        color='gray'
                                        style={[plateOne === "" || plateTwo === "" ? styles.buttonReDisabled : styles.buttonRe]}
                                        textStyle={styles.buttonTextRenew}
                                        disabled={plateOne === "" || plateTwo === ""}
                                        activityIndicatorStatus={loading}
                                    />
                                    <Button onPress={() => {
                                    }}
                                        title="E D I T A R"
                                        color='gray'
                                        style={[plateOne === "" || plateTwo === "" ? styles.buttonEdDisabled : styles.buttonEd]}
                                        textStyle={styles.buttonTextRenew}
                                        disabled={plateOne === "" || plateTwo === ""}
                                        activityIndicatorStatus={loading}
                                    />
                                </View>
                            </View>
                            :
                            <View style={{ height: '40%', justifyContent: 'center' }}>
                                <Text style={styles.infoText}>
                                    No se encuentra mensualidad asociada.
                                </Text>
                            </View>
                        }

                    </View>
                    <View style={{
                        height: '20%',
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}>
                        <FooterIndex navigation={navigation} />
                    </View>
                </View>

            </ImageBackground>
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

export default connect(mapStateToProps, actions)(MonthlyPayments);
