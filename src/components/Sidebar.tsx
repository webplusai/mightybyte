import React from "react";
import { View, Text, StyleSheet } from "react-native";

const links = [
  "Home",
  "Explore",
  "Subscriptions",
  "Library",
  "History",
];

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      {links.map(link => (
        <Text key={link} style={styles.link}>{link}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 120,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 8,
    elevation: 2,
    zIndex: 5,
  },
  link: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: "#222",
    borderRadius: 6,
    marginBottom: 4,
    fontWeight: "500",
  },
});

export default Sidebar; 