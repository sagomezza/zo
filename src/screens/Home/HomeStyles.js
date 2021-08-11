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
    height: '38%',
    width: '73%',
    backgroundColor: '#FFFFFF',
    marginTop: '2%',
    borderRadius: 10,
  },
  list: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E9E9E9",
    marginBottom: '2%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '0%'
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
    fontSize: width * 0.03,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Bold'
  },
  textListTitle: {
    fontSize: width * 0.025,
    color: '#00A9A0',
    fontFamily: 'Montserrat-Bold'
  },
  textPago: {
    fontSize: width * 0.02,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
  },
  textMoney: {
    fontSize: width * 0.034,
    color: '#5D5D5D',
    fontFamily: 'Montserrat-Regular'
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
});

export default styles;
