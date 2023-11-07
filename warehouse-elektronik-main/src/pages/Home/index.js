import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Header, List, Loading} from '../../components';
import MDelete from '../../components/molecules/Modal/MDelete';
import {deleteProduct, PayloadBody} from '../../redux/product/deleteProduct';
import {
  getProduct,
  userToken,
  ProductBody,
} from '../../redux/product/getProduct';
import {colors} from '../../utils';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [listBarang, setListBarang] = useState('');
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectProduct, setSelectProduct] = useState('');

  const inputSearch = (input) => {
    setSearch(input);
  };

  const getListBarang = () => {
    const payload = ProductBody;
    payload.token = HomeReducer.token;
    payload.max = 10;
    setLoading(true);

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;
    dispatch(getProduct({ProductBody: payload}))
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          setLoading(false);
          setListBarang(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error list cabang : ', error);
      });
  };

  const deleteListBarang = () => {
    setModalDelete(!modalDelete);
    const payload = PayloadBody;
    payload.id = selectProduct.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    dispatch(deleteProduct({PayloadBody: payload}))
      .then((res) => {
        // console.log('payload delte barang ', payload);
        setLoading(false);
        // console.log(res);
        if (res.code === 200) {
          Toast.show('Data Berhasil Dihapus!');
          getListBarang();
        } else {
          Toast.show('add store User Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('add store gagal !', error);
      });
  };

  const ModalDelete = () => {
    return (
      <Modal
        testID={'modal'}
        isVisible={modalDelete}
        // onSwipeComplete={modalDelete}
        style={styles.view2}>
        <MDelete
          respon="Apakah anda yakin untuk menghapus ?"
          title="Delete"
          item={selectProduct.name}
          onPressBatal={() => setModalDelete(false)}
          onPressOk={() => deleteListBarang()}
        />
      </Modal>
    );
  };

  // const stockMustUpdate = listBarang.filter((x) => {
  //   return x.stock <= 10;
  // });

  const deleteModal = (item) => {
    setModalDelete(!modalDelete);
    setSelectProduct(item);
  };

  useEffect(() => {
    getListBarang();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <View style={{marginHorizontal: 16, flex: 1}}>
          {/* <Search onChangeText={inputSearch} value={search} /> */}
          <Text>Stock Barang yang akan Habis</Text>
          {listBarang.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, color: colors.gray}}>Stock Aman</Text>
            </View>
          ) : (
            <FlatList
              data={listBarang}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <List
                    type="stock"
                    nama_barang={item?.name}
                    harga_beli={item?.price_buy}
                    harga_jual={item?.price_sell}
                    stock={item?.stock}
                    // image={{uri: item?.image}}
                    category_name={item?.category?.name}
                    brand_name={item?.merk.name}
                    sku={item?.sku}
                    onPressEdit={() =>
                      navigation.navigate('EditItem', {
                        id_edit: item?.id,
                        // image_edit: item?.image,
                        categoy_edit: item?.category?.name,
                        brand_edit: item?.merk.name,
                        nama_edit: item?.name,
                        harga_beli_edit: item?.price_buy.toString(),
                        harga_jual_edit: item?.price_sell.toString(),
                        stock_edit: item?.stock.toString(),
                        sku_edit: item?.sku,
                        store_edit: item?.store.id,
                      })
                    }
                    onPressDelete={() => deleteModal(item)}
                  />
                );
              }}
            />
          )}
        </View>
        <ModalDelete />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
