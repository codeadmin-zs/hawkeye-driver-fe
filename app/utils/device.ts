import {Dimensions} from 'react-native';

type getSizeForScreenType = [number, number?, number?];

class device {
  static width = (): number => Dimensions.get('window').width;

  static height = (): number => Dimensions.get('window').height;

  static getSizeForScreen = (options: getSizeForScreenType): number => {
    if (options.length === 1) {
      return options[0];
    }

    if (options.length === 2) {
      return device.isSmall() ? options[0] : options[1];
    }

    if (options.length === 3) {
      return device.isSmall()
        ? options[0]
        : device.isLarge()
        ? options[2]
        : options[1];
    }
  };

  // Shorthand wrapper around getSizeForScreen for convenience
  static s = (options: getSizeForScreenType): number =>
    device.getSizeForScreen(options);

  static isSmall = (): boolean => device.width() <= 320;

  static isLarge = (): boolean => device.width() >= 768;
}

export {device};
