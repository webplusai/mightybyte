import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface VideoHoverPopupProps {
  thumbnail: string;
  title: string;
  channel: string;
  description: string;
  date: string;
}

const VideoHoverPopup: React.FC<VideoHoverPopupProps> = ({ thumbnail, title, channel, description, date }) => {
  return (
    <View style={styles.popup}>
      <Image source={{ uri: thumbnail }} style={styles.largeThumb} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.channel}>{channel}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    top: -10,
    left: "100%",
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    padding: 12,
    zIndex: 100,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  largeThumb: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginTop: 8,
  },
  channel: {
    color: "#666",
  },
  date: {
    color: "#999",
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    color: "#333",
    fontSize: 13,
    marginTop: 4,
  },
});

export default VideoHoverPopup; 