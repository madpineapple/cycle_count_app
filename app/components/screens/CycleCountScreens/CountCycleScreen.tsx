import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import styles from "../../styles";
import { cycleCountListArr } from "../../data/sampleData";
import ModalComponent from "./ModalComponent";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation-types";

type Props = NativeStackScreenProps<RootStackParamList, "Cycle Count">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CycleCount: React.FC<Props> = ({ route }) => {
  //Do I still need this? Probably
  interface ItemData {
    item_id: number;
    item_location: string;
    item_number: string;
    item_name: string;
    item_lot_number: string;
    item_expiration_date: string;
    item_quantity: number;
    item_weight: number;
  }

  const { dataArray, setDataArray } = route.params;

  const groupedByLocation = dataArray.reduce((acc, item) => {
    // Check if the location already exists in the accumulator
    if (!acc[item.item_location]) {
      // If not, create an empty array for this location
      acc[item.item_location] = [];
    }
    // Add the current item to the array for its location
    acc[item.item_location].push(item);
    return acc;
  }, {} as Record<string, typeof cycleCountListArr>);

  //Track which location is expanded
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  //Toggle function
  const toggleLocation = (location: string) => {
    setExpandedLocation((prevLocation) =>
      prevLocation === location ? null : location
    );
  };

  const [confirmCountModal, setConfirmCountModalVisible] = useState(false);

  const [itemData, setItemData] = React.useState<ItemData>({
    item_id: 0,
    item_location: "",
    item_number: "",
    item_name: "",
    item_lot_number: "",
    item_expiration_date: "",
    item_quantity: 0,
    item_weight: 0,
  });

  const prepareItemData = (item: ItemData) => {
    setItemData({
      ...itemData,
      item_id: item.item_id,
      item_location: item.item_location,
      item_number: item.item_number,
      item_name: item.item_name,
      item_lot_number: item.item_lot_number,
      item_expiration_date: item.item_expiration_date,
      item_quantity: item.item_quantity,
    });
  };

  const openModal = (item: ItemData) => {
    setConfirmCountModalVisible(true);
    prepareItemData(item);
  };

  const closeModal = () => {
    setConfirmCountModalVisible(false);
  };

  const confirmCount = (index: number) => {
    const updatedArray = cycleCountListArr.filter(
      (item) => item.item_id !== index
    );
    setDataArray(updatedArray);
    closeModal();
  };

  const navigation = useNavigation<NavigationProp>();

  const navigateToChangeCountScreen = (items: ItemData) => {
    prepareItemData(items);
    navigation.navigate("Correct Count", { dataArray, setDataArray, items });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cycle count</Text>
      <ScrollView>
        {Object.keys(groupedByLocation).map((location, locationIndex) => (
          <View key={location}>
            <Pressable
              style={[
                styles.item,
                locationIndex % 2 === 0
                  ? styles.evenHeaderRows
                  : styles.oddHeaderRows,
              ]}
              onPress={() => toggleLocation(location)}
            >
              <Text style={styles.headerText}>{location}</Text>
            </Pressable>
            {expandedLocation === location && (
              <ScrollView>
                {groupedByLocation[location].map((item, index) => (
                  <View
                    style={[
                      styles.item,
                      index % 2 === 0 ? styles.evenRows : styles.oddRows,
                    ]}
                    key={index}
                  >
                    <Text style={styles.itemText}>
                      Material#: {item.item_number}
                    </Text>
                    <Text style={styles.itemText}>Desc: {item.item_name}</Text>
                    <Text style={styles.itemText}>
                      Lot#: {item.item_lot_number}
                    </Text>
                    <Text style={styles.itemText}>
                      ExpDate: {item.item_expiration_date}
                    </Text>
                    <Text style={styles.itemText}>
                      Qty: {item.item_quantity}
                    </Text>
                    <Text style={styles.itemText}>
                      Weight: {item.item_weight}
                    </Text>
                    <View style={styles.buttonView}>
                      <Pressable
                        style={styles.confirmButton}
                        onPress={() => openModal(item)}
                      >
                        <Text style={styles.buttonText}>
                          Confirm count {item.item_quantity}
                        </Text>
                      </Pressable>
                      <ModalComponent
                        isVisible={confirmCountModal}
                        onClose={closeModal}
                        data={itemData}
                        confrimCount={confirmCount}
                      />
                      <Pressable
                        style={styles.alterButton}
                        onPress={() => navigateToChangeCountScreen(item)}
                      >
                        <Text style={styles.buttonText}>Change count</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CycleCount;
