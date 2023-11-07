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
        <Icon name="ios-home-outline" size={22} color={colors.border} />
      );
    }
    if (title == 'List Item') {
      return active ? (
        <Icon name="ios-list" size={22} color={colors.blue} />
      ) : (
        <Icon name="ios-list-outline" size={22} color={colors.border} />
      );
    }
    if (title == 'Profile') {
      return active ? (
        <Icon name="person" size={22} color={colors.blue} />
      ) : (
        <Icon name="person-outline" size={22} color={colors.border} />
      );
    }

    return <Icon name="ios-home" size={22} color={colors.border} />;
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
