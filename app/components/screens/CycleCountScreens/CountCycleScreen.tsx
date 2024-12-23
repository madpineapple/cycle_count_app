import React, { useCallback, useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import styles from "../../styles";
//import { cycleCountListArr } from "../../data/sampleData";
import ModalComponent from "./ModalComponent";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ItemData, RootStackParamList } from "../../types/navigation-types";
import CsvImporter from "../CsvImporter";
import { sampleJson } from "../../data/sampleJson";

type Props = NativeStackScreenProps<RootStackParamList, "Cycle Count">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CycleCount: React.FC<Props> = ({ route }) => {
  const cycleCountListArr = sampleJson;

  const [dataArray, setDataArray] = useState<ItemData[]>(sampleJson);

  const groupedByLocation = dataArray.reduce((acc, item) => {
    // Check if the location already exists in the accumulator
    if (!acc[item.Location]) {
      // If not, create an empty array for this location
      acc[item.Location] = [];
    }
    // Add the current item to the array for its location
    acc[item.Location].push(item);
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
    Id: 0,
    PartNumber: " ",
    PartDescription: " ",
    Location: " ",
    Qty: 0,
    QtyCommitted: 0,
    Tracking_Lot_Number: " ",
    Tracking_Expiration_Date: "",
    Tracking_Vendor_Lot: " ",
  });

  const prepareItemData = (item: ItemData) => {
    setItemData({
      ...itemData,
      PartNumber: item.PartNumber,
      PartDescription: item.PartDescription,
      Location: item.Location,
      Qty: item.Qty,
      QtyCommitted: item.QtyCommitted,
      Tracking_Lot_Number: item.Tracking_Lot_Number,
      Tracking_Expiration_Date: item.Tracking_Expiration_Date,
      Tracking_Vendor_Lot: item.Tracking_Vendor_Lot,
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
    const updatedArray = cycleCountListArr.filter((item) => item.Id !== index);
    console.log("updated array: ", updatedArray);
    setDataArray(updatedArray);
    console.log("new array: ", dataArray);
    closeModal();
  };

  const navigation = useNavigation<NavigationProp>();

  const navigateToChangeCountScreen = (items: ItemData) => {
    prepareItemData(items);
    navigation.navigate("Correct Count", { dataArray, setDataArray, items });
  };

  const handleParsedData = (data: any[]) => {
    const dataWithIds = data.map((row, index) => ({
      Id: index + 1,
      ...row,
    }));
    setDataArray(dataWithIds);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cycle count</Text>
      <CsvImporter onDataParsed={(data) => handleParsedData(data)} />

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
                      Material#: {item.PartNumber}
                    </Text>
                    <Text style={styles.itemText}>
                      Desc: {item.PartDescription}
                    </Text>
                    <Text style={styles.itemText}>
                      Lot#: {item.Tracking_Lot_Number}
                    </Text>
                    <Text style={styles.itemText}>
                      ExpDate: {item.Tracking_Expiration_Date}
                    </Text>
                    <Text style={styles.itemText}>Qty: {item.Qty}</Text>
                    <Text style={styles.itemText}>
                      QtyCommitted: {item.QtyCommitted}
                    </Text>

                    <View style={styles.buttonView}>
                      <Pressable
                        style={styles.confirmButton}
                        onPress={() => openModal(item)}
                      >
                        <Text style={styles.buttonText}>
                          Confirm count {item.Qty}
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
