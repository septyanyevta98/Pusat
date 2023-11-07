import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../atoms/Button';
const MChooseImage = ({
  isVisible,
  onPressPhoto,
  onPressGaleri,
  onBackButtonPress,
  onPressTutup,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      style={styles.view2}>
      <View style={styles.content}>
        <View style={{padding: 10}}>
          <Button title="Ambil Photo" onPress={onPressPhoto} />
          <View style={{marginTop: 10}}>
            <Button title="Pilih dari Galeri" onPress={onPressGaleri} />
          </View>
          <View style={{marginTop: 10}}>
            <Button title="Tutup" onPress={onPressTutup} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MChooseImage;

const styles = StyleSheet.create({
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
});
