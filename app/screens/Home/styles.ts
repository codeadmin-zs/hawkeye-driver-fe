import {StyleSheet} from 'react-native';
import Dimensions from '../../utils/helper';
import { moderateScale } from 'react-native-size-matters';

const dim = Dimensions.Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tileContainer: {
    height: dim.height * 0.6,
    width: '100%',
  },
  tileContentContainer: {
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  menuTileStyle: {
    height: dim.width * 0.3,
    width: dim.width * 0.3,
    margin: dim.width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  menuIconContainer: {borderRadius: 150, padding: 10},
  menuTitle: {
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default styles;
