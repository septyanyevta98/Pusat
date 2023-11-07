import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {Button, HeaderBack, Input, List, Loading} from '../../components';
import MChooseImage from '../../components/molecules/Modal/MChooseImage';
import MDelete from '../../components/molecules/Modal/MDelete';
import {addCategory, PayloadBody} from '../../redux/category/addCategory';
import {deleteCategory} from '../../redux/category/deleteCategory';
import {getCategory, userToken} from '../../redux/category/getCategory';
import {colors} from '../../utils';

const InputCategory = ({title, navigation}) => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();
  const [listCategory, setListCategory] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [selectCategory, setSelectCategory] = useState('');
  const [filePath, setFilePath] = useState('');
  const [image, setImage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const pilihModal = () => {
    setIsVisible(true);
  };

  const inputHandler = (input) => {
    setCategory(input);
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
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      setFilePath(response);
      setImage(response.base64);
      setIsVisible(!isVisible);
    });
    // }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
      includeBase64: true,
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
      setFilePath(response);
      setImage(response.base64);
      setIsVisible(!isVisible);
    });
  };

  const tambahCategory = () => {
    if (category === '' || image === '') {
      Toast.show('Silahkan masukkan kategori & Image !');
    } else {
      const payload = PayloadBody;
      // payload.store = '13';
      payload.image = image;
      payload.store = HomeReducer.storeID;
      payload.name = category;

      const usrParam = userToken;
      usrParam.token = HomeReducer.token;
      payload.userParam = usrParam;

      setLoading(true);
      // console.log('add category :', payload);
      dispatch(addCategory({PayloadBody: payload}))
        .then((res) => {
          setLoading(false);
          if (res.code === 201) {
            Toast.show('Add category sukses !');
            getListCategory();
          } else {
            Toast.show('add category User Gagal');
          }
        })
        .catch(function (error) {
          Toast.show('add category gagal !', error);
        });
    }
  };

  const getListCategory = () => {
    const payload = userToken;
    payload.token = HomeReducer.token;
    setLoading(true);

    dispatch(getCategory({userToken: payload}))
      .then((res) => {
        // console.log(res.data);
        if (res.code === 200) {
          setLoading(false);
          setListCategory(res.data);
        }
      })
      .catch(function (error) {
        // console.log('error category : ', error);
      });
  };

  const DelCategory = () => {
    setModalDelete(!modalDelete);
    const payload = PayloadBody;
    payload.id = selectCategory.id;
    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    // console.log(payload);
    dispatch(deleteCategory({PayloadBody: payload}))
      .then((res) => {
        setLoading(false);
        // console.log(res);
        if (res.code === 200) {
          Toast.show('Data Berhasil Dihapus!');
          getListCategory();
        } else {
          Toast.show('add store User Gagal');
        }
      })
      .catch(function (error) {
        Toast.show('add store gagal !', error);
      });
  };

  const ModalDelete = () => {
    return (
      <Modal
        testID={'modal'}
        isVisible={modalDelete}
        // onSwipeComplete={modalDelete}
        style={styles.view2}>
        <MDelete
          respon="Apakah anda yakin untuk menghapus ?"
          title="Delete"
          item={selectCategory.name}
          onPressBatal={deleteModal}
          onPressOk={DelCategory}
        />
      </Modal>
    );
  };

  const deleteModal = (item) => {
    setModalDelete(!modalDelete);
    setSelectCategory(item);
  };

  useEffect(() => {
    getListCategory();

    const backAction = () => {
      navigation.navigate('MainApp', {screen: 'ListItem'});
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderBack
          onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
          title="INPUT KATEGORI"
        />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
          <View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={() => pilihModal()}>
              {filePath !== '' ? (
                <Image
                  source={{uri: filePath.uri}}
                  style={{height: 200, width: 200}}
                />
              ) : (
                <Icon name="ios-aperture" size={60} color={colors.blueDark} />
              )}

              <Text>Upload Image</Text>
            </TouchableOpacity>
            <Input
              placeholder="Masukkan Kategori"
              onChangeText={inputHandler}
              value={category}
            />
            <Button title="Tambahkan Kategori" onPress={tambahCategory} />
          </View>
          <FlatList
            data={listCategory}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <List
                  image={{uri: item.image}}
                  type="kategori"
                  title={item.name}
                  onPressDelete={() => deleteModal(item)}
                  onPressEdit={() =>
                    navigation.navigate('EditCategory', {
                      id_edit: item.id,
                      category_edit: item.name,
                      image_edit: item.image,
                    })
                  }
                />
              );
            }}
          />
        </View>
        <ModalDelete />
        <MChooseImage
          isVisible={isVisible}
          onPressGaleri={() => chooseFile('photo')}
          onPressPhoto={() => captureImage('photo')}
          onBackButtonPress={() => setIsVisible(false)}
          onPressTutup={() => setIsVisible(false)}
        />
      </View>
      {loading && <Loading />}
    </>
  );
};

export default InputCategory;

const styles = StyleSheet.create({});
