import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../atoms/Button';
const MDelete = ({onPressBatal, title, onPressOk, respon, item}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.header}>{title}</Text>
      <Text style={{marginHorizontal: 27}}>{respon}</Text>
      <Text style={{marginHorizontal: 27, marginBottom: 10}}>{item}</Text>
      <View style={styles.button}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Button title="Batal" type="batal" onPress={onPressBatal} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Button title="OK" type="Konfirmasi" onPress={onPressOk} />
        </View>
      </View>
    </View>
  );
};

export default MDelete;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  respon: {
    paddingHorizontal: 27,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
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
