/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setNotes} from '../redux/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Home = ({navigation}) => {
  const {notes} = useSelector(state => state.noteInfo);
  const dispatch = useDispatch();
  const [refresh, updateRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    updateRefresh(true);
    getData();
    updateRefresh(false);
  };

  const getData = async () => {
    try {
      await AsyncStorage.getItem('NoteData').then(value => {
        if (value) {
          let convertedData = JSON.parse(value);
          if (convertedData) {
            dispatch(setNotes(convertedData));
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        style={styles.allNotes}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{marginBottom: 30}}
            onPress={() => {
              navigation.navigate('Details', {Id: item.ID});
            }}>
            <View style={styles.noteContainer}>
              <View style={styles.noteTitle}>
                <View style={styles.alldate}>
                  <Text style={styles.noteTime}>
                    {item.Date.slice(item.Date.lastIndexOf('/') + 1)}
                  </Text>
                  <Text style={styles.noteDate}>
                    {item.Date.slice(0, item.Date.lastIndexOf('/'))}
                  </Text>
                </View>
                <Text style={styles.titlenote} numberOfLines={1}>
                  {item.Title}
                </Text>
              </View>
              <View style={styles.noteDescription}>
                <Text style={styles.descriptionnote} numberOfLines={1}>
                  {item.Description}
                </Text>
                <Text style={styles.alarmACtivity}>
                  {item.Alarm === true && (
                    <MaterialIcons
                      name={'alarm-on'}
                      size={30}
                      color={'#4D77FF'}
                    />
                  )}
                  {item.Alarm === false && (
                    <MaterialIcons
                      name={'alarm-off'}
                      size={30}
                      color={'#4D77FF'}
                    />
                  )}
                </Text>
              </View>
              {item.TimeAlarm ? item.handelnotification : null}
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addTask}
        onPress={() => {
          navigation.navigate('Note');
        }}>
        <Text>
          <FontAwesome5 name={'plus'} size={20} color={'white'} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  allNotes: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  noteContainer: {
    borderTopLeftRadius: 10,
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCC',
  },
  descriptionnote: {
    fontSize: 20,
  },
  alarmACtivity: {
    position: 'absolute',
    right: 10,
    color: 'white',
    padding: 5,
    backgroundColor: '#CCC',
  },
  addTask: {
    padding: 20,
    backgroundColor: '#4D77FF',
    position: 'absolute',
    bottom: 10,
    right: 15,
    borderRadius: 20,
  },
});

export default Home;
