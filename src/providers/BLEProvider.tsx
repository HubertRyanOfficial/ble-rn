import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {BleManager, Device} from 'react-native-ble-plx';

interface BLEProviderProps {
  children: React.ReactNode;
}

interface BLEContextValues {
  devices: Device[];
  connectWithDevice(deviceId: string): Promise<void>;
  desconnectDevice(): Promise<void>;
  connectedDevice: Device | null;
}

const BLEContext = createContext({} as BLEContextValues);

export default function BLEProvider({children}: BLEProviderProps) {
  const manager = useMemo(() => new BleManager(), []);

  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const scanAndConnect = useCallback(() => {
    // Starting to scan devices around and verifying duplicated devices

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }

      if (
        device &&
        device.name &&
        !devices.find(
          deviceX => deviceX.id === device.id && deviceX.name === device.name,
        )
      ) {
        setDevices(prev => [...prev, device]);
      }
    });
  }, [manager, devices]);

  const connectWithDevice = useCallback(
    async (deviceId: string) => {
      try {
        // Connecting devices by deviceId

        const deviceConnected = await manager.connectToDevice(deviceId);
        if (!connectedDevice) {
          setConnectedDevice(deviceConnected);
        }
      } catch (error) {
        console.log('Error connection: ', error);
      }
    },
    [manager],
  );

  const desconnectDevice = useCallback(async () => {
    try {
      // Desconnecting device by connectedDevice

      if (connectedDevice) {
        await manager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
      }
    } catch (error) {
      console.log('Error connection: ', error);
    }
  }, [manager, connectedDevice]);

  useEffect(() => {
    // Listening state changed when bluetooth is powered on

    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
    return () => subscription.remove();
  }, [manager, scanAndConnect]);

  return (
    <BLEContext.Provider
      value={{devices, connectWithDevice, connectedDevice, desconnectDevice}}>
      {children}
    </BLEContext.Provider>
  );
}

export const useBLE = () => useContext(BLEContext);
