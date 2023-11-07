import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../utils';

const ListCategory = ({title, onPressDelete, onPressEdit, image}) => {
  return (
    <View style={styles.content}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4, flexDirection: 'row'}}>
          <Image
            source={image}
            style={{
              height: 80,
              width: 80,
              marginRight: 10,
              resizeMode: 'cover',
            }}
          />
          <Text style={{fontSize: 20}}>{title}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={onPressEdit}
            style={{
              backgroundColor: 'orange',
              flex: 1,
              padding: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDelete}
            style={{
              backgroundColor: colors.red,
              flex: 1,
              padding: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  content: {
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    borderColor: colors.border,
    borderWidth: 1,
    marginVertical: 5,
  },
});
