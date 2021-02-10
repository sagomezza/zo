// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Button,
//   StyleSheet,
//   NativeModules,
//   Platform,
//   Text,
//   View
// } from 'react-native';


// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNPrint from 'react-native-print';

// export default class RNPrintExample extends Component {
//   state = {
//     selectedPrinter: null
//   }

//   // @NOTE iOS Only
//   selectPrinter = async () => {
//     const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
//     this.setState({ selectedPrinter })
//   }

//   // @NOTE iOS Only
//   silentPrint = async () => {
//     if (!this.state.selectedPrinter) {
//       alert('Must Select Printer First')
//     }

//     const jobName = await RNPrint.print({
//       printerURL: this.state.selectedPrinter.url,
//       html: '<h1>Silent Print</h1>'
//     })

//   }

//   async printHTML() {
//     await RNPrint.print({
//       html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
//     })
//   }

//   async printPDF() {
//     const results = await RNHTMLtoPDF.convert({
//       html: '<h1>Custom converted PDF Document</h1>',
//       fileName: 'test',
//       base64: true,
//     })

//     await RNPrint.print({ filePath: results.filePath })
//   }

//   async printRemotePDF() {
//     await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
//   }

//   customOptions = () => {
//     return (
//       <View>
//         {this.state.selectedPrinter &&
//           <View>
//             <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
//             <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
//           </View>
//         }
//       <Button onPress={this.selectPrinter} title="Select Printer" />
//       <Button onPress={this.silentPrint} title="Silent Print" />
//     </View>

//     )
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && this.customOptions()}
//         <Button onPress={this.printHTML} title="Print HTML" />
//         <Button onPress={this.printPDF} title="Print PDF" />
//         <Button onPress={this.printRemotePDF} title="Print Remote PDF" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

// Example to Make PDF in React Native from HTML Text
// https://aboutreact.com/make-pdf-in-react-native-from-html-text/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";

import Header from '../../components/Header/HeaderIndex';


const RNPrintExample = (props) => {
  const [filePath, setFilePath] = useState('');
  const { navigation, officialProps } = props;

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html:
          '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
        //File Name
        fileName: 'test',
        //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header navigation={navigation} />
      <Text style={styles.titleText}>
        PDF cierre de caja
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={createPDF}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Crear PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{filePath}</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
});
export default connect(mapStateToProps, actions)(RNPrintExample);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
});