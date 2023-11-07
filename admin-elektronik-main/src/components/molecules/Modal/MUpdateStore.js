import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {colors} from '../../../utils';
import Button from '../../atoms/Button';
const MUpdateStore = ({
  isVisible,
  testID,
  value,
  onChangeText,
  value2,
  onChangeText2,
  onPress,
  onPressClose,
}) => {
  return (
    <Modal testID={testID} isVisible={isVisible} style={styles.view2}>
      <View style={styles.content}>
        <TextInput
          placeholder="Nama Toko"
          value={value}
          onChangeText={onChangeText}
          style={{borderBottomColor: colors.border, borderBottomWidth: 1}}
        />
        <TextInput
          placeholder="Alamat"
          value={value2}
          onChangeText={onChangeText2}
          style={{borderBottomColor: colors.border, borderBottomWidth: 1}}
        />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1, marginRight: 10}}>
            <Button title="Close" onPress={onPressClose} />
          </View>
          <View style={{flex: 1}}>
            <Button title="Ubah" onPress={onPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MUpdateStore;

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
    padding: 10,
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
