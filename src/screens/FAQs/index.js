import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import styles from './styles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';
import normalize from '../../config/services/normalizeFontSize';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const FAQs = (props) => {
    const { navigation, officialProps, recips } = props;

    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

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
                        <Text style={styles.textListTitle} >FAQs</Text>

                        <View style={{
                            height: '95%',
                            width: '95%',
                            backgroundColor: '#FFFFFF',
                            marginTop: '0%',
                            borderRadius: 10
                        }}>

                            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                            </View>
                            <View style={{ height: "90%", borderWidth: 1 }}>

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

export default connect(mapStateToProps, actions)(FAQs);
