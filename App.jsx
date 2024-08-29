import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./tabs/HomeScreen";
import AboutScreen from "./tabs/AboutScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}