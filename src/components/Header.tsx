import React from "react";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.brand}>YouTube</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search"
        placeholderTextColor="#888"
      />
      <View style={styles.avatarPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 2,
    zIndex: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  brand: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#cc0000",
    marginLeft: 8,
  },
  search: {
    flex: 1,
    marginHorizontal: 24,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 36,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
  },
});

export default Header; 