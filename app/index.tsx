import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/screens/HomeScreen";
import CountCycleScreen from "./components/screens/CycleCountScreens/CycleCountScreen";
import ChangeCountScreen from "./components/screens/CycleCountScreens/ChangeCountScreen";
import BuildAssemblyPickScreen from "./components/screens/BAScreens/BuildAssemblyScreen";
import IndividualItemPick from "./components/screens/BAScreens/IndividualItemPick";
import BuildAssemblyPickingScreen from "./components/screens/BAScreens/BuildAssemblyPickingScreen";
import { sampleBuildAssemblyDataArr } from "./components/data/sampleBuildAssemblyData";
import CameraTestScreen from "./components/screens/CameraTestScreen";

import {
  RootStackParamList,
  ItemData,
  BuildItemData,
  OrderData,
} from "./components/types/navigation-types";
import { NavigationContainer } from "@react-navigation/native";
import ConfirmCountScreen from "./components/screens/CycleCountScreens/ConfirmCountScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomePage = () => {
  const [dataArray, setDataArray] = React.useState<ItemData[]>([]);
  const [buildDataArray, setBuildDataArray] = React.useState<BuildItemData[]>(
    sampleBuildAssemblyDataArr
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Welcome",
          }}
        />

        <Stack.Screen name="Cycle Count" component={CountCycleScreen} />

        <Stack.Screen
          name="Correct Count"
          component={ChangeCountScreen}
          initialParams={{ dataArray, setDataArray }}
        />

        <Stack.Screen name="Confirm Count" component={ConfirmCountScreen} />

        <Stack.Screen
          name="BA Screen"
          component={BuildAssemblyPickScreen}
          initialParams={{ buildDataArray, setBuildDataArray }}
        />

        <Stack.Screen
          name="BA Pick Screen"
          component={BuildAssemblyPickingScreen}
        />
        <Stack.Screen name="Test Camera Screen" component={CameraTestScreen} />
        <Stack.Screen
          name="Individual Pick Item Screen"
          component={IndividualItemPick}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomePage;
