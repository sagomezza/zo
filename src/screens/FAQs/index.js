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
            body: 'El cierre de caja solo se hace una vez en el día. Si estás en el turno de la mañana debes realizarlo luego de iniciar sesión con tu usuario.'+
            'En la parte superior izquierda de la aplicación encontraras 3 líneas horizontales, al presionar allí se despliegan varias opciones; vamos a ir a la que dice Cierre de caja. Una vez ahí, vas a presionar el botón “generar cierre de caja” Nos mostrará el valor que debemos tener en efectivo, debemos ingresar la base y el valor producido durante todo el día (los tres turnos) presionamos el botón guardar.'+
            'Nos van a aparecer todos los cierres de caja y al lado un aviso de abierto o cerrado. Cuando llegue el mensajero por el dinero vamos a ingresar al cierre de la fecha actual presionando sobre el, nos aparece un campo para que el personal que recoge el dinero firme, clic en save y luego en guardar. Después de hacer este proceso de firma el cierre nos debe aparecer como: cerrado'
        },
        {
            title: '¿Cómo creo una mensualidad nueva?',
            body: 'En la parte superior izquierda de la aplicación encontraras 3 líneas horizontales, al presionar allí se despliegan varias opciones; vamos a ir a la que dice Mensualidades.' +
            ' 1) Digitamos la placa de la cual deseamos crear la mensualidad '+
            ' 2) Clic en Buscar '+
            ' 3) Clic en Crear '+
            ' 4) Vamos a diligenciar todos los campos: Nombre, apellidos, cédula, celular, correo y placa(s) '+
            ' 5) Guardar ' +
            ' El correo electrónico no es un campo obligatorio pero es importante que la mayor parte de nuestros clientes nos lo brinden. De esta manera ya quedó creada la mensualidad, puedes verificarlo buscando la placa en la pestaña de mensualidades y que te registre toda la información.'
        },
        {
            title: '¿Cómo renuevo una mensualidad?',
            body: 'En la parte superior izquierda de la aplicación encontraras 3 líneas horizontales, al presionar allí se despliegan varias opciones; vamos a ir a la que dice Mensualidades'+
            ' 1) Digitamos la placa de la cual deseamos renovar la mensualidad '+
            ' 2) Clic en Pagar/renovar '+
            ' 3) En el campo “pago” vamos a escribir el valor que nos entrega el cliente '+
            ' 4)  Renovar ' +
            'De esta manera ya quedó renovada la mensualidad, puedes verificarlo buscando la placa en la pestaña de mensualidades y que te registre la vigencia actualizada hasta el día 5 del mes siguiente'
        },
        {
            title: '¿Cómo edito los datos de una mensualidad existente?',
            body: 'En la parte superior izquierda de la aplicación encontraras 3 líneas horizontales, al presionar allí se despliegan varias opciones; vamos a ir a la que dice Mensualidades.' +
            'Digitamos la placa de la cual deseamos editar la mensualidad, Clic en editar. En esta pantalla podremos editar datos como: correo, número de celular y agregar o quitar placas' +
            'Debemos tener en cuenta que solo podemos editar desde la aplicación las mensualidades de persona natural. Cualquier novedad con las mensualidades corporativas deben ser reportadas al supervisor.'
        },

        {
            title: '¿Cómo cambio un vehículo parqueado por horas a pase día?',
            body: 'Para cambiar un vehículo parqueado ocasional a pase día, vamos a ir a la pestaña ingresos, digitamos la placa del vehículo y el número de celular, luego vamos a poner un check en el cuadro que dice PASE DÍA y le damos clic en el botón Iniciar.'
        },
        {
            title: '¿Cómo edito los datos de una mensualidad existente?',
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
