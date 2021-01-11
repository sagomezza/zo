import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import NewsReportStyles from '../NewsReport/NewsReportStyles';
import FooterIndex from '../../components/Footer';

const NewsReport = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
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
                <View style={NewsReportStyles.container}>
                    <View style={NewsReportStyles.listContainer}>

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

export default connect(mapStateToProps, actions)(NewsReport);
