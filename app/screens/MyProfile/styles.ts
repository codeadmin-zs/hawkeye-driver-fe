import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    profileTitleBox: {
      width: '50%',
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '2.5%',
      marginTop: '3%',
    },
    textBox: {
      backgroundColor: '#fff',
      marginVertical: '1%',
    },
    textBoxContainer: {
      flex: 1,
      backgroundColor: colors.screenBackground,
      paddingHorizontal: '4%',
    },
    fullView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      backgroundColor: "#144072",
      width: "25%",
      height: "7%",
      borderRadius: 10, // added borderRadius
      marginTop: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText:{
      color:"#fff"
    },
   
    
    
    
    
    
    
    
  });
