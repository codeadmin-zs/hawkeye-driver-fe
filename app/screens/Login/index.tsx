import React, {useState} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {t} from '../../i18n';

import styles from './styles';
import {ILoginState} from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';
import {loginActions} from '../../store/features/login/slice';
import {loadingActions} from '../../store/features/loading/slice';
import {
  ImageBackgroundTemplate,
  ContainerTemplate,
} from '../../components/Templates';
import {WithLogoHeader} from '../../components';
import {Typography} from '../../components/Typography';
import {Button} from '../../components/Buttons/button';

//Icons
import Lock from '../../assets/Svgs/Lock.svg';
import Username from '../../assets/Svgs/Username.svg';
import Regions from '../../assets/Svgs/Regions.svg';
import Close from '../../assets/Close.svg';

interface IState {
  loginReducer: ILoginState;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading?.isLoading);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const userNameRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onLogin = () => {
    dispatch(loadingActions.enableLoading());
    dispatch(loginActions.loginRequest({userName,password}));
  };

  return (
    <ImageBackgroundTemplate>
      <View style={styles.containerView}>
        <WithLogoHeader />
        <ContainerTemplate>
          <View style={styles.textInputContainer}>
            <View style={{right: -10}}>
              <Username />
            </View>
            <TextInput
              ref={userNameRef}
              label={t('login.userName')}
              placeholder={t('login.userName')}
              style={styles.textInput}
              onChangeText={text => {

                setUserName(text);
              }}
            />
          </View>
          <View style={styles.textInputContainer}>
            <View style={{right: -10}}>
              <Lock />
            </View>
            <TextInput
              ref={passwordRef}
              label={t('login.password')}
              placeholder={t('login.password')}
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
              right={<Close />}
              secureTextEntry
            />
          </View>
          <Typography.H5 style={{textAlign: 'right', marginVertical: 10}}>
            {t('login.forgotPassword')}
          </Typography.H5>
          <Button.Primary onPress={onLogin} style={{marginTop: 10}}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={{color: '#fff'}}>{t('general.ok')}</Text>
            )}
          </Button.Primary>
        </ContainerTemplate>
      </View>
    </ImageBackgroundTemplate>
  );
};

export default Login;
