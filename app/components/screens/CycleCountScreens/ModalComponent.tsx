import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import styles from "../../styles";
import { ScrollView } from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  data: {
    item_id: number;
    item_location: string;
    item_number: string;
    item_name: string;
    item_lot_number: string;
    item_expiration_date: string;
    item_quantity: number;
  };
  confrimCount(value: number): void;
}

const ModalComponent: React.FC<Props> = ({
  isVisible,
  onClose,
  data,
  confrimCount,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <View style={styles.centeredView}>
            <Text style={styles.modalView}>
              Is the following count accurate? : {data.item_quantity}
            </Text>
            <View style={styles.buttonView}>
              <Pressable
                style={styles.confirmButton}
                onPress={() => confrimCount(data.item_id)}
              >
                <Text>Yes</Text>
              </Pressable>
              <Pressable style={styles.alterButton} onPress={onClose}>
                <Text>No</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
export default ModalComponent;
