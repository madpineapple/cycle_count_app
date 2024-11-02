import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/screens/HomeScreen";
import CountCycleScreen from "./components/screens/CycleCountScreens/CountCycleScreen";
import ChangeCountScreen from "./components/screens/CycleCountScreens/ChangeCountScreen";
import BuildAssemblyPickScreen from "./components/screens/BAScreens/BuildAssemblyScreen";
import IndividualItemPick from "./components/screens/BAScreens/IndividualItemPick";
import BuildAssemblyPickingScreen from "./components/screens/BAScreens/BuildAssemblyPickingScreen";
import { cycleCountListArr } from "./components/data/sampleData";
import { sampleBuildAssemblyDataArr } from "./components/data/sampleBuildAssemblyData";
import CameraTestScreen from "./components/screens/CameraTestScreen";

import {
  RootStackParamList,
  ItemData,
  BuildItemData,
  OrderData,
} from "./components/types/navigation-types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const WelcomePage = () => {
  const [dataArray, setDataArray] =
    React.useState<ItemData[]>(cycleCountListArr);
  const [buildDataArray, setBuildDataArray] = React.useState<BuildItemData[]>(
    sampleBuildAssemblyDataArr
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Cycle Count"
        component={CountCycleScreen}
        initialParams={{ dataArray, setDataArray }}
      />
      <Stack.Screen
        name="Correct Count"
        component={ChangeCountScreen}
        initialParams={{ dataArray, setDataArray }}
      />
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
  );
};

export default WelcomePage;
