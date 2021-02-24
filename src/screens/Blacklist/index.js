import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Modal, ImageBackground, Keyboard, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../Blacklist/styles';
import { CREATE_USER, PAY_DEBTS, FIND_USER_BY_PLATE, LIST_HQ_DEBTS } from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from '../../config/constants/constants';

import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import normalize from '../../config/services/normalizeFontSize';
import moment from 'moment';

import numberWithPoints from '../../config/services/numberWithPoints';
import Header from '../../components/Header/HeaderIndex';
import FooterIndex from '../../components/Footer';
import Button from '../../components/Button';

const Blacklist = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    const [plateOne, setPlateOne] = useState('');
    const [plateTwo, setPlateTwo] = useState('');
    const refPlateOne = useRef(null);
    const refPlateTwo = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [listHQDebts, setListHQDebts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [findUserByPlateInfo, setFindUserByPlateInfo] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    let blacklistValue = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].value : 0;

    const clearPlateOne = () => {
        setPlateOne('');
    }
    const clearPlateTwo = () => {
        setPlateTwo('');
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
                    setBlacklist(response.data.blackList);
                    console.log(response.data.blackList)
                }
            } catch (err) {
                console.log(err)
                console.log(err?.response)
                setModal2Visible();
            }
        }


        findUserByPlate()
    }, [plateOne, plateTwo]);

    useEffect(() => {
        async function listHQDebts() {
            try {
                const response = await instance.post(
                    LIST_HQ_DEBTS,
                    {
                        hqId: officialHq
                    },
                    { timeout: TIMEOUT }
                )
                setListHQDebts(response.data.data)
                console.log(response.data.data)
            } catch (err) {
                console.log(err)
                console.log(err?.response)
            }
        }
        listHQDebts()
    },[]);

    async function payDebts() {
        setLoading(true);
        try {
            if (plateOne.length === 3 && plateTwo.length === 3) {
                const response = await instance.post(
                    PAY_DEBTS,
                    {
                        hqId: officialHq,
                        plate: plateOne + plateTwo,
                        value: blacklistValue
                    },
                    { timeout: TIMEOUT }
                )
                setLoading(false);
                setModalVisible(true);
                clearPlateOne();
                clearPlateTwo();

                console.log("------------wiii------")
            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            setLoading(false);
        }
    }

    const formatHours = (hours) => {
        if (typeof hours === "number" || typeof hours === "double" || typeof hours === "long" || typeof hours === "float") {
            return Math.round(hours)
        } else return hours
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
                            payDebts();
                        }}
                            title="P A G A R"
                            color='#FFF200'
                            style={[plateOne === "" || plateTwo === "" ? styles.buttonIDisabled : styles.buttonI]}
                            textStyle={styles.buttonTextSearch}
                            disabled={plateOne === "" || plateTwo === ""}
                            activityIndicatorStatus={loading}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <View style={{ height: '95%', width: '95%', backgroundColor: '#FFFFFF', marginTop: '0%', borderRadius: 10 }}>
                            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                                <Text style={styles.textListTitle} >MORAS</Text>
                            </View>
                            <View style={{ height: "90%" }}>
                                {recips.recips.length > 0 ?
                                    <FlatList
                                        style={{ height: "37%" }}
                                        data={listHQDebts}
                                        keyExtractor={({ id }) => id}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '4%', marginLeft: '10%', marginRight: '10%', marginTop: '2%', alignItems: 'center' }} >
                                                    <View style={{ marginBottom: '2%' }} >
                                                        <Text style={styles.textPlaca}>{item.plate}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: 'flex-end', marginBottom: '2%' }} >
                                                        <Text style={styles.textMoney}>{`$${numberWithPoints(item.value)}`}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <View style={{ marginLeft: '13%', padding: '10%' }}>
                                        <Text style={styles.textPago}> No se encuentran registros en el historial </Text>
                                    </View>
                                }
                            </View>
                        </View>
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
                            height: '100%',
                            width: '100%',
                            justifyContent: 'space-between',
                            padding: '2%'

                        }}>
                            <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                                <Text style={styles.modalTextAlert}> La deuda se ha pagado con éxito. </Text>
                            </View>
                            <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                <Button onPress={() => {
                                    setModal2Visible(!modal2Visible);
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
    )
};



const mapStateToProps = (state) => ({
    officialProps: state.official,
    reservations: state.reservations,
    recips: state.recips,
    hq: state.hq,
    expoToken: state.expoToken
});

export default connect(mapStateToProps, actions)(Blacklist);