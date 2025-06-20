import React from "react";
import { View, FlatList, StyleSheet, Text, useWindowDimensions } from "react-native";
import VideoCard from "./VideoCard";
import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const MAX_RESULTS = 20;

interface VideoGridProps {
  query: string;
}

const fetchVideos = async ({ pageParam = "", query }: { pageParam?: string; query: string }) => {
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&key=${API_KEY}${pageParam ? `&pageToken=${pageParam}` : ""}`;
  if (query !== "All") {
    url += `&q=${encodeURIComponent(query)}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

const SkeletonCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonThumb} />
    <View style={styles.skeletonLine} />
    <View style={styles.skeletonLineShort} />
    <View style={styles.skeletonLineTiny} />
  </View>
);

const VideoGrid: React.FC<VideoGridProps> = ({ query }) => {
  const { width } = useWindowDimensions();
  let numColumns = 4;
  if (width < 600) numColumns = 1;
  else if (width < 900) numColumns = 2;
  else if (width < 1200) numColumns = 3;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    remove,
  } = useInfiniteQuery(
    ["videos", query],
    ({ pageParam = "" }) => fetchVideos({ pageParam, query }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    }
  );

  useEffect(() => {
    remove(); // clear previous data when query changes
    refetch();
  }, [query, refetch, remove]);

  const videos = data?.pages.flatMap(page => page.items) || [];

  if (status === "loading") {
    return (
      <View style={[styles.grid, styles.gridRowWrap]}> 
        {Array.from({ length: numColumns * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </View>
    );
  }
  if (status === "error") {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return (
      <View style={[styles.grid, styles.gridCenter]}> 
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
        <Text style={styles.retryText} onPress={() => fetchNextPage()}>Retry</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => (
        <VideoCard
          thumbnail={item.snippet.thumbnails.medium.url}
          title={item.snippet.title}
          channel={item.snippet.channelTitle}
          date={new Date(item.snippet.publishedAt).toLocaleDateString()}
          description={item.snippet.description}
        />
      )}
      keyExtractor={item => item.id.videoId}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    padding: 16,
  },
  gridRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorMsg: {
    marginBottom: 16,
  },
  retryText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  skeletonCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 8,
    width: 280,
    maxWidth: '100%',
    padding: 8,
  },
  skeletonThumb: {
    backgroundColor: '#e0e0e0',
    height: 158,
    borderRadius: 8,
    marginBottom: 8,
  },
  skeletonLine: {
    backgroundColor: '#e0e0e0',
    height: 16,
    borderRadius: 4,
    marginBottom: 6,
    width: '90%',
  },
  skeletonLineShort: {
    backgroundColor: '#e0e0e0',
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
    width: '60%',
  },
  skeletonLineTiny: {
    backgroundColor: '#e0e0e0',
    height: 12,
    borderRadius: 4,
    width: '40%',
  },
});

export default VideoGrid; 