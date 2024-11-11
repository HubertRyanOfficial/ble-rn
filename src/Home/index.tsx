import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBLE} from '../providers/BLEProvider';

const Home: React.FC = () => {
  const {devices, connectWithDevice, connectedDevice, desconnectDevice} =
    useBLE();
  return (
    <ScrollView style={styles.container}>
      {connectedDevice && (
        <TouchableOpacity onPress={() => desconnectDevice()}>
          <View style={styles.deviceContainer}>
            <Text
              style={
                styles.deviceText
              }>{`Connected device: ${connectedDevice.name} - Press to desconnect`}</Text>
          </View>
        </TouchableOpacity>
      )}

      {!connectedDevice &&
        devices.length > 0 &&
        devices.map(device => (
          <TouchableOpacity
            key={device.id}
            onPress={() => connectWithDevice(device.id)}>
            <View style={styles.deviceContainer}>
              <Text style={styles.deviceText}>{device.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  deviceContainer: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 30,
    margin: 5,
  },
  deviceText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Home;
