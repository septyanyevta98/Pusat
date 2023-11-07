import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors} from '../../../utils';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const Loading = () => {
  return (
    <View style={styles.wrapper}>
      {/* <ActivityIndicator size="large" color={colors.blue} /> */}
      <SkypeIndicator color={colors.blue} size={45} />
      {/* <Text style={styles.text}>Loading ...</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  text: {
    fontSize: 16,
    marginTop: 16,
    color: colors.blue,
  },
});
