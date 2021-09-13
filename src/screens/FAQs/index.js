import React from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList,
} from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';
import { Video } from 'expo-av';
import Header from '../../components/Header/HeaderIndex';
import styles from './styles';
import FooterIndex from '../../components/Footer';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
// import { storage } from "../../config/firebase/index";

const FAQs = (props) => {
    const { navigation  } = props;
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const FAQs = [
        {
            title: '¿ Cómo inicio sesión ?',
            dir: require('../../../assets/videos/IniciarSesion.mp4')
        },
        {
            title: '¿ Cómo cierro mi turno ?',
            dir: require('../../../assets/videos/CerrarTurno.mp4')
        },
        {
            title: '¿ Cómo dejo un saldo pendiente ?',
            dir: require('../../../assets/videos/DejarSaldoPendiente.mp4')
        },
        {
            title: '¿ Cómo pago un saldo pendiente ?',
            dir: require('../../../assets/videos/PagarSaldoPendiente.mp4')
        },
        {
            title: '¿ Cómo vendo un pase día ?',
            dir: require('../../../assets/videos/VentaPaseDia.mp4')
        },
        {
            title: '¿ Cómo creo una mensualidad nueva ?',
            dir: require('../../../assets/videos/CrearMensualidad.mp4')
        },
        {
            title: '¿ Cómo edito los datos de una mensualidad ?',
            dir: require('../../../assets/videos/EditarMensualidad.mp4')
        },
        {
            title: '¿ Cómo renuevo una mensualidad ?',
            dir: require('../../../assets/videos/RenovarMensualidad.mp4')
        }
    ]

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
                        <Text style={styles.textListTitle} >PREGUNTAS FRECUENTES</Text>

                        <View style={{
                            flex: 1,
                            width: '98%',
                            marginTop: '1%',
                            borderRadius: 10
                        }}>
                            <FlatList
                                data={FAQs}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item }) => {
                                    return (
                                        <Collapse style={styles.collapseContainer}>
                                            <CollapseHeader >
                                                <View>
                                                    <Text style={styles.title}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody style={{ justifyContent: 'center' }}>
                                                {/* {renderVideo(item.uri)} */}
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                       
                                                    }}
                                                >
                                                    <Video
                                                        ref={videoRef}
                                                        style={{
                                                            alignSelf: 'center',
                                                            width: 350,
                                                            height: 300,
                                                        }}
                                                        source={item.dir}
                                                        useNativeControls
                                                        resizeMode="contain"
                                                        isLooping
                                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                                    />
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    )
                                }}
                            />
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
