import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../utils';
import {Button, Header, Loading} from '../../components';
import MLogout from '../../components/molecules/Modal/MLogout';
import {PayloadBody, logout} from '../../redux/auth/logout';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {getProfile, userToken} from '../../redux/profile/getProfile';
import Toast from 'react-native-simple-toast';

const Profile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const HomeReducer = useSelector((State) => State.loginReducer);
  const [mLogout, setLogout] = useState(false);
  const [profile, setProfile] = useState('');

  const postLogout = () => {
    const payload = PayloadBody;
    payload.token = HomeReducer.token;
    setLoading(true);
    setLogout(false);
    dispatch(logout({PayloadBody: payload})).then((res) => {
      setLoading(false);
      if (res.code === 200) {
        // console.log('logout success');
        navigation.replace('Login');
      } else {
        // console.log('failed');
      }
    });
  };

  const logoutModal = () => {
    setLogout(!mLogout);
  };

  // const ModalLogout = () => {
  //   return (
  //     <Modal
  //       testID={'modal'}
  //       isVisible={mLogout}
  //       onSwipeComplete={() => logoutModal()}
  //       style={styles.view2}>
  //       <MLogout
  //         title="Keluar ?"
  //         respon="Apakah anda yakin mau keluar?"
  //         batal={() => logoutModal()}
  //         ok={() => postLogout()}
  //       />
  //     </Modal>
  //   );
  // };

  const getDataProfile = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    // console.log('id store', HomeReducer.storeID);
    setLoading(true);

    dispatch(getProfile({userToken: payload}))
      .then((res) => {
        // console.log('list brand :', res.data);
        if (res.code === 200) {
          setLoading(false);
          setProfile(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error category : ', error);
      });
  };
  useEffect(() => {
    getDataProfile();
  }, []);
  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1, padding: 16}}>
        <Header />
        <View
          style={{
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
            padding: 16,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <View style={styles.wrapper}>
              <Text style={styles.text}>Name</Text>
              <Text style={styles.text2}>:</Text>
              <Text style={styles.text}>{profile?.name}</Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.text}>Email</Text>
              <Text style={styles.text2}>:</Text>
              <Text style={styles.text}>{profile?.email}</Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.text}>Level</Text>
              <Text style={styles.text2}>:</Text>
              <Text style={styles.text}>{profile?.level?.name}</Text>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.text}>Store</Text>
              <Text style={styles.text2}>:</Text>
              <Text style={styles.text}>{profile?.store?.name}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.blue}}>
            Change Password
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{flex: 1}}>
            <Button title="Logout" onPress={logoutModal} />
          </View>
          <MLogout
            isVisible={mLogout}
            batal={() => logoutModal()}
            ok={() => postLogout()}
            title="Keluar ?"
            respon="Apakah anda yakin mau keluar?"
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {fontSize: 13, flex: 2},
  text2: {fontSize: 13, flex: 1},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
