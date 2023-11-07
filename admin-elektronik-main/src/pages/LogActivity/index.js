import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header, List, Loading} from '../../components';
import {getLog, userToken} from '../../redux/history/historyAdmin';
import HeaderNoLogout from '../../components/molecules/Header/HeaderNologout';
const LogActivity = () => {
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [history, setHistory] = useState('');
  const [listLog, setListLog] = useState('');
  useEffect(() => {
    getShowHistory();
  }, []);

  const getShowHistory = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);
    // console.log(payload);
    dispatch(getLog({userToken: payload}))
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          setListLog(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderNoLogout />
        <View style={{marginHorizontal: 16, flex: 1}}>
          <FlatList
            data={listLog}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return <List date={item.date} history={item.detail} />;
            }}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default LogActivity;

const styles = StyleSheet.create({});
