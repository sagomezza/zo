import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { MaterialIcons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';
import normalize from '../../config/services/normalizeFontSize';

const DrawerContent = (props) => {

    // const { currentUser } = React.useContext(AuthContext);

    const signOut = async () => {
        // props.navigation.navigate('Landing');
        props.navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [{ name: 'Login' }]
        }));
    }

    return (
        <View style={{ flex: 1}}>
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
                      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '4%', marginLeft: '4%', marginRight: '4%', marginTop: '4%' }} ></View>

                    <DrawerItem

                        icon={({ color, size }) => (
                            <Image
                                style={{ width: normalize(25), height: normalize(25) }}
                                resizeMode={"contain"}
                                source={require('../../../assets/images/MenuLogout.png')} />
                        )}
                        label="Cierre de sesión"

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

export default DrawerContent;