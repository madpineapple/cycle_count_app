import React, { useState } from "react";
import Papa from "papaparse";

interface CsvImporterProps {
  onDataParsed: (data: any[]) => void;
}

const CsvImporter: React.FC<CsvImporterProps> = ({ onDataParsed }) => {
  const [errors, setErrors] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onDataParsed(results.data); // Send parsed data to parent
          setErrors(results.errors);
        },
        error: (error) => {
          console.error("Parsing Error:", error);
          setErrors([error]);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {errors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvImporter;
