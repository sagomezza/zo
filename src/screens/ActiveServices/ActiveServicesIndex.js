import React, {useCallback} from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList,
} from 'react-native';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Header from '../../components/Header/HeaderIndex';
import styles from '../ActiveServices/ActiveServicesStyles';
import FooterIndex from '../../components/Footer';
import moment from 'moment';

const ActiveServices = (props) => {
    const { navigation, reservations} = props;

    const reservationKeyExtractor = useCallback((item, index) => String(index), [reservations.reservations]);

    const renderReservationItem = useCallback(({ item, index }) => 
            <View style={styles.list} >
                <Text style={styles.textPlaca}>{item.plate}</Text>
                <Text style={styles.dateDaysText}>{item.isParanoic === true ? 'N/A' : item.verificationCode}</Text>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.dateDaysText}>{moment(item.dateStart).format('L')}</Text>
                    <Text style={styles.dateHourText}>{moment(item.dateStart).format('LT')}</Text>
                </View>
                <Text style={styles.dateDaysText}>
                    {item.prepayFullDay === true ? " Pase día" : ""}
                    {item.mensuality === true ? " Mensualidad" : ""}
                    {item.isParanoic === true ? " Por horas" : ""}
                    {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? " Por horas" : ""}
                </Text>
            </View>
    ,[reservations.reservations]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: '40%',
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/logoutStripes.png')}>
                <Header navigation={navigation} />
                <View style={styles.container}>
                    <View style={{ marginTop: '8%' }}>
                        <Text style={styles.textListTitle} >SERVICIOS ACTIVOS</Text>
                    </View>
                    <View style={{ height: "71%", marginTop: '8%', width: '90%' }}>
                        <View style={{ width: '100%', height: '5%', flexDirection: 'row'}}>
                            <Text style={{ ...styles.titleText, marginLeft: '10%' }}>Placa</Text>
                            <Text style={{ ...styles.titleText, marginLeft: '16%' }}>Código</Text>
                            <Text style={{ ...styles.titleText, marginLeft: '12%' }}>Fecha</Text>
                            <Text style={{ ...styles.titleText, marginLeft: '15%' }}>Modo de pago</Text>
                        </View>
                        {reservations.reservations.length > 0 ?
                            <FlatList
                                style={{ height: "37%" }}
                                data={reservations.reservations}
                                keyExtractor={reservationKeyExtractor}
                                renderItem={renderReservationItem}
                                maxToRenderPerBatch={7}
                            />
                            :
                            <View style={{ marginLeft: '13%', padding: '10%' }}>
                                <Text style={styles.textPago}> No hay parqueos activos en este momento</Text>
                            </View>
                        }
                    </View>
                </View>
            </ImageBackground>
            <View style={{
                height: '10%',
                width: '100%',
                justifyContent: 'flex-end'
            }}>
                <FooterIndex navigation={navigation} />
            </View>

        </View>
    )
};

const mapStateToProps = (state) => ({
    reservations: state.reservations,
});

export default connect(mapStateToProps, actions)(ActiveServices);
