/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/customButton';
import {useSelector, useDispatch} from 'react-redux';
import {setNotes} from '../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Update = ({navigation, route}) => {
  useEffect(() => {
    getNoteInfo();
  }, []);

  const {setid} = route.params;
  const {notes} = useSelector(state => state.noteInfo);
  const dispatch = useDispatch();

  const [gettitle, updateTitle] = useState('');
  const [getdescription, updateDescription] = useState('');
  const [getalarm, updateAlarm] = useState(false);
  const [date, updateDate] = useState('');
  const [mode, updateMode] = useState('date');
  const [stateNotification, updatestNoti] = useState(false);

  const dateFromUser = `${new Date(date).toLocaleDateString()}`;

  const timeFromUser = `${new Date(date)
    .toLocaleTimeString()
    .slice(0, new Date(date).toLocaleTimeString().lastIndexOf(':'))}`;

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    updateAlarm(Platform.OS === 'ios');
    updateDate(currentDate);
  };

  const handelnotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'note-notification',
      title: gettitle,
      message: getdescription,
      date: new Date(new Date(`${date}`).getTime() - 30000),
      allowWhileIdle: true,
    });
  };

  const createDate = () => {
    const de = new Date();
    const mon = de.getMonth();
    const day = de.getDate();
    const yer = de.getFullYear();
    const hour = de.getHours();
    const min = de.getMinutes();
    if (min < 10) {
      return `${yer} / ${mon} / ${day}/${hour} :0${min}`;
    } else {
      return `${yer} / ${mon} / ${day}/${hour} :${min}`;
    }
  };

  const getNoteInfo = async () => {
    try {
      await AsyncStorage.getItem('NoteData').then(value => {
        if (value) {
          let convertedData = JSON.parse(value);
          if (convertedData) {
            const returnitem = convertedData.filter(itm => itm.ID === setid);
            updateTitle(returnitem[0].Title);
            updateDescription(returnitem[0].Description);
            updatestNoti(returnitem[0].Alarm);
            updateDate(new Date(returnitem[0].DateAlarm));
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    const findElement = notes.findIndex(note => note.ID === setid);
    if (findElement > -1) {
      if (gettitle.length === 0 && getdescription.length === 0) {
        Alert.alert('Wrong', 'You Should Type The Title or Description');
      } else {
        try {
          var items = {};
          if (stateNotification && date.getTime() > Date.now()) {
            items = {
              ID: findElement,
              Title: gettitle,
              Description: getdescription,
              Date: createDate(),
              Alarm: stateNotification,
              DateAlarm: date,
              handelnotification: handelnotification(),
            };
          } else {
            items = {
              ID: findElement,
              Title: gettitle,
              Description: getdescription,
              Date: createDate(),
              Alarm: stateNotification,
            };
          }
          let newitems = [...notes];
          newitems[findElement] = items;
          if (stateNotification && date.getTime() <= Date.now()) {
            Alert.alert('wrang', 'should bla bla bla bla');
          } else {
            await AsyncStorage.setItem('NoteData', JSON.stringify(newitems))
              .then(() => {
                dispatch(setNotes(newitems));
                Alert.alert('Succes', 'Note Add');
                navigation.navigate('Home');
              })
              .catch(error => {
                console.log(error);
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      null;
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.centerInput}>
        <TextInput
          style={styles.input}
          value={gettitle}
          placeholder="Type Title For Your Note"
          onChangeText={value => {
            updateTitle(value);
          }}
        />

        <TextInput
          style={[styles.textarea]}
          value={getdescription}
          multiline
          placeholder="Type Description For Your Note"
          onChangeText={value => {
            updateDescription(value);
          }}
        />

        <TouchableOpacity
          style={styles.noteButton}
          onPress={() => {
            updatestNoti(!stateNotification);
          }}>
          <Text style={styles.FontAwConta}>
            {stateNotification ? (
              <MaterialIcons name={'alarm-on'} size={30} color={'#4D77FF'} />
            ) : (
              <MaterialIcons name={'alarm-off'} size={30} color={'#4D77FF'} />
            )}
          </Text>
        </TouchableOpacity>

        {stateNotification && (
          <CustomButton
            style={styles.buttonDate}
            title={dateFromUser}
            backColor="white"
            onclickfunction={() => {
              updateAlarm(true);
              updateMode('date');
            }}
          />
        )}

        {stateNotification && (
          <CustomButton
            style={styles.buttonDate}
            title={timeFromUser}
            backColor="white"
            onclickfunction={() => {
              updateAlarm(true);
              updateMode('time');
            }}
          />
        )}

        {getalarm && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <CustomButton
          style={{marginTop: 20}}
          textPosition="center"
          title="Save Note"
          backColor="#4D77FF"
          color="white"
          onclickfunction={() => {
            setData();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  centerInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '96%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#42C2FF',
    borderStyle: 'solid',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 20,
  },
  textarea: {
    width: '96%',
    padding: 10,
    borderWidth: 2,
    borderColor: '#42C2FF',
    borderStyle: 'solid',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  noteButton: {
    paddingLeft: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  FontAwConta: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#CCC',
  },
  buttonDate: {
    width: '96%',
    borderWidth: 2,
    borderColor: '#42C2FF7',
    borderStyle: 'solid',
    marginBottom: 10,
  },
});
export default Update;
