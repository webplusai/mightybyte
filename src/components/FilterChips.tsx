import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const chips = [
  "All",
  "Music",
  "Live",
  "Playlists",
  "Gaming",
  "News",
  "Sports",
  "Learning",
  "Fashion",
];

interface FilterChipsProps {
  selected: string;
  onChange: (chip: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ selected, onChange }) => {
  return (
    <View style={styles.chipRow}>
      {chips.map(chip => (
        <Pressable
          key={chip}
          style={[styles.chip, selected === chip && styles.chipSelected]}
          onPress={() => onChange(chip)}
        >
          <Text style={[styles.chipText, selected === chip && styles.chipTextSelected]}>{chip}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  chipSelected: {
    backgroundColor: "#222",
    borderColor: "#222",
  },
  chipText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#fff",
  },
});

export default FilterChips; 