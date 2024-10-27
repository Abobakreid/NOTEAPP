import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Applogo from './screens/applogo';
import Details from './screens/Details';
import Note from './screens/Note';
import Update from './screens/Update';
import {Provider} from 'react-redux';
import {Store} from './redux/store';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <stack.Navigator
          initialRouteName="Applogo"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#4D77FF',
            },
            headerTintColor: 'white',
          }}>
          <stack.Screen
            name="Applogo"
            component={Applogo}
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Notes',
            }}
          />
          <stack.Screen name="Note" component={Note} />
          <stack.Screen name="Details" component={Details} />
          <stack.Screen name="Update" component={Update} />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
