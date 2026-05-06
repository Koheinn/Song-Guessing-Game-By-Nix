export type GameMode = "classical" | "pop" | "rock" | "hiphop" | "edm" | "jazz" | "country" | "rnb" | "reggae" | "folk" | "kpop";

export interface Song {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
  coverArt: string;
}

export interface QuestionType {
  correctSong: Song;
  options: Song[];
}

export type GameStatus = "start" | "loading" | "playing" | "finished";
