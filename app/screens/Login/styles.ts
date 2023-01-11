import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerView: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, .8)',
  },
  login: {
    padding: 8,
  },
  forgot: {
    marginTop: 12,
  },
  labelStyle: {
    fontSize: 12,
  },
  textInput: {
    backgroundColor: 'transparent',
    width: '92%',
    paddingLeft: '2%',
  },
  textInputContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
});

export default styles;
