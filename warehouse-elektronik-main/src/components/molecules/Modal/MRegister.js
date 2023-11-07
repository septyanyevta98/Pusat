import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../atoms/Button';
const MRegister = ({batal, title, ok, respon}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.respon}>{respon}</Text>

      <View style={styles.button}>
        {/* <View style={{flex: 1, paddingHorizontal: 10}}>
          <Button title="Batal" type="batal" onPress={batal} />
        </View> */}
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Button title="OK" type="OK" onPress={ok} />
        </View>
      </View>
    </View>
  );
};

export default MRegister;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  respon: {
    paddingHorizontal: 27,
    fontSize: 14,
    marginTop: 11,
    marginBottom: 20,
  },
  content: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 17,
    marginHorizontal: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingHorizontal: 27,
    marginTop: 20,
  },
});
