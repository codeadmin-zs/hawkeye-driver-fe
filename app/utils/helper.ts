import {Dimensions, ScaledSize} from 'react-native';
import moment from 'moment';

// To get window dimensions
export const Native = Dimensions;
export const Screen: ScaledSize = Dimensions.get('screen');
export const GetWindow = (): ScaledSize => Dimensions.get('window');

const Time = moment;

export default {
  Native,
  Screen,
  GetWindow,
  Time,
};
