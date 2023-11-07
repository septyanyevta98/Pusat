import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const MEdit = ({
  isVisible,
  value,
  onChangeText,
  pressCancel,
  pressOk,
  product,
  kurangBarang,
  tambahBarang,
  jumlahBarang,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.text}>Menambahkan {product} ?</Text>
        </View>
        <Input
          placeholder="Harga Barang..."
          value={value}
          onChangeText={onChangeText}
        />
        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.button} onPress={kurangBarang}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{paddingHorizontal: 10}}>{jumlahBarang}</Text>
          <TouchableOpacity style={styles.button} onPress={tambahBarang}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
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

export default MEdit;

const styles = StyleSheet.create({
  wrapperButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  text: {fontSize: 17, marginVertical: 3},
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
