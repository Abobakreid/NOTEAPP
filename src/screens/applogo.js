/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import PushNotification from 'react-native-push-notification';

const Applogo = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'note-notification', // (required)
      channelName: 'Note-Notification', // (required)
    });
  };

  return (
    <View style={styles.body}>
      <ImageBackground
        style={styles.backimage}
        source={require('../../assets/images/back.png')}
        resizeMode={'cover'}>
        <Text style={[styles.text]}>NOTES</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  backimage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  text: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Applogo;
