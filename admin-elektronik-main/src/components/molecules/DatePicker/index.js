import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../utils';

const DatePicker = ({tanggal, setTanggal}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTanggal(date);
    hideDatePicker();
  };

  return (
    <TouchableOpacity onPress={showDatePicker} style={{padding: 5}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="calendar-outline" size={22} color={colors.blue} />
        <Text style={{marginLeft: 5}}>{format(tanggal, 'dd/MM/yyyy')}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
};

export default DatePicker;
