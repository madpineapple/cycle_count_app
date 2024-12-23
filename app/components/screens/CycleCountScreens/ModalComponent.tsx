import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import styles from "../../styles";
import { ScrollView } from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  data: {
    Id: number;
    PartNumber: string;
    PartDescription: string;
    Location: string;
    Qty: number;
    QtyCommitted: number;
    Tracking_Lot_Number: string;
    Tracking_Expiration_Date: string;
    Tracking_Vendor_Lot: string;
  };
  confrimCount(value: number): void;
}

const ModalComponent: React.FC<Props> = ({
  isVisible,
  onClose,
  data,
  confrimCount,
}) => {
  console.log(data);
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
              Is the following count accurate? : {data.Qty}
            </Text>
            <View style={styles.buttonView}>
              <Pressable
                style={styles.confirmButton}
                onPress={() => confrimCount(data.Id)}
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
