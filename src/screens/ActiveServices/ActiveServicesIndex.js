import React from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import ActiveServicesStyles from '../ActiveServices/ActiveServicesStyles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';

const ActiveServices = (props) => {
    const { navigation, officialProps, reservations } = props;
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
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    key={index.toString()}
                                                    onPress={() => {

                                                    }}
                                                >
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
                                                </TouchableOpacity>

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
                        height: '13%',
                        width: '100%',
                        justifyContent: 'center'
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
