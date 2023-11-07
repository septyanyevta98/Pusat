import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {Button, HeaderBack, Input, Loading} from '../../components';
import {colors} from '../../utils';
import {
  updateCategory,
  userToken,
  PayloadBody,
} from '../../redux/category/updateCategory';
import Toast from 'react-native-simple-toast';

const EditCategory = ({title, navigation, route}) => {
  const {id_edit, category_edit, image_edit} = route.params;
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const HomeReducer = useSelector((State) => State.loginReducer);
  const dispatch = useDispatch();

  const [filePath, setFilePath] = useState('');
  const [image, setImage] = useState('false');

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

  const updateCategoryList = () => {
    const payload = PayloadBody;
    payload.id = id_edit;
    payload.store = HomeReducer.storeID;
    payload.name = category;
    payload.image = image;

    const usrParam = userToken;
    usrParam.token = HomeReducer.token;
    payload.userParam = usrParam;

    setLoading(true);
    // console.log('add category :', payload);
    dispatch(updateCategory({PayloadBody: payload}))
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.code === 200) {
          Toast.show('Category Berhasil diupdate!');
          navigation.replace('InputCategory');
        } else {
          Toast.show('Category gagal di update');
          // console.log(res);
        }
      })
      .catch(function (error) {
        Toast.show('add brand gagal !', error);
      });
  };
  useEffect(() => {
    setCategory(category_edit);
    setFilePath(image_edit);
  }, []);

  return (
    <>
      <View style={styles.page}>
        <HeaderBack
          onPress={() => navigation.navigate('MainApp', {screen: 'ListItem'})}
          title="INPUT KATEGORI"
        />
        <View
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 17}}>
          <View>
            <TouchableOpacity
              style={styles.button}
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
            </TouchableOpacity>
            <Input
              placeholder="Masukkan Kategori"
              onChangeText={inputHandler}
              value={category}
            />
            <Button title="Tambahkan Kategori" onPress={updateCategoryList} />
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default EditCategory;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  page: {flex: 1, backgroundColor: 'white'},
});
