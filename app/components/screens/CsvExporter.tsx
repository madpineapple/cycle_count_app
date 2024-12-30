import Papa from "papaparse";
import { ItemData } from "../types/navigation-types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Button } from "react-native";

interface CsvExporterProps {
  dataToBeUnParsed: ItemData[];
}
const CsvExporter: React.FC<CsvExporterProps> = ({ dataToBeUnParsed }) => {
  const exportData = async () => {
    try {
      const csvString = Papa.unparse(dataToBeUnParsed);
      const currentDate = new Date();
      const fileName = "cycleCountUpdate" + currentDate + ".csv";
      const path = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(path, csvString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
      } else {
        console.log("Sharing is not available");
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return <Button color="#a7bcb9" title="Export Data" onPress={exportData} />;
};
export default CsvExporter;
