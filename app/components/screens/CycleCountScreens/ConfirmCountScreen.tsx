import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation-types";
import { View, Text, Button, Pressable } from "react-native";
import styles from "../../styles";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type Props = NativeStackScreenProps<RootStackParamList, "Confirm Count">;

const ConfirmCountScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();

  const confrimQty = route.params.confirmCount;
  const data = route.params.items;
  const handleConfirm = () => {
    confrimQty(data);
    navigation.navigate("Cycle Count");
  };
  return (
    <View>
      <View style={styles.confirmCountContainer}>
        <Text style={styles.confirmCountText}>Confirm Item Count?</Text>
        <Text style={styles.biggerText}>QTY: {data.Qty}</Text>
      </View>

      <Button title="Confirm" onPress={handleConfirm} />
      <Button
        color={"#EF0107"}
        title="Cancel"
        onPress={() => navigation.navigate("Cycle Count")}
      />
    </View>
  );
};
export default ConfirmCountScreen;
