import React from "react";
import styles from "../../styles";
import { View, Text, Pressable } from "react-native";
import { sampleBuildAssemblyDataArr } from "../../data/sampleBuildAssemblyData";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BuildItemData,
  OrderData,
  RootStackParamList,
} from "../../types/navigation-types";

type Props = NativeStackScreenProps<RootStackParamList, "BA Screen">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const BAScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();

  const { buildDataArray, setBuildDataArray } = route.params;
  const passData = (order: BuildItemData) => {
    setBuildDataArray({ ...buildDataArray });
    navigation.navigate("BA Pick Screen", { order });
  };

  return (
    <View style={styles.container}>
      {sampleBuildAssemblyDataArr.map((order, orderIndex) => (
        <View key={orderIndex}>
          <Pressable
            style={styles.mainMenuButton}
            onPress={() => passData(order)}
          >
            <Text>{order.product_name}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};
export default BAScreen;
