import React, { useState } from "react";
import Papa from "papaparse";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Button, Text, View } from "react-native";

interface CsvImporterProps {
  onDataParsed: (data: any[]) => void;
}

const requestPermission = async () => {
  // Request permission for reading media files (which can also include documents)
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access media library was denied");
  } else {
    console.log("Permission granted to access media library");
  }
};
const CsvImporter: React.FC<CsvImporterProps> = ({ onDataParsed }) => {
  const [errors, setErrors] = useState<any[]>([]);

  const handleFileChange = async () => {
    await requestPermission();
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      const fileUri = result.assets?.[0]?.uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri ?? "");

      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onDataParsed(results.data); // Send parsed data to parent
          setErrors(results.errors);
        },
        error: (error: any) => {
          console.error("Parsing Error:", error);
          setErrors([error]);
        },
      });
    } catch (err) {
      console.error("File selection or processing failed:", err);
      setErrors((prevErrors) => [...prevErrors, "Failed to process the file"]);
    }
  };
  return (
    <View>
      <Button title="Select CSV file" onPress={handleFileChange} />
      {errors.length > 0 && (
        <View>
          <Text>Errors:</Text>
          <Text>{JSON.stringify(errors, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default CsvImporter;
