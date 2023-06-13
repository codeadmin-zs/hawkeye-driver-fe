import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { FunctionComponent } from "react";

const Separator: FunctionComponent<any> = ({ style = {} }) => {
    const { colors } = useTheme();
  
    return (
        
      <View
        style={{
          borderBottomColor: colors.passive,
          borderBottomWidth: StyleSheet.hairlineWidth,
          ...style,
        }}
      >
      </View>
    );
  };
  
  export default Separator;