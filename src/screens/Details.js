/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setNotes} from '../redux/actions';
const Details = ({navigation, route}) => {
  const {notes} = useSelector(state => state.noteInfo);
  const dispatch = useDispatch();
  const {Id} = route.params;
  const [gettitle, updateTitle] = useState('');
  const [getdescription, updateDescription] = useState('');
  const [getdate, updateDate] = useState('');
  const [getalr, updatealr] = useState(false);
  const [getDateAlarm, updateDateAlarm] = useState('');

  useEffect(() => {
    getNaskDetails();
  }, []);

  const getNaskDetails = async () => {
    try {
      await AsyncStorage.getItem('NoteData').then(value => {
        if (value) {
          let convertedData = JSON.parse(value);
          if (convertedData) {
            const returnitem = convertedData.filter(itm => itm.ID === Id);
            updateTitle(returnitem[0].Title);
            updateDescription(returnitem[0].Description);
            updateDate(returnitem[0].Date);
            updatealr(returnitem[0].Alarm);
            updateDateAlarm(returnitem[0].DateAlarm);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteElement = () => {
    const findElements = notes.filter(note => note.ID !== Id);
    if (findElements) {
      AsyncStorage.setItem('NoteData', JSON.stringify(findElements))
        .then(() => {
          dispatch(setNotes(findElements));
          Alert.alert('success', 'Note is deleted');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Alert.alert('error', 'No element to delate');
    }
  };
  return (
    <View style={styles.body}>
      <TouchableOpacity>
        <View style={styles.noteContainer}>
          <View style={styles.noteTitle}>
            <View style={styles.alldate}>
              <Text style={styles.noteTime}>
                {getdate.slice(getdate.lastIndexOf('/') + 1)}
              </Text>
              <Text style={styles.noteDate}>
                {getdate.slice(0, getdate.lastIndexOf('/'))}
              </Text>
            </View>
            <Text style={styles.titlenote}>{gettitle}</Text>
          </View>
          <View style={styles.noteDescription}>
            <Text style={styles.descriptionnote}>{getdescription}</Text>
            <Text style={styles.alarmACtivity}>
              {getalr ? (
                <MaterialIcons name={'alarm-on'} size={30} color={'#4D77FF'} />
              ) : (
                <MaterialIcons name={'alarm-off'} size={30} color={'#4D77FF'} />
              )}
            </Text>
          </View>

          {getalr && (
            <View style={styles.alarmDate}>
              <Text style={styles.noteTime}>
                {getDateAlarm
                  ? new Date(getDateAlarm)
                      .toLocaleTimeString()
                      .slice(
                        0,
                        new Date(getDateAlarm)
                          .toLocaleTimeString()
                          .lastIndexOf(':'),
                      )
                  : null}
              </Text>
              <Text style={styles.noteDate}>
                {getDateAlarm
                  ? new Date(getDateAlarm).toLocaleDateString()
                  : null}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.update}
        onPress={() => {
          navigation.navigate('Update', {setid: Id});
        }}>
        <Text style={[{fontSize: 16}, {color: 'white'}]}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.delelte}
        onPress={() => {
          deleteElement();
          navigation.navigate('Home');
        }}>
        <MaterialCommunityIcons
          name={'trash-can-outline'}
          size={25}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
  },
  noteContainer: {
    borderTopLeftRadius: 10,
    marginBottom: 15,
  },
  noteTitle: {
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#4D77FF',
    fontSize: 25,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  alldate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noteTime: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  noteDate: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 3,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  titlenote: {
    fontSize: 18,
    color: 'white',
    paddingBottom: 5,
    overflow: 'hidden',
  },
  noteDescription: {
    width: '100%',
    padding: 10,
    paddingRight: 50,
    backgroundColor: '#CCC',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  descriptionnote: {
    fontSize: 20,
  },
  alarmACtivity: {
    position: 'absolute',
    right: 10,
    color: 'white',
    padding: 5,
  },
  alarmDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#4D77FF',
    color: 'white',
  },
  update: {
    padding: 20,
    backgroundColor: '#4D77FF',
    position: 'absolute',
    bottom: 50,
    right: 15,
    borderRadius: 20,
  },
  delelte: {
    padding: 20,
    backgroundColor: '#4D77FF',
    position: 'absolute',
    bottom: 50,
    left: 15,
    borderRadius: 20,
  },
});

export default Details;
