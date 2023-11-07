import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Header, List, Button, Card, Loading} from '../../components';
import Search from '../../components/molecules/Search';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils';
import {
  PayloadGetProduct,
  userToken,
  callProduct,
} from '../../redux/product/getProduct';
import {useDispatch, useSelector} from 'react-redux';
import {listStore} from '../../redux/store/listStore';

const DetailPenjualan = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [toko, setToko] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [periode, setPeriode] = useState('1');
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [listPenjualan, setListPenjualan] = useState({});
  const [store, setStore] = useState([]);

  console.log('list penjualan : ', listPenjualan);
  useEffect(() => {
    getInfoPenjualan();
    showListCabang();
  }, [toko]);

  const getInfoPenjualan = () => {
    const payload = PayloadGetProduct;
    payload.store = toko;
    payload.name = namaBarang;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;
    // console.log(payload);
    dispatch(callProduct({PayloadGetProduct: payload}))
      .then((res) => {
        // console.log('list penjualan ==> ', res);
        if (res.code === 200) {
          setLoading(false);
          setListPenjualan(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };
  const showListCabang = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(listStore({userToken: payload}))
      .then((res) => {
        // console.log('list cabang ==> ', res);
        if (res.code === 200) {
          setLoading(false);
          setStore(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          type="menu"
          title="INFO CABANG"
          onPress={() => navigation.goBack('')}
        />

        <View style={{marginHorizontal: 16, flex: 1}}>
          {/* <Search onChangeText={FunctionSearch} value={search} /> */}
          <View height={10} />
          <DropDownPicker
            items={store.map((data) => ({
              label: data.name,
              value: data.id,
            }))}
            defaultValue={toko}
            containerStyle={styles.containerDropdown}
            style={styles.dropdownStyle}
            itemStyle={{justifyContent: 'flex-start'}}
            placeholder="Pilih toko"
            dropDownStyle={{backgroundColor: 'white'}}
            labelStyle={styles.dropdownLabel}
            onChangeItem={(item) => setToko(item.value)}
          />
          <View height={10} />

          <FlatList
            data={listPenjualan}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="warehouse"
                  category={item.category}
                  name={item.name}
                  store={item.store.name}
                  stock={item.stock}
                  total_sell={item.total_sell}
                  profit={item.profit}
                  merk={item.merk}
                />
              );
            }}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default DetailPenjualan;

const styles = StyleSheet.create({
  dropdownWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  dropdownContent: {flex: 1, padding: 4},
  titleDropdown: {textAlign: 'center', marginBottom: 3},
  containerDropdown: {
    height: 40,
    borderRadius: 10,
  },
  dropdownStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: colors.border,
  },
  dropdownLabel: {
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
});
