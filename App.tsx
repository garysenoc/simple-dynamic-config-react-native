/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Linking, Image} from 'react-native';

import {Button} from 'react-native-paper';

import customData from './config/config.json';

const App = () => {
  const [customData, setCustomData] = useState();
  // const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fromFetch, setFromFetch] = useState(false);
  const goForFetch = async () => {
    setFromFetch(true);
    setLoading(true);
    await fetch(
      'https://raw.githubusercontent.com/garysenoc/simple-dynamic-config-react-native/master/sample1.json',
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('getting data from fetch', responseJson);
        setTimeout(() => {
          setLoading(false);
          setCustomData(responseJson);
        }, 2000);
      })
      .catch(error => console.log(error));
  };
  // const getUsers = async () => {
  //   await fetch(
  //     'https://raw.githubusercontent.com/garysenoc/simple-dynamic-config-react-native/master/sample1.json',
  //   )
  //     .then(response => {
  //       response.json();
  //     })
  //     .then(json => setCustomData(json))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));

  //   console.log(customData);
  // };
  useEffect(() => {
    setLoading(true);
    goForFetch();
    // console.log(customData);
    // console.log(users);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${customData?.backgroundColor}`,
      }}>
      <View style={styles.textContainer}>
        {customData?.image?.show && (
          <Image
            source={{uri: `${customData?.image.url}`}}
            style={{
              width: customData?.image.width,
              height: customData?.image.height,
            }}
          />
        )}
        {customData?.title?.show && (
          <Text
            style={{
              fontSize: customData?.title.size,
              fontWeight: 'bold',
              color: customData?.title.color,
            }}>
            {customData?.title.text}
          </Text>
        )}
        {customData?.description?.show && (
          <Text
            style={{
              fontSize: customData?.description.size,
              fontWeight: 'bold',
              color: customData?.description.color,
            }}>
            {customData?.description.text}
          </Text>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.buttonContainer}>
          {customData?.call?.show && (
            <Button
              icon={customData?.call.logo}
              mode="contained"
              color={customData?.call.color}
              onPress={() => {
                Linking.openURL(`tel:${customData?.call.value}`);
              }}>
              {customData?.call.text}
            </Button>
          )}
          {customData?.email?.show && (
            <Button
              icon={customData?.email.logo}
              color={customData?.email.color}
              mode="contained"
              onPress={() => {
                Linking.openURL(`mailto:${customData?.email.value}`);
              }}>
              {customData?.email.text}
            </Button>
          )}
          {customData?.link?.show && (
            <Button
              icon={customData?.link.logo}
              color={customData?.link.color}
              mode="contained"
              onPress={() => {
                Linking.openURL(`https://${customData?.link.value}`);
              }}>
              {customData?.link.text}
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: `${customData?.backgroundColor}`,
  // },
  title: {
    fontSize: customData?.title.size,
    fontWeight: 'bold',
    color: customData?.title.color,
  },

  textContainer: {
    width: '80%',
    marginBottom: 100,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  description: {
    fontSize: customData?.description.size,
    fontWeight: 'bold',
    color: customData?.description.color,
  },
});

export default App;
