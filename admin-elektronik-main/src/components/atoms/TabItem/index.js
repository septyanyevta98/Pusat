import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';
const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icons = () => {
    if (title == 'Home') {
      return active ? (
        <Icon name="ios-home" size={22} color={colors.blue} />
      ) : (
        <Icon name="ios-home-outline" size={22} color={colors.gray} />
      );
    }
    if (title == 'Kredit') {
      return active ? (
        <Icon name="receipt" size={22} color={colors.blue} />
      ) : (
        <Icon name="receipt-outline" size={22} color={colors.gray} />
      );
    }
    if (title == 'History') {
      return active ? (
        <Icon name="ios-list" size={22} color={colors.blue} />
      ) : (
        <Icon name="ios-list-outline" size={22} color={colors.gray} />
      );
    }
    if (title == 'Pegawai') {
      return active ? (
        <Icon name="person-add" size={22} color={colors.blue} />
      ) : (
        <Icon name="person-add-outline" size={22} color={colors.gray} />
      );
    }

    return <Icon name="ios-home" size={22} color={colors.gray} />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icons />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: (active) => ({
    fontSize: 10,
    color: active ? colors.blue : colors.border,
    // maxWidth: 30,
  }),
});
