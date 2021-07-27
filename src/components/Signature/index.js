import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

const styles = StyleSheet.create({
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});

const SignatureScreen = () => {
  const [signature, setSign] = useState(null);
  const [signatureUri, setSignatureUri] = useState("")

  // const handleSignature = signature => {
  //   console.log(signature);
  //   setSign(signature);
  // };

  const handleEmpty = () => {
    // console.log('Empty');
  }

  const handleSignature = signature => {
    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), { encoding: FileSystem.EncodingType.Base64 }).then(res => {
      // console.log(res);
      FileSystem.getInfoAsync(path, { size: true, md5: true }).then(file => {
        // console.log(file);
        setSignatureUri(file.uri)

      })
    }).catch(err => {
      // console.log("err", err);
    })
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: gray;
      color: #FFF;
    }`;

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </View> */}
      <Signature
        onOK={handleSignature}
        onEmpty={handleEmpty}
        descriptionText=""
        clearText="Clear"
        confirmText="Save"
        webStyle={style}
      />
    </View>
  );
}

export default SignatureScreen;
