import React, { useState } from "react";
import styles from "../../styles";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BuildItemData,
  BuildOrderData,
  RootStackParamList,
} from "../../types/navigation-types";
import CsvImporter from "../CsvImporter";

type Props = NativeStackScreenProps<RootStackParamList, "BA Screen">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const BAScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();
  const [buildDataArray, setBuildDataArray] = useState<BuildOrderData[]>([]);
  const [buildItemData, setBuildItemData] = useState<BuildItemData[]>([]);
  //Track which location is expanded
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  //Toggle function
  const toggleItemDetails = (id: number) => {
    setExpandedItem((prevItem) => (prevItem === id ? null : id));
  };

  const handleParsedData = (data: any) => {
    const dataWithIds = data.map((row: any, index: any) => ({
      id: index,
      ...row,
    }));
    setBuildDataArray(dataWithIds);
  };

  const IndividualPickOpen = (orderItem: BuildItemData) => {
    navigation.navigate("Individual Pick Item Screen", { orderItem });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <CsvImporter onDataParsed={(data) => handleParsedData(data)} />
        {buildDataArray?.map((order, index) => (
          <View key={order.id}>
            <Pressable
              style={styles.calculatorButton}
              onPress={() => toggleItemDetails(order.id)}
            >
              <Text>{order.Material_Name}</Text>
            </Pressable>
            {expandedItem === order.id && (
              <View
                style={[
                  styles.item,
                  index % 2 === 0 ? styles.evenRows : styles.oddRows,
                ]}
              >
                <Text>Material Number :{order.Material_Number}</Text>
                <Text>Material Lot :{order.Material_Number}</Text>
                <Text>Total Input per Batch:{order.Total_Input_per_Batch}</Text>
                <Text>Qty Issued:{order.Qty_Issued}</Text>
                <Text>Qty Wasted:{order.Qty_Wasted}</Text>
                <Text>Qty Returned:{order.Qty_Returned}</Text>
                <Text>Picked By:{order.Picked_By}</Text>
                <Text>Verified By:{order.Verified_By}</Text>
                <Pressable
                  style={styles.pickButton}
                  onPress={() => IndividualPickOpen(order)}
                >
                  <Text>Pick Item</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default BAScreen;
