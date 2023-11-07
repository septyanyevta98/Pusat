import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Header,
  List,
  Loading,
  ModalComponent,
  Search,
} from '../../components';
import {
  getProduct,
  userToken,
  ProductBody,
} from '../../redux/product/getProduct';
import {addCard, PayloadBody} from '../../redux/card/addCard';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../utils';
import {getCard} from '../../redux/card/getCard';

const ListItem = ({navigation, route}) => {
  const {id} = route.params;
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState('');
  const [selectProduct, setSelectProduct] = useState('');
  const [harga, setHarga] = useState('');
  const [totalBelanja, setTotalBelanja] = useState(0);
  const [listCart, setListCard] = useState('');
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [productList2, setProductList2] = useState('');

  const inputSearchHandler = (input) => setSearch(input);

  useEffect(() => {
    getListProduct();
    getListCard();
  }, []);

  const toggleModal = (item) => {
    setModalVisible(true);
    setSelectProduct(item);
    setHarga(item.price_sell.toString());
  };

  const getListProduct = () => {
    const payload = ProductBody;
    payload.token = HomeReducer.token;
    payload.category = id;
    setLoading(true);

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;
    dispatch(getProduct({ProductBody: payload}))
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          setProductList(res.data);
          setProductList2(res.data);
        }
      })
      .catch(function (error) {
        console.log('error list cabang : ', error);
      });
  };

  const getListCard = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getCard({userToken: payload}))
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          setListCard(res.data);
          setTotalBelanja(res.data.length);
          // console.log(res.data.length);
          let tt = 0;
          for (let i = 0; i < res.data.length; i++) {
            tt += res.data[i].qty * res.data[i].price_bargain;
            // console.log('tt>>>', tt);
          }
          setTotal(tt);
        }
      })
      .catch(function (error) {
        console.log('error category : ', error);
      });
  };

  const searchProduct = (search) => {
    let valueSearch = [];
    if (search.length > 0) {
      for (let i = 0; i < productList.length; i++) {
        if (
          productList[i].name.substr(0, search.length).toLowerCase() ==
            search.toLowerCase() ||
          productList[i].merk.name.substr(0, search.length).toLowerCase() ==
            search.toLowerCase()
        ) {
          valueSearch.push(productList[i]);
        }
      }
      setProductList(valueSearch);
    } else {
      setProductList(productList2);
    }
  };

  const addToCard = () => {
    setModalVisible(false);
    const payload = PayloadBody;

    payload.product = selectProduct.id.toString();
    payload.qty = quantity.toString();
    payload.price_bargain = harga;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);

    dispatch(addCard({PayloadBody: payload}))
      .then((res) => {
        setLoading(false);
        if (res.code === 201) {
          Toast.show('Menambahkan Keranjang Sukses !');
          getListProduct();
          getListCard();
        } else {
          Toast.show('Menambahkan Keranjang Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('add category gagal !', error);
      });
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header title="Produk" />
        <View style={{paddingHorizontal: 16, flex: 1}}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, marginRight: 10}}>
              <Search onChangeText={searchProduct} />
            </View>
            <View>
              <Icon name="cart" size={30} color={colors.blue} />
              <View
                style={{
                  backgroundColor: 'red',
                  height: 15,
                  width: 15,
                  borderRadius: 15 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                }}>
                <Text style={{color: 'white'}}>{totalBelanja}</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={productList}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  category={item.category?.name}
                  brand={item.merk?.name}
                  name={item?.name}
                  price={item?.price_sell}
                  stock={item?.stock}
                  gambar={{uri: item?.image}}
                  quantity={quantity}
                  onPress={() => toggleModal(item)}
                />
              );
            }}
          />
          <View style={{paddingVertical: 10}}>
            <Button
              title="Checkout"
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
          <ModalComponent
            isVisible={isModalVisible}
            onChangeText={(input) => setHarga(input)}
            value={harga}
            product={selectProduct.name}
            kurangBarang={() => setQuantity(quantity - 1)}
            tambahBarang={() => setQuantity(quantity + 1)}
            jumlahBarang={quantity}
            pressCancel={() => setModalVisible(false)}
            pressOk={() => addToCard()}
          />
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
  );
};

export default ListItem;

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
