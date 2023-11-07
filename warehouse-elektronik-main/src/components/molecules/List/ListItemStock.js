import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils';
import NumberFormat from 'react-number-format';
const ListItemStock = ({
  onPressDelete,
  onPressDetail,
  onPressEdit,
  nama_barang,
  harga_beli,
  harga_jual,
  stock,
  image,
  category_name,
  brand_name,
  sku,
}) => {
  return (
    <>
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <View style={{marginLeft: 10}}>
            <Text style={styles.text}>
              {category_name} - {sku}
            </Text>
            <Text style={styles.text}>
              {brand_name} / {nama_barang}
            </Text>
            <Text style={styles.text}>{stock} tersedia</Text>
          </View>
          <View>
            <NumberFormat
              value={harga_beli}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp '}
              renderText={(value) => <Text style={{}}>HBeli : {value}</Text>}
            />
            <NumberFormat
              value={harga_jual}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp '}
              renderText={(value) => <Text style={{}}>HJual : {value}</Text>}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={onPressEdit} style={styles.edit}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete} style={styles.delete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListItemStock;

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  text: {
    fontSize: 13,
  },
  buttonWrapper: {
    flexDirection: 'row',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  edit: {
    backgroundColor: colors.blue,
    flex: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    backgroundColor: colors.red,
    flex: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  wrapperItem: {flex: 1},
});
