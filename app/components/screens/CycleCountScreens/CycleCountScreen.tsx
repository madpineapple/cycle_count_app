import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ItemData, RootStackParamList } from "../../types/navigation-types";
import CsvImporter from "../CsvImporter";
import { sampleJson } from "../../data/sampleJson";
import CsvExporter from "../CsvExporter";
import {
  addToConfirmedCount,
  clearCycleCountData,
  getConfirmedCountData,
  loadCurrentCsvData,
  removeCurrentCsvItem,
  saveCurrentCsvData,
} from "../../cycleCountCSVStorage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const CycleCount = () => {
  //Don't really like this look into removing this
  const cycleCountListArr = sampleJson;

  const navigation = useNavigation<NavigationProp>();

  const [dataArray, setDataArray] = useState<ItemData[]>([]);
  const [confirmedDataArray, setConfirmedDataArray] = useState<ItemData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const savedData = await loadCurrentCsvData();
      const savedConfirmedData = await getConfirmedCountData();
      console.log("savedData:", savedData.length);
      console.log("confirmed data", savedConfirmedData.length);
      setDataArray(savedData);
      setConfirmedDataArray(savedConfirmedData);
    };
    fetchData();
  }, []);

  const groupedByLocation = dataArray.reduce((acc, item) => {
    saveCurrentCsvData(dataArray);

    // Check if the location already exists in the accumulator
    if (!acc[item.Location]) {
      // If not, create an empty array for this location
      acc[item.Location] = [];
    }
    // Add the current item to the array for its location
    acc[item.Location].push(item);
    return acc;
    //This feels hacky need to look into this
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

  //Prepare individual data to be send to individual functions
  //Do I really need to do this? probably not remove at later date
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
    removeCurrentCsvItem(data.Id);
    addToConfirmedCount(data);
    setConfirmedDataArray((prev) => [...prev, data]);
    setDataArray(updatedArray);
  };

  const handleNavigateToConfirmCount = (items: ItemData) => {
    navigation.navigate("Confirm Count", {
      confirmCount,
      items,
    });
  };

  const navigateToChangeCountScreen = (items: ItemData) => {
    prepareItemData(items);
    navigation.navigate("Correct Count", { dataArray, setDataArray, items });
  };

  const handleParsedData = (data: any[]) => {
    const dataWithIds = data.map((row, index) => ({
      Id: index,
      ...row,
    }));
    clearCycleCountData;
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
      <CsvExporter dataToBeUnParsed={confirmedDataArray} />
    </View>
  );
};

export default CycleCount;
