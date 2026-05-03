import { Song } from "../types";

const SEARCH_TERMS = [
  "pop hits",
  "top 40",
  "billboard 100",
  "classic rock",
  "2010s radio",
  "indie pop",
  "80s anthems",
  "90s hits",
  "r&b hits",
];

interface ITunesTrack {
  kind: string;
  previewUrl: string;
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
}

export const fetchSongs = async (): Promise<Song[]> => {
  // Pick a random search term to keep the game fresh
  const randomTerm = SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)];
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    randomTerm
  )}&entity=song&limit=150`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter out results that are not songs or lack preview clip
    return data.results
      .filter((track: ITunesTrack) => track.kind === "song" && track.previewUrl)
      .map((track: ITunesTrack) => {
        // Upgrade image resolution from 100x100 to 600x600 for better display
        const coverArt = track.artworkUrl100
          ? track.artworkUrl100.replace("100x100bb", "600x600bb")
          : "";
          
        return {
          id: String(track.trackId),
          title: track.trackName,
          artist: track.artistName,
          previewUrl: track.previewUrl,
          coverArt,
        };
      });
  } catch (error) {
    console.error("Error fetching songs from API", error);
    throw new Error("Could not load music data. Please check your connection.");
  }
};
