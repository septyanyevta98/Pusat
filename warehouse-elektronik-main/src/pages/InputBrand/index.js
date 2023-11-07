import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Button, HeaderBack, Input, List, Loading} from '../../components';
import MDelete from '../../components/molecules/Modal/MDelete';
import {addMerk, PayloadBody} from '../../redux/merk/addMerk';
import {deleteMerk} from '../../redux/merk/deleteMerk';
import {getMerk, userToken} from '../../redux/merk/getMerk';

const InputBrand = ({title, navigation}) => {
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [listBrand, setListBrand] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [selectBrand, setSelectBrand] = useState('');

  const inputBrandHandler = (input) => {
    setBrand(input);
  };

  const getListBrand = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getMerk({userToken: payload}))
      .then((res) => {
        // console.log('brand ==>', res.data);
        if (res.code === 200) {
          setLoading(false);
          setListBrand(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error category : ', error);
      });
  };
  const tambahBrand = () => {
    if (brand === '') {
      Toast.show('Silahkan Masukkan Nama Cabang !');
    } else {
      const payload = PayloadBody;
      // payload.store = '13';
      payload.store = HomeReducer.storeID;
      payload.name = brand;

      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log('add category :', payload);
      dispatch(addMerk({PayloadBody: payload}))
        .then((res) => {
          // console.log(res);
          setLoading(false);
          if (res.code === 201) {
            Toast.show('Add brand sukses !');
            getListBrand();
          } else {
            Toast.show('add brand User Gagal');
          }
        })
        .catch(function (error) {
          Toast.show('add brand gagal !', error);
        });
    }
  };

  const delBrand = () => {
    setModalDelete(!modalDelete);
    const payload = PayloadBody;
    payload.id = selectBrand.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    // console.log(payload);
    dispatch(deleteMerk({PayloadBody: payload}))
      .then((res) => {
        setLoading(false);
        // console.log(res);
        if (res.code === 200) {
          Toast.show('Data Berhasil Dihapus!');
          getListBrand();
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
          item={selectBrand.name}
          onPressBatal={deleteModal}
          onPressOk={delBrand}
        />
      </Modal>
    );
  };
  const deleteModal = (item) => {
    setModalDelete(!modalDelete);
    setSelectBrand(item);
  };

  useEffect(() => {
    // console.log(HomeReducer);
    getListBrand();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderBack
          onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
          title="INPUT BRAND"
        />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
          <View>
            <Input
              placeholder="Masukkan Brand"
              onChangeText={inputBrandHandler}
              value={brand}
            />
            <Button title="Tambahkan Brand" onPress={tambahBrand} />
          </View>
          <FlatList
            data={listBrand}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="brand"
                  brand={item.name}
                  onPressDelete={() => deleteModal(item)}
                />
              );
            }}
          />
        </View>
        <ModalDelete />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default InputBrand;

const styles = StyleSheet.create({});
