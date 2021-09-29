import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  topImage: {
    flex: 1,
    width: '100%',
    height: '43%',
    flexDirection: 'column'
  },
  bottomContainer: {
    height: '64.5%',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '85%',
    height: '10%',
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'space-between',
  },
  bikeCounter: {
    height: '25%',
    width: '90%',
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center'
  },
  bikeImage: {
    width: "30%",
    height: "80%",
    marginLeft: '1%',
  },
  carImage: {
    width: "30%",
    height: "80%",
    marginLeft: '1%',
  },
  listContainer: {
    height: '75%',
    width: '87%',
    marginTop: '2%',
  },
  list: {
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
    marginTop: '3%',
    borderRadius: 7,
    justifyContent: 'space-around',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  plateContainer: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '26%',
    justifyContent: 'center',
  },
  cellContainer: {
    height: '25%',
    width: '90%',
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  plateInput: {
    width: '35%',
    height: '78%',
    margin: '4%',
    backgroundColor: '#19A9A0',
    borderRadius: 15
  },
  plateInputTextBig: {
    fontSize: width * 0.055,
    color: '#FFF200',
    fontFamily: 'Montserrat-Bold',
  },
  plateInputTextBig2: {
    fontSize: width * 0.055,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  totalCellsText: {
    fontSize: width * 0.025,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
    marginTop: '12%',
    marginLeft: '3%'
  },
  plateInputTextSmall: {
    fontSize: width * 0.025,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left',
    paddingLeft: '12%',
    marginTop: '2%'
  },
  textPlaca: {
    fontSize: width * 0.023,
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold',
    marginTop: '0%',
    width: '15%',
    height: '100%',
    textAlign: 'center'
  },
  titleText:{
    fontSize: width * 0.023,
    color: '#6F6F7B',
    fontFamily: 'Montserrat-Bold',
  },
  textListTitle: {
    fontSize: width * 0.023,
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left'
  },
  textListTitleInact: {
    fontSize: width * 0.023,
    color: '#B0B1B7',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'left'
  },
  dateDaysText: {
    fontSize: width * 0.02,
    color: '#6F6F7B',
    fontFamily: 'Montserrat-Medium'
  },
  totalHours: {
    fontSize: width * 0.02,
    color: '#6F6F7B',
    fontFamily: 'Montserrat-Medium',
    width: '20%',
    textAlign: 'center'
  },
  dateHourText: {
    fontSize: width * 0.02,
    color: '#19A9A0',
    fontFamily: 'Montserrat-Medium'
  },
  textMoney: {
    fontSize: width * 0.02,
    color: '#6F6F7B',
    fontFamily: 'Montserrat-Medium'
  },
  footerContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    height: normalize(500),
    width: '65%',
    padding: '5%',
    borderRadius: 50,
    borderColor: '#707070',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#FFF',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0,
    shadowRadius: 50,
    elevation: 5,
    flexDirection: 'column',
    borderWidth: 1

  },
  modalTextAlert: {
    textAlign: "center",
    fontFamily: 'Montserrat-Regular',
    color: 'gray',
    fontSize: normalize(22),
    margin: '2%'
  },
  modalButton: {
    width: '100%',
    height: '70%',
  },
  flatlistButton: {
    width: '49%',
    justifyContent: 'center',
    height: '100%'
  },
  flatlistButtonSelected: {
    width: '49%',
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 2,
    borderColor: '#D1D0D0'
  },
  textPago: {
    fontSize: width * 0.02,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
},
});

export default styles;
