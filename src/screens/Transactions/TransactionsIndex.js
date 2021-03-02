import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { connect } from "react-redux";
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL, EDIT_ADMIN } from "../../config/api";
import store from '../../config/store';
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import TransactionsStyles from '../Transactions/TransactionsStyles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';


const Transactions = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

    useEffect(() => {
        const getRecips = async () => {
            try {
                const response = await instance.post(GET_RECIPS, {
                    hqId: officialProps.hq[0]
                });
                if (response.data.response === 1) {
                    store.dispatch(actions.setRecips(response.data.data));
                }
            } catch (err) {
                console.log(err?.response)
                console.log("err: ", err);
            }
        };
        getRecips();

    }, []);

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
                    height: '40%',
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/Home.png')}>
                <Header navigation={navigation} />
                <View style={TransactionsStyles.container}>
                    <View style={TransactionsStyles.listContainer}>
                        <View style={{ height: '95%', width: '95%', backgroundColor: '#FFFFFF', marginTop: '0%', borderRadius: 10 }}>
                            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                                <Text style={TransactionsStyles.textListTitle} >TRANSACCIONES</Text>
                            </View>
                            <View style={{ height: "90%" }}>
                                {recips.recips.length > 0 ?
                                    <FlatList
                                        style={{ height: "37%" }}
                                        data={recips.recips}
                                        keyExtractor={(item, index) => String(index)}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                                                    <View style={{ marginBottom: '2%' }} >
                                                        <Text style={TransactionsStyles.textPlaca}>{item.plate}</Text>
                                                        <Text style={TransactionsStyles.textPago}>{`Pago por ${formatHours(item.hours)} horas`}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                                                        <Text style={TransactionsStyles.textMoney}>{`$${numberWithPoints(item.total)}`}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <View style={{ marginLeft: '13%', padding: '10%' }}>
                                        <Text style={TransactionsStyles.textPago}> No se encuentran registros en el historial </Text>
                                    </View>
                                }
                            </View>
                        </View>

                    </View>
                    <View style={{
                        height: '10%',
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

export default connect(mapStateToProps, actions)(Transactions);
