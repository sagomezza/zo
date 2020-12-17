import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import FooterIndex from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import Button from '../../components/Button';
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL } from "../../config/api";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from '../../config/store';
import moment from 'moment';
import numberWithPoints from '../../config/services/numberWithPoints';

const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialProps.hq[0]
        });
        // console.log(response.data)
        if (response.data.response === 1) {

          store.dispatch(actions.setRecips(response.data.data.finished));
        }
      } catch (error) {
        //console.log("err: ", error);
      }
    };

    const updateExpoToken = async () => {
      try {
        await instance.post(EDIT_OFFICIAL, {
          id: officialProps.id,
          expoToken: props.expoToken.expoToken
        });
      } catch (err) {
        console.log(err)
      }
    }

    const readHq = async () => {
      try {
        const response = await instance.post(READ_HQ, {
          id: officialHq
        });
        if (response.data.response) {
          store.dispatch(actions.setReservations(response.data.data.reservations));
          store.dispatch(actions.setHq(response.data.data));
        }
      } catch (error) {
        console.log("err: ", error);
      }
    };

    getRecips();
    // getShiftRecips();
    readHq();
    updateExpoToken();
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ heigth: '14%' }} >
          <Button onPress={() => navigation.navigate("Logout")}
            title="Cerrar sesión"
            color="transparent"
            style={{
              borderWidth: 1,
              borderColor: "#008999",
              alignSelf: 'flex-end',
              width: '30%',
              heigth: '10%',
              marginRight: '5%',
              marginTop: '6%',
              paddingHorizontal: '2%'
            }}
            textStyle={{ color: "#008999" }} />
        </View>
        <View style={{ alignItems: "flex-end", width: '100%', height: '20%' }}>
          <View style={HomeStyles.plateContainer}>
            <View style={HomeStyles.plateInput}>
              <Image style={{ width: "24%", height: "24%", marginTop: "5%", marginLeft: "5%" }} resizeMode={"contain"} source={require('../../../assets/images/TrazadoM.png')} />
              <View flexDirection='row' height='100%'>
                <Text style={HomeStyles.plateInputTextBig}>
                  {`${hq.availableBikes}`}
                </Text>
                <Text style={HomeStyles.plateInputTextSmall} >{`/${hq.totalBikes}`}</Text>
              </View>

            </View>
            <View style={HomeStyles.plateInput}>
              <Image style={{ width: "25%", height: "25%", marginTop: "5%", marginLeft: "5%" }} resizeMode={"contain"} source={require('../../../assets/images/TrazadoC.png')} />
              <View flexDirection='row' height='100%' >
                <Text style={HomeStyles.plateInputTextBig}>
                  {`${hq.availableCars}`}
                </Text>
                <Text style={HomeStyles.plateInputTextSmall} >{`/${hq.totalCars}`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: '72%', paddingBottom: '10%' }}>
          <View style={{ marginLeft: '13%', marginBottom: '2%' }}>
            <Text style={HomeStyles.textPago} >Historial de pagos</Text>
          </View>
          <View style={{ height: "49%" }}>
            {recips.recips.length > 0 ?
              <FlatList
                style={{ height: "37%" }}
                data={recips.recips}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                  return (
                    <View style={{ flexDirection: "row", position: 'relative', borderBottomWidth: 1, borderColor: "#008999", marginBottom: '4%', marginLeft: '14%', marginRight: '13%', marginTop: '2%' }} >
                      <View style={{ marginBottom: '2%' }} >
                        <Text style={HomeStyles.textPlaca}>{item.plate}</Text>
                        <Text style={HomeStyles.textPago}>{`Pago por ${item.hours} horas`}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }} >
                        <Text style={HomeStyles.textMoney}>{`$${numberWithPoints(item.total)}`}</Text>
                      </View>
                    </View>
                  )
                }}
              />
              :
              <View style={{ marginLeft: '13%', padding: '10%' }}>
                <Text style={HomeStyles.textPago}> No se encuentran registros en el historial </Text>
              </View>
            }
          </View>
          <View style={{ height: "36%", marginTop: '4%' }}>
            <View style={{ marginLeft: '13%', marginBottom: '2%' }}>
              <Text style={HomeStyles.textPago}>Vehículos parqueados</Text>
            </View>

            {reservations.reservations.length > 0 ?
              <FlatList
                styles={{ marginTop: '2%' }}
                data={reservations.reservations}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                  return (
                    <View style={{ flex: 1, flexDirection: "row", position: 'relative', borderBottomWidth: 1, borderColor: "#FFFFFF", marginLeft: '14%', marginRight: '13%', marginTop: '4%' }} >
                      <View style={{ marginBottom: 10, marginleft: 10 }} >
                        <Text style={HomeStyles.textPlaca} >{item.plate}</Text>
                        <Text style={HomeStyles.textPago}>{item.verificationCode}</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }} >
                        <Text style={HomeStyles.textMoney}>{moment(item.dateStart).format('LT')}</Text>
                        <Text style={HomeStyles.textPago}>Pago por horas</Text>
                      </View>
                    </View>

                  )
                }}
              /> :
              <View style={{ marginLeft: '13%', padding: '10%' }}>
                <Text style={HomeStyles.textPago}>No hay parqueos activos en este momento</Text>
              </View>
            }
          </View>
          <FooterIndex navigation={navigation} />
        </View>
    </View>
  );
};


const mapStateToProps = (state) => ({
          officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken
});

export default connect(mapStateToProps, actions)(HomeIndex);
