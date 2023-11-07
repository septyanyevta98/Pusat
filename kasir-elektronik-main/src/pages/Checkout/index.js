import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {List, Header, Button, Loading, ModalComponent} from '../../components';
import {colors} from '../../utils';
import {getCard, userToken} from '../../redux/card/getCard';
import {deleteCard} from '../../redux/card/deleteCard';
import {
  addTransaction,
  PayloadBody,
} from '../../redux/transaction/addTransaction';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import NumberFormat from 'react-number-format';
import ModalDelete from '../../components/molecules/ModalComponent/ModalDelete';
import {updateCard} from '../../redux/card/updateCard';

const Checkout = ({navigation}) => {
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [bayar, setBayar] = useState('');
  const [kembalian, setKembalian] = useState(0);
  const [listCart, setListCard] = useState('');
  const [selectProduct, setSelectProduct] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [harga, setHarga] = useState('');
  const [quantity, setQuantity] = useState('');
  console.log(bayar);
  const hitungKembalian = (text) => {
    setBayar(text);
    setKembalian(text - total);
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
          let tt = 0;
          for (let i = 0; i < res.data.length; i++) {
            tt += res.data[i].qty * res.data[i].price_bargain;
          }
          setTotal(tt);
        }
      })
      .catch(function (error) {
        console.log('error category : ', error);
      });
  };

  const doTransaction = () => {
    if (bayar === '') {
      Toast.show('Input nominal Bayar !');
    } else {
      const payload = PayloadBody;

      payload.pay = bayar;

      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log('add category :', payload);
      dispatch(addTransaction({PayloadBody: payload}))
        .then((res) => {
          setLoading(false);
          // console.log('respon pay ==>', res);
          if (res.code === 201) {
            Toast.show('Pembayaran sukses !');

            navigation.replace('CheckoutSuccess', {
              code: res.data.code,
              date: res.data.date,
              bayar: res.data.pay,
              kembalian: res.data.cashback,
              pdf: res.data.pdf,
              nama_produk: res.data.details[0].product_name,
              jumlah_produk: res.data.details[0].qty,
            });
          } else {
            Toast.show('Pembayaran User Gagal');
          }
        })
        .catch(function (error) {
          Toast.show('Pembayaran gagal !', error);
        });
    }
  };

  const deleteListCart = () => {
    const payload = PayloadBody;
    payload.id = selectProduct.id;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    dispatch(deleteCard({PayloadBody: payload}))
      .then((res) => {
        console.log('payload delte barang ', payload);
        setLoading(false);
        console.log(res);
        if (res.code === 200) {
          Toast.show('Card Berhasil Dihapus!');
          setModalVisible(false);
          getListCard();
        } else {
          Toast.show('Card Gagal dihapus');
        }
      })
      .catch(function (error) {
        Toast.show('add store gagal !', error);
      });
  };

  const updateListCart = () => {
    setShowModalEdit(false);
    const payload = PayloadBody;
    payload.id = selectProduct.id;
    payload.product = selectProduct.product_id;
    payload.qty = quantity.toString();
    payload.price_bargain = harga;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);

    dispatch(updateCard({PayloadBody: payload}))
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          Toast.show('Item berhasil di update !');
          getListCard();
        } else {
          Toast.show('Item gagal di update ');
        }
      })
      .catch(function (error) {
        Toast.show('Item gagal di update !', error);
      });
  };

  const deleteModal = (item) => {
    setModalVisible(true);
    setSelectProduct(item);
  };

  const toggleModal = (item) => {
    setShowModalEdit(true);
    setSelectProduct(item);
    setHarga(item.price_bargain.toString());
    setQuantity(item.qty);
  };

  useEffect(() => {
    getListCard();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <Header type="menu" onPress={() => navigation.goBack()} />
        <View style={styles.page}>
          <Text style={styles.title}>Bayar</Text>
          <TextInput
            style={styles.input}
            placeholder="Bayar"
            value={bayar.toString()}
            onChangeText={hitungKembalian}
            keyboardType="number-pad"
          />
          {/* <NumberFormat
            value={bayar.toString()}
            displayType={'text'}
            thousandSeparator={true}
            // isNumericString={true}
            // prefix={'$'}
            renderText={(value) => (
              <TextInput
                style={styles.input}
                placeholder="Bayar"
                // value={bayar.toString()}
                onChangeText={hitungKembalian}
                keyboardType="number-pad"
                value={value}
              />
            )}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View>
              <Text style={styles.title}>Total</Text>
              <NumberFormat
                value={total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={(value) => (
                  <Text style={styles.angka}>{value}</Text>
                )}
              />
            </View>
            <View>
              <Text style={styles.title}>Kembalian</Text>
              <NumberFormat
                value={kembalian}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp '}
                renderText={(value) => (
                  <Text style={styles.angka}>{value}</Text>
                )}
              />
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Button title="Checkout" onPress={() => doTransaction()} />
          </View>
          <FlatList
            data={listCart}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  type="shop"
                  nama_produk={item.product_name}
                  jumlah={item.qty}
                  harga={item.price_bargain}
                  total={item.qty * item.price_bargain}
                  onPressDelete={() => deleteModal(item)}
                  onPressEdit={() => toggleModal(item)}
                />
              );
            }}
          />
          <ModalDelete
            isVisible={isModalVisible}
            nama_barang={selectProduct.product_name}
            pressCancel={() => setModalVisible(false)}
            pressOk={() => deleteListCart()}
          />
          <ModalComponent
            isVisible={showModalEdit}
            onChangeText={(input) => setHarga(input)}
            value={harga}
            product={selectProduct.name}
            kurangBarang={() => setQuantity(quantity - 1)}
            tambahBarang={() => setQuantity(quantity + 1)}
            jumlahBarang={quantity}
            pressCancel={() => setShowModalEdit(false)}
            pressOk={() => updateListCart()}
          />
        </View>
      </SafeAreaView>
      {loading && <Loading />}
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.blue,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  safearea: {flex: 1, backgroundColor: 'white'},
  title: {
    fontSize: 12,
    marginVertical: 5,
  },
  angka: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  page: {flex: 1, backgroundColor: 'white', paddingHorizontal: 16},
});
