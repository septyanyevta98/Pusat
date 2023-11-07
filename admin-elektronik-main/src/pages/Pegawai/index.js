import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Button, List, Loading} from '../../components';
import HeaderNoLogout from '../../components/molecules/Header/HeaderNologout';
import MDelete from '../../components/molecules/Modal/MDelete';
import {deleteEmployee, PayloadBody} from '../../redux/pegawai/deletePegawai';
import {listEmployee, userToken} from '../../redux/pegawai/listPegawai';

const Pegawai = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState('');
  const [selectPegawai, setSelectPegawai] = useState('');
  useEffect(() => {
    showListEmployee();
  }, []);

  const showListEmployee = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);
    // console.log(payload);
    dispatch(listEmployee({userToken: payload}))
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          setLoading(false);
          setEmployee(res.data);
        }
      })
      .catch(function (error) {
        console.log('error histor admin>>>', error);
      });
  };

  const deletePegawai = () => {
    setModalDelete(!modalDelete);
    const payload = PayloadBody;
    payload.id = selectPegawai.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    // setLoading(true);
    // console.log(payload);
    dispatch(deleteEmployee({PayloadBody: payload}))
      .then((res) => {
        // setLoading(false);
        // console.log(res);
        if (res.code === 200) {
          Toast.show('Data Berhasil Dihapus!');
          showListEmployee();
        } else {
          Toast.show('add Pegawai Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('add pegawai gagal !', error);
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
          item={selectPegawai.name}
          onPressBatal={deleteModal}
          onPressOk={deletePegawai}
        />
      </Modal>
    );
  };

  const deleteModal = (item) => {
    setModalDelete(!modalDelete);
    setSelectPegawai(item);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <HeaderNoLogout />
        <View style={{flex: 1, paddingHorizontal: 17}}>
          <Button
            title="Add Pegawai"
            onPress={() => navigation.navigate('AddPegawai')}
          />
          <FlatList
            data={employee}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="pegawai"
                  name={item.name}
                  cabang={item?.store?.name}
                  posisi={item?.level?.name}
                  onPressDelete={() => deleteModal(item)}
                  onPressEdit={() =>
                    navigation.navigate('EditPegawai', {
                      id_edit: item.id,
                      name_edit: item.name,
                      email_edit: item.email,
                      username_edit: item.username,
                      store_edit: item.store.id,
                      level_edit: item.level.id,
                    })
                  }
                />
              );
            }}
          />
        </View>
      </View>
      <ModalDelete />
      {loading && <Loading />}
    </>
  );
};

export default Pegawai;

const styles = StyleSheet.create({});
