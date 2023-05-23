import React ,{useEffect,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
  TextInput
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Search from '../assets/Svgs/Search.svg';
import Dimensions from '../utils/helper';
import {Typography} from './Typography';
import {useTheme} from 'react-native-paper';
import {t} from 'i18next';

const dim = Dimensions.Screen;

 const SearchBox = (props)=> {

    const {colors} = useTheme();
  
    const styles = makeStyles(colors);

 const inputRef = props.inputRef;
  const { selectedType } = props;
  const defaultText = t('students.searchDescription');

  useEffect(()=>{
    inputRef?.current?.clear();
  },[selectedType])

    return (
      <SafeAreaView>
        <View style={styles.main}>
          <View
            style={{
              height: moderateScale(45),
              width: '92%',
              flexDirection: 'row',
              borderRadius: 8,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '6%',
              }}>
              <Search
                color={colors.primary}
                height={moderateScale(22)}
                width={moderateScale(22)}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '2%',
                flex: 1,
              }}>
              <TextInput
                height={moderateScale(40)}
                placeholderColor={colors.passive}
                color={colors.passive}
                placeholder={defaultText}
                fontSize={moderateScale(14)}
                fontWeight={'400'}
                marginTop={moderateScale(4)}
                style={{
                  color: colors.passive,
                  width:'100%'
                }}
                onChangeText={text => {
                  props.onSearch(text);
                }}
                fontFamily={'Poppins-Regular'}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default SearchBox;

const makeStyles = (colors: any) =>
  StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: moderateScale(10),
    backgroundColor: colors.primary,
  },
});
