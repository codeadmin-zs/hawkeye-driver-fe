import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { loginSelector } from "../store/features/login/selectors";

import { navigationRef } from "./NavigationService";

import Login from "app/screens/Login";
import Home from "app/screens/Home";
import ForgotPassword from "app/screens/ForgotPassword";
import PickupSchedule from "app/screens/PickupSchedule";
import MyBus from 'app/screens/MyBus'
import HolidayList from "app/screens/HolidayList";
import Messages from "app/screens/Messages";
import MyProfile from "app/screens/MyProfile";
import ChildProfile from "../screens/ChildProfile";
import ApplyLeave from "../screens/ApplyLeave";
import AttendanceSheet from "../screens/AttendanceSheet";
import AbsentDays from "../screens/AbsentDays";
import Track from "../screens/Track";
import FullMessage from "../screens/Messages/FullMessage";
import BusList from "../screens/Track/BusList";
import TripHistory from "../screens/TripHistory";
import TripDetails from "../screens/TripDetails";

import ThemeController from "../components/ThemeController";
import { StatusBar } from "react-native";
import { ILoginState } from "app/models/reducers/login";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

const homeOptions = {
  title: "Home",
  headerShown: false,
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerRight: () => <ThemeController />,
};

interface IState {
  loginReducer: ILoginState;
}

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useSelector((state: any) => state.login?.isLoggedIn);
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? "push" : "pop",
          headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={homeOptions} />
  </LoggedInStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useSelector((state: any) => state.login?.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={LoggedInNavigator}
              options={homeOptions}
            />
            <Stack.Screen
              name="PickupSchedule"
              component={PickupSchedule}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyBus"
              component={MyBus}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HolidayList"
              component={HolidayList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FullMessage"
              component={FullMessage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyProfile"
              component={MyProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChildProfile"
              component={ChildProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ApplyLeave"
              component={ApplyLeave}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AttendanceSheet"
              component={AttendanceSheet}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AbsentDays"
              component={AbsentDays}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Track"
              component={Track}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BusList"
              component={BusList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TripHistory"
              component={TripHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TripDetails"
              component={TripDetails}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={AuthNavigator}
              options={{
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                headerShown: false,
                title: "My home",
                animationTypeForReplace: isLoggedIn ? "push" : "pop",
                headerRight: () => <ThemeController />,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
