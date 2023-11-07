import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button, Dropdown, Header, Loading, MRegister} from '../../components';
import {colors} from '../../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import {PayloadBody, register, userToken} from '../../redux/pegawai/addPegawai';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {listStore} from '../../redux/store/listStore';

const AddPegawai = ({navigation}) => {
  const HomeReducer = useSelector((State) => State.loginReducer);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [toko, setToko] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    showListCabang();
  }, []);

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
        if (res.code === 422) {
          ToastAndroid.show(
            'Email/Username Sudah terpakai !',
            ToastAndroid.LONG,
          );
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };

  const showToast = () => {
    ToastAndroid.show('Register Berhasil !', ToastAndroid.LONG);
  };
  const inputNama = (input) => {
    setNama(input);
  };
  const inputEmail = (input) => {
    setEmail(input);
  };
  const inputUsername = (input) => {
    setUsername(input);
  };

  const inputPassword = (input) => {
    setPassword(input);
  };

  const inputCpassword = (input) => {
    setCpassword(input);
  };

  const postRegister = () => {
    const payload = PayloadBody;
    payload.name = nama;
    payload.email = email;
    payload.username = username;
    payload.level = level;
    payload.password = password;
    payload.re_password = cpassword;
    payload.store = toko;
    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);

    // console.log(payload);
    dispatch(register({PayloadBody: payload}))
      .then((res) => {
        // console.log('res register =>', res);
        setLoading(false);
        if (res.code === 201) {
          Toast.show('Register Sukses !');
          navigation.replace('MainApp', {screen: 'Pegawai'});
        } else {
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
          title="ADD PEGAWAI"
          onPress={() => navigation.goBack('')}
        />
        <ScrollView
          style={{margin: 16, marginTop: 10}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Nama</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Nama"
            onChangeText={inputNama}
            value={nama}
          />
          <Text style={{marginBottom: 8, marginTop: 8}}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Email"
            onChangeText={inputEmail}
            value={email}
          />
          <Text style={{marginBottom: 8, marginTop: 8}}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Username"
            onChangeText={inputUsername}
            value={username}
          />

          <Text style={{marginVertical: 8}}>Store</Text>
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
          <Text style={{marginVertical: 8}}>Level</Text>
          <DropDownPicker
            items={[
              {label: 'Warehouse', value: '1'},
              {label: 'Kasir', value: '2'},
            ]}
            defaultValue={level}
            containerStyle={styles.containerDropdown}
            style={styles.dropdownStyle}
            itemStyle={{justifyContent: 'flex-start'}}
            placeholder="Level"
            dropDownStyle={{backgroundColor: 'white'}}
            labelStyle={styles.dropdownLabel}
            onChangeItem={(item) => setLevel(item.value)}
          />
          <Text style={{marginBottom: 8, marginTop: 8}}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Masukkan Passowrd"
            onChangeText={inputPassword}
            value={password}
          />

          <Text style={{marginBottom: 8, marginTop: 8}}>Ulangi Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Ulangi Masukkan Passowrd"
            onChangeText={inputCpassword}
            value={cpassword}
          />
          <View style={{marginTop: 20}}>
            <Button title="Register" onPress={postRegister} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default AddPegawai;

const styles = StyleSheet.create({
  title: {marginBottom: 8, marginBottom: 8},
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
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingLeft: 16,
  },
});
