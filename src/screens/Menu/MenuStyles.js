import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// export default class Screen extends React.Component {
    
// render() {  
const Logout = ({navigation}) => {
    return(
            <View>
                    <TouchableOpacity
                        style={{ alignItems: "flex-end", margin: 40 }} 
                        // onPress={() => {
                        //     this.props.navigation.openDrawer();
                        // }}
                        onPress={() => navigation.navigate('Logout')}
                    >
                        <Text style={{textAlign: 'center'}}>Cerrar sesión</Text>

                    </TouchableOpacity>
            </View>
        );
    }
export default Logout;

const style= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFF",
        paddingTop: 20
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})

