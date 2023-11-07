import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Header, Loading} from '../../components';
import {getCategory, userToken} from '../../redux/category/getCategory';

const Home = ({navigation}) => {
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState('');

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getCategory({userToken: payload}))
      .then((res) => {
        console.log(res.data);
        if (res.code === 200) {
          setLoading(false);
          setListCategory(res.data);
        }
      })
      .catch(function (error) {
        console.log('error category : ', error);
      });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header title="Home" />
        <View style={{paddingHorizontal: 16, flex: 1}}>
          {/* <View style={{marginBottom: 10}}>
            <Search />
          </View> */}
          <FlatList
            data={listCategory}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <Card
                  image={{uri: item?.image}}
                  name_product={item?.name}
                  onPress={() => navigation.navigate('ListItem', {id: item.id})}
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

export default Home;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 17,
  },
});
