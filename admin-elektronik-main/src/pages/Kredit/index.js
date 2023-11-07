import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {DatePicker, ListKredit} from '../../components/molecules';
import {Loading, MKredit} from '../../components';
import {
  getCredit,
  payloadBodyGetKredit,
  userToken,
} from '../../redux/credit/listCredit';
import {
  completeCredit,
  payloadBodyKredit,
} from '../../redux/credit/completeCredit';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';

const Kredit = () => {
  const [tanggal, setTanggal] = useState(new Date().getTime());
  const today = new Date();
  const [tanggal2, setTanggal2] = useState(today.setDate(today.getDate() - 7));
  const [credit, setCredit] = useState('');
  const HomeReducer = useSelector((State) => State.loginReducer);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [kreditSelected, setKreditSelected] = useState('');

  console.log(tanggal);
  const modalComplete = (item) => {
    setModal(true);
    setKreditSelected(item);
    console.log(kreditSelected);
  };

  const getListCredit = () => {
    const payload = payloadBodyGetKredit;
    payload.date_start = format(tanggal2, 'yyyy-MM-dd');
    payload.date_end = format(tanggal, 'yyyy-MM-dd');

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    dispatch(getCredit({payloadBodyGetKredit: payload}))
      .then((res) => {
        console.log(payload);
        console.log(res);
        if (res.code === 200) {
          setLoading(false);
          setCredit(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list kredit : ', error);
      });
  };

  const komplitKredit = () => {
    setModal(!modal);
    const payload = payloadBodyKredit;
    payload.id = kreditSelected.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    console.log(payload);
    dispatch(completeCredit({payloadBodyKredit: payload}))
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.code === 201) {
          Toast.show('Status menjadi Lunas');
          getListCredit();
        } else {
          Toast.show('Change status Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('change status gagal !', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getListCredit();
    }, [tanggal, tanggal2]),
  );

  return (
    <>
      <View style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={{fontSize: 10}}>Tanggal Awal</Text>
            <DatePicker tanggal={tanggal2} setTanggal={setTanggal2} />
          </View>
          <View>
            <Text style={{fontSize: 10}}>Tanggal Akhir</Text>
            <DatePicker tanggal={tanggal} setTanggal={setTanggal} />
          </View>
        </View>
        <FlatList
          data={credit}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <ListKredit
                status={item.status}
                kode_transaksi={item.code}
                date={item.date}
                store={item.store.name}
                nama_barang={item.cashier.name}
                jumlah_dp={item.down_payment}
                sisa_pembayaran={item.remainder_payment}
                onPress={() => modalComplete(item)}
              />
            );
          }}
        />
        <MKredit
          isVisible={modal}
          batal={() => setModal(false)}
          ok={() => komplitKredit()}
          title={kreditSelected.code}
          respon={kreditSelected.remainder_payment}
        />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Kredit;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: 'white',
  },
});
