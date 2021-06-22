import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    ImageBackground,
    Keyboard,
    FlatList,
    ActivityIndicator

} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../Blacklist/styles';
import normalize from '../../config/services/normalizeFontSize';
import moment from 'moment';
import numberWithPoints from '../../config/services/numberWithPoints';
import Header from '../../components/Header/HeaderIndex';
import FooterIndex from '../../components/Footer';
import Button from '../../components/Button';
// api
import { CREATE_USER, PAY_DEBTS, FIND_USER_BY_PLATE, LIST_HQ_DEBTS } from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from '../../config/constants/constants';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const Blacklist = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    const [plateOne, setPlateOne] = useState('');
    const [plateTwo, setPlateTwo] = useState('');
    const refPlateOne = useRef(null);
    const refPlateTwo = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);

    const [listHQDebts, setListHQDebts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingListHQDebts, setLoadingListHQDebts] = useState(true);
    const [findUserByPlateInfo, setFindUserByPlateInfo] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    let blacklistValue = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].value : 0;

    const clearPlateOne = () => {
        setPlateOne('');
    }
    const clearPlateTwo = () => {
        setPlateTwo('');
    }

    const debtPayedSuccess = () => {
        clearPlateOne();
        clearPlateTwo();
        listHQDebtsCall();
        setModalVisible(false);
    }

    const userNotFoundModal = () => {
        clearPlateOne();
        clearPlateTwo();
        setModal2Visible(false);
    }
    const debtNotFoundModal = () => {
        clearPlateOne();
        clearPlateTwo();
        setModal3Visible(false);
    }


    async function findUserByPlate() {
        try {
            if (plateOne.length === 3 && plateTwo.length >= 2) {
                const response = await instance.post(
                    FIND_USER_BY_PLATE,
                    {
                        plate: plateOne + plateTwo,
                        type: "full"
                    },
                    { timeout: TIMEOUT }
                )
                if (response.data.response === 1) {
                    setFindUserByPlateInfo(response.data);
                    setBlacklist(response.data.blackList);
                }

            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            if (err?.response.data.response === -1) setModal2Visible(true);
        }
    }

    useEffect(() => {
        listHQDebtsCall();
    }, []);

    const listHQDebtsCall = async () => {
        setLoadingListHQDebts(true);
        try {
            const response = await instance.post(
                LIST_HQ_DEBTS,
                {
                    hqId: officialHq
                },
                { timeout: TIMEOUT }
            )
            if (response.data.response === 1) {
                setListHQDebts(response.data.data)
                setLoadingListHQDebts(false);
            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            setLoadingListHQDebts(false);
        }
    };

    async function payDebts() {
        setLoading(true);
        try {
            if (plateOne.length === 3 && plateTwo.length >= 2) {
                const response = await instance.post(
                    PAY_DEBTS,
                    {
                        hqId: officialHq,
                        plate: plateOne + plateTwo,
                        value: blacklistValue
                    },
                    { timeout: TIMEOUT }
                )
                if (response.data.response === 1) {
                    setLoading(false);
                    setModalVisible(true);
                }
            }
        } catch (err) {
            console.log(err)
            console.log(err?.response)
            setLoading(false);
            if (err?.response.data.response === -1) setModal3Visible(true);
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
                    height: '35%',
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/Home.png')}>
                <Header navigation={navigation} />
                <View style={{ height: '15%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
                            onEndEditing={() => {
                                findUserByPlate();
                            }}
                        />
                    </View>
                    <View style={{ height: '40%', width: '57%', justifyContent: 'center' }}>
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
                                <Text style={styles.textListTitle} >LISTA NEGRA</Text>
                            </View>
                            {loadingListHQDebts ?
                                <View style={{ height: "90%" }}>
                                    <View style={{ justifyContent: 'center', height: '100%' }}>
                                        <ActivityIndicator size={"large"} color={'#00A9A0'} />
                                    </View>
                                </View>
                                :
                                <View style={{ height: "90%" }}>
                                    {listHQDebts.length > 0 ?
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
                            }




                        </View>
                    </View>
                    <View style={{
                        height: '17%',
                        width: '100%',
                        justifyContent: 'flex-end'
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
                                    debtPayedSuccess();
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
                visible={modal2Visible}
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
                                <Text style={styles.modalTextAlert}> Esta placa no se encuentra asociada a un usuario. </Text>
                            </View>
                            <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                <Button onPress={() => {
                                    userNotFoundModal();
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
                                <Text style={styles.modalTextAlert}> No se encuentra deuda asociada a este usuario. </Text>
                            </View>
                            <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                <Button onPress={() => {
                                    debtNotFoundModal();
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
