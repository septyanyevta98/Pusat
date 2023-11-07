import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';

const ListHistory = ({trx, tanggal, bayar, kembalian, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 8,
      }}
      onPress={onPress}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'black'}}>{trx}</Text>
          <Text style={{color: 'black'}}>{tanggal}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <NumberFormat
            value={bayar}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp '}
            renderText={(value) => (
              <Text style={{color: 'black'}}>{value}</Text>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="ios-chevron-forward" size={22} color={colors.grey1} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ListHistory;

const styles = StyleSheet.create({});
