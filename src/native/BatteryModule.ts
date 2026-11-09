import {NativeModules} from 'react-native';

const {BatteryModule} = NativeModules;

interface IBatteryModule {
  getBatteryLevel(): Promise<number>;
}

export default BatteryModule as IBatteryModule;
