import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from '../../atoms';

const ModalDelete = ({isVisible, nama_barang, pressCancel, pressOk}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <Text>menghapus {nama_barang} dari Card?</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <Button title="Batal" onPress={pressCancel} type="cancel" />
          </View>
          <View style={{flex: 1, marginHorizontal: 5}}>
            <Button title="OK" onPress={pressOk} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDelete;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 17,
  },
});
