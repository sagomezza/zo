import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  darkenSection: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  plateContainer:{
    flex: 1, 
  },
  middleSection: {
    flex: 1.3,
    backgroundColor: "transparent",
    flexDirection: "row",

  },
  header: {
    paddingTop: "5%",
    paddingBottom: "10%",
  },
  backIcon: {
    marginLeft: "2%",
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  qrSquare: {
    flex: 4,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#F8F8F8",
    borderRadius: 0

  },
  flashlightContainer: {
    backgroundColor: "white",
    borderRadius: 70 / 2,
    width: 70,
    height:70,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  noEntranceText: {
    fontSize: 25,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  noHourText: {
    fontSize: 25,
    paddingLeft: "5%",
    paddingRight: "5%",
    marginBottom: 10,
  },
  // plateInput: {
  //   width: 140, 
  //   height: 80,
  //   borderColor: 'gray', 
  //   margin: 10, 
  //   borderWidth: 1,
  //   borderRadius: 20,
  //   fontSize: 50
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    
  },
  modalView: {
    height: 200,
    padding: 35,
    borderRadius:20,
    borderColor: '#707070',
    borderWidth: 1,
    justifyContent: 'space-around',
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
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    borderColor: '#D9D9D9',
    borderWidth:1
  },
  textStyle: {
    color: "gray",
    textAlign: "center",
    fontFamily: 'Montserrat-Bold'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Montserrat-Regular'
  }
});

export default styles;