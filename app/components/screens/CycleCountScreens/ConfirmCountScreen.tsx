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
      <Text>Confirm Item Count?</Text>
      <Text>{data.Qty}</Text>
      <Button title="Confirm" onPress={handleConfirm} />
      <Pressable
        style={styles.confirmButton}
        onPress={() => navigation.navigate("Cycle Count")}
      >
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
};
export default ConfirmCountScreen;
