import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './src/navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      {/*<Navigator />*/}
      <Tabs />
    </NavigationContainer>
  )
}

export default App