import { Song, GameMode } from "../types";

export const fetchSongs = async (mode: GameMode): Promise<Song[]> => {
  try {
    const response = await fetch(`/api/songs?mode=${mode}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Map the JSON structure from our serverless function to the React Song type
    return data.map((track: { id: string; title: string; artist: string; preview: string; thumbnail: string }) => {
      return {
        id: track.id,
        title: track.title,
        artist: track.artist,
        previewUrl: track.preview, // The backend passes YouTube video URL
        coverArt: track.thumbnail, // Our backend passes YouTube thumbnail
      };
    });
  } catch (error) {
    console.error("Error fetching songs from API", error);
    throw new Error("Could not load music data. Please check your connection.");
  }
};
