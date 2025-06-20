import React from "react";
import { View, Text, Image, StyleSheet, Platform, Pressable, Animated } from "react-native";
import VideoHoverPopup from "./VideoHoverPopup";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channel: string;
  date: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, title, channel, date, description }) => {
  const [hovered, setHovered] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const showTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const hideTimeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (hovered) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      showTimeout.current = setTimeout(() => setShowPopup(true), 250);
    } else {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      hideTimeout.current = setTimeout(() => setShowPopup(false), 200);
    }
    return () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [hovered]);

  React.useEffect(() => {
    if (showPopup) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start();
    }
  }, [showPopup, fadeAnim]);

  return (
    <View style={styles.card}>
      <Pressable
        onHoverIn={() => Platform.OS === "web" && setHovered(true)}
        onHoverOut={() => Platform.OS === "web" && setHovered(false)}
        style={{ position: "relative" }}
      >
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.channel}>{channel}</Text>
        <Text style={styles.date}>{date}</Text>
        {showPopup && Platform.OS === "web" && (
          <Animated.View style={{ opacity: fadeAnim, position: "absolute", top: -10, left: "100%", width: 320 }}>
            <VideoHoverPopup
              thumbnail={thumbnail}
              title={title}
              channel={channel}
              description={description}
              date={date}
            />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    maxWidth: 300,
  },
  thumbnail: {
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
  },
});

export default VideoCard; 