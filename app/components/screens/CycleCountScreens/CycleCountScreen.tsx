import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ItemData, RootStackParamList } from "../../types/navigation-types";
import CsvImporter from "../CsvImporter";
import { sampleJson } from "../../data/sampleJson";
import CsvExporter from "../CsvExporter";

type Props = NativeStackScreenProps<RootStackParamList, "Cycle Count">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CycleCount: React.FC<Props> = ({ route }) => {
  const cycleCountListArr = sampleJson;

  const [dataArray, setDataArray] = useState<ItemData[]>([]);
  const [confirmedDataArray, setConfirmedDataArray] = useState<ItemData[]>([]);

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

  //Prepare individual dat to be sent to modal
  const prepareItemData = (item: ItemData) => {
    setItemData({
      ...itemData,
      Id: item.Id,
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

  //If count is correct confirm count function
  const confirmCount = (data: ItemData) => {
    const updatedArray = dataArray.filter((item) => item.Id !== data.Id);
    setConfirmedDataArray((prev) => [...prev, data]);
    setDataArray(updatedArray);
  };

  //Confrim count
  const handleNavigateToConfirmCount = (items: ItemData) => {
    navigation.navigate("Confirm Count", {
      confirmCount,
      items,
    });
  };
  const navigation = useNavigation<NavigationProp>();

  const navigateToChangeCountScreen = (items: ItemData) => {
    prepareItemData(items);
    navigation.navigate("Correct Count", { dataArray, setDataArray, items });
  };

  const handleParsedData = (data: any[]) => {
    const dataWithIds = data.map((row, index) => ({
      Id: index,
      ...row,
    }));
    setDataArray(dataWithIds);
    console.log("data with Ids ", dataWithIds);
    console.log("data", dataArray);
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
                    key={item.Id}
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
                        onPress={() => handleNavigateToConfirmCount(item)}
                      >
                        <Text style={styles.buttonText}>
                          Confirm count {item.Qty}
                        </Text>
                      </Pressable>
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
      {confirmedDataArray.length > 0 && (
        <CsvExporter dataToBeUnParsed={confirmedDataArray} />
      )}
    </View>
  );
};

export default CycleCount;
