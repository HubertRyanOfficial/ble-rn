import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import Home from './src/Home';
import BLEProvider from './src/providers/BLEProvider';
import {getBluetoothPermission} from './src/utils/permission';

function App() {
  useEffect(() => {
    getBluetoothPermission();
  }, []);

  return (
    <SafeAreaView>
      <BLEProvider>
        <Home />
      </BLEProvider>
    </SafeAreaView>
  );
}

export default App;
