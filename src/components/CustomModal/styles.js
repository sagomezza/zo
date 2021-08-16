import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    height: normalize(590),
    width: '75%',
    padding: '5%',
    borderRadius: 30,
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
  modalInfoContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    padding: "2%",
  },
  iconTitleContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalTextTitle: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.047,
  },
  stepContainer: {
    height: '24%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  modalNum: {
    fontFamily: 'Montserrat-Bold',
    color: '#00A9A0',
    fontSize: width * 0.07,
  },
  modalText: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    color: '#8F8F8F',
    fontSize: width * 0.03,
  },
  modalButton: {
    width: '100%',
    height: '90%',
  },
  modalButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: width * 0.03,

  }
})
export default styles;
