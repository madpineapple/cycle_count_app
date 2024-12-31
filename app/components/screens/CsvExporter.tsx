import Papa from "papaparse";
import { ItemData } from "../types/navigation-types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Button } from "react-native";
import {
  clearConfirmedCountData,
  getConfirmedCountData,
} from "../cycleCountCSVStorage";
import { useEffect, useState } from "react";

interface CsvExporterProps {
  dataToBeUnParsed: ItemData[];
}
const CsvExporter: React.FC<CsvExporterProps> = ({ dataToBeUnParsed }) => {
  const [isExportDisabled, setIsExportDisabled] = useState(true);

  useEffect(() => {
    const checkData = async () => {
      const savedConfirmedData = await getConfirmedCountData();
      setIsExportDisabled(savedConfirmedData.length === 0);
    };
    checkData();
  }, []);

  const exportData = async () => {
    try {
      const csvString = Papa.unparse(dataToBeUnParsed);
      const currentDate = new Date();
      const fileName = "cycleCountUpdate" + currentDate + ".csv";
      const path = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(path, csvString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
        await clearConfirmedCountData();
        const updatedConfirmedData = await getConfirmedCountData();
        setIsExportDisabled(updatedConfirmedData.length === 0);
      } else {
        console.log("Sharing is not available");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <Button
      color="#a7bcb9"
      title="Export Data"
      onPress={exportData}
      disabled={isExportDisabled}
    />
  );
};
export default CsvExporter;
