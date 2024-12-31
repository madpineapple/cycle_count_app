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
  RootStackParamList,
} from "../../types/navigation-types";
import CsvImporter from "../CsvImporter";

type Props = NativeStackScreenProps<RootStackParamList, "BA Screen">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const BAScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();

  const { buildDataArray, setBuildDataArray } = route.params;
  const passData = (order: BuildItemData) => {
    setBuildDataArray({ ...buildDataArray });
    navigation.navigate("BA Pick Screen", { order });
  };
  const handleParsedData = (data: any) => {
    console.log("data");
  };

  return (
    <View style={styles.container}>
      <CsvImporter onDataParsed={(data) => handleParsedData(data)} />
      {sampleBuildAssemblyDataArr.map((order) => (
        <View key={order.id}>
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
