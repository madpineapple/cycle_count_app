import React from "react";
import styles from "../../styles";
import { View, Text, Pressable } from "react-native";
import { sampleBuildAssemblyDataArr } from "../../data/sampleBuildAssemblyData";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import {
  BuildOrderData,
  RootStackParamList,
} from "../../types/navigation-types";
import { ScrollView } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "BA Pick Screen">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const BuildAssemblyPickingScreen: React.FC<Props> = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const IndividualPickOpen = (orderArray: BuildOrderData) => {
    console.log(orderArray);
    navigation.navigate("Individual Pick Item Screen", { orderArray });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.biggerText}>{order.product_name}</Text>
      <Text style={styles.biggerText}>BA: {order.build_assembly_number}</Text>

      <ScrollView>
        {order.order_data.map((item) => (
          <View key={item.id}>
            <Pressable
              style={styles.calculatorButton}
              // onPress={() => navigation.navigate("Test Camera Screen")}
              onPress={() => IndividualPickOpen(item)}
            >
              <Text>{item.material_name}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default BuildAssemblyPickingScreen;
