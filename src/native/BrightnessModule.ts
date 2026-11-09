import {NativeModules} from 'react-native';

const {BrightnessModule} = NativeModules;

interface IBrightnessModule {
  setBrightness(brightness: number): Promise<boolean>;
  getBrightness(): Promise<number>;
}

export default BrightnessModule as IBrightnessModule;
