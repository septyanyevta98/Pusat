import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import {Header, List, Loading} from '../../components';
import {getHistory, userToken} from '../../redux/history/getHistory';
import {useDispatch, useSelector} from 'react-redux';

const History = ({navigation}) => {
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState('');

  useEffect(() => {
    getListHistory();
  }, []);

  const getListHistory = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getHistory({userToken: payload}))
      .then((res) => {
        // console.log(res.data);
        if (res.code === 200) {
          setLoading(false);
          setHistory(res.data);
        }
      })
      .catch(function (error) {
        console.log('error category : ', error);
      });
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header title="History" />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
          <FlatList
            data={history}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="history"
                  trx={item.code}
                  tanggal={item.date}
                  bayar={item.total}
                  onPress={() =>
                    navigation.navigate('HistoryDetail', {
                      code: item.code,
                      date: item.date,
                      bayar: item.pay,
                      total: item.total,
                      kembalian: item.cashback,
                      pdf: item.pdf,
                    })
                  }
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
  );
};

export default History;

const styles = StyleSheet.create({});
