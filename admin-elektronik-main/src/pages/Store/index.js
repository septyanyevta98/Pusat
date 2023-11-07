import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Header, Input, Button, List, Loading} from '../../components';
import {listStore, userToken} from '../../redux/store/listStore';
import {addStore, PayloadBody} from '../../redux/store/addStore';
import {editStore} from '../../redux/store/editStore';
import {deleteStore} from '../../redux/store/deleteStore';
import MDelete from '../../components/molecules/Modal/MDelete';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import MUpdateStore from '../../components/molecules/Modal/MUpdateStore';

const Store = ({navigation}) => {
  const [cabang, setCabang] = useState('');
  const [alamat, setAlamat] = useState('');
  // console.log(alamat);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState('');
  const [disable, setDisable] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectStore, setSelectStore] = useState('');
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    showListCabang();
  }, []);

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
          item={selectStore.name}
          onPressBatal={deleteModal}
          onPressOk={deleteCabang}
        />
      </Modal>
    );
  };
  const deleteModal = (item) => {
    setModalDelete(!modalDelete);
    setSelectStore(item);
  };

  const updateModal = (item) => {
    setModalEdit(!modalEdit);
    setSelectStore(item);
    setAlamat(item.address);
    setCabang(item.name);
    console.log(selectStore);
  };

  const inputHandler = (input) => {
    setCabang(input);
  };

  const tambahCabang = () => {
    if (cabang === '') {
      Toast.show('Silahkan Masukkan Nama Cabang !');
    } else {
      const payload = PayloadBody;
      payload.name = cabang;
      payload.address = alamat;
      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log(payload);
      dispatch(addStore({PayloadBody: payload}))
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.code === 201) {
            Toast.show('Add store sukses !');
            showListCabangNoLoading();
          } else {
            Toast.show('add store User Gagal');
          }
        })
        .catch(function (error) {
          Toast.show('add store gagal !', error);
        });
    }
  };

  const showListCabang = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);
    // console.log(payload);
    dispatch(listStore({userToken: payload}))
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          setStore(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };
  const showListCabangNoLoading = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;

    dispatch(listStore({userToken: payload}))
      .then((res) => {
        if (res.code === 200) {
          setStore(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };

  const deleteCabang = () => {
    setModalDelete(!modalDelete);
    const payload = PayloadBody;
    payload.id = selectStore.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    // console.log(payload);
    dispatch(deleteStore({PayloadBody: payload}))
      .then((res) => {
        setLoading(false);
        // console.log(res);
        if (res.code === 200) {
          Toast.show('Data Berhasil Dihapus!');
          showListCabangNoLoading();
        } else {
          Toast.show('add store User Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('add store gagal !', error);
      });
  };

  const doUpdate = () => {
    const payload = PayloadBody;
    payload.id = selectStore.id;
    payload.name = cabang;
    payload.address = alamat;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    // console.log(payload);
    dispatch(editStore({PayloadBody: payload}))
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.code === 200) {
          Toast.show('Update Store Sukses !');
          setModalEdit(false);
          showListCabang();
        } else if (res.respMessage === 'FAILED') {
          Toast.show('Register User Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('Register gagal !', error);
      });
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          type="menu"
          title="ADD STORE"
          onPress={() => navigation.goBack('')}
        />
        <View style={{flex: 1, backgroundColor: 'white', marginHorizontal: 17}}>
          <Input
            placeholder="Masukkan nama cabang baru"
            onChangeText={inputHandler}
            value={cabang}
          />
          <Input
            placeholder="Masukkan Alamat Cabang"
            onChangeText={(input) => setAlamat(input)}
            value={alamat}
          />
          <Button title="Add Cabang Baru" onPress={tambahCabang} />
          <FlatList
            data={store}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="cabang"
                  title={item.name}
                  alamat={item.address}
                  onPress={() => deleteModal(item)}
                  onPressEdit={() => updateModal(item)}
                />
              );
            }}
          />
          <ModalDelete />
          <MUpdateStore
            isVisible={modalEdit}
            onPressClose={() => setModalEdit(false)}
            value={cabang}
            onChangeText={(input) => setCabang(input)}
            value2={alamat}
            onChangeText2={(input) => setAlamat(input)}
            onPress={() => doUpdate()}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Store;

const styles = StyleSheet.create({});
