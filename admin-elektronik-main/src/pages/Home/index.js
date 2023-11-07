import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Chart, MLogout, Loading} from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import {colors} from '../../utils';
import Modal from 'react-native-modal';
import {PayloadBody, logout} from '../../redux/action_user/logout';
import {useDispatch, useSelector} from 'react-redux';
import {
  PayloadBodyShowOrders,
  showOrder,
  userToken,
} from '../../redux/history/showOrders';
import {listStore} from '../../redux/store/listStore';

const Home = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const [tahun, setTahun] = useState('2021');
  const [bulan, setBulan] = useState(format(new Date(), 'M'));
  const [toko, setToko] = useState('');
  const [mLogout, setLogout] = useState(false);
  const [chart, setChart] = useState([]);
  const dispatch = useDispatch();
  const [dateChart, setDateChart] = useState(['1']);
  const [profitChart, setProfitChart] = useState([1]);
  const [store, setStore] = useState([]);

  useEffect(() => {
    getShowOrders();
    showListCabang();
  }, [toko, bulan]);

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
        } else {
          Alert.alert('Error', 'Some error occured, please retry');
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };

  const getShowOrders = () => {
    const payload = PayloadBodyShowOrders;
    payload.month = bulan;
    payload.year = tahun;
    payload.store = toko;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    var listDate = [];
    var listProfit = [];
    setLoading(true);

    dispatch(showOrder({PayloadBodyShowOrders: payload})).then((res) => {
      // console.log('isinya :', res.data);
      if (res.code === 200) {
        // console.log('profit ==>', res.data);
        setLoading(false);
        setChart(res.data);
        for (let i = 0; i < res.data.length; i++) {
          listDate.push(res.data[i]?.date);
          listProfit.push(res.data[i]?.profit);
        }
        setDateChart(listDate);
        // console.log(dateChart);
        setProfitChart(listProfit);
      } else if (res.respMessage === 'FAILED') {
        Alert.alert('Error', 'Some error occured, please retry');
      } else {
        Alert.alert('Error', 'Some error occured, please retry');
      }
    });
  };

  const postLogout = () => {
    const payload = PayloadBody;
    payload.token = HomeReducer.token;
    // setLoading(true);
    dispatch(logout({PayloadBody: payload})).then((res) => {
      // setLoading(false);
      if (res.code === 200) {
        // console.log('logout success');
        navigation.replace('Login');
      } else {
        console.log('failed');
      }
    });
  };

  const logoutModal = () => {
    setLogout(!mLogout);
  };

  const ModalLogout = () => {
    return (
      <Modal
        testID={'modal'}
        isVisible={mLogout}
        onSwipeComplete={() => logoutModal()}
        style={styles.view2}>
        <MLogout
          title="Keluar ?"
          respon="Apakah anda yakin mau keluar?"
          batal={() => logoutModal()}
          ok={() => postLogout()}
        />
      </Modal>
    );
  };

  return (
    <>
      <View style={styles.safearea}>
        <Header onPress={logoutModal} />
        <ScrollView style={{flex: 1, marginTop: 10}}>
          <View style={styles.dropdownWrapper}>
            <View style={styles.dropdownContent}>
              <Text style={styles.titleDropdown}>Tahun</Text>
              <DropDownPicker
                items={[
                  {label: '2021', value: '2021'},
                  {label: '2022', value: '2022'},
                  {label: '2023', value: '2023'},
                  // {label: '2024', value: '2024'},
                  // {label: '2025', value: '2025'},
                ]}
                defaultValue={tahun}
                containerStyle={styles.containerDropdown}
                style={styles.dropdownStyle}
                itemStyle={{justifyContent: 'flex-start'}}
                placeholder="Pilih Tahun"
                dropDownStyle={{backgroundColor: 'white'}}
                labelStyle={styles.dropdownLabel}
                onChangeItem={(item) => setTahun(item.value)}
              />
            </View>
            <View style={{flex: 1, padding: 4}}>
              <Text style={styles.titleDropdown}>Bulan</Text>
              <DropDownPicker
                items={[
                  {label: 'Januari', value: '1'},
                  {label: 'Februari', value: '2'},
                  {label: 'Maret', value: '3'},
                  {label: 'April', value: '4'},
                  {label: 'Mei', value: '5'},
                  {label: 'Juni', value: '6'},
                  {label: 'Juli', value: '7'},
                  {label: 'Agustus', value: '8'},
                  {label: 'September', value: '9'},
                  {label: 'Oktober', value: '10'},
                  {label: 'November', value: '11'},
                  {label: 'Desember', value: '12'},
                ]}
                defaultValue={bulan}
                containerStyle={styles.containerDropdown}
                style={styles.dropdownStyle}
                itemStyle={{justifyContent: 'flex-start'}}
                placeholder="Pilih Bulan"
                dropDownStyle={{backgroundColor: 'white'}}
                labelStyle={styles.dropdownLabel}
                onChangeItem={(item) => setBulan(item.value)}
              />
            </View>
            <View style={{flex: 1, padding: 4}}>
              <Text style={styles.titleDropdown}>Cabang</Text>
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
            </View>
          </View>
          <Chart label={dateChart} profit={profitChart} />

          {/* <Text style={{marginHorizontal: 17}}>
            Profit bulan ini : {chart.ProfitOnThisMonth}
          </Text> */}

          {/* <TouchableOpacity
            style={styles.wrapperCard}
            onPress={() => navigation.navigate('Warehouse')}>
            <Text style={styles.titleCard}>Warehouse</Text>
            <Text>100 Total Barang</Text>
            <Text style={styles.detail}>Detail</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.wrapperCard}
            onPress={() => navigation.navigate('DetailPenjualan')}>
            <Text style={styles.titleCard}>Penjualan</Text>
            <Text style={{color: 'black'}}>Info Barang Terjual</Text>
            <Text style={styles.detail}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperCard}
            onPress={() => navigation.navigate('Store')}>
            <Text style={styles.titleCard}>Store</Text>
            <Text style={{color: 'black'}}>Menambahkan Toko</Text>
            <Text style={styles.detail}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapperCard}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.titleCard}>Change Password</Text>
            <Text style={{color: 'black'}}>
              Silahkan Tab Disini Untuk mengganti Password
            </Text>
            {/* <Text style={styles.detail}></Text> */}
          </TouchableOpacity>
          {/* </View> */}
          <ModalLogout />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  wrapperCard: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    marginHorizontal: 17,
  },
  titleCard: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
});
