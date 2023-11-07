import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Logo, User, Password} from '../../assets';
import {colors} from '../../utils/colors';
import {Input, Button, Loading} from '../../components';
import {PayloadLoginBody, login} from '../../redux/action_user/login';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const postLogin = () => {
    const payload = PayloadLoginBody;
    payload.email = username;
    payload.password = password;
    setLoading(true);
    console.log(payload);
    dispatch(login({PayloadLoginBody: payload}))
      .then((res) => {
        setLoading(false);
        console.log('respon login ', res);
        if (res.code === 200) {
          navigation.replace('MainApp');
          // navigation.replace('MainApp',{screen:'Pegawai'});
        } else {
          Toast.show('Check Kembali User/Password');
        }
      })
      .catch(function (error) {
        Toast.show(error);
      });
  };

  const inputUsername = (input) => {
    setUsername(input);
  };

  const inputPassword = (input) => {
    setPassword(input);
  };

  return (
    <>
      <View style={styles.page}>
        <View style={styles.content}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={Logo}
              style={{height: 100, width: 100, resizeMode: 'contain'}}
            />
            <Text style={styles.welcome}>Welcome to Admin App</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Input
              icon={<User style={{marginLeft: 16, marginRight: 10}} />}
              placeholder="Your Username"
              onChangeText={inputUsername}
              value={username}
            />
            <Input
              icon={<Password style={{marginLeft: 16, marginRight: 10}} />}
              placeholder="Your Password"
              onChangeText={inputPassword}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Sign In" onPress={postLogin} />
          </View>

          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{fontSize: 14, color: colors.blue, fontWeight: '700'}}>
              Forgot Password?
            </Text>
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  content: {flex: 1, backgroundColor: 'white', justifyContent: 'center'},
  welcome: {
    fontSize: 16,
    color: colors.blueDark,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {fontSize: 12, color: colors.gray, marginTop: 8},
  inputWrapper: {marginHorizontal: 16, marginTop: 28},
  buttonWrapper: {marginHorizontal: 16, marginTop: 8},
});
