import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// export default class Screen extends React.Component {
    
// render() {  
const Logout = ({navigation}) => {
    return(
            <View style={{
                        backgroundColor:"#FFFF"}}>
                    <TouchableOpacity
                        style={{ 
                        alignItems: "flex-end",
                        marginTop:"10%",
                        marginRight:"7%",
                        borderColor: '#008999',
                        borderRadius: 15,
                        borderWidth: 1,
                        marginLeft: "75%",
                        height: 27,
                        alignContent: 'center' }}
                        
                        // onPress={() => {
                        //     this.props.navigation.openDrawer();
                        // }}
                        onPress={() => navigation.navigate('Logout')}
                    >
                        <Text style={{textAlign: 'center',fontFamily: 'Montserrat-Bold', color: '#008999'}}> Cerrar sesión  </Text>

                    </TouchableOpacity>
            </View>
        );
    }
export default Logout;

// const style= StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor:"#FFFf",
//         paddingTop: 20
//     },
//     text: {
//         color: "#161924",
//         fontSize: 20,
//         fontWeight: "500"
//     }
// })

