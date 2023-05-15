import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyBus: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.text}>This is my bus page</Text>
      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 32,
  },
});

export default MyBus;