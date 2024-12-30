import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  confirmCountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 20,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: "center",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  evenRows: {
    backgroundColor: "#FFC0CB",
  },
  oddRows: {
    backgroundColor: "#ACE1AF",
  },
  evenHeaderRows: {
    backgroundColor: "#EADDCA",
    justifyContent: "center",
    alignItems: "center",
  },
  oddHeaderRows: {
    backgroundColor: "#FFBF00",
    justifyContent: "center",
    alignItems: "center",
  },

  //Text styles
  headerText: {
    fontSize: 20,
  },
  itemText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 30,
  },
  confirmCountText: {
    padding: 50,
    width: "100%", // Makes the text take the full width
    textAlign: "center",
    color: "#FFFFFF",
    backgroundColor: "#008000",
    fontSize: 30,
  },
  biggerText: {
    fontSize: 50,
    fontWeight: "bold",
  },

  // Button styles
  buttonView: {
    flexDirection: "row",
    padding: 20,
  },
  confirmButton: {
    backgroundColor: "#008000",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 200,
    margin: 20,
  },
  mainMenuButton: {
    backgroundColor: "#16b8f3",
    padding: 100,
    borderRadius: 5,
    elevation: 2,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  alterButton: {
    backgroundColor: "#EF0107",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 200,
    margin: 20,
  },
  calculatorButton: {
    backgroundColor: "#a7bcb9",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 200,
    margin: 20,
  },
  buttonText: {
    color: "#f5f8f9",
    fontSize: 16,
  },
  cancelButton: {
    color: "#EF0107",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default styles;
