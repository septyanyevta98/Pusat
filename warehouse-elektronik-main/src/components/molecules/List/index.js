import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors} from '../../../utils';
import ListItemStock from './ListItemStock';
import ListCategory from './ListCategory';
import ListBrand from './ListBrand';
import ListProduk from './ListProduk';
import {Product1} from '../../../assets';
const List = ({
  type,
  onPressDelete,
  onPressDetail,
  onPressEdit,
  title,
  kategori,
  brand,
  nama_barang,
  harga_beli,
  harga_jual,
  stock,
  image,
  category_name,
  brand_name,
  sku,
}) => {
  if (type === 'produk') {
    return <ListProduk />;
  }
  if (type === 'brand') {
    return (
      <ListBrand
        kategori={kategori}
        brand={brand}
        onPressDelete={onPressDelete}
      />
    );
  }
  if (type === 'kategori') {
    return (
      <ListCategory
        onPressDelete={onPressDelete}
        title={title}
        image={image}
        onPressEdit={onPressEdit}
      />
    );
  }
  if (type === 'stock') {
    return (
      <ListItemStock
        sku={sku}
        nama_barang={nama_barang}
        harga_beli={harga_beli}
        harga_jual={harga_jual}
        stock={stock}
        image={image}
        category_name={category_name}
        brand_name={brand_name}
        onPressDelete={onPressDelete}
        onPressDetail={onPressDetail}
        onPressEdit={onPressEdit}
      />
    );
  }
  return (
    <View style={styles.content}>
      <View>
        <Image
          source={Product1}
          style={{height: 70, width: 70, resizeMode: 'contain'}}
        />
      </View>
      <View>
        <Text style={styles.date}>02/01/2021 - Tayu Store</Text>
        <Text style={{fontSize: 15, color: 'black'}}>Brand Y item B</Text>
        <Text style={{fontSize: 15, color: 'black'}}>Stok Available 5pcs</Text>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  date: {fontSize: 15, color: colors.blue, fontWeight: 'bold'},
});
