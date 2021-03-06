import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialIcons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import normalize from '../../config/services/normalizeFontSize';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";

const DrawerContent = (props) => {
    const { navigation, officialProps, reservations, recips, hq } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    // const { currentUser } = React.useContext(AuthContext);

    const signOut = async () => {
        // props.navigation.navigate('Landing');
        props.navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [{ name: 'Login' }]
        }));
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="home"
                                color="#00A9A0"
                                size={27}
                            />
                        )}
                        label="Inicio"
                        onPress={() => { props.navigation.navigate('Home1') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuTransacciones.png')} />
                        )}
                        label="Transacciones"
                        onPress={() => { props.navigation.navigate('Transactions') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuServicios.png')}
                            />
                        )}
                        label="Servicios activos"
                        onPress={() => { props.navigation.navigate('ActiveServices') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuReporte.png')} />
                        )}
                        label="Lista negra"
                        onPress={() => { props.navigation.navigate('Blacklist') }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuMensualidades.png')} />
                        )}
                        label="Mensualidades"
                        onPress={() => { props.navigation.navigate('MonthlyPayments') }}
                    />
                    {/* {officialHq === 'kPlPR3Rysv3uCsrUdcn2' && */}

                    {/* <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuMensualidades.png')} />
                        )}
                        label="Tiquete"
                        onPress={() => { props.navigation.navigate('Ticket') }}
                    /> */}
                    {/* } */}

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuReporte.png')} />
                        )}
                        label="Reporte de novedad"
                        onPress={() => { props.navigation.navigate('NewsReport') }}
                    />

                    <DrawerItem
                        // icon={({ color, size }) => (
                        //     <Image
                        //         style={{ width: normalize(25), height: normalize(25) }}
                        //         resizeMode={"contain"}
                        //         source={require('../../../assets/images/MenuMensualidades.png')} />
                        // )}
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="pages"
                                color="#00A9A0"
                                size={27}
                            />
                        )}
                        label="Cierre de caja"
                        onPress={() => { props.navigation.navigate('CashBalance') }}
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="contact-support"
                                color="#00A9A0"
                                size={27}
                            />
                        )}
                        label="Preguntas frecuentes"
                        onPress={() => { props.navigation.navigate('FAQs') }}
                    />
                    {/* <DrawerItem
                        // icon={({ color, size }) => (
                        //     <Image
                        //         style={{ width: normalize(25), height: normalize(25) }}
                        //         resizeMode={"contain"}
                        //         source={require('../../../assets/images/MenuMensualidades.png')} />
                        // )}
                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="list-alt"
                                color="#00A9A0"
                                size={27}
                            />
                        )}
                        label="Crear recibo"
                        onPress={() => { props.navigation.navigate('CreateRecip') }}
                    /> */}
                    <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '4%', marginLeft: '4%', marginRight: '4%', marginTop: '4%' }} ></View>

                    <DrawerItem

                        icon={({ color, size }) => (
                            <MaterialIcons
                                name="logout"
                                color="#00A9A0"
                                size={27}
                            />
                            // <Image
                            //     style={{ width: normalize(25), height: normalize(25) }}
                            //     resizeMode={"contain"}
                            //     source={require('../../../assets/images/MenuLogout.png')} />
                        )}
                        label="Cierre de turno"

                        onPress={() => { props.navigation.navigate('Logout') }}
                    />
                </View>
            </DrawerContentScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

const mapStateToProps = (state) => ({
    officialProps: state.official,
    reservations: state.reservations,
    recips: state.recips,
    hq: state.hq,
});

export default connect(mapStateToProps, actions)(DrawerContent);