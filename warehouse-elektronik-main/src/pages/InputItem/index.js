import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBack, Button, Input, List, Loading} from '../../components';
import {colors} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {getMerk, userToken} from '../../redux/merk/getMerk';
import {getCategory} from '../../redux/category/getCategory';
import {useDispatch, useSelector} from 'react-redux';
import {addMerk, PayloadBody} from '../../redux/product/addProduct';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

const InputItem = ({title, navigation}) => {
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [listBrand, setListBrand] = useState([]);
  const [brand, setBrand] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [priceBuy, setPriceBuy] = useState('');
  const [priceSell, setPriceSell] = useState('');
  const [stock, setStock] = useState('');
  const [filePath, setFilePath] = useState('');
  const [valueStoreID, setValueStoreID] = useState('');
  // const [image, setImage] = useState('false');
  const [sku, setSku] = useState('');

  // const retrieveData = async () => {
  //   try {
  //     const a = await AsyncStorage.getItem('loginData');
  //     let resultParsed = JSON.parse(a);
  //     setValueStoreID(resultParsed.storeID);
  //     console.log('valueStoreID', a);
  //     console.log('store id', valueStoreID);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 400,
      maxHeight: 400,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      setImage(response.base64);
    });
    // }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  useEffect(() => {
    // retrieveData();
    // console.log(HomeReducer);
    getListBrand();
    getListCategory();
  }, []);

  const getListBrand = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getMerk({userToken: payload}))
      .then((res) => {
        // console.log('brand ==>', res.data);
        if (res.code === 200) {
          setLoading(false);
          setListBrand(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error category : ', error);
      });
  };
  const getListCategory = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getCategory({userToken: payload}))
      .then((res) => {
        // console.log('list category :', res.data);
        if (res.code === 200) {
          setLoading(false);
          setListCategory(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error category : ', error);
      });
  };

  const addProduct = () => {
    if (brand === '') {
      Toast.show('Silahkan masukkan nama barang !');
    } else {
      const payload = PayloadBody;
      payload.store = HomeReducer.storeID;
      // console.log('isi dari home reducer', HomeReducer);
      // payload.store = '2';
      payload.name = nameProduct;
      payload.category = category;
      payload.merk = brand;
      payload.price_buy = priceBuy;
      payload.price_sell = priceSell;
      payload.stock = stock;
      // payload.image = image;
      payload.sku = sku;

      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log('add category :', payload);
      dispatch(addMerk({PayloadBody: payload}))
        .then((res) => {
          // console.log('respon if success : ', res);
          setLoading(false);
          if (res.code === 201) {
            Toast.show('Product Berhasil ditambahkan sukses !');
            navigation.replace('MainApp', {screen: 'ListItem'});
          } else {
            Toast.show('Product Gagal ditambahkan', res);
          }
        })
        .catch(function (error) {
          Toast.show('add brand gagal !', error);
        });
    }
  };

  const inputNameProduct = (input) => {
    setNameProduct(input);
  };

  const inputPriceBuy = (input) => {
    setPriceBuy(input);
  };

  const inputSkuProduct = (input) => setSku(input);

  const inputPriceSell = (input) => {
    setPriceSell(input);
  };

  const inputStock = (input) => {
    setStock(input);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderBack
          onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
          title="INPUT PRODUK"
        />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
          <View>
            {/* <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={() => captureImage('photo')}>
              {filePath !== '' ? (
                <Image
                  source={{uri: filePath.uri}}
                  style={{height: 200, width: 200}}
                />
              ) : (
                <Icon name="ios-aperture" size={60} color={colors.blueDark} />
              )}

              <Text>Upload Image</Text>
            </TouchableOpacity> */}
            <Input
              placeholder="Masukkan SKU"
              onChangeText={inputSkuProduct}
              value={sku}
            />
            <DropDownPicker
              items={listCategory?.map((data) => ({
                label: data.name,
                value: data.id,
              }))}
              defaultValue={category}
              containerStyle={styles.containerDropdown}
              style={styles.dropdownStyle}
              itemStyle={{justifyContent: 'flex-start'}}
              placeholder="Pilih Kategori"
              dropDownStyle={{backgroundColor: 'white'}}
              labelStyle={styles.dropdownLabel}
              onChangeItem={(item) => setCategory(item.value)}
              searchable={true}
              searchablePlaceholder="Cari Kategori"
              searchablePlaceholderTextColor="gray"
            />
            <DropDownPicker
              items={listBrand?.map((data) => ({
                label: data.name,
                value: data.id,
              }))}
              defaultValue={brand}
              containerStyle={styles.containerDropdown}
              style={styles.dropdownStyle}
              itemStyle={{justifyContent: 'flex-start'}}
              placeholder="Pilih Brand"
              dropDownStyle={{backgroundColor: 'white'}}
              labelStyle={styles.dropdownLabel}
              onChangeItem={(item) => setBrand(item.value)}
              searchable={true}
              searchablePlaceholder="Cari Brand"
              searchablePlaceholderTextColor="gray"
            />
            <Input
              placeholder="Masukkan Produk"
              onChangeText={inputNameProduct}
              value={nameProduct}
            />
            <Input
              placeholder="Harga Pokok"
              onChangeText={inputPriceBuy}
              value={priceBuy}
              keyboardType="numeric"
            />
            <Input
              placeholder="Harga Jual"
              onChangeText={inputPriceSell}
              value={priceSell}
              keyboardType="numeric"
            />
            <Input
              placeholder="Stock"
              onChangeText={inputStock}
              value={stock}
              keyboardType="numeric"
            />
            <Button title="Tambahkan produk" onPress={addProduct} />
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default InputItem;

const styles = StyleSheet.create({
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
    marginBottom: 8,
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
});
