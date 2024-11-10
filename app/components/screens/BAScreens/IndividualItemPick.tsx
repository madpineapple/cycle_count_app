import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import styles from "../../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation-types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Individual Pick Item Screen"
>;

const IndividualPickScreen: React.FC<Props> = ({ route }) => {
  const { orderArray } = route.params;

  const [barcode, setBarcode] = useState("");

  const checkBarcode = () => {
    console.log(barcode);
    if (barcode == orderArray.material_lot) {
      Alert.alert("Success!", "Correct Item scanned!");
    }
    if (barcode != orderArray.material_lot) {
      Alert.alert("Failure!", "Incorrect Item scanned!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.itemText}>Pick Item</Text>
        <ScrollView>
          <Text style={styles.itemText}>{orderArray.material_name}</Text>
          <Text style={styles.itemText}>{orderArray.material_number}</Text>
        </ScrollView>
      </View>
      <View style={styles.box}>
        <Text style={styles.itemText}> Please scan or type in barcode</Text>
        <TextInput
          style={styles.input}
          value={barcode}
          onChangeText={setBarcode}
        />
        <Pressable style={styles.calculatorButton} onPress={checkBarcode}>
          Check Value
        </Pressable>
      </View>
    </View>
  );
};
export default IndividualPickScreen;
