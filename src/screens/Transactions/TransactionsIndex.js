import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import styles from '../Transactions/TransactionsStyles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';
import normalize from '../../config/services/normalizeFontSize';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const Transactions = (props) => {
    const { navigation, officialProps, recips } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

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
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <View style={{ height: '95%', width: '95%', backgroundColor: '#FFFFFF', marginTop: '0%', borderRadius: 10 }}>
                            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                                <Text style={styles.textListTitle} >TRANSACCIONES</Text>
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
                                                        <Text style={styles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                                                        <Text style={styles.textPago}>{`Pago por ${formatHours(item.hours)} horas`}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                                                        <Text style={styles.textMoney}>
                                                            {item.cash === 0 && item.change < 0 ? '' : ''}
                                                            {item.cash > 0 && item.change < 0 ? `$${numberWithPoints(item.cash)}` : ''}
                                                            {item.cash > 0 && item.change > 0 ? `$${numberWithPoints(item.total)}` : ''}
                                                        </Text>
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
                        height: '14%',
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
