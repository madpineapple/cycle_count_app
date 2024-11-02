import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../../styles";
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

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Individual Pick Item Screen"
>;

const IndividualPickScreen: React.FC<Props> = ({ route }) => {
  const { orderArray } = route.params;
  console.log(orderArray);
  return (
    <View>
      <Text>Pick Item</Text>
      <ScrollView>
        <Text>{orderArray.material_name}</Text>
        <Text>{orderArray.material_number}</Text>
      </ScrollView>
    </View>
  );
};
export default IndividualPickScreen;
