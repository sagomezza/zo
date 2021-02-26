import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { connect } from "react-redux";
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL, EDIT_ADMIN } from "../../config/api";
import store from '../../config/store';
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import ActiveServicesStyles from '../ActiveServices/ActiveServicesStyles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';

const ActiveServices = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

    useEffect(() => {
        const readHq = async () => {
            try {
                const response = await instance.post(READ_HQ, {
                    id: officialHq
                });
                if (response.data.response) {
                    store.dispatch(actions.setReservations(response.data.data.reservations));
                    store.dispatch(actions.setHq(response.data.data));
                }
            } catch (error) {
                console.log("err: ", error);
            }
        };
        readHq();

    }, []);



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
                <View style={ActiveServicesStyles.container}>
                    <View style={ActiveServicesStyles.listContainer}>
                        <View style={{ height: '95%', width: '95%', backgroundColor: '#FFFFFF', marginTop: '1%', borderRadius: 10 }}>
                            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                                <Text style={ActiveServicesStyles.textListTitle} >SERVICIOS ACTIVOS</Text>
                            </View>
                            <View style={{ height: "90%" }}>
                                {reservations.reservations.length > 0 ?
                                    <FlatList
                                        style={{ height: "37%" }}
                                        data={reservations.reservations}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                                                    <View style={{ marginBottom: '2%' }} >
                                                        <Text style={ActiveServicesStyles.textPlaca}>{item.plate}</Text>
                                                        <Text style={ActiveServicesStyles.textPago}>{item.verificationCode}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                                        <Text style={ActiveServicesStyles.textMoney}>{moment(item.dateStart).format('L')}  {moment(item.dateStart).format('LT')}</Text>
                                                        <Text style={ActiveServicesStyles.textPago}>Pago por horas</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <View style={{ marginLeft: '13%', padding: '10%' }}>
                                        <Text style={ActiveServicesStyles.textPago}>No hay parqueos activos en este momento</Text>
                                    </View>
                                }
                            </View>
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

export default connect(mapStateToProps, actions)(ActiveServices);
