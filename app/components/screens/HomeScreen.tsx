import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RootStackParamList,
  ItemData,
  OrderData,
  BuildItemData,
} from "../types/navigation-types";
import styles from "../styles";
import { cycleCountListArr } from "../data/sampleData";
import { sampleBuildAssemblyDataArr } from "../data/sampleBuildAssemblyData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [dataArray, setDataArray] =
    React.useState<ItemData[]>(cycleCountListArr);

  const [buildDataArray, setBuildDataArray] = React.useState<BuildItemData[]>(
    sampleBuildAssemblyDataArr
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.mainMenuButton}
        onPress={() =>
          navigation.navigate("Cycle Count", { dataArray, setDataArray })
        }
      >
        <Text style={styles.buttonText}>Cycle Count</Text>
      </Pressable>
      <Pressable
        style={styles.mainMenuButton}
        onPress={() =>
          navigation.navigate("BA Screen", {
            buildDataArray,
            setBuildDataArray,
          })
        }
      >
        <Text style={styles.buttonText}>Build Assembly: Pick Order</Text>
      </Pressable>
      <Pressable
        style={styles.mainMenuButton}
        onPress={() => navigation.navigate("Test Camera Screen")}
      >
        <Text style={styles.buttonText}>Test Camera</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
