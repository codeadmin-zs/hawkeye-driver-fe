import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-paper';

import * as themeActions from 'app/store/actions/themeActions';
import {IThemeState} from 'app/models/reducers/theme';

interface Props {
  children: ReactNode;
}

const ContainerTemplate = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%',
    justifyContent:'center'
  },
});

export default ContainerTemplate;
