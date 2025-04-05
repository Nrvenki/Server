import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Papa from "papaparse";
import { Asset } from "expo-asset";

const DataInfo = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        // Load the CSV asset first
        const asset = await Asset.loadAsync(require("../assets/last.csv"));
        const fileUri = asset[0].localUri;

        const csvText = await FileSystem.readAsStringAsync(fileUri);

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data.length > 0) {
              setHeaders(Object.keys(results.data[0]));
              setData(results.data);
            }
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("CSV Load Error:", error);
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6B21A8" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.centered}>
        <Text>No data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>Data Information</Text>
        <ScrollView style={styles.tableContainer}>
          <View style={styles.rowHeader}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.cellHeader}>
                {header}
              </Text>
            ))}
          </View>

          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {headers.map((key, colIndex) => (
                <Text key={colIndex} style={styles.cell}>
                  {String(row[key])}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6B21A8",
    textAlign: "center",
    marginBottom: 10,
  },
  tableContainer: {
    maxHeight: 420,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },
  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#E9D5FF",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cellHeader: {
    minWidth: 100,
    padding: 10,
    fontWeight: "bold",
    color: "#4C1D95",
    backgroundColor: "#EDE9FE",
    textAlign: "center",
  },
  cell: {
    minWidth: 100,
    padding: 10,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});

export default DataInfo;
