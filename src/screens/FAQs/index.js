import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from 'accordion-collapse-react-native';
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

    const FAQs = [
        {
            title: '¿Cómo inicio sesión?',
            body: 'Para iniciar sesión debe realizarse al inicio del turno, revise por favor que la sesión anterior esté cerrada en el dispositivo y posteriormente inicie con el usuario y contraseña que le ha sido asignado.'
        },
        {
            title: '¿Cómo y en qué momento debo hacer el cierre de caja?',
            body: 'ingrese en el menú lateral izquierdo a la función de cierre de caja, revise las transacciones del día y haga clic en el botón Generar cierre de caja.  RECUERDE:  NO realizar esta acción diariamente puede traer inconvenientes en el sistema contable del parqueadero.'
        },
        {
            title: '¿Qué debo hacer después de realizado el cierre de caja?',
            body: 'RECUERDE, realizar el cierre de turno, para ello , compruebe estar en su sesión, comprobar tiempo de inicio y tiempo de salida, base y dinero en efectivo entregado. Cuando verifique esta información por favor haga clic en el botón de cierre de turno.  es muy importante hacer este cierre de turno para que el funcionario posterior pueda ingresar su información.'
        },
        {
            title: '¿Cómo creo una mensualidad nueva?',
            body: 'Para crear una mensualidad por favor ingrese en el menú lateral izquierdo a la sección mensualidades, posteriormente de clic en el botón crear mensualidades, ingrese todos los datos al formulario y dele clic al botón Guardar.  RECUERDE: usted podrá crear mensualidades en  cualquier día del mes pero debe notificar al usuario que al hacerlo posterior al día 5, se realizará el cobro completo de la mensualidad y debe renovarla entre el 1 y 5 del siguiente mes.'
        },
        {
            title: '¿Cómo renuevo una mensualidad?',
            body: '...'
        },
        {
            title: '¿Cómo edito los datos de una mensualidad existente?',
            body: '...'
        },
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
                            height: '90%',
                            width: '98%',
                            backgroundColor: '#F8F8F8',
                            marginTop: '0%',
                            borderRadius: 10,
                        }}>
                            <FlatList
                                style={{ height: "37%" }}
                                data={FAQs}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item }) => {
                                    return (
                                        <Collapse style={styles.collapseContainer}>
                                            <CollapseHeader>
                                                <View>
                                                    <Text style={styles.title}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <Text style={styles.bodyText}>
                                                    {item.body}
                                    </Text>
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
