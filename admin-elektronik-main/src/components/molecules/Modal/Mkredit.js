import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../atoms/Button';
import Modal from 'react-native-modal';

const MKredit = ({
  batal,
  title,
  ok,
  respon,
  testID,
  isVisible,
  onSwipeComplete,
}) => {
  return (
    <Modal
      testID={testID}
      isVisible={isVisible}
      onSwipeComplete={onSwipeComplete}
      style={styles.view2}>
      <View style={styles.content}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.respon}>sisa pembayaran : {respon}</Text>
        <View style={styles.button}>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Button title="Batal" type="batal" onPress={batal} />
          </View>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Button title="OK" type="Konfirmasi" onPress={ok} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MKredit;

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
    fontSize: 15,
    paddingHorizontal: 27,
    marginTop: 20,
  },
});
