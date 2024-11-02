import React from "react";
import styles from "../../styles";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation-types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { ScrollView } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Correct Count">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const ChangeCountScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();

  const { dataArray, setDataArray, items } = route.params;

  const [weightInputValue, setWeightInputValue] = React.useState("0");
  const [bagInputValue, setBagInputValue] = React.useState("0");
  const [partialInputValue, setPartialInputValue] = React.useState("0");
  const [itemQuantity, setItemQuantity] = React.useState(items.item_quantity);
  const [isVisible, setIsVisible] = React.useState(false);
  const [setCountIsVisible, setSetCountIsVisible] = React.useState(false);

  const calculateTotal = () => {
    const numWeight = parseFloat(weightInputValue);
    const numNumberOfBags = parseFloat(bagInputValue);
    const numNumberOfPartials = parseFloat(partialInputValue);
    setItemQuantity(numWeight * numNumberOfBags + numNumberOfPartials);
    setSetCountIsVisible(true);
  };

  const changeItemQuantity = () => {
    const index = dataArray.findIndex((item) => item.item_id === items.item_id);
    const newDataArray = [...dataArray];
    newDataArray[index].item_quantity = itemQuantity;
    setDataArray(newDataArray);
    navigation.navigate("Cycle Count", { dataArray, setDataArray });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.itemText}>
          Please input weight of complete bag of {items.item_name} in kg
        </Text>
        <TextInput
          style={styles.input}
          placeholder={"Weight"}
          keyboardType="numeric"
          value={weightInputValue}
          onChangeText={(weightVal) => setWeightInputValue(weightVal)}
        ></TextInput>
        <Text style={styles.itemText}>
          Please input number of bags of {items.item_name}
        </Text>
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
            opacity: setCountIsVisible ? 1 : 0,
          }}
          onPress={changeItemQuantity}
        >
          <Text style={styles.itemText}>Set new count</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default ChangeCountScreen;
