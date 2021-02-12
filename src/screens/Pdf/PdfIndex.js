
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Share
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Button from "../../components/Button"
import moment from 'moment';
import Header from '../../components/Header/HeaderIndex';
import PdfStyles from '../Pdf/PdfStyles'
import normalize from '../../config/services/normalizeFontSize';
import FooterIndex from '../../components/Footer';

const txtGenerator = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const totalRecips = recips.recips !== undefined ? recips.recips : "";
  const [dataToday, setDataToday] = useState([]);
  const [date1, setDate1] = useState(new Date(moment().subtract(1, 'days')));
  const [date2, setDate2] = useState(new Date());
  console.log(date1)
  console.log(totalRecips[0])

  useEffect(() => {

    try {
      const todayRecips = totalRecips.filter(recip => moment(recip.dateFinished).isBetween(date1, date2))
      console.log("------------end1----------")
      console.log(todayRecips)
      console.log("------------end2----------")

      setDataToday(todayRecips)
    } catch (err) {
      console.log(err)

    }
  }, [date1, date2]);

  const txtData = () => {
    let bikeHour = "EFECTIVO;MOTOHORA;"
    let carHour = "EFECTIVO;CARROHORA;"
    let bikeFlypass = "FLYPASS;MOTOHORA;"
    let carFlypass = "FLYPASS;CARROHORA;"
    let bikeHourTotal = 0
    let carHourTotal = 0
    let bikeFlypassTotal = 0
    let carFlypassTotal = 0
    let bikeHourCounter = 0
    let carHourCounter = 0
    let bikeFlypassCounter = 0
    let carFlypassCounter = 0

    dataToday.forEach(data => {
      if (data.prepayFullDay) {
        if (data.type === "car") {
          data.change < 0 ? carFlypassTotal += data.cash : carFlypassTotal += data.total;
          carFlypassCounter += 1;
        } else {
          data.change < 0 ? bikeFlypassTotal += data.cash : bikeFlypassTotal += data.total;
          bikeFlypassCounter += 1;
        }
      } else {
        if (data.type === "car") {
          data.change < 0 ? carHourTotal += data.cash : carHourTotal += data.total;
          carHourCounter += 1;
        }
        else {
          data.change < 0 ? bikeHourTotal += data.cash : bikeHourTotal += data.total;
          bikeHourCounter += 1;
        }
      }
    })

    carHour += carHourTotal + ';' + carHourCounter + ';' + `765467;487;PUNTO DE PAGO ASISTIDO PMO${"\n"}`
    bikeHour += bikeHourTotal + ';' + bikeHourCounter + ';' + `765467;487;PUNTO DE PAGO ASISTIDO PMO${"\n"}`
    carFlypass += carFlypassTotal + ';' + carFlypassCounter + ';' + `765467;487;PUNTO DE PAGO ASISTIDO PMO${"\n"}`
    bikeFlypass += bikeFlypassTotal + ';' + bikeFlypassCounter + ';' + `765467;487;PUNTO DE PAGO ASISTIDO PMO${"\n"}`

    const sum = carHour + bikeHour + carFlypass + bikeFlypass
    return sum

  }

  const txt = txtData()


  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'TXT',
        message:
          `${txt}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


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
        <View style={PdfStyles.container}>
          <View style={PdfStyles.listContainer}>
            <Button onPress={onShare}
              title="G U A R D A R"
              color='#00A9A0'
              style={{
                borderWidth: normalize(1),
                borderColor: "#707070",
                alignSelf: 'center',
                width: '69%',
                heigth: '15%',
                margin: '2%',
                paddingHorizontal: '15%',
                paddingVertical: '1%'
              }}
              textStyle={{ color: "#FFFFFF", fontFamily: 'Montserrat-Bold', fontSize: normalize(20), }}
            // activityIndicatorStatus={loading}
            />

          </View>
          <View style={{
            height: '17%',
            width: '100%',
            justifyContent: 'flex-end'
          }}>
            <FooterIndex navigation={navigation} />
          </View>
        </View>
      </ImageBackground>


    </View>



  );
}

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken

});

export default connect(mapStateToProps, actions)(txtGenerator);








