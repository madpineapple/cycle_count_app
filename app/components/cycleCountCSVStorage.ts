import AsyncStorage from "@react-native-async-storage/async-storage";
import { ItemData } from "./types/navigation-types";

const CYCLE_COUNT_KEY = "cycleCountData";
const CONFIRMED_COUNT_KEY = "@confirmed_count_data";

// Save data
export const saveCurrentCsvData = async (data: ItemData[]) => {
  try {
    await AsyncStorage.setItem(CYCLE_COUNT_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save cycle count data", e);
  }
};

// Load data
export const loadCurrentCsvData = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(CYCLE_COUNT_KEY);
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (e) {
    console.error("Failed to load cycle count data", e);
    return [];
  }
};
export const removeCurrentCsvItem = async (itemId: number) => {
  try {
    // Step 1: Retrieve the current data
    const jsonValue = await AsyncStorage.getItem(CYCLE_COUNT_KEY);
    const currentData = jsonValue ? JSON.parse(jsonValue) : [];

    // Step 2: Filter out the item to remove
    const updatedData = currentData.filter(
      (item: ItemData) => item.Id !== itemId
    );

    // Step 3: Save the updated array back to AsyncStorage
    await AsyncStorage.setItem(CYCLE_COUNT_KEY, JSON.stringify(updatedData));

    console.log(`Item with id ${itemId} removed successfully!`);
  } catch (e) {
    console.error("Failed to remove item from cycle count data", e);
  }
};

// Clear data (optional)
export const clearCycleCountData = async () => {
  try {
    await AsyncStorage.removeItem(CYCLE_COUNT_KEY);
  } catch (e) {
    console.error("Failed to clear cycle count data", e);
  }
};

export const addToConfirmedCount = async (item: ItemData) => {
  try {
    // Step 1: Retrieve the current confirmed count data
    const jsonValue = await AsyncStorage.getItem(CONFIRMED_COUNT_KEY);
    const confirmedData = jsonValue ? JSON.parse(jsonValue) : [];

    // Step 2: Add the new item to the array
    confirmedData.push(item);

    // Step 3: Save the updated array back to AsyncStorage
    await AsyncStorage.setItem(
      CONFIRMED_COUNT_KEY,
      JSON.stringify(confirmedData)
    );

    console.log("Item added to confirmed count array!");
  } catch (e) {
    console.error("Failed to add item to confirmed count array", e);
  }
};
export const getConfirmedCountData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CONFIRMED_COUNT_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to retrieve confirmed count data", e);
    return [];
  }
};

export const clearConfirmedCountData = async () => {
  try {
    await AsyncStorage.removeItem(CONFIRMED_COUNT_KEY);
    console.log("Confirmed count data cleared!");
  } catch (e) {
    console.error("Failed to clear confirmed count data", e);
  }
};
