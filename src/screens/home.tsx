import * as React from "react";
import { View, StyleSheet } from "react-native";
import VideoGrid from "../components/VideoGrid";
import Header from "../components/Header";
import FilterChips from "../components/FilterChips";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  subTitle: {
    margin: 24,
    textAlign: "center"
  }
});

const Home = () => {
  const [filter, setFilter] = React.useState("All");
  return (
    <View style={styles.container}>
      <Header />
      <FilterChips selected={filter} onChange={setFilter} />
      <View style={{ flex: 1, minHeight: 0 }}>
        <VideoGrid query={filter} />
      </View>
    </View>
  );
};

export default Home;
