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
  const [weightInputValue, setWeightInputValue] = React.useState("0");
  const [bagInputValue, setBagInputValue] = React.useState("0");
  const [partialInputValue, setPartialInputValue] = React.useState("0");
  const [itemQuantity, setItemQuantity] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [setCountIsVisible, setSetCountIsVisible] = React.useState(false);

  const calculateTotal = () => {
    const numWeight = parseFloat(weightInputValue);
    const numNumberOfBags = parseFloat(bagInputValue);
    const numNumberOfPartials = parseFloat(partialInputValue);
    setItemQuantity(numWeight * numNumberOfBags + numNumberOfPartials);
    setSetCountIsVisible(true);
  };
  const submit = () => {
    console.log("data added to table");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.headerText}>Pick Item</Text>
          <Text style={styles.headerText}>{orderArray.material_name}</Text>
          <Text style={styles.headerText}>{orderArray.material_number}</Text>
        </View>
        <View>
          <Text style={styles.itemText}> Please enter material lot number</Text>
          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={setBarcode}
          />
          <Text style={styles.itemText}> Please enter weight of bags</Text>
          <TextInput
            style={styles.input}
            placeholder={"Weight"}
            keyboardType="numeric"
            value={weightInputValue}
            onChangeText={(weightVal) => setWeightInputValue(weightVal)}
          />
          <Text style={styles.itemText}> Please enter number of bags</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of bags"
            keyboardType="numeric"
            value={bagInputValue}
            onChangeText={(bagVal) => setBagInputValue(bagVal)}
          />
          <Text style={styles.itemText}> Any partials?</Text>
          <Pressable
            style={styles.confirmButton}
            onPress={() => setIsVisible(true)}
          >
            <Text>Yes</Text>
          </Pressable>
          <Pressable style={styles.alterButton} onPress={calculateTotal}>
            <Text>No/ Calculate QTY</Text>
          </Pressable>
          <Text
            style={{
              fontWeight: "bold",
              opacity: isVisible ? 1 : 0,
            }}
          >
            Please input total combined weight of all partials
          </Text>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              opacity: isVisible ? 1 : 0,
            }}
            placeholder="Combined weight of partials"
            keyboardType="numeric"
            value={partialInputValue}
            onChangeText={(partialVal) => setPartialInputValue(partialVal)}
          />

          <Pressable
            style={{
              backgroundColor: "#a7bcb9",
              padding: 10,
              borderRadius: 5,
              elevation: 2,
              flexDirection: "row",
              justifyContent: "center",
              maxWidth: 200,
              margin: 20,
              opacity: isVisible ? 1 : 0,
            }}
            onPress={calculateTotal}
          >
            <Text style={styles.itemText}>Calculate</Text>
          </Pressable>

          <Text style={{ opacity: setCountIsVisible ? 1 : 0 }}>
            Item count: {itemQuantity}
          </Text>

          <Pressable style={styles.calculatorButton} onPress={submit}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
export default IndividualPickScreen;
