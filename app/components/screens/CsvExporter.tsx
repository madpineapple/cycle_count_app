import React, { useState } from "react";
import Papa from "papaparse";
import { ItemData } from "../types/navigation-types";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native";

interface CsvExporterProps {
  dataToBeUnParsed: ItemData[];
}
const CsvExporter: React.FC<CsvExporterProps> = ({ dataToBeUnParsed }) => {
  const [errors, setErrors] = useState<any[]>([]);
  const exportData = async () => {
    try {
      const csvString = Papa.unparse(dataToBeUnParsed);
      const fileName = "cycleCountUpdate.csv";
      const path = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(path, csvString);
      console.log(`File saved successfully at: ${path}`);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return <Button title="Export Data" onPress={exportData} />;
};
export default CsvExporter;
