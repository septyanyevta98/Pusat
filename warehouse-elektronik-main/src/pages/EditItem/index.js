import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, HeaderBack, Input, Loading} from '../../components';
import {colors} from '../../utils';
import {getMerk, userToken} from '../../redux/merk/getMerk';
import {getCategory} from '../../redux/category/getCategory';
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PayloadBody, editProduct} from '../../redux/product/updateProduct';
import Toast from 'react-native-simple-toast';
const EditItem = ({route, navigation}) => {
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [listBrand, setListBrand] = useState([]);
  const [brand, setBrand] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState('');
  const [nameProduct, setNameProduct] = useState('');
  const [priceBuy, setPriceBuy] = useState('');
  const [priceSell, setPriceSell] = useState('');
  const [stock, setStock] = useState('');
  const [filePath, setFilePath] = useState('');
  // const [image, setImage] = useState('false');
  const [gambarEdit, setGambarEdit] = useState('');
  const [sku, setSku] = useState('');
  const [store, setStore] = useState('');

  const {
    id_edit,
    // image_edit,
    category_edit,
    brand_edit,
    nama_edit,
    harga_beli_edit,
    harga_jual_edit,
    stock_edit,
    sku_edit,
    store_edit,
  } = route.params;

  useEffect(() => {
    getListBrand();
    getListCategory();
    setNameProduct(nama_edit);
    setPriceBuy(harga_beli_edit);
    setPriceSell(harga_jual_edit);
    setStock(stock_edit);
    // setGambarEdit(image_edit);
    setSku(sku_edit);
    setStore(store_edit);
  }, []);

  const getListBrand = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;

    setLoading(true);

    dispatch(getMerk({userToken: payload}))
      .then((res) => {
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

  const updateItem = () => {
    const payload = PayloadBody;
    payload.id = id_edit;
    payload.store = store;
    // console.log('>>>>>>>>>>', HomeReducer.storeID);
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
    dispatch(editProduct({PayloadBody: payload}))
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.code === 200) {
          Toast.show('Product Berhasil ditambahkan sukses !');
          navigation.replace('MainApp', {screen: 'ListItem'});
        } else {
          Toast.show('Product Gagal ditambahkan');
          // console.log(res);
        }
      })
      .catch(function (error) {
        Toast.show('add brand gagal !', error);
      });
  };

  const inputNameProduct = (input) => {
    setNameProduct(input);
  };

  const inputPriceBuy = (input) => {
    setPriceBuy(input);
  };

  const inputPriceSell = (input) => {
    setPriceSell(input);
  };

  const inputStock = (input) => {
    setStock(input);
  };
  const inputSkuProduct = (input) => setSku(input);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderBack
          onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
          title="EDIT PRODUK"
        />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
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
          />
          <Input
            placeholder="Harga Jual"
            onChangeText={inputPriceSell}
            value={priceSell}
          />
          <Input placeholder="Stock" onChangeText={inputStock} value={stock} />
          <Button title="Edit produk" onPress={updateItem} />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default EditItem;

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
