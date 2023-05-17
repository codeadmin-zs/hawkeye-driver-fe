import React from "react";
import { StyleSheet, View,Text } from "react-native";

const MyBus: React.FC = () => {
  return (
    <>
    <View style={{flex:1}}>
      <Text style={styles.text}>
        this is my bus page
      </Text>
    </View>
  
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize:47,
  },
});

export default MyBus;
