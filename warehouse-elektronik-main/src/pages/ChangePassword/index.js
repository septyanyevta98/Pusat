import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Input, Loading, HeaderBack} from '../../components';
import {colors} from '../../utils';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  changePassword,
  PayloadBody,
  userToken,
} from '../../redux/auth/changePassword';

const index = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPasswor2] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const HomeReducer = useSelector((State) => State.loginReducer);

  const ChangePassword = () => {
    if (oldPassword !== '' && newPassword !== '' && newPassword2 !== '') {
      const payload = PayloadBody;
      payload.old_password = oldPassword;
      payload.new_password = newPassword;
      payload.re_password = newPassword2;

      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log('payload change password :', payload);
      dispatch(changePassword({PayloadBody: payload}))
        .then((res) => {
          // console.log(res);
          setLoading(false);
          if (res.code === 200) {
            Toast.show('Change Password Success!');
            navigation.navigate('MainApp', {screen: 'Profile'});
          } else {
            Toast.show('Change Password Failed');
          }
        })
        .catch(function (error) {
          // console.log(error);
          Toast.show('Change Password Failed !', error);
        });
    } else {
      //   console.log('check input');
      Toast.show('Isi Semua Data');
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
        <HeaderBack
          title="Change Password"
          onPress={() => navigation.goBack('')}
        />
        <Input
          placeholder="Masukkan Password Lama"
          value={oldPassword}
          onChangeText={(input) => setOldPassword(input)}
          secureTextEntry={true}
          maxLength={10}
        />
        <Input
          placeholder="Masukkan Password Baru"
          value={newPassword}
          onChangeText={(input) => setNewPassword(input)}
          secureTextEntry={true}
          maxLength={10}
        />
        <Input
          placeholder="Masukkan Kembali Password Baru"
          value={newPassword2}
          maxLength={10}
          onChangeText={(input) => setNewPasswor2(input)}
          secureTextEntry={true}
        />
        <Button title="Ubah Password" onPress={ChangePassword} />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
