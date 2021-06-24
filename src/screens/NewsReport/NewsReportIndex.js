import React, { useEffect, useState, useRef } from 'react';
import { ImageBackground, Keyboard } from 'react-native';
import {
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import styles from '../NewsReport/NewsReportStyles';
import FooterIndex from '../../components/Footer';
import Button from '../../components/Button';
import normalize from '../../config/services/normalizeFontSize';
// redux
import { connect } from "react-redux";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
// api
import { CREATE_NEWS_REPORT } from "../../config/api";
import { TIMEOUT } from '../../config/constants/constants';
import { width } from '../../config/constants/screenDimensions';


const NewsReport = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

    const [modalVisible, setModalVisible] = useState(false);
    const [report, setReport] = useState("")
    const [loadingReport, setLoadingReport] = useState(false);

    const createNewsReport = async () => {
        setLoadingReport(true);
        try {
            const response = await instance.post(CREATE_NEWS_REPORT, {
                officialEmail: officialProps.email,
                report: report,
                hqId: officialProps.hq[0]
            },
                { timeout: TIMEOUT }
            );
            if (response.data.response === 1){
                setLoadingReport(false);
                setModalVisible(true);
            }
        } catch (err) {
            setLoadingReport(false);
            console.log(err)
            console.log(err?.response)

        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: '40%',
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/Home.png')}>
                <Header navigation={navigation} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <View style={styles.listContainer}>
                            <View style={{ height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textListTitle}> REPORTE DE NOVEDAD </Text>
                            </View>
                            <View style={{ height: '50%', alignItems: 'center', padding: '2%' }}>
                                <TextInput
                                    style={{
                                        borderWidth: 2,
                                        borderColor: '#00A9A0',
                                        height: '80%',
                                        width: '80%',
                                        borderRadius: 20,
                                        padding: '5%',
                                        justifyContent: 'flex-start',
                                        fontSize: width * 0.034,
                                        fontFamily: 'Montserrat-Regular'
                                    }}
                                    numberOfLines={10}
                                    multiline={true}
                                    textAlign='center'
                                    placeholder="Ingrese novedad"
                                    value={report}
                                    onChangeText={(text) => {
                                        setReport(text);
                                    }}
                                >

                                </TextInput>

                            </View>
                            <View style={{ height: '20%', width: '75%', alignSelf: 'center' }}>
                                <Button onPress={() => {
                                    createNewsReport();
                                }}
                                    title="R E P O R T A R"
                                    color='#00A9A0'
                                    style={report.length === 0 ? styles.buttonEdDisabled : styles.buttonEd}
                                    textStyle={styles.buttonTextRenew}
                                    activityIndicatorStatus={loadingReport}
                                    disabled={report.length === 0}
                                />
                            </View>
                        </View>
                        <View style={{
                            height: '14%',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <FooterIndex navigation={navigation} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
                                <View style={{ margin: '4%', justifyContent: 'center', height: ' 60%' }}>
                                    <Text style={styles.modalTextAlert}> Tu novedad ha sido registrada con éxito  </Text>


                                </View>
                                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                    <Button onPress={() => {
                                        setModalVisible(false);
                                        setReport("");
                                    }}
                                        title="E N T E N D I D O"
                                        color="#00A9A0"
                                        // activityIndicatorStatus={loadingStart}
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

export default connect(mapStateToProps, actions)(NewsReport);
