import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const Header = ({ navigation }) => {
    return (
        <View style={{ height: '12%', alignContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} >
            <View style={{ width: '20%', height: '100%', justifyContent: 'center' }}>
                <View style={{ height: '70%', width: '70%', alignItems: 'flex-start', alignContent: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ height: '80%', width: '100%', justifyContent: 'flex-end', marginLeft: '20%'}}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            style={{width: '50%'}}
                            resizeMode={"contain"}
                            source={require('../../../assets/images/Menu.png')} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ width: '60%', height: '100%', justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
                <Image style={{
                    marginTop: '5%',
                    width: '25%',

                }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/HomeIcon.png')} />
            </View>
            <View style={{ width: '20%', height: '100%', justifyContent: 'center' }}>
            </View>


        </View>
    );
}

export default Header;